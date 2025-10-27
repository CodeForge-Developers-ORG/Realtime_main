"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import axiosClient from "@/services/axiosClient";
import { baseUri } from "@/services/constant";

type ChildItem = {
  children: unknown;
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

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<HeaderData | null>(
    headerDataCache
  );
  const [loading, setLoading] = useState(!headerDataCache);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch header data
  useEffect(() => {
    if (headerDataCache) {
      setHeaderData(headerDataCache);
      setLoading(false);
      return;
    }

    const fetchHeader = async () => {
      try {
        const response = await axiosClient.get("/site/header");
        const data = response.data.data;
        headerDataCache = data;
        setHeaderData(data);
      } catch (err) {
        console.error("Error fetching header:", err);
        const fallbackData: HeaderData = {
          branding: {
            site_title: "Default Site",
            site_tagline: "Default Tagline",
            logo_url: "/logo.png",
          },
          navigation: [],
          settings: { show_search_in_header: true },
        };
        headerDataCache = fallbackData;
        setHeaderData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchHeader();
  }, []);

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
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchDropdown(false);
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
    <header className="w-full bg-[#2B2B2B] text-white z-50 relative">
      {/* Top Bar */}
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center transition-transform duration-300 hover:scale-105 z-50">
          <Image
            src={branding?.logo_url || "/logo.png"}
            alt={branding?.site_title || "Logo"}
            width={180}
            height={60}
            className="h-auto  w-[120px] lg:w-[130px]  xl:w-[150px] "
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center space-x-8 text-lg"
          ref={dropdownRef}>
          {navigation.map((item, index) => {
            if (item.type === "single") {
              return (
                <Link
                  key={index}
                  href={item.url}
                  className={`font-[600] text-[14px] hover:text-orange-500 transition-colors ${
                    pathname === item.url ? "text-orange-500" : "text-white"
                  }`}>
                  {item.title}
                </Link>
              );
            }

            if (item.type === "dropdown") {
              return (
                <div key={index} className="relative group">
                  <Link
                    href={item.url}
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

                  {item.children?.length && (
                    <div className="absolute left-0 mt-2 w-56 bg-[#222] rounded-md shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      {item.children.flatMap((child) => {
                        if (
                          Array.isArray(child.children) &&
                          child.children.length
                        ) {
                          return (child.children as ChildItem[]).map(
                            (sub, subIdx) => (
                              <Link
                                key={`${child.title}-${subIdx}`}
                                href={sub.url}
                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-orange-500">
                                {sub.title || "Untitled"}
                              </Link>
                            )
                          );
                        }
                        return (
                          <Link
                            key={child.title}
                            href={child.url}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-orange-500">
                            {child.title || "Untitled"}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </nav>

        {/* Mobile Menu Button - Hide when menu is open */}
        {!mobileMenuOpen && (
          <button
            aria-label="Mobile menu"
            className="md:hidden focus:outline-none text-white z-50 p-2"
            onClick={() => setMobileMenuOpen(true)}>
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
          </button>
        )}

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
              <div className="text-[12px] lg:text-[10px] xl:text-[12px]">REALTIME MOBILE</div>
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
              <div className="text-[12px] lg:text-[10px] xl:text-[12px]">REALTIME MOBILE</div>
              <div className="lg:text-[9px] font-bold text-orange-500">ATTENDANCE APP</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-[#222] z-40 transform transition-transform duration-500 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ paddingTop: "100px" }}>
        <button
          onClick={closeMobileMenu}
          className="absolute top-4 right-4 text-white p-2 z-50"
          aria-label="Close menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        </button>

        <div className="h-full overflow-y-auto pb-32">
          {/* Navigation Links - UPAR */}
          <nav className="px-4 py-2 space-y-0">
            {navigation.map((item, index) => {
              if (item.type === "single") {
                return (
                  <Link
                    key={index}
                    href={item.url}
                    onClick={closeMobileMenu}
                    className={`block text-white py-4 font-medium border-b border-[#333] transition-colors ${
                      pathname === item.url
                        ? "text-orange-500"
                        : "hover:text-orange-500"
                    }`}>
                    {item.title}
                  </Link>
                );
              }

              if (item.type === "dropdown") {
                return (
                  <div key={index} className="border-b border-[#333]">
                    <div className="flex justify-between items-center py-4">
                      <Link
                        href={item.url}
                        onClick={closeMobileMenu}
                        className="text-white font-medium flex-1 hover:text-orange-500 transition-colors">
                        {item.title}
                      </Link>
                      <button
                        onClick={() => toggleDropdown(item.title || "")}
                        className="text-gray-300 px-2 hover:text-orange-500 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 transition-transform duration-300 ${
                            activeDropdown === item.title
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
                    </div>

                    {activeDropdown === item.title && item.children?.length && (
                      <div className="pl-4 pb-2 space-y-1">
                        {item.children.flatMap((child, childIdx) => {
                          if (
                            Array.isArray(child.children) &&
                            child.children.length
                          ) {
                            return (child.children as ChildItem[]).map(
                              (sub, subIdx) => (
                                <Link
                                  key={`${childIdx}-${subIdx}`}
                                  href={sub.url}
                                  onClick={closeMobileMenu}
                                  className="block text-gray-300 text-sm py-3 pl-2 border-b border-[#2a2a2a] hover:text-orange-500 transition-colors">
                                  {sub.title || "Untitled"}
                                </Link>
                              )
                            );
                          }
                          return (
                            <Link
                              key={childIdx}
                              href={child.url}
                              onClick={closeMobileMenu}
                              className="block text-gray-300 text-sm py-3 pl-2 border-b border-[#2a2a2a] hover:text-orange-500 transition-colors">
                              {child.title || "Untitled"}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </nav>

          {/* Search Bar - MIDDLE */}
          <div className="px-4 py-4 border-b hidden border-[#333]">
            <div
              className={`relative w-full ${
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
                  className="w-full py-3 pl-4 pr-10 rounded-[8px] bg-gray-100 border border-gray-200 text-gray-800 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500">
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
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-[8px] shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
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

          {/* Action Buttons - NICHE */}
          <div className="px-4 py-4 border-b border-[#333] space-y-3">
            <Link
              href="/partner"
              onClick={closeMobileMenu}
              className="block bg-orange-500 border border-orange-500 text-white py-3 px-5 rounded-[8px] hover:bg-orange-600 transform hover:scale-105 transition-all text-sm tracking-[1] text-center">
              BECOME A PARTNER
            </Link>
            <Link
              href="https://partner.markvisitor.com/"
              onClick={closeMobileMenu}
              className="block border border-orange-500 text-orange-500 text-center  py-3 px-5  rounded-[8px] hover:bg-orange-50 transform hover:scale-105 transition-all text-sm font-light tracking-[1]">
              PARTNER LOG IN
            </Link>
            <Link
              href="/pay"
              onClick={closeMobileMenu}
              className="block bg-yellow-500 border border-yellow-500 text-black text-center  py-3 px-5  rounded-[8px] hover:bg-yellow-400 transform hover:scale-105 transition-all text-sm font-light tracking-[1]">
              PAY ONLINE
            </Link>
          </div>

          {/* App Links - SABSE NICHE */}
          <div className="px-4 py-4 space-y-3">
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
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-500"
          onClick={closeMobileMenu}
        />
      )}
    </header>
  );
};

export default Header;
