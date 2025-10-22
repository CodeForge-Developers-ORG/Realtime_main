"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, you would implement search functionality here
      console.log('Searching for:', searchQuery);
      // Could redirect to search results page
      // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Toggle dropdown menu
  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  // Handle mouse enter for dropdown
  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  // Handle mouse leave for dropdown
  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Sample dropdown content
  const dropdownContent = {
    solutions: [
      { title: 'Home Security', href: '/solutions/home-security' },
      { title: 'Business Security', href: '/solutions/business-security' },
      { title: 'Access Control', href: '/solutions/access-control' },
      { title: 'Remote Monitoring', href: '/solutions/remote-monitoring' },
    ],
    products: [
      { title: 'Security Cameras', href: '/products/cameras' },
      { title: 'Door Locks', href: '/products/locks' },
      { title: 'Alarm Systems', href: '/products/alarms' },
      { title: 'Access Cards', href: '/products/access-cards' },
    ],
    software: [
      { title: 'Mobile Apps', href: '/software/mobile-apps' },
      { title: 'Management Systems', href: '/software/management' },
      { title: 'API Integration', href: '/software/api' },
      { title: 'Cloud Services', href: '/software/cloud' },
    ],
  };
  
  return (
    <header className="w-full bg-[#2B2B2B] z-50 shadow-sm ">
      {/* Main Navigation */}
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 xl:py-4 lg:py-3 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-105">
          <Image 
            src="/logo.png" 
            alt="Realtime Logo" 
            width={200} 
            height={100}
            className="h-10 sm:h-11 lg:h-12 xl:h-15 w-auto"
            priority
          />
        </Link>
        
        {/* Mobile Search Bar - Between Logo and Menu Button */}
        <form onSubmit={handleSearch} className="relative w-full max-w-[200px] md:hidden mx-2">
          <input
            type="text"
            placeholder="Search Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-1.5 pl-3 pr-8 rounded-[8px] bg-gray-100 border border-gray-200 text-gray-800 focus:outline-none focus:border-orange-500 transition-all duration-300 text-sm"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center md:space-x-3 lg:space-x-5 xl:space-x-8 xl:text-lg lg:text-md flex-wrap   sm:justify-between lg:justify-center" ref={dropdownRef}>
          <Link 
            href="/" 
            className={`${pathname === '/' ? 'text-orange-500' : 'text-white'} font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-500 after:transition-all after:duration-300`}
          >
            Home
          </Link>
          
          {/* Solutions Dropdown */}
          <div 
            className="relative group" 
            onMouseEnter={() => handleMouseEnter('solutions')} 
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className={`flex items-center text-white font-medium hover:text-orange-500 transition-colors duration-300 ${activeDropdown === 'solutions' ? 'text-orange-500' : ''}`}
            >
              Solutions
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ml-1 transition-transform duration-300 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'solutions' && (
              <div className="absolute top-6 md:left-auto md:right-0 lg:left-0 lg:right-auto mt-1 w-48 bg-[#222222] rounded-md shadow-lg py-2 z-50 animate-fadeIn max-h-[80vh] overflow-y-auto">
                {dropdownContent.solutions.map((item, index) => (
                  <Link 
                    key={index} 
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333333] hover:text-orange-500 transition-colors duration-200 whitespace-normal"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Products Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => handleMouseEnter('products')} 
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className={`flex items-center text-white font-medium hover:text-orange-500 transition-colors duration-300 ${activeDropdown === 'products' ? 'text-orange-500' : ''}`}
            >
              Products
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ml-1 transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'products' && (
               <div className="absolute top-6 md:left-auto md:right-0 lg:left-0 lg:right-auto mt-1 w-48 bg-[#222222] rounded-md shadow-lg py-2 z-50 animate-fadeIn max-h-[80vh] overflow-y-auto">
                 {dropdownContent.products.map((item, index) => (
                   <Link 
                     key={index} 
                     href={item.href}
                     className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333333] hover:text-orange-500 transition-colors duration-200 whitespace-normal"
                   >
                     {item.title}
                   </Link>
                 ))}
               </div>
             )}
          </div>
          
          {/* Software Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => handleMouseEnter('software')} 
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className={`flex items-center text-white font-medium hover:text-orange-500 transition-colors duration-300 ${activeDropdown === 'software' ? 'text-orange-500' : ''}`}
            >
              Software
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ml-1 transition-transform duration-300 ${activeDropdown === 'software' ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'software' && (
               <div className="absolute top-6 md:left-auto md:right-0 lg:left-0 lg:right-auto mt-1 w-48 bg-[#222222] rounded-md shadow-lg py-2 z-50 animate-fadeIn max-h-[80vh] overflow-y-auto">
                 {dropdownContent.software.map((item, index) => (
                   <Link 
                     key={index} 
                     href={item.href}
                     className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#333333] hover:text-orange-500 transition-colors duration-200 whitespace-normal"
                   >
                     {item.title}
                   </Link>
                 ))}
               </div>
             )}
          </div>
          
          <Link 
            href="/about" 
            className="text-white font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-500 after:transition-all after:duration-300"
          >
            About
          </Link>
          <Link 
            href="/blog" 
            className="text-white font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-500 after:transition-all after:duration-300"
          >
            Blog
          </Link>
          <Link 
            href="/support" 
            className="text-white font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-orange-500 after:transition-all after:duration-300"
          >
            Support
          </Link>
        </nav>

        {/* Mobile Menu Button - Visible only on mobile */}
        <button 
          className="md:hidden text-white hover:text-orange-500 p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* App Links - Hidden on mobile, responsive on tablets and desktop */}
        <div className="hidden md:flex md:flex-col lg:flex-row md:space-y-2 lg:space-y-0 lg:space-x-2 xl:space-x-4">
          <Link 
            href="/smart-app" 
            className="lg:flex lg:items-center bg-[#1C1310] border-2 md:hidden lg:block border-[#4F423D] text-white text-xs md:px-3 lg:px-4 xl:px-6 md:py-2 xl:py-3 rounded-xl transition-transform hover:scale-105 duration-300"
          >
            <Image src="/images/gplay.png" alt="App Icon" width={25} height={25} className="h-4 w-4 lg:h-5 lg:w-5 xl:h-7 xl:w-7" />
            <div className="ml-1 md:ml-2">
              <div className="text-[10px] lg:text-xs xl:text-[12px]">REALTIME MOBILE</div>
              <div className="font-bold text-[11px] md:text-sm">SMART APP</div>
            </div>
          </Link>
          <Link 
            href="/attendance-app" 
            className="lg:items-center bg-[#1C1310] md:hidden lg:flex border-2 border-[#4F423D] text-white text-xs md:px-3 lg:px-3 xl:px-3 md:py-2 xl:py-2 rounded-xl transition-transform hover:scale-105 duration-300"
          >
            <Image src="/images/gplay.png" alt="App Icon" width={25} height={25} className="h-4 w-4 lg:h-5 lg:w-5 xl:h-5 xl:w-5" />
            <div className="ml-1 md:ml-2">
              <div className="text-[10px] lg:text-xs xl:text-[12px]">REALTIME MOBILE</div>
              <div className="font-bold text-[11px] md:text-sm text-orange-500">ATTENDANCE APP</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu - Shown only on mobile */}
      <div className={`md:hidden bg-[#222222] ${mobileMenuOpen ? 'block animate-slideDown' : 'hidden'}`}>
        <nav className="px-4 pt-2 pb-4 space-y-2 max-h-[80vh] overflow-y-auto">
          <Link 
            href="/" 
            className={`block py-2 px-4 rounded ${pathname === '/' ? 'text-orange-500 bg-[#333333]' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          
          {/* Mobile Solutions */}
          <div className="py-1">
            <button 
              onClick={() => toggleDropdown('mobile-solutions')}
              className="flex items-center justify-between w-full py-2 px-4 text-left text-white rounded hover:bg-[#333333] transition-colors"
            >
              <span>Solutions</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === 'mobile-solutions' ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'mobile-solutions' && (
              <div className="pl-6 mt-1 space-y-1 animate-fadeIn">
                {dropdownContent.solutions.map((item, index) => (
                  <Link 
                    key={index} 
                    href={item.href}
                    className="block py-1 px-4 text-sm text-gray-300 hover:text-orange-500 hover:bg-[#333333] transition-colors rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Mobile Products */}
          <div className="py-1">
            <button 
              onClick={() => toggleDropdown('mobile-products')}
              className="flex items-center justify-between w-full py-2 px-4 text-left text-white rounded hover:bg-[#333333] transition-colors"
            >
              <span>Products</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === 'mobile-products' ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'mobile-products' && (
              <div className="pl-6 mt-1 space-y-1 animate-fadeIn">
                {dropdownContent.products.map((item, index) => (
                  <Link 
                    key={index} 
                    href={item.href}
                    className="block py-1 px-4 text-sm text-gray-300 hover:text-orange-500 hover:bg-[#333333] transition-colors rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Mobile Software */}
          <div className="py-1">
            <button 
              onClick={() => toggleDropdown('mobile-software')}
              className="flex items-center justify-between w-full py-2 px-4 text-left text-white rounded hover:bg-[#333333] transition-colors"
            >
              <span>Software</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === 'mobile-software' ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeDropdown === 'mobile-software' && (
              <div className="pl-6 mt-1 space-y-1 animate-fadeIn">
                {dropdownContent.software.map((item, index) => (
                  <Link 
                    key={index} 
                    href={item.href}
                    className="block py-1 px-4 text-sm text-gray-300 hover:text-orange-500 hover:bg-[#333333] transition-colors rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Other mobile menu items */}
          <Link 
            href="/about" 
            className="block py-2 px-4 text-white rounded hover:bg-[#333333] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/blog" 
            className="block py-2 px-4 text-white rounded hover:bg-[#333333] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link 
            href="/support" 
            className="block py-2 px-4 text-white rounded hover:bg-[#333333] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Support
          </Link>
          
          {/* Mobile Search Bar */}
          <div className="py-3 px-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-4 pr-10 rounded-[8px] bg-gray-100 border border-gray-200 text-gray-800 focus:outline-none focus:border-orange-500 transition-all duration-300"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
          
          {/* Action Buttons */}
          <div className="px-4 py-2 space-y-2">
            <Link 
              href="/become-dealer" 
              className="block w-full text-center py-2 px-4 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors duration-300"
            >
              BECOME A DEALER
            </Link>
            <Link 
              href="/login" 
              className="block w-full text-center py-2 px-4 border border-orange-500 text-orange-500 font-medium rounded-md hover:bg-orange-50 transition-colors duration-300"
            >
              PARTNER LOG IN
            </Link>
            <Link 
              href="/pay" 
              className="block w-full text-center py-2 px-4 bg-yellow-500 border border-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400 transition-colors duration-300"
            >
              PAY ONLINE
            </Link>
          </div>
          
          {/* Mobile App Links */}
          <div className="pt-2 space-y-2 px-4">
            <Link 
              href="/smart-app" 
              className="flex items-center bg-[#1C1310] border-2 border-[#4F423D] text-white text-xs px-4 py-2 rounded-xl transition-all hover:bg-[#2a201e] duration-300 w-full"
            >
              <Image src="/images/gplay.png" alt="App Icon" width={25} height={25} className="h-5 w-5" />
              <div className="ml-2">
                <div className="text-xs">REALTIME MOBILE</div>
                <div className="font-bold">SMART APP</div>
              </div>
            </Link>
            <Link 
              href="/attendance-app" 
              className="flex items-center bg-[#1C1310] border-2 border-[#4F423D] text-white text-xs px-4 py-2 rounded-xl transition-all hover:bg-[#2a201e] duration-300 w-full"
            >
              <Image src="/images/gplay.png" alt="App Icon" width={25} height={25} className="h-5 w-5" />
              <div className="ml-2">
                <div className="text-xs">REALTIME MOBILE</div>
                <div className="font-bold text-orange-500">ATTENDANCE APP</div>
              </div>
            </Link>
          </div>
        </nav>
      </div>

      {/* Search and Action Bar - Only visible on desktop */}
      <div className="bg-white py-3 hidden md:block">
        <div className="lg:container mx-auto px-4 flex items-center justify-between">
          {/* Search Bar - Desktop Only */}
          <form onSubmit={handleSearch} className="relative sm:w-70 lg:w-96">
            <input
              type="text"
              placeholder="Search Products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-4 pr-10 rounded-[8px] bg-gray-100 border border-gray-200 text-gray-800 focus:outline-none focus:border-orange-500 transition-all duration-300"
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
          
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Link   
              href="/become-dealer" 
              className="bg-orange-500 border border-orange-500 text-white py-2 px-2 lg:px-6 rounded-[8px] hover:bg-orange-600 transform hover:-translate-y-0.5 transition-all duration-300 text-sm lg:text-md font-light tracking-[1] flex items-center justify-center h-full"
            >
              BECOME A DEALER
            </Link>
            <Link 
              href="/login" 
              className="border border-orange-500 text-orange-500 text-center py-2 px-2 lg:px-6 rounded-[8px] hover:bg-orange-50 transform hover:-translate-y-0.5 transition-all duration-300 text-sm lg:text-md font-light tracking-[1] flex items-center justify-center h-full"
            >
              PARTNER LOG IN
            </Link>
            <Link 
              href="/pay" 
              className="bg-yellow-500 border border-yellow-500 text-black text-center py-2 px-2 lg:px-6 rounded-[8px] hover:bg-yellow-400 transform hover:-translate-y-0.5 transition-all duration-300 text-sm lg:text-md font-light tracking-[1] flex items-center justify-center h-full"
            >
              PAY ONLINE
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;