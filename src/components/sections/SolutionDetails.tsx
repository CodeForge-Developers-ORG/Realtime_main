"use client";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import Image from "next/image";
import AdvancedBreadcrumb from "@/components/common/Bredacrumb";
import { baseUri } from "@/services/constant";

export interface Solution {
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


const SolutionDetails = ({ solution }: { solution: Solution }) => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: solution?.title, href: `/solutions/${solution?.slug}` },
  ];

  const remotePath = solution?.image || solution?.featured_image || null;
  const imageSrc = remotePath ? `${baseUri}${remotePath}` : "/images/solution1.png";

  return (
    <div className="bg-white">
      <AdvancedBreadcrumb items={breadcrumbItems} />
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-10">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold mb-3">
              Solution
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {solution?.title}
            </h1>
            {solution?.short_description ? (
              <p className="text-gray-700 text-base md:text-lg">
                {solution.short_description}
              </p>
            ) : null}
          </div>
          <div className="relative w-full h-56 md:h-80 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            <Image
              src={imageSrc}
              alt={solution?.title || "Solution image"}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </section>

        {/* Features */}
        {Array.isArray(solution?.features) && solution.features.length > 0 ? (
          <section className="mt-12">
            <h2 className="section-title mb-4">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solution.features.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-orange-100 text-orange-600">
                      <FaCheckCircle />
                    </span>
                    <p className="text-gray-800 text-sm leading-relaxed">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Benefits */}
        {Array.isArray(solution?.benefits) && solution.benefits.length > 0 ? (
          <section className="mt-12">
            <h2 className="section-title mb-4">Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solution.benefits.map((benefit: string, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-orange-100 text-orange-600">
                      <FaStar />
                    </span>
                    <p className="text-gray-800 text-sm leading-relaxed">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Technologies */}
        {Array.isArray(solution?.technologies) && solution.technologies.length > 0 ? (
          <section className="mt-12">
            <h2 className="section-title mb-4">Technologies We Use</h2>
            <div className="flex flex-wrap gap-2">
              {solution.technologies.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="inline-block text-orange-800 text-xs md:text-sm font-semibold px-3 py-1 rounded-full border border-orange-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default SolutionDetails;