"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axiosClient from "@/services/axiosClient";

type Product = {
  id: string;
  title: string;
  description: string;
  slug: string;
  images: string[];
  category: {
    id: string;
    name: string;
    slug: string;
    parent_id: string | null;
    parent: {
      name: string;
      slug: string;
      id: string;
    } | null;
  };
};

type Category = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  parent: {
    name: string;
    slug: string;
    id: string;
  } | null;
  // Optional sort order if provided by API
  sort_order?: number;
  products: Product[];
};

// Minimal shape returned by categories endpoint used for sorting
type CategorySummary = {
  id: string | number;
  sort_order?: number;
};

type ApiResponse = {
  success: boolean;
  data: Product[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
};

const ProductsMegaMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from API with pagination
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        let allProducts: Product[] = [];
        let totalPages = 1;


        // Fetch first page to get total pages
        const firstResponse = await axiosClient.get("/content/products?per_page=100&page=1");
        const firstData: ApiResponse = firstResponse.data;


        if (firstData.success) {
          allProducts = [...firstData.data];
          totalPages = firstData.meta.last_page;

          // Fetch remaining pages if any
          const pagePromises = [];
          for (let page = 2; page <= totalPages; page++) {
            pagePromises.push(
              axiosClient.get(`/content/products?page=${page}`)
            );
          }

          if (pagePromises.length > 0) {
            const responses = await Promise.all(pagePromises);
            
            responses.forEach((response) => {
              const pageData: ApiResponse = response.data;
              if (pageData.success) {
                allProducts = [...allProducts, ...pageData.data];
              }
            });
          }


          // Organize products by category
          const categoriesMap = new Map();

          allProducts.forEach((product: Product) => {
            const category = product.category;
            if (!categoriesMap.has(category.id)) {
              categoriesMap.set(category.id, {
                ...category,
                products: [],
              });
            }
            categoriesMap.get(category.id).products.push(product);
          });

          let categoriesArray: Category[] = Array.from(categoriesMap.values());

          // Try to fetch category sort orders from API and sort accordingly
          try {
            const catRes = await axiosClient.get("/content/categories?all=true");
            const catPayload = catRes.data as { success: boolean; data: CategorySummary[] };
            if (catPayload?.success && Array.isArray(catPayload?.data)) {
              const orderMap = new Map<string, number>();
              catPayload.data.forEach((cat: CategorySummary) => {
                const id = String(cat.id);
                const orderVal = Number(cat.sort_order ?? Number.POSITIVE_INFINITY);
                orderMap.set(id, orderVal);
              });

              // Attach sort_order if known
              categoriesArray = categoriesArray.map((c) => ({
                ...c,
                sort_order: orderMap.get(String(c.id)) ?? c.sort_order,
              }));

              // Sort by sort_order ascending, fallback to name
              categoriesArray.sort((a, b) => {
                const normalize = (v: unknown) => {
                  const n = Number(v);
                  // Place 0 at the end; valid positive numbers come first
                  if (!isFinite(n) || n === 0) return Number.POSITIVE_INFINITY;
                  return n;
                };
                const sa = normalize(a?.sort_order);
                const sb = normalize(b?.sort_order);
                if (sa !== sb) return sa - sb;
                return String(a.name).localeCompare(String(b.name));
              });
            } else {
              // Fallback alphabetical sort by name when API not available
              categoriesArray.sort((a, b) => String(a.name).localeCompare(String(b.name)));
            }
          } catch {
            // Fallback alphabetical sort by name if categories endpoint fails
            categoriesArray.sort((a, b) => String(a.name).localeCompare(String(b.name)));
          }

          setCategories(categoriesArray);

          // Set first category as active after sorting
          if (categoriesArray.length > 0) {
            setActiveCategory(categoriesArray[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Get active category data
  const activeCategoryData = categories.find(
    (cat) => cat.id === activeCategory
  );
  
  // Show ALL products in the mega menu
  const displayedProducts = activeCategoryData?.products || [];
  const totalProductsInCategory = activeCategoryData?.products?.length || 0;
  
  const baseUrl = "https://app.realtimebiometrics.net";

  if (loading) {
    return (
      <div className="absolute left-0 mt-3 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
        <div className="p-4">
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            <span className="ml-2 text-gray-700 text-sm">Loading products...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute md:left-10 lg:left-0 mt-3 w-[100%] bg-white border border-gray-200 rounded-xl shadow-2xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300" style={{ fontFamily: 'var(--font-montserrat)' }}>
      <div className="p-4">
        <div className="flex gap-4">
          {/* Left Sidebar - Categories */}
          <div className="w-48 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
              CATEGORIES ({categories.length})
            </h3>
            <div className="space-y-1 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {categories.map((category) => (
                <Link 
                href={`/products/category/${category.slug}`}
                  key={category.id}
                  className={`p-2 rounded-md cursor-pointer transition-all duration-200 text-sm block ${
                    activeCategory === category.id
                      ? "bg-orange-500 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onMouseEnter={() => setActiveCategory(category.id)}>
                  <div className="font-medium">{category.name}</div>
                  <div className="text-xs opacity-75 mt-1 flex items-center gap-1 text-gray-500">
                    <span className={` ${
                    activeCategory === category.id
                      ? " text-white"
                      : "text-gray-600"
                  }`} >{category.products.length} products</span>
                    {category.parent && (
                      <span>• in {category.parent.name}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - Products */}
          <div className="flex-1 min-h-[400px]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-gray-900">
                {activeCategoryData?.name}
              </h3>
              <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                {totalProductsInCategory} products
              </span>
            </div>

            {displayedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                  {displayedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="group bg-white rounded-lg p-3 hover:bg-gray-50 transition-all duration-200 border border-gray-200 hover:border-orange-500/50">
                      <div className="flex gap-3">
                        {/* Product Image */}
                        {product.images && product.images.length > 0 ? (
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden relative border border-gray-200">
                              <Image
                                src={`${baseUrl}/storage/${product.images[0]}`}
                                alt={product.title}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center border border-gray-200">
                              <svg
                                className="w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          </div>
                        )}

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">
                            {product.title}
                          </h4>
                          <p className="text-gray-600 text-xs line-clamp-2">
                            {product.description.replace(/<[^>]*>/g, "")}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* View All Button - Always show when there are products */}
                {displayedProducts.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-200 absolute bottom-4 block w-[70%]">
                    <Link
                      href={`/products/category/${activeCategoryData?.slug}`}
                      className="text-orange-600 hover:text-orange-500 text-sm font-medium transition-colors flex items-center justify-center gap-1">
                      View all in Category
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm">
                  No products in this category
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #E5E7EB;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #9CA3AF;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProductsMegaMenu;