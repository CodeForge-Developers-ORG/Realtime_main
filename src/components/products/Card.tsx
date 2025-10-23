"use client";

import React from "react";
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
    <div className="bg-gray-50 rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition">
      <div className="bg-white rounded-lg p-0 flex items-center justify-center h-40">
        <img
          src={`${baseUri}${it?.image ?? ""}`}
          alt={it?.name ?? ""}
          className="max-h-full object-contain"
        />
      </div>
      <div className="mt-3 text-black text-center font-medium">{it?.name}</div>
    </div>
  );
};

export default Card;
