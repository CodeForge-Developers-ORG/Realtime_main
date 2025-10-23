"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FloatingButtons = () => {
  return (
    <div className="hidden md:flex fixed right-10 bottom-25 z-50 flex-col gap-4">
      {/* WhatsApp Button */}
      <Link 
        href="https://wa.me/918860886086"
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center w-18 h-18 bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <div className="relative w-14 h-14">
          <Image 
            src="/watsapp.png" 
            alt="WhatsApp" 
            fill
            className="object-contain"
          />
        </div>
      </Link>

      {/* Ask RIA Button */}
      <Link 
        href="phone:8860886086" 
        className="flex items-center justify-center px-7 py-3 bg-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        aria-label="Ask RIA"
      >
        <div className="relative w-12 h-12 mr-3">
          <Image 
            src="/ria.png" 
            alt="RIA" 
            fill
            className="object-contain"
          />
        </div>
        <span className="text-orange-500 font-bold text-xl">ASK RIA</span>
      </Link>
    </div>
  );
};

export default FloatingButtons;