"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import axiosClient from "@/services/axiosClient";

type ChildItem = {
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
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
};

type HeaderData = {
  settings?: {
    show_search_in_header?: boolean;
    [key: string]: unknown;
  };
  branding: Branding;
  navigation: NavItem[];
  custom_css?: string;
  scripts?: {
    header_scripts?: string;
  };
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch API data using axiosClient
  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const response = await axiosClient.get("/site/header");
        setHeaderData(response.data.data);
      } catch (err) {
        console.error("Error fetching header:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeader();
  }, []);

  // Debounced search function
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await axiosClient.get<SearchResponse>(
        `/content/products?search=${encodeURIComponent(query)}`
      );

      if (response.data.success) {
        setSearchResults(response.data.data);
        setShowSearchDropdown(response.data.data.length > 0);
      }
    } catch (err) {
      console.error("Error searching products:", err);
      setSearchError("Failed to search products");
      setSearchResults([]);
      setShowSearchDropdown(false);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounce search input
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(searchQuery);
      }, 300); // 300ms debounce
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
      setIsSearching(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, performSearch]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close navigation dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }

      // Close search dropdown
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Inject Custom CSS dynamically
  useEffect(() => {
    if (!headerData?.custom_css) return;
    const styleTag = document.createElement("style");
    styleTag.innerHTML = headerData.custom_css;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, [headerData?.custom_css]);

  // Inject Header Scripts dynamically
  useEffect(() => {
    if (!headerData?.scripts?.header_scripts) return;
    const scriptTag = document.createElement("script");
    scriptTag.innerHTML = headerData.scripts.header_scripts;
    document.head.appendChild(scriptTag);
    return () => {
      document.head.removeChild(scriptTag);
    };
  }, [headerData?.scripts?.header_scripts]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
    }
  };

  // Handle product selection from search results
  const handleProductSelect = (product: Product) => {
    router.push(`/products/${product.slug}`);
    // setSearchQuery(product.title);
    // setShowSearchDropdown(false);
  };

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  if (loading) {
    return (
      <div className="bg-[#2B2B2B] text-white text-center py-4">
        Loading header...
      </div>
    );
  }

  if (!headerData) {
    return (
      <div className="bg-[#2B2B2B] text-white text-center py-4">
        Failed to load header
      </div>
    );
  }

  const { branding, navigation } = headerData;

  return (
    <header className="w-full bg-[#2B2B2B] text-white z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-transform duration-300 hover:scale-105">
          <img
            src={branding?.logo_url || "/logo.png"}
            alt={branding?.site_title || "Logo"}
            width={180}
            height={60}
            className="h-auto w-auto"
            // priority
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
                  className={`relative font-[600] text-[14px] hover:text-orange-500 ${
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
                      className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:rotate-180"
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

                  {/* Dropdown on hover */}
                  {item.children?.length ? (
                    <div className="absolute left-0 mt-2 w-48 bg-[#222] rounded-md shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                      {item.children.map((child, idx) => (
                        <Link
                          key={idx}
                          href={child.url}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333] hover:text-orange-500">
                          {child.title || "Untitled"}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            return null;
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-transform duration-300 ${
              mobileMenuOpen ? "rotate-90" : ""
            }`}
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

        {/* Mobile App Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/smart-app"
            className="flex items-center bg-[#1C1310] border-2 border-[#4F423D] text-white text-xs px-6 py-3 rounded-xl transition-transform hover:scale-105 duration-300">
            <Image
              src="/images/gplay.png"
              alt="App Icon"
              width={25}
              height={25}
              className="h-7 w-7"
            />
            <div className="ml-2">
              <div className="text-[12px]">REALTIME MOBILE</div>
              <div className="font-bold">SMART APP</div>
            </div>
          </Link>
          <Link
            href="/attendance-app"
            className="flex items-center bg-[#1C1310] border-2 border-[#4F423D] text-white text-xs px-6 py-3 rounded-xl transition-transform hover:scale-105 duration-300">
            <Image
              src="/images/gplay.png"
              alt="App Icon"
              width={25}
              height={25}
              className="h-7 w-7"
            />
            <div className="ml-2">
              <div className="text-[12px]">REALTIME MOBILE</div>
              <div className="font-bold text-orange-500">ATTENDANCE APP</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#222] px-4 py-3 space-y-2">
          {navigation.map((item, index) => {
            if (item.type === "single") {
              return (
                <Link
                  key={index}
                  href={item.url}
                  className="block text-white py-2"
                  onClick={() => setMobileMenuOpen(false)}>
                  {item.title}
                </Link>
              );
            }

            if (item.type === "dropdown") {
              return (
                <div key={index}>
                  <button
                    onClick={() => toggleDropdown(item.title || "")}
                    className="flex justify-between items-center w-full text-left text-white py-2">
                    {item.title}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform ${
                        activeDropdown === item.title ? "rotate-180" : ""
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
                  {activeDropdown === item.title && item.children?.length ? (
                    <div className="pl-6 space-y-1">
                      {item.children.map((child, idx) => (
                        <Link
                          key={idx}
                          href={child.url}
                          className="block text-gray-300 text-sm py-1 hover:text-orange-500"
                          onClick={() => setMobileMenuOpen(false)}>
                          {child.title || "Untitled"}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            return null;
          })}
        </div>
      )}

      {/* Search and Action Bar */}
      <div className="bg-white py-3">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Search Bar with Dropdown */}
          <div
            ref={searchRef}
            className={`relative w-full md:w-96 mb-4 md:mb-0 ${
              headerData?.settings?.show_search_in_header
                ? ""
                : "opacity-0 pointer-events-none"
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
                className="w-full py-2 pl-4 pr-10 rounded-[8px] bg-gray-100 border border-gray-200 text-gray-800 focus:outline-none focus:border-orange-500 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors duration-300">
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

            {/* Search Results Dropdown */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-[8px] shadow-lg mt-1 max-h-80 overflow-y-auto z-50">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-2">Searching...</p>
                  </div>
                ) : searchError ? (
                  <div className="p-4 text-center text-red-500">
                    {searchError}
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductSelect(product)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-200">
                        <div className="flex items-center space-x-3">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={`http://64.227.165.108/storage/${product.images[0]}`}
                              alt={product.title}
                              className="w-10 h-10 object-cover rounded"
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

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <Link
              href="/partner"
              className="bg-orange-500 border border-orange-500 text-white py-2 px-6 rounded-[8px] hover:bg-orange-600 transform hover:-translate-y-0.5 transition-all duration-300 text-md font-light tracking-[1] flex items-center justify-center h-full">
              BECOME A PARTNER
            </Link>
            <Link
              href="https://partner.markvisitor.com/"
              className="border border-orange-500 text-orange-500 text-center py-2 px-6 rounded-[8px] hover:bg-orange-50 transform hover:-translate-y-0.5 transition-all duration-300 text-md font-light tracking-[1] flex items-center justify-center h-full">
              PARTNER LOG IN
            </Link>
            <Link
              href="/pay"
              className="bg-yellow-500 border border-yellow-500 text-black text-center py-2 px-6 rounded-[8px] hover:bg-yellow-400 transform hover:-translate-y-0.5 transition-all duration-300 text-md font-light tracking-[1] flex items-center justify-center h-full">
              PAY ONLINE
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
