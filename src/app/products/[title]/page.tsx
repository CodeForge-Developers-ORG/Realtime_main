// app/products/[title]/page.tsx
import { getProductBySlug } from "@/services/productService";
import Layout from "@/components/layout/Layout";
import ProductImage from "@/components/common/ProductImage";
import SpecsTable from "@/components/products/productdetail/SpecsTable";
import Testimonials from "@/components/sections/Testimonials";
import DownloadCatalogueButton from "./DownloadCatalogueButton";
import Link from "next/link";
import {
  Fingerprint,
  KeyRound,
  CreditCard,
  Cloud,
  Activity,
  User,
  SunMedium,
} from "lucide-react";
import { notFound } from "next/navigation";
import AdvancedBreadcrumb from "@/components/common/Bredacrumb";
import { ReactNode } from "react";
import DOMPurify from "@/app/privacy-policy/dompurifire";
import ProductEnquiryButton from "@/components/common/ProductEnquiryButton";

// ---------------------------- TYPES ------------------------------
type Category = {
  id?: number | string;
  name?: string;
  slug?: string;
};

type ProductCategory = {
  a_plus_content_html: string;
  description: ReactNode;
  category: Category | null;
  title: string;
  images: string[];
  features: string[];
  specifications: Record<string, string | number>;
  meta_title?: string;
  meta_description?: string;
  catalogue_document?: string;
};

// ----------------------- METADATA GENERATION ----------------------
export async function generateMetadata({ params }: { params: Promise<{ title: string }> }) {
  const { title: slug } = await params;

  const res = await getProductBySlug(slug);
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

// ----------------------------- PAGE -------------------------------
export default async function ProductPage({ params }: { params: Promise<{ title: string }> }) {
  const { title: slug } = await params;

  const res = await getProductBySlug(slug);
  const product: ProductCategory | null = res?.data?.[0] || null;

  if (!product) return notFound();

  // Breadcrumb
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    {
      label: product.category?.name || "Category",
      href: `/products/category/${product.category?.slug}`,
    },
    { label: product.title || "Product", href: `/products/${slug}` },
  ];

  // Specs convert
  const specArray: { title: string; value: unknown }[] = Array.isArray(
    product.specifications as unknown
  )
    ? ((product.specifications as unknown as unknown[]) || []).map((s: unknown) => {
        const obj = s as { title?: unknown; value?: unknown };
        return {
          title: String(obj.title ?? ""),
          value: obj.value ?? s,
        };
      })
    : Object.entries(
        (product.specifications as Record<string, unknown>) || {}
      ).map(([title, value]) => ({ title, value }));

  const specHighlights = specArray.slice(0, 3);

  // Helpers
  const formatSpecLabel = (key: string) =>
    key
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const getDisplayValue = (value: unknown): string => {
    if (value == null) return "-";
    if (typeof value === "string" || typeof value === "number") return String(value);
    if (Array.isArray(value)) return value.map((v) => String(v)).join(", ");

    if (typeof value === "object") {
      const obj = value as Record<string, unknown>;
      for (const k of ["value", "val", "name", "text", "label"]) {
        if (obj[k] != null) return String(obj[k]);
      }
      return JSON.stringify(obj);
    }
    return String(value);
  };

  function safeDecodeContent(raw: string = ""): string {
    try {
      if (!raw) return "";

      return raw
        .replace(/\\u003C/g, "<")
        .replace(/\\u003E/g, ">")
        .replace(/\\u0026/g, "&")
        .replace(/\\n/g, "")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\")
        .replace(/\r/g, "");
    } catch {
      return raw;
    }
  }

  return (
    <Layout>
      <AdvancedBreadcrumb items={breadcrumbItems} />

      <div className="bg-white" style={{ fontFamily: "var(--font-montserrat)" }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Image */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <ProductImage images={product.images || []} alt={product.title} />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
                {product?.title}
              </h1>

              {product?.category?.name && (
                <p className="inline-flex items-center text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 text-xs font-medium">
                  {product?.category?.name}
                </p>
              )}

              <p className="text-gray-700 leading-relaxed">{product?.description}</p>

              {/* Spec Highlights */}
              {specHighlights.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {specHighlights.map(({ title, value }) => (
                      <div key={title} className="min-w-0">
                        <div className="text-xs text-gray-500">{formatSpecLabel(title)}</div>
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {getDisplayValue(value)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <ProductEnquiryButton />
                {product.catalogue_document && (
                  <DownloadCatalogueButton
                    productTitle={product.title}
                    catalogueDoc={product.catalogue_document}
                  />
                )}
              </div>

              {/* Features */}
              {product.features?.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <h3 className="text-gray-900 font-semibold mb-3">Features</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="group rounded-lg border border-gray-200 bg-gray-50 hover:bg-white hover:border-orange-300 transition-colors p-3 text-center"
                      >
                        <div className="flex flex-col items-center gap-2">
                          {getFeatureIcon(feature)}
                          <span className="text-xs font-medium text-gray-800 line-clamp-1">
                            {feature}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Downloads */}
              {product.catalogue_document && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <h3 className="text-gray-900 font-semibold mb-3">Download</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <DownloadCatalogueButton
                      productTitle={product.title}
                      catalogueDoc={product.catalogue_document}
                    />
                    <Link
                      href="https://wa.me/918860886086"
                      target="_blank"
                      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:border-orange-300 hover:text-orange-700 transition-colors"
                    >
                      Enquire on Whatsapp
                    </Link>
                  </div>
                </div>
              )}

              {/* Specs */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                <h3 className="text-gray-900 font-semibold mb-4">Product Specifications</h3>
                <SpecsTable specs={product.specifications} />
              </div>
            </div>
          </div>
        </div>

        {/* A+ HTML Section */}
        {product?.a_plus_content_html && (() => {
          const decoded = safeDecodeContent(product.a_plus_content_html);
          const sanitized = DOMPurify.sanitize(decoded);

          return (
            <div className="max-w-7xl mx-auto px-6 py-10">
              <div
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitized }}
              />
            </div>
          );
        })()}

        <Testimonials />
      </div>
    </Layout>
  );
}

// ------------------------ ICON MAPPER -------------------------
function getFeatureIcon(label: string) {
  const l = (label || "").toLowerCase();
  if (l.includes("fingerprint")) return <Fingerprint className="w-5 h-5 text-orange-600" />;
  if (l.includes("password") || l.includes("passcode"))
    return <KeyRound className="w-5 h-5 text-orange-600" />;
  if (l.includes("card")) return <CreditCard className="w-5 h-5 text-orange-600" />;
  if (l.includes("cloud")) return <Cloud className="w-5 h-5 text-orange-600" />;
  if (l.includes("live") || l.includes("detect")) return <Activity className="w-5 h-5 text-orange-600" />;
  if (l.includes("wdr") || l.includes("hdr")) return <SunMedium className="w-5 h-5 text-orange-600" />;
  if (l.includes("face")) return <User className="w-5 h-5 text-orange-600" />;
  return <Activity className="w-5 h-5 text-orange-600" />;
}
