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
  products: Product[];
};

const ProductsMegaMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/content/products");
        const data = await response.data;
        if (data.success) {
          // Organize products by category
          const categoriesMap = new Map();

          data.data.forEach((product: Product) => {
            const category = product.category;
            if (!categoriesMap.has(category.id)) {
              categoriesMap.set(category.id, {
                ...category,
                products: [],
              });
            }
            categoriesMap.get(category.id).products.push(product);
          });

          const categoriesArray = Array.from(categoriesMap.values());
          setCategories(categoriesArray);

          // Set first category as active
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

    fetchProducts();
  }, []);

  // Get active category data
  const activeCategoryData = categories.find(
    (cat) => cat.id === activeCategory
  );
  const activeProducts = activeCategoryData?.products || [];
  const baseUrl = "https://app.realtimebiometrics.net";

  if (loading) {
    return (
      <div className="absolute left-0 mt-3 w-96 bg-[#2B2B2B] border border-gray-700 rounded-lg shadow-xl z-50">
        <div className="p-4">
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute md:-left-50 lg:left-0 mt-3 w-[800px] bg-[#2B2B2B] border border-gray-700 rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      <div className="p-4">
        <div className="flex gap-4">
          {/* Left Sidebar - Categories */}
          <div className="w-48 flex-shrink-0">
            <h3 className="text-sm font-semibold text-white mb-3 pb-2 border-b border-gray-700">
              CATEGORIES
            </h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`p-2 rounded-md cursor-pointer transition-all duration-200 text-sm ${
                    activeCategory === category.id
                      ? "bg-orange-500 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onMouseEnter={() => setActiveCategory(category.id)}>
                  <div className="font-medium">{category.name}</div>
                  {category.parent && (
                    <div className="text-xs opacity-75 mt-1">
                      in {category.parent.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Products */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-white">
                {activeCategoryData?.name}
              </h3>
              <span className="text-xs text-gray-400 bg-[#424141] px-2 py-1 rounded">
                {activeProducts.length} products
              </span>
            </div>

            {activeProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {activeProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group bg-[#424141] rounded-lg p-3 hover:bg-gray-750 transition-all duration-200 border border-gray-700 hover:border-orange-500/50">
                    <div className="flex gap-3">
                      {/* Product Image */}
                      {product.images && product.images.length > 0 ? (
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gray-700 rounded-md overflow-hidden relative">
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
                          <div className="w-16 h-16 bg-gray-700 rounded-md flex items-center justify-center">
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
                        <h4 className="font-semibold text-white text-sm mb-1 line-clamp-1 group-hover:text-orange-400 transition-colors">
                          {product.title}
                        </h4>

                        <p className="text-gray-400 text-xs line-clamp-2">
                          {product.description.replace(/<[^>]*>/g, "")}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
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
                <p className="text-gray-500 text-sm">
                  No products in this category
                </p>
              </div>
            )}

            {/* View All Button */}
            {activeProducts.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-700">
                <Link
                  href={`/products`}
                  className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors flex items-center justify-center gap-1">
                  View all in products
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
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default ProductsMegaMenu;
