// app/products/[title]/page.tsx
import { getProductBySlug } from "@/services/productService";
import Layout from "@/components/layout/Layout";
import FeaturePill from "@/components/common/FeaturePill";
import ProductImage from "@/components/common/ProductImage";
import SpecsTable from "@/components/products/productdetail/SpecsTable";
import Testimonials from "@/components/sections/Testimonials";
import DownloadCatalogueButton from "./DownloadCatalogueButton";
import Link from "next/link";
import { Play } from "lucide-react";
import { notFound } from "next/navigation";
import AdvancedBreadcrumb from "@/components/common/Bredacrumb";
// import Title from "@/components/common/Title";

type Category = {
  id?: number | string;
  name?: string;
  slug?: string;
};

type ProductCategory = {
  category: Category | null;
  title: string;
  images: string[];
  features: string[];
  specifications: Record<string, string | number>;
  meta_title?: string;
  meta_description?: string;
  catalogue_document?: string;
};

// ✅ Generate Metadata (Next.js 15+ compatible)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params; // ✅ FIXED
  const res = await getProductBySlug(title);
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

// ✅ Page Component (Next.js 15+ compatible)
export default async function ProductPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params; // ✅ FIXED
  const res = await getProductBySlug(title);
  const product: ProductCategory | null = res?.data?.[0] || null;

  if (!product) {
    notFound(); // ✅ Better UX than manual div
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.category?.name || "Category", href: `/products/category/${product.category?.slug}` },
    { label: product.title || "Product", href: `/products/${title}` },
  ];

  return (
    <Layout>
      <AdvancedBreadcrumb items={breadcrumbItems} />
      {/* <Title title={product.title} /> */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-25">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 items-start">
            {/* Left - Image */}
            <div className="lg:sticky lg:top-10">
              <ProductImage images={product.images || []} alt={product.title} />
            </div>

            {/* Right - Content */}
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-3">
                {product?.title}
              </h1>
              {product?.category?.name && (
                <p className="text-sm uppercase tracking-wider text-[#EA5921] font-medium mb-6">
                  {product?.category?.name}
                </p>
              )}

              <div className="flex items-center gap-3 mb-6">
                <Link
                  href="/support"
                  className="bg-[#EA5921] text-white hover:bg-orange-600 inline-flex items-center gap-2 text-[12px] lg:text-[16px] px-2 lg:px-4 py-2 rounded-md font-[400] shadow-sm transition cursor-pointer">
                  <span className="border rounded-full w-[20px] h-[20px] flex items-center justify-center">
                    <Play className="w-[10px]" />
                  </span>{" "}
                  VIEW DEMO
                </Link>

                {/* Client component for download */}
                {product.catalogue_document && (
                  <DownloadCatalogueButton
                    productTitle={product.title}
                    catalogueDoc={product.catalogue_document}
                  />
                )}
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
