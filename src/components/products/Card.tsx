"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { baseUri } from "@/services/constant";

const Card = ({ it }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${it?.slug}`);
  };

  return (
    <div
      className="bg-gray-50 rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition"
      onClick={handleClick}>
      <div className="bg-white rounded-lg p-0 flex items-center justify-center h-40">
        <img
          src={`${baseUri}${it?.image}`}
          alt={name}
          className="max-h-full object-contain"
        />
      </div>
      <div className="mt-3 text-black text-center font-medium">{it?.name}</div>
    </div>
  );
};

export default Card;
