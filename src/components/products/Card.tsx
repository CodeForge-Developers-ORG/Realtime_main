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

const Card: React.FC<CardProps> = ({ it }) => {
  return (
    <div className="bg-gray-50 rounded-md md:rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition">
      <div className="bg-white rounded-lg p-0 flex items-center justify-center h-30 md:h-40 relative">
        <Image
          src={`${baseUri}${it?.image ?? ""}`}
          alt={it?.name ?? ""}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <div className="mt-3 text-black text-center font-base md:font-medium line-clamp-1">{it?.name}</div>
    </div>
  );
};

export default Card;
