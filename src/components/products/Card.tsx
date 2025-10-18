'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type CardProps = {
  name: string;
  image: string;
};

const Card: React.FC<CardProps> = ({ name, image }) => {
  const router = useRouter();

  const handleClick = () => {
    // Convert name to URL-friendly slug
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/products/${slug}`);
  };

  return (
    <div
      className="bg-gray-50 rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition"
      onClick={handleClick}
    >
      <div className="bg-white rounded-lg p-4 flex items-center justify-center h-40">
        <img src={image} alt={name} className="max-h-full object-contain" />
      </div>
      <div className="mt-3 text-center font-medium">{name}</div>
    </div>
  );
};

export default Card;
