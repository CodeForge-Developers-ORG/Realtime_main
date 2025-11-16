"use client";
import { FaCheckCircle, FaStar, FaCog, FaInfoCircle } from "react-icons/fa";
import AdvancedBreadcrumb from "@/components/common/Bredacrumb";

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
  created_at: string;
  updated_at: string;
}


const SolutionDetails = ({ solution }: { solution: Solution }) => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Solutions", href: "/solutions" },
    { label: solution?.title, href: `/solutions/${solution?.slug}` },
  ];

  return (
    <div className="bg-white">
        <AdvancedBreadcrumb items={breadcrumbItems} />
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-38 border border-orange-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-orange-200">
                Solution Details
              </h3>
              <nav className="space-y-2">
                {[
                  { name: "Overview", href: "#overview", icon: FaInfoCircle },
                  { name: "Features", href: "#features", icon: FaCheckCircle },
                  { name: "Benefits", href: "#benefits", icon: FaStar },
                  { name: "Technologies", href: "#technologies", icon: FaCog },
                ].map((item, i) => (
                  <a key={i} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-white hover:bg-orange-500 transition-all duration-300 group cursor-pointer">
                    <item.icon className="text-orange-500 group-hover:text-white transition-colors" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="w-full lg:w-3/4 space-y-20">
            {/* Hero Section */}
            <section id="overview" className="scroll-mt-24">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
                <div className="mb-8">
                  <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                    Solution
                  </span>
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {solution?.title}
                  </h1>
                  <p className="text-sm text-black font-medium mb-6">
                    {solution?.description}
                  </p>
                </div>

                {/* Solution Image */}
                <div className="relative my-10">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl transform rotate-2"></div>
                  <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                        <div className="w-[70%] mx-auto h-55 rounded-xl flex items-center justify-center">
                          <FaInfoCircle className="text-6xl text-orange-400 opacity-50" />
                        </div>
                  </div>
                </div>

                  {/* Technologies Section */}
            <section id="technologies" className="scroll-mt-24">
              <div className=" mb-5">
                <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                  Technologies
                </span>
                <h2 className="section-title">Technologies We Use</h2>
              </div>

              <div className="flex flex-wrap gap-3 ">
                {solution?.technologies?.map((tech: string, index: number) => (
                  <span key={index} className=" text-orange-800 text-sm font-semibold px-4 py-2 rounded-full border border-orange-300 hover:shadow-lg hover:scale-105 transition-all duration-300">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="scroll-mt-24">
              <div className=" mb-8">
                <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                  Key Features
                </span>
                <h2 className="section-title">Features</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {solution?.features?.map((feature: string, index: number) => (
                  <div key={index} className="group bg-gradient-to-br from-white to-orange-50 p-6 rounded-2xl border border-orange-100 hover:border-orange-300 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="flex items-start gap-4">
                      <div className="p-3 text-orange-500 bg-orange-100 rounded-2xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                        <FaCheckCircle className="text-xl" />
                      </div>
                      <div>
                        <p className="text-gray-700 leading-relaxed">{feature}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="scroll-mt-24">
              <div className=" mb-8">
                <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                  Benefits
                </span>
                <h2 className="section-title">What You Get</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {solution?.benefits?.map((benefit: string, index: number) => (
                  <div key={index} className="group bg-gradient-to-br from-white to-orange-50 p-6 rounded-2xl border border-orange-100 hover:border-orange-300 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="flex items-start gap-4">
                      <div className="p-3 text-orange-500 bg-orange-100 rounded-2xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                        <FaStar className="text-xl" />
                      </div>
                      <div>
                        <p className="text-gray-700 leading-relaxed">{benefit}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>


          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetails;