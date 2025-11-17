"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { getSolutionBySlug } from "@/services/solutionServices";
import { baseUri } from "@/services/constant";

type Solution = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  status: boolean;
  featured: boolean;
  sort_order: number;
  category: string | null;
  price_range: string | null;
  delivery_time: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  meta_title: string | null;
  created_at: string;
  updated_at: string;
  image?: string | null;
};

const RecreatedSolutionPage = () => {
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);
  const slug = "cloud-attendance-and-payroll-software";

  useEffect(() => {
    const fetchSolution = async () => {
      try {
        setLoading(true);
        const res = await getSolutionBySlug(slug);
        // API returns { success, data }
        const data = res?.data || null;
        setSolution(data);
      } catch (err) {
        console.error("Failed to load solution:", err);
        setSolution(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSolution();
  }, [slug]);

  return (
    <Layout>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading solution details...</p>
          </div>
        </div>
      ) : !solution ? (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <p className="text-gray-700">Solution not found.</p>
            <Link href="/solutions" className="mt-4 inline-block bg-orange-500 text-white px-5 py-2 rounded-md">Back to Solutions</Link>
          </div>
        </div>
      ) : (
        <main className="bg-white">
          {/* Hero image (title and description moved outside) */}
          <section className="relative overflow-hidden">
            <div className="container mx-auto px-4 py-6 md:py-8">
              <div className="relative rounded-2xl border border-[#3f3f3f] bg-[#2f2f2f] overflow-hidden h-48 md:h-72">
                {solution.image ? (
                  <Image
                    src={`${baseUri}${solution.image}`}
                    alt={solution.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3a3a3a] via-[#333333] to-[#1f1f1f]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
              </div>

              {/* Title and description outside the image */}
              <div className="mt-4 md:mt-6 flex flex-col lg:flex-row items-start lg:items-center gap-4">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 ring-1 ring-orange-200 mb-2">
                    {solution.category || "Solution"}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-wide mb-2">
                    {solution.title}
                  </h1>
                  {solution.short_description && (
                    <p className="text-gray-700 max-w-3xl">
                      {solution.short_description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-medium">
                    Get Demo
                  </Link>
                  <Link href="/sales" className="bg-gray-900/5 hover:bg-gray-900/10 text-gray-900 px-5 py-2 rounded-md font-medium ring-1 ring-gray-300">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Key Info */}
          <section className="py-5">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#e5e5e5] bg-white p-3">
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="text-sm font-medium text-gray-900">{solution.category || "N/A"}</p>
                </div>
                <div className="rounded-xl border border-[#e5e5e5] bg-white p-3">
                  <p className="text-xs text-gray-500">Delivery Time</p>
                  <p className="text-sm font-medium text-gray-900">{solution.delivery_time || "Standard"}</p>
                </div>
                <div className="rounded-xl border border-[#e5e5e5] bg-white p-3">
                  <p className="text-xs text-gray-500">Price Range</p>
                  <p className="text-sm font-medium text-gray-900">{solution.price_range || "Contact for pricing"}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          {solution.features?.length > 0 && (
            <section className="py-5">
              <div className="container mx-auto px-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {solution.features.map((f, i) => (
                    <div key={i} className="rounded-xl border border-[#e5e5e5] bg-white p-3">
                      <p className="text-gray-800 text-sm">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Benefits */}
          {solution.benefits?.length > 0 && (
            <section className="py-5">
              <div className="container mx-auto px-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2">Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {solution.benefits.map((b, i) => (
                    <div key={i} className="rounded-xl border border-[#e5e5e5] bg-white p-3">
                      <p className="text-gray-800 text-sm">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Technologies */}
          {solution.technologies?.length > 0 && (
            <section className="py-5">
              <div className="container mx-auto px-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {solution.technologies.map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 ring-1 ring-orange-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="py-6">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-700 mb-3">Ready to streamline attendance and payroll?</p>
              <div className="inline-flex gap-2">
                <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-md font-medium">Talk to Us</Link>
                <Link href="/solutions" className="bg-white border border-gray-200 text-gray-800 px-5 py-2.5 rounded-md font-medium">Explore More Solutions</Link>
              </div>
            </div>
          </section>
        </main>
      )}
    </Layout>
  );
};

export default RecreatedSolutionPage;