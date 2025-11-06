"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import axiosClient from "@/services/axiosClient";
import { baseUri } from "@/services/constant";
import ProductsMegaMenu from "./ProductsMegaMenu";
import SoftwareMegaMenu from "./SoftwareMegaMenu";
import SolutionsMegaMenu from "./SolutionsMegaMenu";

type ChildItem = {
  children?: ChildItem[];
  title: string | null;
  url: string;
  slug?: string;
};

type NavItem = {
  title: string | null;
  url: string;
  type: "dropdown" | "single";
  children?: ChildItem[];
};

type Branding = {
  site_title: string;
  site_tagline: string;
  logo_url: string;
  favicon_url?: string;
};

type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  category?: {
    name: string;
    slug: string;
    parent?: {
      name: string;
      slug: string;
    };
  };
};

type SearchResponse = {
  success: boolean;
  data: Product[];
};

type HeaderData = {
  settings?: {
    show_search_in_header?: boolean;
  };
  branding: Branding;
  navigation: NavItem[];
  custom_css?: string;
  scripts?: {
    header_scripts?: string;
  };
};

let headerDataCache: HeaderData | null = null;

// Helper function to check if children array has valid items
const hasValidChildren = (children?: ChildItem[]): boolean => {
  if (!children || !Array.isArray(children) || children.length === 0) {
    return false;
  }

  // Check if there's at least one child with a title
  return children.some((child) => child?.title && child.title.trim() !== "");
};

// Helper function to render child items safely
const renderChildItems = (children: ChildItem[], closeMenu?: () => void) => {
  if (!hasValidChildren(children)) {
    return null;
  }

  return children
    .flatMap((child, childIndex) => {
      if (!child?.title || child.title.trim() === "") {
        return null;
      }

      // If child has its own children, render them recursively
      if (hasValidChildren(child.children)) {
        return (child.children as ChildItem[])
          .map((subChild, subIndex) => {
            if (!subChild?.title || subChild.title.trim() === "") {
              return null;
            }

            return (
              <Link
                key={`${childIndex}-${subIndex}`}
                href={subChild.url || "#"}
                onClick={closeMenu}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-orange-500">
                {subChild.title}
              </Link>
            );
          })
          .filter(Boolean);
      }

      // Render single child item
      return (
        <Link
          key={childIndex}
          href={child.url || "#"}
          onClick={closeMenu}
          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-orange-500">
          {child.title}
        </Link>
      );
    })
    .filter(Boolean);
};

// Responsive Mega Menu Wrapper Component - DESKTOP ONLY
const ResponsiveMegaMenu = ({ 
  children 
}: { 
  children: React.ReactNode;
}) => {
  return (
    <div className="hidden md:block absolute left-1/4 transform -translate-x-1/4 mt-3 w-[90vw] max-w-[800px] bg-[#2B2B2B] border border-gray-700 rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      {children}
    </div>
  );
};

// Mobile Dropdown Component - SIMPLE DROPDOWN
const MobileDropdown = ({ 
  children, 
  title 
}: { 
  children: React.ReactNode; 
  title?: string;
}) => {
  return (
    <div className="md:hidden bg-[#2B2B2B] border border-gray-700 rounded-lg mx-4 my-2">
      <div className="text-white font-medium p-3 border-b border-gray-600 text-sm bg-[#333] rounded-t-lg">
        {title}
      </div>
      <div className="py-2">
        {children}
      </div>
    </div>
  );
};

// Recursive function to render nested children in mobile view
const renderMobileNestedChildren = (children: ChildItem[], closeMenu: () => void, level: number = 0) => {
  if (!hasValidChildren(children)) {
    return null;
  }

  return children.map((child, index) => {
    if (!child?.title || child.title.trim() === "") {
      return null;
    }

    const hasNestedChildren = hasValidChildren(child.children);
    console.log("nes",child)
    return (
      <div key={index}>
        <div className={`flex justify-between items-center ${level > 0 ? 'pl-4' : ''}`}>
          <Link
            href={child.url || "#"}
            onClick={closeMenu}
            className={`flex-1 py-3 px-4 text-sm text-gray-300 hover:bg-[#333] hover:text-orange-500 border-b border-gray-700 transition-colors ${
              level > 0 ? 'text-sm' : ''
            }`}>
            {child.title}
          </Link>
          
          {hasNestedChildren && (
            <div className="px-4 text-gray-400 text-xs">
              {child.children?.length} items
            </div>
          )}
        </div>
        
        {/* Render nested children */}
        {hasNestedChildren && (
          <div className="bg-[#252525] border-l-2 border-orange-500">
            {renderMobileNestedChildren(child.children!, closeMenu, level + 1)}
          </div>
        )}
      </div>
    );
  });
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<HeaderData | null>(
    headerDataCache
  );
  const [loading, setLoading] = useState(!headerDataCache);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update document meta tags and favicon
  const updateDocumentMetadata = useCallback((data: HeaderData) => {
    if (data?.branding) {
      const { site_title, site_tagline, favicon_url } = data.branding;

      // Update document title
      if (site_title) {
        const currentTitle = document.title;
        // Only update if not already set correctly
        if (!currentTitle.includes(site_title)) {
          document.title =
            site_title + (site_tagline ? ` | ${site_tagline}` : "");
        }
      }

      // Update favicon
      if (favicon_url) {
        let link = document.querySelector(
          "link[rel*='icon']"
        ) as HTMLLinkElement | null;

        if (!link) {
          // Create new favicon link if doesn't exist
          link = document.createElement("link");
          link.rel = "icon";
          document.head.appendChild(link);
        }

        // Update favicon URL
        link.href = favicon_url;
      }

      // Update meta description
      if (site_tagline) {
        let metaDescription = document.querySelector(
          'meta[name="description"]'
        );

        if (!metaDescription) {
          // Create new meta description if doesn't exist
          metaDescription = document.createElement("meta");
          metaDescription.setAttribute("name", "description");
          document.head.appendChild(metaDescription);
        }

        metaDescription.setAttribute("content", site_tagline);
      }

      // Update og:title and og:description
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute("content", site_title || "RealTime Biometrics");

      let ogDescription = document.querySelector(
        'meta[property="og:description"]'
      );
      if (!ogDescription) {
        ogDescription = document.createElement("meta");
        ogDescription.setAttribute("property", "og:description");
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute(
        "content",
        site_tagline || "Advanced Biometric Solutions"
      );
    }
  }, []);

  // Fetch header data
  useEffect(() => {
    if (headerDataCache) {
      setHeaderData(headerDataCache);
      updateDocumentMetadata(headerDataCache);
      setLoading(false);
      return;
    }

    const fetchHeader = async () => {
      try {
        const response = await axiosClient.get("/site/header");
        const data = response.data.data;
        headerDataCache = data;
        setHeaderData(data);
        updateDocumentMetadata(data);
      } catch (err) {
        console.error("Error fetching header:", err);
        const fallbackData: HeaderData = {
          branding: {
            site_title: "RealTime Biometrics",
            site_tagline: "Advanced Biometric Solutions",
            logo_url: "/logo.png",
            favicon_url: "/favicon.ico",
          },
          navigation: [],
          settings: { show_search_in_header: true },
        };
        headerDataCache = fallbackData;
        setHeaderData(fallbackData);
        updateDocumentMetadata(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchHeader();
  }, [updateDocumentMetadata]);

  // Search function
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axiosClient.get<SearchResponse>(
        `/content/products?search=${encodeURIComponent(query)}`
      );
      if (response.data.success) {
        setSearchResults(response.data.data);
        setShowSearchDropdown(response.data.data.length > 0);
      }
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(searchQuery);
      }, 300);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, performSearch]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
        setActiveMegaMenu(null);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button[aria-label="Mobile menu"]')
      ) {
        setMobileMenuOpen(false);
        setActiveMegaMenu(null);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle body scroll
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleProductSelect = (product: Product) => {
    setMobileMenuOpen(false);
    setShowSearchDropdown(false);
    setSearchQuery("");
    setSearchResults([]);
    router.push(`/products/${product.slug}`);
  };

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
    setActiveMegaMenu(null);
  };

  const toggleMegaMenu = (title: string) => {
    setActiveMegaMenu(activeMegaMenu === title ? null : title);
    setActiveDropdown(null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveMegaMenu(null);
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchDropdown(false);
  };

  // Render mobile dropdown for regular items with API data
  const renderMobileDropdown = (children: ChildItem[]) => {
    if (!hasValidChildren(children)) {
      return null;
    }

    return (
      <div className="space-y-0">
        {children.map((child, childIndex) => {
          if (!child?.title || child.title.trim() === "") {
            return null;
          }

          const hasNestedChildren = hasValidChildren(child.children);

          return (
            <div key={childIndex}>
              <div className="flex justify-between items-center hover:bg-[#333] transition-colors">
                <Link
                  href={child.url || "#"}
                  onClick={closeMobileMenu}
                  className="flex-1 py-3 px-4 text-sm text-gray-300 hover:text-orange-500 border-b border-gray-700 transition-colors">
                  {child.title}
                </Link>
                
                {hasNestedChildren && (
                  <div className="px-4 text-gray-400 text-xs">
                    {child.children?.length}
                  </div>
                )}
              </div>
              
              {/* Render nested children if they exist */}
              {hasNestedChildren && (
                <div className="bg-[#252525] border-l-2 border-orange-500 ml-4">
                  {renderMobileNestedChildren(child.children!, closeMobileMenu, 1)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Render mobile content for mega menu items - DYNAMIC FROM API
  const renderMobileMegaMenu = (item: NavItem) => {
    if (!hasValidChildren(item.children)) {
      return (
        <MobileDropdown title={item.title || ""}>
          <Link 
            href={item.url || "#"} 
            onClick={closeMobileMenu}
            className="block py-3 px-4 text-sm text-orange-500 hover:bg-[#333] font-medium">
            Explore {item.title} →
          </Link>
        </MobileDropdown>
      );
    }

    return (
      <MobileDropdown title={item.title || ""}>
        <div className="space-y-0">
          {/* Main category link */}
          <Link 
            href={item.url || "#"} 
            onClick={closeMobileMenu}
            className="block py-3 px-4 text-sm text-orange-500 hover:bg-[#333] font-medium border-b border-gray-700 bg-[#333]">
            All {item.title} →
          </Link>
          
          {/* Child items from API */}
          {item.children!.map((child, index) => {
            const hasNestedChildren = hasValidChildren(child.children);
            
            return (
              <div key={index}>
                <div className="flex justify-between items-center hover:bg-[#333] transition-colors">
                  <Link
                    href={child.url || "#"}
                    onClick={closeMobileMenu}
                    className="flex-1 py-3 px-4 text-sm text-gray-300 hover:text-orange-500 border-b border-gray-700 transition-colors">
                    {child.title}
                  </Link>
                  
                  {hasNestedChildren && (
                    <div className="px-4 text-gray-400 text-xs">
                      {child.children?.length}
                    </div>
                  )}
                </div>
                
                {/* Render nested children for items like Smart Cameras */}
                {hasNestedChildren && (
                  <div className="bg-[#252525] border-l-2 border-orange-500 ml-4">
                    {renderMobileNestedChildren(child.children!, closeMobileMenu, 1)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </MobileDropdown>
    );
  };

  if (loading) {
    return (
      <div className="bg-[#2B2B2B] text-white text-center py-4">Loading...</div>
    );
  }

  if (!headerData) {
    return (
      <div className="bg-[#2B2B2B] text-white text-center py-4">
        Failed to load header 
      </div>
    );
  }

  const { branding, navigation, settings } = headerData;

  return (
    <header className="w-full bg-[#2B2B2B] text-white z-50 sticky top-0">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 bg-[#2B2B2B] z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center transition-transform duration-300 hover:scale-105 z-50"
          >
            <Image
              src={branding?.logo_url || "/logo.png"}
              alt={branding?.site_title || "Logo"}
              width={180}
              height={60}
              className="h-auto w-[120px] lg:w-[130px] xl:w-[150px]"
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center space-x-4 lg:space-x-8 text-lg"
            ref={dropdownRef}
          >
            {navigation.map((item, index) => {
              if (!item?.title || item.title.trim() === "") {
                return null;
              }

              if (item.type === "single") {
                return (
                  <Link
                    key={index}
                    href={item.url || "#"}
                    className={`font-[600] text-[14px] hover:text-orange-500 transition-colors ${
                      pathname === item.url ? "text-orange-500" : "text-white"
                    }`}>
                    {item.title}
                  </Link>
                );
              }

              if (item.type === "dropdown") {
                // Check which mega menu to show
                const isProductsDropdown =
                  item.title?.toLowerCase() === "products";
                const isSolutionsDropdown =
                  item.title?.toLowerCase() === "solutions";
                const isSoftwareDropdown =
                  item.title?.toLowerCase() === "software";

                return (
                  <div key={index} className="relative group">
                    <Link
                      href={item.url || "#"}
                      className={`flex text-[14px] items-center font-[600] hover:text-orange-500 ${
                        pathname === item.url ? "text-orange-500" : "text-white"
                      }`}>
                      {item.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Link>

                    {/* Regular Dropdown for items without mega menu */}
                    {hasValidChildren(item.children) &&
                      !isProductsDropdown &&
                      !isSolutionsDropdown &&
                      !isSoftwareDropdown && (
                        <div className="absolute left-0 mt-2 w-56 bg-[#222] rounded-md shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                          {renderChildItems(item.children!)}
                        </div>
                      )}

                    {/* Mega Menu for Products */}
                    {isProductsDropdown && (
                      <ResponsiveMegaMenu>
                        <ProductsMegaMenu />
                      </ResponsiveMegaMenu>
                    )}

                    {/* Mega Menu for Solutions */}
                    {isSolutionsDropdown && (
                      <ResponsiveMegaMenu>
                        <SolutionsMegaMenu />
                      </ResponsiveMegaMenu>
                    )}

                    {/* Mega Menu for Software */}
                    {isSoftwareDropdown && (
                      <ResponsiveMegaMenu>
                        <SoftwareMegaMenu />
                      </ResponsiveMegaMenu>
                    )}
                  </div>
                );
              }
            return null;
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label="Mobile menu"
          className="md:hidden focus:outline-none text-white z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Desktop App Links */}
        <div className="hidden lg:flex items-center lg:space-x-1 xl:space-x-4">
          <Link
            href="https://play.google.com/store/apps/details?id=com.realtimecamsmarthome"
            className="flex items-center bg-[#1C1310] border-2 border-[#4F423D] text-white text-xs px-4 lg:px-3 xl:px-5 py-2 xl:py-2 rounded-lg xl:rounded-xl transition-transform hover:scale-105">
            <Image
              src="/images/gplay.png"
              alt="App Icon"
              width={25}
              height={25}
              className="h-6 lg:h-4 xl:h-7 w-6 lg:w-4 xl:w-7"
            />
            <div className="ml-2">
              <div className="text-[12px] lg:text-[10px] xl:text-[12px]">
                REALTIME MOBILE
              </div>
              <div className="lg:text-[9px] font-bold">SMART APP</div>
            </div>
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=com.RealtimeBiometrics.realtime"
            className="flex items-center bg-[#1C1310] border-2 border-[#4F423D] text-white text-xs px-4 lg:px-3 xl:px-5 py-2 rounded-lg xl:rounded-xl transition-transform hover:scale-105">
            <Image
              src="/images/gplay.png"
              alt="App Icon"
              width={25}
              height={25}
              className="h-6 lg:h-4 xl:h-7 w-6 lg:w-4 xl:w-7"
            />
            <div className="ml-2">
              <div className="text-[12px] lg:text-[10px] xl:text-[12px]">
                REALTIME MOBILE
              </div>
              <div className="lg:text-[9px] font-bold text-orange-500">
                ATTENDANCE APP
              </div>
            </div>
          </Link>
        </div>
      </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-[#222] z-40 transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ paddingTop: "100px" }}>
        
        <div className="h-full overflow-y-auto pb-32">
          {/* Search Bar - TOP */}
          <div className="px-4 py-4 border-b border-[#333] hidden">
            <div
              className={`relative w-full ${
                settings?.show_search_in_header ? "" : "hidden"
              }`}>
              <form onSubmit={handleSearch} >
                <input
                  type="text"
                  placeholder="Search Products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() =>
                    searchQuery.trim() && setShowSearchDropdown(true)
                  }
                  className="w-full py-3 pl-4 pr-10 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </form>

              {showSearchDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
                      <p className="mt-2">Searching...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductSelect(product)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors">
                          <div className="flex items-center space-x-3">
                            {product.images?.[0] ? (
                              <Image
                                src={`${baseUri}${product.images[0]}`}
                                alt={product.title}
                                className="w-10 h-10 object-cover rounded"
                                width={25}
                                height={25}
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                  />
                                </svg>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {product.title}
                              </p>
                              {product.category && (
                                <p className="text-xs text-gray-500 truncate">
                                  {product.category.parent?.name &&
                                    `${product.category.parent.name} › `}
                                  {product.category.name}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : searchQuery.trim() ? (
                    <div className="p-4 text-center text-gray-500">
                      No products found for &quot;{searchQuery}&quot;
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="py-2">
            {navigation.map((item, index) => {
              if (!item?.title || item.title.trim() === "") {
                return null;
              }

              if (item.type === "single") {
                return (
                  <Link
                    key={index}
                    href={item.url || "#"}
                    onClick={closeMobileMenu}
                    className={`block text-white py-4 px-4 font-medium border-b border-[#333] transition-colors ${
                      pathname === item.url
                        ? "text-orange-500 bg-[#333]"
                        : "hover:text-orange-500 hover:bg-[#333]"
                    }`}>
                    {item.title}
                  </Link>
                );
              }

              if (item.type === "dropdown") {
                const hasChildren = hasValidChildren(item.children);
                const isMegaMenu =
                  item.title?.toLowerCase() === "products" ||
                  item.title?.toLowerCase() === "solutions" ||
                  item.title?.toLowerCase() === "software";

                return (
                  <div key={index} className="border-b border-[#333]">
                    <div className="flex justify-between items-center py-4 px-4 hover:bg-[#333] transition-colors">
                      <Link
                        href={item.url || ""}
                        onClick={closeMobileMenu}
                        className="text-white font-medium flex-1 hover:text-orange-500 transition-colors">
                        {item.title}
                      </Link>

                      {(hasChildren || isMegaMenu) && (
                        <button
                          onClick={() => {
                            if (isMegaMenu) {
                              toggleMegaMenu(item.title || "");
                            } else {
                              toggleDropdown(item.title || "");
                            }
                          }}
                          className="text-gray-400 hover:text-orange-500 transition-colors p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform duration-300 ${
                              (activeDropdown === item.title || activeMegaMenu === item.title)
                                ? "rotate-180 text-orange-500"
                                : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Regular Dropdown for non-mega menu items */}
                    {activeDropdown === item.title && hasChildren && !isMegaMenu && (
                      <div className="bg-[#2B2B2B] border-t border-[#333]">
                        {renderMobileDropdown(item.children!)}
                      </div>
                    )}

                    {/* Mega Menu Content - DYNAMIC FROM API */}
                    {activeMegaMenu === item.title && isMegaMenu && (
                      <div className="bg-[#2B2B2B] border-t border-[#333]">
                        {renderMobileMegaMenu(item)}
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </nav>

          {/* Action Buttons */}
          <div className="px-4 py-6 border-t border-[#333] space-y-3">
            <Link
              href="/partner"
              onClick={closeMobileMenu}
              className="block bg-orange-500 border border-orange-500 text-white py-3 px-5 rounded-lg hover:bg-orange-600 transform hover:scale-105 transition-all text-sm font-medium text-center">
              BECOME A PARTNER
            </Link>
            <Link
              href="https://partner.markvisitor.com/"
              onClick={closeMobileMenu}
              className="block border border-orange-500 text-orange-500 text-center py-3 px-5 rounded-lg hover:bg-orange-50 transform hover:scale-105 transition-all text-sm font-medium">
              PARTNER LOG IN
            </Link>
            <Link
              href="/pay"
              onClick={closeMobileMenu}
              className="block bg-yellow-500 border border-yellow-500 text-black text-center py-3 px-5 rounded-lg hover:bg-yellow-400 transform hover:scale-105 transition-all text-sm font-medium">
              PAY ONLINE
            </Link>
          </div>

          {/* App Links */}
          <div className="px-4 py-6 space-y-3 border-t border-[#333]">
            <Link
              href="https://play.google.com/store/apps/details?id=com.realtimecamsmarthome"
              onClick={closeMobileMenu}
              className="flex items-center justify-center bg-[#1C1310] border-2 border-[#4F423D] text-white text-xs px-4 py-3 rounded-xl transition-transform hover:scale-105">
              <Image
                src="/images/gplay.png"
                alt="App Icon"
                width={25}
                height={25}
                className="h-6 w-6"
              />
              <div className="ml-2">
                <div className="text-[11px]">REALTIME MOBILE</div>
                <div className="font-bold text-[12px]">SMART APP</div>
              </div>
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.RealtimeBiometrics.realtime"
              onClick={closeMobileMenu}
              className="flex items-center justify-center bg-[#1C1310] border-2 border-[#4F423D] text-white text-xs px-4 py-3 rounded-xl transition-transform hover:scale-105">
              <Image
                src="/images/gplay.png"
                alt="App Icon"
                width={25}
                height={25}
                className="h-6 w-6"
              />
              <div className="ml-2">
                <div className="text-[11px]">REALTIME MOBILE</div>
                <div className="font-bold text-orange-500 text-[12px]">
                  ATTENDANCE APP
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Action Bar - ONLY DESKTOP */}
      <div className="hidden md:block bg-white py-3">
        <div className="container mx-auto lg:px-4 flex flex-col md:flex-row items-center justify-between">
          <div
            ref={searchRef}
            className={`relative w-full md:w-96 mb-4 md:mb-0 ${
              settings?.show_search_in_header ? "" : "hidden"
            }`}>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() =>
                  searchQuery.trim() && setShowSearchDropdown(true)
                }
                className=" w-[85%] lg:w-full py-1 lg:py-2 pl-4 pr-10 rounded-[8px] bg-gray-100 border border-gray-200 text-gray-800 focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="absolute right-4  md:right-20 lg:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-[8px] shadow-lg mt-1 max-h-80 overflow-y-auto z-50">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-2">Searching...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductSelect(product)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors">
                        <div className="flex items-center space-x-3">
                          {product.images?.[0] ? (
                            <Image
                              src={`${baseUri}${product.images[0]}`}
                              alt={product.title}
                              className="w-10 h-10 object-cover rounded"
                              width={25}
                              height={25}
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"
                                />
                              </svg>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {product.title}
                            </p>
                            {product.category && (
                              <p className="text-xs text-gray-500 truncate">
                                {product.category.parent?.name &&
                                  `${product.category.parent.name} › `}
                                {product.category.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="p-4 text-center text-gray-500">
                    No products found for &quot;{searchQuery}&quot;
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className="flex space-x-2  lg:space-x-4">
            <Link
              href="/partner"
              className="bg-orange-500 border border-orange-500 text-white py-2 px-2 lg:px-5 rounded-[8px] hover:bg-orange-600 transform hover:-translate-y-0.5 transition-all text-xs lg:text-sm font-light tracking-[1] flex items-center justify-center">
              BECOME A PARTNER
            </Link>
            <Link
              href="https://partner.markvisitor.com/"
              className="border border-orange-500 text-orange-500 text-center py-2 px-2 lg:px-5 rounded-[8px] hover:bg-orange-50 transform hover:-translate-y-0.5 transition-all text-xs lg:text-sm font-light tracking-[1] flex items-center justify-center">
              PARTNER LOG IN
            </Link>
            <Link
              href="/pay"
              className="bg-yellow-500 border border-yellow-500 text-black text-center py-2 px-2 lg:px-5 rounded-[8px] hover:bg-yellow-400 transform hover:-translate-y-0.5 transition-all text-xs lg:text-sm font-light tracking-[1] flex items-center justify-center">
              PAY ONLINE
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}
    </header>
  );
};

export default Header;