"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axiosClient from "@/services/axiosClient";
import Portal from "../common/Portal";
import DownloadModal from "../software/DownloadModal";

type Software = {
  id: string;
  title: string;
  slug: string;
  one_line_description: string;
  description: string;
  main_category: string;
  sub_category: string;
  platforms: string[];
  requirements: string[];
  tags: string[];
  version: string | null;
  size: number | null;
  developer: string | null;
  license: string | null;
  price: string | null;
  is_free: boolean;
  download_count: number;
  featured: boolean;
  status: boolean;
  sort_order: number;
  external_url: string | null;
  file: string | null;
  released_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  updated_at: string;
  created_at: string;
};

const SoftwareMegaMenu = () => {
  const [activeSoftware, setActiveSoftware] = useState<string | null>(null);
  const [software, setSoftware] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSoftware, setSelectedSoftware] = useState<Software | null>(
    null
  );

  // Fetch software from API
  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/content/software");
        const data = await response.data;
        console.log("Fetched software data:", data);

        if (data.success) {
          const softwareData = data.data;
          setSoftware(softwareData);

          // Set first software as active
          if (softwareData.length > 0) {
            setActiveSoftware(softwareData[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching software:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSoftware();
  }, []);

  // Get active software data
  const activeSoftwareData = software.find(
    (item) => item.id === activeSoftware
  );

  // Format file size
  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "N/A";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  // Handle download click
  const handleDownloadClick = (software: Software) => {
    setSelectedSoftware(software);
  };

  const baseUrl = "https://app.realtimebiometrics.net";

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
    <>
      <div className="absolute md:-left-50 lg:left-0 mt-3 w-[800px] bg-[#2B2B2B] border border-gray-700 rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <div className="p-4">
          <div className="flex gap-4">
            {/* Left Sidebar - Software List */}
            <div className="w-48 flex-shrink-0">
              <h3 className="text-sm font-semibold text-white mb-3 pb-2 border-b border-gray-700">
                SOFTWARE
              </h3>
              <div className="space-y-1">
                {software.map((item) => (
                  <div
                    key={item.id}
                    className={`p-2 rounded-md cursor-pointer transition-all duration-200 text-sm ${
                      activeSoftware === item.id
                        ? "bg-orange-500 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                    onMouseEnter={() => setActiveSoftware(item.id)}>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs opacity-75 mt-1 flex items-center gap-1">
                      {item.is_free && (
                        <span className="text-green-400">Free</span>
                      )}
                      {item.main_category && (
                        <span>• {item.main_category}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Software Details */}
            <div className="flex-1">
              {activeSoftwareData ? (
                <>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {activeSoftwareData.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {activeSoftwareData.is_free && (
                          <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded">
                            FREE
                          </span>
                        )}
                        {activeSoftwareData.featured && (
                          <span className="text-xs text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded flex items-center gap-1">
                            <span>⭐</span>
                            Featured
                          </span>
                        )}
                        {activeSoftwareData.download_count > 0 && (
                          <span className="text-xs text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
                            {activeSoftwareData.download_count} downloads
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* One Line Description */}
                  <div className="mb-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {activeSoftwareData.one_line_description}
                    </p>
                  </div>

                  {/* Software Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    {/* Basic Information */}
                    <div className="bg-[#424141] rounded-lg p-3 border border-gray-700">
                      <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-orange-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Details
                      </h4>
                      <div className="space-y-2 text-xs">
                        {activeSoftwareData.version && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Version:</span>
                            <span className="text-white">
                              {activeSoftwareData.version}
                            </span>
                          </div>
                        )}
                        {activeSoftwareData.size && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Size:</span>
                            <span className="text-white">
                              {formatFileSize(activeSoftwareData.size)}
                            </span>
                          </div>
                        )}
                        {activeSoftwareData.developer && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Developer:</span>
                            <span className="text-white">
                              {activeSoftwareData.developer}
                            </span>
                          </div>
                        )}
                        {activeSoftwareData.license && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">License:</span>
                            <span className="text-white">
                              {activeSoftwareData.license}
                            </span>
                          </div>
                        )}
                        {activeSoftwareData.main_category && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Category:</span>
                            <span className="text-white">
                              {activeSoftwareData.main_category}
                            </span>
                          </div>
                        )}
                        {activeSoftwareData.sub_category && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Sub Category:</span>
                            <span className="text-white">
                              {activeSoftwareData.sub_category}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Platforms */}
                    {activeSoftwareData.platforms &&
                      activeSoftwareData.platforms.length > 0 && (
                        <div className="bg-[#424141] rounded-lg p-3 border border-gray-700">
                          <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-1">
                            <svg
                              className="w-4 h-4 text-blue-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            Platforms
                          </h4>
                          <ul className="space-y-1">
                            {activeSoftwareData.platforms.map(
                              (platform, index) => (
                                <li
                                  key={index}
                                  className="text-gray-300 text-xs flex items-start gap-1">
                                  <span className="text-blue-400 mt-0.5">
                                    •
                                  </span>
                                  {platform}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Requirements */}
                    {activeSoftwareData.requirements &&
                      activeSoftwareData.requirements.length > 0 && (
                        <div className="bg-[#424141] rounded-lg p-3 border border-gray-700">
                          <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-1">
                            <svg
                              className="w-4 h-4 text-green-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Requirements
                          </h4>
                          <ul className="space-y-1">
                            {activeSoftwareData.requirements.map(
                              (requirement, index) => (
                                <li
                                  key={index}
                                  className="text-gray-300 text-xs flex items-start gap-1">
                                  <span className="text-green-400 mt-0.5">
                                    •
                                  </span>
                                  {requirement}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Tags */}
                    {activeSoftwareData.tags &&
                      activeSoftwareData.tags.length > 0 && (
                        <div className="bg-[#424141] rounded-lg p-3 border border-gray-700">
                          <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-1">
                            <svg
                              className="w-4 h-4 text-purple-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                              />
                            </svg>
                            Tags
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {activeSoftwareData.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Download/External Link */}
                  <div className="mt-4 pt-3 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleDownloadClick(activeSoftwareData)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        {activeSoftwareData.file ? "Download" : "Get Software"}
                      </button>

                      <Link
                        href={`/software/${activeSoftwareData.slug}`}
                        className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors flex items-center gap-1">
                        View Details
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
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">No software selected</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Download Modal with Portal - यह अब body में render होगा */}
      {selectedSoftware && (
        <Portal>
          <DownloadModal
            software={{
              id: selectedSoftware.id,
              title: selectedSoftware.title,
              version: selectedSoftware.version || "",
              file: selectedSoftware.file,
              external_url: selectedSoftware.external_url,
            }}
            onClose={() => setSelectedSoftware(null)}
          />
        </Portal>
      )}

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
    </>
  );
};

export default SoftwareMegaMenu;
