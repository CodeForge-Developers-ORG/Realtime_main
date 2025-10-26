"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FloatingButtons = () => {
  return (
    <div className="hidden md:flex fixed right-8 bottom-8 z-50 flex-col gap-4">
      {/* WhatsApp Button */}
      <Link 
        href="https://wa.me/918860886086"
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center w-18 h-18 bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <div className="relative w-13 h-13 flex items-center justify-center">
          <Image 
            src="/watsapp.png" 
            alt="WhatsApp" 
            height={50}
            width={50}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>

      {/* Ask RIA Button */}
      {/* <Link 
        href="phone:8860886086" 
        className="flex items-center justify-center px-7 py-3 bg-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        aria-label="Ask RIA"
      >
        <div className="relative w-12 h-12 mr-3">
          <Image 
            src="/ria.png" 
            alt="RIA" 
            height={40}
            width={40}
            className="h-auto w-auto object-contain"
          />
        </div>
        <span className="text-orange-500 font-bold text-xl">ASK RIA</span>
      </Link> */}
    </div>
  );
};

export default FloatingButtons;