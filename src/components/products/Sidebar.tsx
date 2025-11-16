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
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✅ Keep active button visible inside sidebar scroll
  useEffect(() => {
    const activeBtn = btnRefs.current[activeIndex];
    const container = containerRef.current;
    if (activeBtn && container) {
      const btnRect = activeBtn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Check if active button is outside visible container area
      if (btnRect.top < containerRect.top || btnRect.bottom > containerRect.bottom) {
        activeBtn.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  return (
    <div className="sticky top-40">
      <div
        ref={containerRef}
        className="max-h-[calc(100vh-150px)] overflow-y-auto pr-2 space-y-3 no-scrollbar"
      >
        {categories.map((c, i) => (
          <button
            key={c.title}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
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
