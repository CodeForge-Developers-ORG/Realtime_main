"use client";

import React from "react";
import Image from "next/image";
import { baseUri } from "@/services/constant";

type Product = {
  image?: string | null;
  name?: string | null;
};

interface CardProps {
  it?: Product;
}

// Spotlight-style product card used on /products page
const Card: React.FC<CardProps> = ({ it }) => {
  return (
    <div className="group mx-1 md:mx-3 rounded-md bg-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative bg-gray-100 h-56 md:h-72 flex items-center justify-center p-6 rounded-xl">
        {it?.image ? (
          <Image
            src={`${baseUri}${it.image}`}
            alt={it?.name ?? "Product image"}
            width={0}
            height={0}
            unoptimized
            className="h-full max-h-[280px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 rounded-xl"
          />
        ) : (
          <div className="text-gray-400 text-xs">No image</div>
        )}
        <span className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white text-gray-700 ring-1 ring-gray-300 grid place-items-center shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 group-hover:text-orange-600 group-hover:ring-orange-500 group-hover:bg-orange-50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
          </svg>
        </span>
      </div>
      <div className="h-px w-full bg-gray-200" />
      <div className="p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-[#1E1410] mb-1 line-clamp-1">
          {it?.name}
        </h3>
        <div className="flex">
          <span className="inline-flex items-center justify-center w-full bg-orange-500 text-white rounded-lg py-2 text-sm font-medium transition-colors duration-300 group-hover:bg-orange-600">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
