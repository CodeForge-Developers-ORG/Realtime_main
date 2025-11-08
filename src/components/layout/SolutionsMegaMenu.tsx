"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axiosClient from "@/services/axiosClient";
import { useRouter } from "next/navigation";

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
  price_range: string | null;
  delivery_time: string | null;
  category: null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  updated_at: string;
  created_at: string;
};

const SolutionsMegaMenu = () => {
  const [activeSolution, setActiveSolution] = useState<string | null>(null);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch solutions from API
  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/content/solutions");
        const data = await response.data;
        console.log("Fetched solutions data:", data);
        
        if (data.success) {
          const solutionsData = data.data;
          setSolutions(solutionsData);

          // Set first solution as active
          if (solutionsData.length > 0) {
            setActiveSolution(solutionsData[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching solutions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  const handleSolutionClick = (slug: string) => {
    router.push(`/solutions/${slug}`);
  };

  // Get active solution data
  const activeSolutionData = solutions.find(
    (solution) => solution.id === activeSolution
  );

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
    <div className="absolute md:left-40 lg:left-0 mt-3 w-[100%] bg-[#2B2B2B] border border-gray-700 rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      <div className="p-4">
        <div className="flex gap-4">
          {/* Left Sidebar - Solutions List */}
          <div className="w-48 flex-shrink-0">
            <h3 className="text-sm font-semibold text-white mb-3 pb-2 border-b border-gray-700">
              SOLUTIONS
            </h3>
            <div className="space-y-1">
              {solutions.map((solution) => (
                <div
                  key={solution.id}
                  className={`p-2 rounded-md cursor-pointer transition-all duration-200 text-sm ${
                    activeSolution === solution.id
                      ? "bg-orange-500 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onMouseEnter={() => setActiveSolution(solution.id)}
                  onClick={() => handleSolutionClick(solution.slug)}>
                  <div className="font-medium">{solution.title}</div>
                  {solution.featured && (
                    <div className="text-xs opacity-75 mt-1">
                      ⭐ Featured
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Solution Details */}
          <div className="flex-1">
            {activeSolutionData ? (
              <>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-white">
                    {activeSolutionData.title}
                  </h3>
                  {activeSolutionData.featured && (
                    <span className="text-xs text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded flex items-center gap-1">
                      <span>⭐</span>
                      Featured
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <div className="mb-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {activeSolutionData.short_description}
                  </p>
                </div>

                {/* Features, Benefits, Technologies */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                  {/* Features */}
                  {activeSolutionData.features && activeSolutionData.features.length > 0 && (
                    <div className="bg-[#424141] rounded-lg p-3 border border-gray-700">
                      <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-1">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Features
                      </h4>
                      <ul className="space-y-1">
                        {activeSolutionData.features.map((feature, index) => (
                          <li key={index} className="text-gray-300 text-xs flex items-start gap-1">
                            <span className="text-green-400 mt-0.5">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Benefits */}
                  {activeSolutionData.benefits && activeSolutionData.benefits.length > 0 && (
                    <div className="bg-[#424141] rounded-lg p-3 border border-gray-700">
                      <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-1">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Benefits
                      </h4>
                      <ul className="space-y-1">
                        {activeSolutionData.benefits.map((benefit, index) => (
                          <li key={index} className="text-gray-300 text-xs flex items-start gap-1">
                            <span className="text-blue-400 mt-0.5">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {activeSolutionData.technologies && activeSolutionData.technologies.length > 0 && (
                    <div className="bg-[#424141] rounded-lg p-3 border border-gray-700">
                      <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-1">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Technologies
                      </h4>
                      <ul className="space-y-1">
                        {activeSolutionData.technologies.map((tech, index) => (
                          <li key={index} className="text-gray-300 text-xs flex items-start gap-1">
                            <span className="text-purple-400 mt-0.5">•</span>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Price Range if available */}
                {activeSolutionData.price_range && activeSolutionData.price_range !== "0" && (
                  <div className="mt-4 pt-3 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Starting from</span>
                      <span className="text-orange-400 font-semibold">
                        {activeSolutionData.price_range}
                      </span>
                    </div>
                  </div>
                )}

                {/* View Details Button */}
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <Link
                    href={`/solutions/${activeSolutionData.slug}`}
                    className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors flex items-center justify-center gap-1">
                    View Solution Details
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">
                  No solution selected
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default SolutionsMegaMenu;