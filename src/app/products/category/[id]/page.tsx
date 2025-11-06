"use client";

import React, { useEffect, useState, useRef } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import Card from "@/components/products/Card";
import AdvancedBreadcrumb from "@/components/common/Bredacrumb";

// 🔹 Types
type Product = {
  id: string;
  title: string;
  description: string;
  slug: string;
  images: string[];
  features: string[];
  category: {
    name: string;
    id: string;
    slug: string;
  };
};

// 🔹 Fetch function
async function getProductsByCategory(categoryId: string, page = 1) {
  const res = await fetch(
    `https://app.realtimebiometrics.net/api/content/products?category_id=${categoryId}&page=${page}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data;
}

export default function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Load paginated data
  const loadProducts = async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await getProductsByCategory(id as string, pageNum);
      const newProducts: Product[] = res?.data || [];

      if (newProducts.length > 0) {
        setProducts((prev) => {
          const merged = [...prev, ...newProducts];
          // remove duplicates by ID
          return Array.from(new Map(merged.map((p) => [p.id, p])).values());
        });
        setHasMore(res.meta.current_page < res.meta.last_page);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial fetch
  useEffect(() => {
    setProducts([]);
    setPage(1);
    loadProducts(1);
  }, [id]);

  // 🔹 Fetch next pages
  useEffect(() => {
    if (page > 1) loadProducts(page);
  }, [page]);

  // 🔹 Infinite Scroll observer
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

  if (!loading && products.length === 0) {
    notFound();
  }

  const categoryName = products[0]?.category?.name || "Products";
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: products[0]?.category?.name || "Category", href: `/products/category/${id}` },
  ];
  return (
    <Layout>
      <AdvancedBreadcrumb items={breadcrumbItems} />
      <div className="max-w-6xl mx-auto px-6 py-12 bg-white">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8 text-center">
          {categoryName}
        </h1>

        {/* ✅ Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((it) => (
            <Link key={it.id} href={`/products/${it.slug}`}>
              <Card
                it={{
                  name: it.title,
                  image: it.images?.[0] || "/no-image.jpg",
                }}
              />
            </Link>
          ))}
        </div>

        {/* Loader for infinite scroll */}
        {loading && (
          <div className="text-center py-6 text-gray-500 text-sm">
            Loading products...
          </div>
        )}
        <div ref={loaderRef} className="h-10" />
      </div>
    </Layout>
  );
}
