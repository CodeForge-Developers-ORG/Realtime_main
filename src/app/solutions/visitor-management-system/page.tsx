"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import { getSolutionBySlug } from "@/services/solutionServices";
import { baseUri } from "@/services/constant";
import { FaCheckCircle } from "react-icons/fa";

interface Solution {
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
  image?: string | null;
  featured_image?: string | null;
  created_at: string;
  updated_at: string;
}

const VisitorManagementSystemPage = () => {
  const [solution, setSolution] = useState<Solution | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSolutionBySlug("visitor-management-system");
      setSolution(res.data);
    };
    fetchData();
  }, []);

  const title = solution?.title || "Visitor Management System";
  const subtitle =
    solution?.short_description ||
    "Modern, secure visitor handling with instant check-in, badges, and real‑time notifications.";
  const remotePath = solution?.image || solution?.featured_image || null;
  const imageSrc = remotePath ? `${baseUri}${remotePath}` : "/images/solution1.png";

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 lg:px-10 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold mb-3">
              Solution
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h1>
            <p className="text-gray-700 text-base md:text-lg mb-6">{subtitle}</p>
            <div className="flex gap-3">
              <a
                href="/sales"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors"
              >
                Get a demo
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact sales
              </a>
            </div>
          </div>
          <div className="relative w-full h-56 md:h-80 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            <Image src={imageSrc} alt={title} fill unoptimized className="object-cover" />
          </div>
        </section>

        {/* Highlights */}
        <section className="max-w-7xl mx-auto px-4 lg:px-10 pb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Instant visitor check‑in",
              "Badge printing & approvals",
              "Pre‑registration links",
              "Host notifications",
              "Access logs & compliance",
              "Visitor analytics",
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-600">
                    <FaCheckCircle />
                  </span>
                  <p className="text-gray-800 text-sm leading-relaxed">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Simple description */}
        {solution?.description ? (
          <section className="max-w-3xl mx-auto px-4 lg:px-10 pb-16">
            <h2 className="section-title mb-3">Overview</h2>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">{solution.description}</p>
          </section>
        ) : null}
      </div>
    </Layout>
  );
};

export default VisitorManagementSystemPage;