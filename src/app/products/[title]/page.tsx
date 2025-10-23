// app/products/[title]/page.tsx
import { baseUri } from "@/services/constant";
import { getProductBySlug } from "@/services/productService";
import Layout from "@/components/layout/Layout";
import CTAButton from "@/components/common/CTAButton";
import FeaturePill from "@/components/common/FeaturePill";
import ProductImage from "@/components/common/ProductImage";
import SpecsTable from "@/components/products/productdetail/SpecsTable";
import Testimonials from "@/components/sections/Testimonials";
import { ArrowDownToLine, Play } from "lucide-react";
import DownloadCatalogueButton from "./DownloadCatalogueButton";
import Link from "next/link";

type ProductCategory = {
  title: string;
  images: string[];
  features: string[];
  specifications: Record<string, string | number>;
  meta_title?: string;
  meta_description?: string;
  catalogue_document?: string;
};

// ✅ Next.js 13+ SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { title: string };
}) {
  const res = await getProductBySlug(params.title);
  const product: ProductCategory | null = res?.data?.[0] || null;

  if (!product) {
    return {
      title: "Product Not Found",
      description: "Product not found in our catalog.",
    };
  }

  return {
    title: product.meta_title || product.title,
    description: product.meta_description || product.title,
  };
}

// ✅ Page component (Server)
export default async function ProductPage({
  params,
}: {
  params: { title: string };
}) {
  const res = await getProductBySlug(params.title);
  const product: ProductCategory | null = res?.data?.[0] || null;

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-20 text-gray-600">
          Product not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-25">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 items-start">
            {/* Left - Image */}
            <div>
              <ProductImage
                src={`${baseUri}${product.images[0]}`}
                alt={product.title}
              />
            </div>

            {/* Right - Content */}
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <Link href={"/support"} className="bg-[#EA5921] text-white hover:bg-orange-600 inline-flex items-center gap-2 text-[12px] lg:text-[16px] px-2 lg:px-4 py-2 rounded-md font-[400] shadow-sm transition cursor-pointer" >
                  <span className="border rounded-full w-[20px] h-[20px] flex items-center justify-center">
                    <Play className="w-[10px]" />
                  </span>{" "}
                  VIEW DEMO
                </Link>

                {/* Client component for download */}
                <DownloadCatalogueButton
                  productTitle={product.title}
                  catalogueDoc={product.catalogue_document}
                />
              </div>

              <div className="bg-[#F3F3F3] rounded-[24px]">
                <div className="flex flex-wrap gap-3 mb-6 border-b border-[#DDDDDD] pb-6 p-3">
                  {product.features?.map((feature, idx) => (
                    <FeaturePill key={idx} label={feature} />
                  ))}
                </div>

                <div className="p-3">
                  <h3 className="text-gray-800 font-semibold mb-4">
                    Specifications
                  </h3>
                  <SpecsTable specs={product.specifications} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Testimonials />
      </div>
    </Layout>
  );
}
