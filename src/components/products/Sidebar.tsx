"use client";
import React, { useEffect, useRef } from "react";
import type { Category } from "./CatalogClient";

export default function Sidebar({
  categories,
  activeIndex,
  onSelect,
}: {
  categories: Category[];
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const btnRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  // Keep active button visible relative to viewport (parent scroll)
  useEffect(() => {
    const activeBtn = btnRefs.current[activeIndex];
    if (activeBtn) {
      const rect = activeBtn.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY;
      const offsetBottom = rect.bottom + window.scrollY;
      const viewTop = window.scrollY;
      const viewBottom = viewTop + window.innerHeight;

      if (offsetTop < viewTop || offsetBottom > viewBottom) {
        // Scroll window so button is visible
        window.scrollTo({
          top: offsetTop - 20, // 20px padding from top
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  return (
    <div className="sticky top-40">
      <div className="space-y-3">
        {categories.map((c, i) => (
          <button
            key={c.title}
            ref={(el) => { btnRefs.current[i] = el; }}
            className={`block w-full text-[16px] text-left px-4 py-3 rounded-lg transition-shadow hover:shadow-md ${
              activeIndex === i
                ? "bg-[#EFAF00] text-[#1E1410] font-[300]"
                : "bg-[#F6F6F6] text-[#1E1410] font-[300] cursor-pointer"
            }`}
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("scroll-to-section", { detail: { index: i } })
              );
              onSelect(i);
            }}
          >
            {c.title}
          </button>
        ))}
      </div>
    </div>
  );
}
