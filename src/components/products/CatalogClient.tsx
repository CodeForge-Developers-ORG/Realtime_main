"use client";

import { useEffect, useState, useRef } from "react";
import SectionList from "./SectionList";
import Sidebar from "./Sidebar";
import { getProducts } from "@/services/productService";

export type Product = {
  slug: string;
  id: string;
  title: string;
  description: string;
  category: { name: string; slug: string };
  images: string[];
};

export type Category = {
  title: string;
  items: { id: string; name: string; image: string; slug: string }[];
};

export default function CatalogClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Load products (paginated)
  const loadProducts = async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await getProducts(pageNum);
      // const json = await res.json();
      if (res?.data?.length) {
        setProducts((prev) => {
          const merged = [...prev, ...res.data];
          return Array.from(new Map(merged.map((p) => [p.id, p])).values());
        });
        setHasMore(res.meta.current_page < res.meta.last_page);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  // Infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  // Group products by category for Sidebar + SectionList
  const groupedCategories: Category[] = Object.values(
    products.reduce((acc, p) => {
      const catName = p.category?.name || "Uncategorized";
      if (!acc[catName]) acc[catName] = { title: catName, items: [] };
      acc[catName].items.push({
        id: p.id,
        name: p.title,
        image: p.images?.[0] || "/no-image.jpg",
        slug: p?.slug || "",
      });
      return acc;
    }, {} as Record<string, Category>)
  );

  const isLastActive = activeIndex === groupedCategories.length - 1;

  return (
    <div
      className={`flex gap-6 bg-white p-4 md:p-8 lg:p-[100px] transition-all duration-300 ${
        isLastActive ? "sticky" : "sticky -top-20"
      }`}>
      {/* Sidebar */}
      <aside className="w-64 hidden lg:block">
        <Sidebar
          categories={groupedCategories}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      </aside>

      {/* SectionList */}
      <section className="flex-1">
        <SectionList
          categories={groupedCategories}
          activeIndex={activeIndex}
          onActiveChange={setActiveIndex}
        />

        {/* Loader for infinite scroll */}
        {loading && <div className="text-center py-4">Loading more...</div>}
        <div ref={loaderRef} className="h-10" />
      </section>
    </div>
  );
}
