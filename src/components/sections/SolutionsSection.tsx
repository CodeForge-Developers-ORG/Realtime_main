"use client";
import Link from "next/link";
import Image from "next/image";
import Slider from "@/components/ui/Slider";
import { useEffect, useState } from "react";
import axiosClient from "@/services/axiosClient";
import { useRouter } from "next/navigation";
import { baseUri } from "@/services/constant";

type Solution = {
  id: string;
  status: boolean;
  featured: boolean;
  sort_order: number;
  features: string[];
  benefits: string[];
  technologies: string[];
  title: string;
  slug: string;
  short_description: string;
  description: string;
  image?: string | null;
  category: string | null;
  price_range: string | null;
  delivery_time: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  meta_title: string | null;
  created_at: string;
  updated_at: string;
};

const SolutionsSection = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchSolutions = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get("/content/solutions");
      const data = await response.data;

      if (data?.success) {
        setSolutions(data?.data || []);
      }
    } catch (err) {
      console.error("Error fetching solutions", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSolutionClick = (slug: string) => {
    // Open solution details in a new tab as requested
    if (typeof window !== 'undefined') {
      window.open(`/solutions/${slug}`, '_blank');
    } else {
      router.push(`/solutions/${slug}`);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  if (loading) {
    return (
      <div className="absolute left-0 mt-3 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
        <div className="p-4">
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }
  // Limit desktop grid to two rows (max 6 items on large screens). Tablet/mobile use the slider.
  const displayedSolutions = solutions.slice(0, 6);
  return (
    <section className="py-[3rem] bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="section-title mb-3">Solutions</h2>
          <p className="section-subtitle uppercase mb-4 tracking-[1px]">{"India's Leading Biometric Solutions"}</p>
          <p className="section-subtitle max-w-3xl mx-auto">This is a growing market. Security incidents in schools grab the headlines, Emotions and budget allocations. How to address security concerns leaves room for many opinions and strategies.</p>
        </div>

        {/* Mobile & tablet slider */}
        <div className="lg:hidden">
          <Slider
            slidesToShow={1}
            showArrows={false}
            showDots={true}
            autoPlay={true}
            autoPlayInterval={4000}
            dotStyle={{
              size: 8,
              activeSize: 10,
              color: "#ffffff",
              activeColor: "#EA5921",
              position: "outside",
              containerClass: "bg-transparent"
            }}
            className="-mx-2"
            responsive={[{ breakpoint: 640, slidesToShow: 1, showDots: true }]}
          >
            {solutions.map((solution, index) => (
              <div key={solution.id} className="px-2">
                <div
                  onClick={() => handleSolutionClick(solution.slug)}
                  className="group relative h-64 overflow-hidden rounded-xl border border-white bg-[#3a3a3a] shadow-lg transition-all duration-500 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/10 cursor-pointer"
                >
                  {solution.image ? (
                    <Image
                      src={`${baseUri}${solution.image}`}
                      alt={solution.title}
                      fill
                      sizes="100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index < 3}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3a3a3a] via-[#333333] to-[#1f1f1f] transition-transform duration-700 group-hover:scale-105" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-75" />

                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="text-xl font-thin text-white mb-2 transition-colors duration-300 group-hover:text-orange-500">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {solution.short_description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Desktop grid (modern layout, max two rows) */}
        <div className="hidden lg:grid gap-6 grid-cols-12 auto-rows-[320px]">
          {displayedSolutions.map((solution, index) => {
            const spanMap = [
              "lg:col-span-6", // big tile
              "lg:col-span-3", // small tile
              "lg:col-span-3", // small tile
              "lg:col-span-4", // medium tile
              "lg:col-span-4", // medium tile
              "lg:col-span-4", // medium tile
            ];
            const spanClass = spanMap[index % spanMap.length];
            return (
              <div
                key={solution.id}
                onClick={() => handleSolutionClick(solution.slug)}
                className={`group relative overflow-hidden rounded-2xl border border-white bg-[#2f2f2f] shadow-lg transition-all duration-500 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/10 cursor-pointer ${spanClass}`}
              >
                {solution.image ? (
                  <Image
                    src={`${baseUri}${solution.image}`}
                    alt={solution.title}
                    fill
                    sizes="(max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03] group-hover:rotate-[0.2deg]"
                    priority={index < 3}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3a3a3a] via-[#333333] to-[#1f1f1f] transition-transform duration-700 group-hover:scale-[1.03] group-hover:rotate-[0.2deg]" />
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-75" />

                {/* Category pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 ring-1 ring-orange-200">
                    {solution.category || "Solution"}
                  </span>
                </div>

                {/* Content bottom with glass overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="bg-black/30 backdrop-blur-sm ring-1 ring-white/10 rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-white mb-2 tracking-wide">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-gray-200 line-clamp-2">
                      {solution.short_description}
                    </p>
                    <div className="mt-3 inline-flex items-center text-orange-500 transition-all duration-300 group-hover:translate-x-1">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/solutions"
            className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition inline-block"
          >
            View All Solutions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
