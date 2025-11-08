"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import Card from "@/components/products/Card";
import AdvancedBreadcrumb from "@/components/common/Bredacrumb";
import { getProductByCategorySlug } from "@/services/productService";

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

type Category = {
  id: string;
  name: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  description?: string;
  products: Product[];
};

export default function CategoryClient({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Load category data
  const loadCategory = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getProductByCategorySlug(slug as string);


      if (res.success && res.data.length > 0) {
        setCategory(res.data[0]);
      } else {
        setError("Category not found");
      }
    } catch (err) {
      console.error("Error fetching category:", err);
      setError("Failed to load category");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial fetch
  useEffect(() => {
    if (slug) {
      loadCategory();
    }
  }, [slug]);

  

  if (loading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-6 py-12 bg-white text-center">
          Loading category... 
        </div>
      </Layout>
    );
  }

  if (error || !category) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: category.name, href: `/products/category/${slug}` },
  ];

  return (
    <Layout>
      <AdvancedBreadcrumb items={breadcrumbItems} />
      <div className="max-w-6xl mx-auto px-6 py-12 bg-white">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-8 text-center">
          {category.name}
        </h1>

        {category.description && (
          <div className="text-justify text-gray-600 mb-8 mx-auto text-[14px] md:text-[16px]">
            {category.description}
          </div>
        )}

        {/* ✅ Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category.products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <Card
                it={{
                  name: product.title,
                  image: product.images[0]
                }}
              />
            </Link>
          ))}
        </div>

        {/* Agar koi product nahi hai */}
        {category.products.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No products found in this category.
          </div>
        )}
      </div>
    </Layout>
  );
}