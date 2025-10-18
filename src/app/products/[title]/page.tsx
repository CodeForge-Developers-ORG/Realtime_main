"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CTAButton from "@/components/common/CTAButton";
import FeaturePill from "@/components/common/FeaturePill";
import ProductImage from "@/components/common/ProductImage";
import SpecsTable from "@/components/products/productdetail/SpecsTable";
import Testimonials from "@/components/sections/Testimonials";

type ProductItem = {
  id: string;
  name: string;
  image: string;
  features?: string[];
  specifications?: {
    faceCapacity?: number;
    fingerprintCapacity?: number;
    passwordCapacity?: number;
    identifyMode?: string;
    display?: string;
  };
  buttons?: {
    viewDemo?: boolean;
    downloadCatalogue?: boolean;
  };
};

type ProductCategory = {
  title: string;
  items: ProductItem[];
};

export default function ProductPageClient() {
  const router = useRouter();
  const params = useParams(); // dynamic route params
  const [products, setProducts] = useState<ProductCategory[] | null>(null);
  const [product, setProduct] = useState<ProductCategory | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/categories")
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        setProducts(json);
        setProduct({
          title: "Realtime T501 Mini",
          items: [
            {
              id: "t501-mini",
              name: "Realtime T501 Mini",
              image:
                "https://realtimebiometrics.com/upload/2805220119_RS%209n.png",
              features: [
                "Face Recognition",
                "Fingerprint",
                "RF Card",
                "Password",
                "TCP/IP",
                "USB Disk",
                "Access Control",
                "Battery Backup",
              ],
              specifications: {
                faceCapacity: 5000,
                fingerprintCapacity: 5000,
                passwordCapacity: 5000,
                identifyMode:
                  "Face, Fingerprint, Card, Password and Combination",
                display: 'Color Scene 3.0" Inch',
              },
              buttons: {
                viewDemo: true,
                downloadCatalogue: true,
              },
            },
          ],
        });
      })
      .catch((err) => console.error(err));

    return () => {
      mounted = false;
    };
  }, [params?.title]);

  if (!products) return <div className="text-center py-20">Loading...</div>;
  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-6 py-25">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 items-start">
          {/* Left - Main Image */}
          <div>
            <ProductImage
              src={product?.items[0]?.image}
              alt={product.items[0].name}
            />
          </div>

          {/* Right - Content */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <CTAButton variant="primary">▶ VIEW DEMO</CTAButton>
              <CTAButton variant="yellow">⬇ DOWNLOAD CATALOGUE</CTAButton>
            </div>
            <div className="bg-[#F7F7F7]  rounded-[24px]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 border-b border-[#DDDDDD] pb-6 p-3">
                {product.items[0].features?.map((feature, idx) => (
                  <FeaturePill key={idx} label={feature} />
                ))}
              </div>

              <div className="p-3">
                <h3 className="text-gray-800 font-semibold mb-4">
                  Specifications
                </h3>
                <SpecsTable
                  specs={
                    product.items[0]?.specifications
                      ? Object.entries(product.items[0].specifications).map(
                          ([key, value]) => ({
                            key,
                            value,
                          })
                        )
                      : []
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
    </div>
  );
}
