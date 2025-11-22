"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSolutions } from "@/services/solutionServices";
import { baseUri } from "@/services/constant";

type SolutionItem = {
  title: string;
  description?: string;
  image?: string | null;
  featured_image?: string | null;
  slug?: string;
};

const SolutionsGrid: React.FC = () => {
  const [items, setItems] = useState<SolutionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const res = await getSolutions();
        setItems(res.data || []);
      } catch (err) {
        console.error("Error loading solutions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSolutions();
  }, []);

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center">
          <h2 className="section-title">Explore Our Solutions</h2>
        </div>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          Discover our end-to-end solutions for attendance, access, and security.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border border-gray-200 p-4 bg-white"
              >
                <div className="h-40 bg-gray-200 rounded-md mb-4" />
                <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            {items.map((item, idx) => {
              const src = item.image || item.featured_image
                ? `${baseUri}${item.image || item.featured_image}`
                : null;
              return (
                <Link
                  key={idx}
                  href={item.slug ? `/solutions/${item.slug}` : `/solutions`}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {src ? (
                    <div className="relative">
                      <Image
                        src={src}
                        alt={item.title}
                        width={800}
                        height={450}
                        unoptimized
                        className="w-full h-auto object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                  ) : (
                    <div className="h-48 md:h-60 bg-gray-100" />
                  )}

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#1E1410]">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                        {item.description}
                      </p>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[12px] text-gray-500">View details</span>
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-700 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black"
                        aria-hidden
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-4 h-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SolutionsGrid;