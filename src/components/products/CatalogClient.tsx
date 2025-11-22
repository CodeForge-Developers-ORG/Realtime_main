"use client";

import { useEffect, useState, useRef } from "react";
import SectionList from "./SectionList";
import Sidebar from "./Sidebar";
import { getProducts, getAllCategoriesWithOrder } from "@/services/productService";

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
  const [categoryOrderMap, setCategoryOrderMap] = useState<Record<string, number>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [scrollYBeforeLoad, setScrollYBeforeLoad] = useState(0);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastScrollY = useRef(0);

  // Fetch category sort order map
  useEffect(() => {
    const fetchCategoriesOrder = async () => {
      try {
        const res = await getAllCategoriesWithOrder();
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        const map: Record<string, number> = {};
        list.forEach((c: any) => {
          const name = (c?.name || c?.title || "").trim();
          const slug = (c?.slug || "").trim();
          const orderRaw = c?.order ?? c?.sort_order ?? c?.sort ?? 0;
          const order = typeof orderRaw === "string" ? parseInt(orderRaw, 10) : Number(orderRaw) || 0;
          if (name) map[name] = order;
          if (slug) map[slug] = order;
        });
        setCategoryOrderMap(map);
      } catch (err) {
        console.error("Error fetching category order:", err);
      }
    };
    fetchCategoriesOrder();
  }, []);

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

  // Sort categories by order: ascending, with 0 at the end
  const sortedCategories: Category[] = [...groupedCategories].sort((a, b) => {
    const ao = categoryOrderMap[a.title] ?? 0;
    const bo = categoryOrderMap[b.title] ?? 0;
    if (ao === 0 && bo === 0) return a.title.localeCompare(b.title);
    if (ao === 0) return 1;
    if (bo === 0) return -1;
    return ao - bo;
  });

  return (
    <div className="flex gap-6 bg-white mt-0 pt-0 px-4 pb-4 md:pt-0 md:px-8 md:pb-8 lg:pt-0 lg:px-[100px] lg:pb-[100px]">
      {/* Sidebar */}
      <aside className="w-64 hidden lg:block sticky top-24 h-[calc(100vh-100px)] overflow-y-auto">
        <Sidebar
          categories={sortedCategories}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      </aside>

      {/* SectionList */}
      <section className="flex-1">
        <SectionList
          categories={sortedCategories}
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
