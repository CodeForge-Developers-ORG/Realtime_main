"use client";
import React, { useEffect, useRef } from "react";
import type { Category } from "./CatalogClient";
import Card from "./Card";
import Link from "next/link";

export default function SectionList({
  categories,
  activeIndex,
  onActiveChange,
}: {
  categories: Category[];
  activeIndex: number;
  onActiveChange: (i: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Listen to sidebar click custom event
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const idx = detail?.index;
      if (typeof idx === "number") {
        const el = sectionRefs.current[idx];
        if (el && containerRef.current) {
          const topOffset =
            el.getBoundingClientRect().top +
            window.scrollY -
            (containerRef.current.offsetTop ?? 0) -
            8; // small padding
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
      }
    };
    window.addEventListener("scroll-to-section", handler as EventListener);
    return () =>
      window.removeEventListener("scroll-to-section", handler as EventListener);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-idx");
            if (id) onActiveChange(Number(id));
          }
        });
      },
      {
        root: null, // observe relative to viewport
        threshold: [0.15, 0.5, 0.9],
      }
    );

    categories.forEach((_, i) => {
      const el = sectionRefs.current[i];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories, onActiveChange]);

  return (
    <div ref={containerRef} className="pr-4">
      {categories.map((cat, i) => (
        <div
          key={cat.title}
          data-idx={i}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          className="mb-10 p-4 rounded-lg border border-gray-200 bg-white">
          <h3 className="text-2xl text-black font-medium mb-4">{cat.title}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cat.items.map((it) => (
              // eslint-disable-next-line react/jsx-key
              <Link key={it.id} href={`/products/${it?.slug}`}>
                <Card it={it} />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
