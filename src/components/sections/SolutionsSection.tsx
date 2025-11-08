"use client";
import Link from "next/link";
import Slider from "../ui/Slider";
import { useEffect, useState } from "react";
import axiosClient from "@/services/axiosClient";
import { useRouter } from "next/navigation";

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
    router.push(`/solutions/${slug}`);
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

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
    <section className="py-5 md:py-20 bg-[#2B2B2B]">
      <div className="container mx-auto px-6">

        {/* -------------------------- MOBILE VIEW ------------------------- */}
        <div className="md:hidden">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-4xl font-thin text-white sm:mb-3">
              Solutions
            </h2>
            <p className="text-xs sm:text-lg text-white font-light uppercase mb-1 sm:mb-4 tracking-[1px]">
              {'India\'s Leading Biometric Solutions'}
            </p>
            <p className="text-xs text-white font-thin tracking-[0.5px] mb-6">
              This is a growing market. Security incidents in schools grab the headlines, Emotions and budget allocations. How to address security concerns leaves room for many opinions and strategies.
            </p>
          </div>

            <Slider
              autoPlay
              autoPlayInterval={3000}
              showArrows={false}
              showDots={false}
              slidesToShow={1}
              className="h-full"
            >
              {solutions.map((solution) => (
                <>
                  <div
                    key={solution.id}
                    className="rounded-2xl mx-4 bg-[#414141] border border-[#616161] overflow-hidden flex items-between flex-col pb-5 cursor-pointer hover:border-orange-500 transition-all duration-300"
                    onClick={() => handleSolutionClick(solution.slug)}
                  >
                    <div className="px-3 pb-4 text-white mt-4">
                      <h3 className="text-2xl font-thin mb-2 ms-2">
                        {solution?.title}
                      </h3>
                      <p className="text-sm text-gray-300 ms-2 line-clamp-7 mb-2">
                        {solution?.short_description}
                      </p>
                    </div>
                      <div className="grid  grid-cols-3 gap-1 max-h-60 overflow-y-auto  custom-scrollbar mt-3 mx-5">
                        <div className="bg-green-100 rounded-lg p-3 border border-gray-700">
                          <h4 className="font-semibold text-black text-xs mb-2 flex items-center gap-1">
                            <svg className="w-4 h-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Features
                          </h4>
                          <ul className="space-y-1">
                            {solution.features.map((feature, index) => (
                              <li key={index} className="text-black text-[10px] flex items-start gap-1 ">
                                <span className="text-green-900 mt-0.5">•</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-blue-100 rounded-lg p-2 border border-gray-700">
                          <h4 className="font-semibold text-black text-xs mb-2 flex items-center gap-1">
                            <svg className="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Benefits
                          </h4>
                          <ul className="space-y-1">
                            {solution.benefits.map((benefit, index) => (
                              <li key={index} className="text-black text-[10px] flex items-start gap-1">
                                <span className="text-blue-900 mt-0.5">•</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-purple-100 rounded-lg p-2 border border-gray-700">
                          <h4 className="font-semibold text-black text-xs mb-2 flex items-center gap-1">
                            <svg className="w-4 h-4 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            Tech
                          </h4>
                          <ul className="space-y-1">
                            {solution.technologies.map((tech, index) => (
                              <li key={index} className="text-black text-[10px] flex items-start gap-1">
                                <span className="text-purple-900 mt-0.5">•</span>
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                  </div>

                </>
              ))}
            </Slider>

          <div className="text-center mb-6 mt-5">
            <Link
              href="/solutions"
              className="bg-orange-500 text-xs text-white px-3 py-2 rounded-md hover:bg-orange-600 transition inline-block"
            >
              View All Solutions
            </Link>
          </div>
        </div>

        {/* ------------------------ DESKTOP VIEW ------------------------ */}
        <div className="hidden md:grid md:grid-cols-3 gap-10">
          {/* Left Info */}
          <div className="col-span-1">
            <h2 className="text-4xl lg:text-5xl font-thin text-white mb-4">
              Solutions
            </h2>
            <p className="text-[16px] text-white font-thin uppercase mb-6 tracking-[1px]">
              {"India's Leading Biometric Solutions"}
            </p>
            <p className="text-[14px] text-white font-thin tracking-[1px]">
              This is a growing market. Security incidents in schools grab the headlines, Emotions and budget allocations. How to address security concerns leaves room for many opinions and strategies.
            </p>

            <Link
              href="/solutions"
              className="bg-orange-500 mt-10 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition inline-block"
            >
              View All Solutions
            </Link>
          </div>

          {/* Right Slider */}
          <div className="col-span-2 pb-10">
            <Slider
              autoPlay
              autoPlayInterval={3000}
              showArrows={false}
              showDots={false}
              slidesToShow={2.4}
              className="h-full"
            >
              {solutions.map((solution) => (
                <>
                  <div
                    key={solution.id}
                    className="rounded-2xl mx-4 bg-[#414141] border border-[#616161] overflow-hidden flex items-between flex-col pb-5 cursor-pointer hover:border-orange-500 transition-all duration-300 min-h-[350px]"
                    onClick={() => handleSolutionClick(solution.slug)}
                  >
                    <div className="px-3 pb-4 text-white mt-4 flex-grow">
                      <h3 className="text-2xl font-thin mb-2 ms-2">
                        {solution?.title}
                      </h3>
                      <p className="text-sm text-gray-300 ms-2 line-clamp-7 mb-2">
                        {solution?.short_description}
                      </p>
                    </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-1  overflow-hidden  mx-5">
                        <div className="bg-green-100 rounded-lg p-3 border border-gray-700 flex flex-col">
                          <h4 className="font-semibold text-black text-sm mb-2 flex items-center gap-1 line-clamp-1">
                            <svg className="w-4 h-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Features
                          </h4>
                          <ul className="space-y-1 flex-grow">
                            {solution.features.map((feature, index) => (
                              <li key={index} className="text-black text-xs flex items-start gap-1 line-clamp-1">
                                <span className="text-green-900 mt-0.5">•</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-blue-100 rounded-lg p-2 border border-gray-700 flex flex-col">
                          <h4 className="font-semibold text-black text-sm mb-2 flex items-center gap-1 ">
                            <svg className="w-4 h-4 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Benefits
                          </h4>
                          <ul className="space-y-1 flex-grow">
                            {solution.benefits.map((benefit, index) => (
                              <li key={index} className="text-black text-xs flex items-start gap-1 line-clamp-1">
                                <span className="text-blue-900 mt-0.5">•</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-purple-100 rounded-lg p-2 border border-gray-700 flex flex-col">
                          <h4 className="font-semibold text-black text-sm mb-2 flex items-center gap-1">
                            <svg className="w-4 h-4 text-purple-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            Tech
                          </h4>
                          <ul className="space-y-1 flex-grow">
                            {solution.technologies.map((tech, index) => (
                              <li key={index} className="text-black text-xs flex items-start gap-1 line-clamp-1">
                                <span className="text-purple-900 mt-0.5">•</span>
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                  </div>

                </>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
