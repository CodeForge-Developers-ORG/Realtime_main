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
  const [scrollYBeforeLoad, setScrollYBeforeLoad] = useState(0);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastScrollY = useRef(0);

  // Load products (paginated)
  const loadProducts = async (pageNum: number) => {
    try {
      // Record current scroll before loading
      setScrollYBeforeLoad(window.scrollY);
      setLoading(true);
      const res = await getProducts(pageNum);

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
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
      // Restore scroll position (prevent jump)
      setTimeout(() => window.scrollTo(0, scrollYBeforeLoad), 50);
    }
  };

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  // Infinite scroll observer
  useEffect(() => {
    const node = loaderRef.current;
    if (!node || !hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    let lastTrigger = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        const now = Date.now();

        // Prevent trigger if scrolling up
        const isScrollingDown = window.scrollY > lastScrollY.current;
        lastScrollY.current = window.scrollY;

        if (
          first.isIntersecting &&
          hasMore &&
          !loading &&
          isScrollingDown &&
          now - lastTrigger > 800 // throttle 800ms
        ) {
          lastTrigger = now;
          observer.unobserve(node);
          setTimeout(() => setPage((prev) => prev + 1), 300);
        }
      },
      { threshold: 1, rootMargin: "150px" }
    );

    observer.observe(node);
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [hasMore, loading]);

  // Group products by category
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

  return (
    <div className="flex gap-6 bg-white p-4 md:p-8 lg:p-[100px]">
      {/* Sidebar */}
      <aside className="w-64 hidden lg:block sticky top-24 h-[calc(100vh-100px)] overflow-y-auto">
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
