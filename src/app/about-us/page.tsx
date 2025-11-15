"use client";
import AdvancedBreadcrumb from "@/components/common/Bredacrumb";
import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import axiosClient from "@/services/axiosClient";
import {
  FaLightbulb,
  FaUsers,
  FaAward,
  FaArrowRight,
  FaRocket,
  FaEye,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { baseUri } from "@/services/constant";

type Feature = {
  icon: string;
  title: string;
  description: string;
};

type AboutData = {
  vision_image: string;
  who_we_are_title: string;
  who_we_are_subtitle: string;
  who_we_are_content: string;
  who_we_are_features: Feature[];
  mission_vision_title: string;
  mission_title: string;
  mission_content: string;
  vision_title: string;
  vision_content: string;
  mission_image: string;
  who_we_are_video_url: string | null;
  who_we_are_image: string;
};

const Page = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
  ];

  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosClient.get("/content/about-us");
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching about us:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "fas fa-lightbulb":
        return <FaLightbulb className="text-3xl" />;
      case "fas fa-users":
        return <FaUsers className="text-3xl" />;
      case "fas fa-award":
        return <FaAward className="text-3xl" />;
      case "fas fa-rocket":
        return <FaRocket className="text-3xl" />;
      case "fas fa-eye":
        return <FaEye className="text-3xl" />;
      default:
        return <FaLightbulb className="text-3xl" />;
    }
  };

  // Function to get full image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null;
    // Adjust this based on your backend URL structure
    return `${baseUri}${imagePath}`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="text-center py-20 text-red-500 bg-red-50 rounded-lg mx-4">
          Failed to load content. Please try again later.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white" style={{ fontFamily: 'var(--font-montserrat)' }}>
        <AdvancedBreadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 lg:px-10 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-38 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  About Us
                </h3>
                <nav className="space-y-2">
                  {[
                    { name: "Who We Are", href: "#who-we-are", icon: FaUsers },
                    {
                      name: "Mission & Vision",
                      href: "#mission-vision",
                      icon: FaEye,
                    },
                    {
                      name: "Solutions",
                      href: "/solutions",
                      icon: FaRocket,
                    },
                    { name: "Products", href: "/products", icon: FaAward },
                    { name: "Contact", href: "/support", icon: FaLightbulb },
                  ].map((item, i) => (
                    <Link key={i} href={item.href}>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 group cursor-pointer">
                        <item.icon className="text-orange-600 group-hover:text-orange-700 transition-colors" />
                        <span className="font-medium">{item.name}</span>
                        <FaArrowRight className="ml-auto text-gray-400 group-hover:text-gray-700 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="w-full lg:w-3/4 space-y-20">
              {/* Who We Are */}
              <section id="who-we-are" className="scroll-mt-24">
                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                  <div className="mb-8">
                    <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                      About Company
                    </span>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      {data.who_we_are_title}
                    </h2>
                    <p className="text-lg text-orange-500 font-medium mb-6">
                      {data.who_we_are_subtitle}
                    </p>
                  </div>

                  {/* Who We Are Image Section */}
                  <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
                    <div>
                      <div
                        className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: data.who_we_are_content,
                        }}
                      />
                    </div>

                    {/* Who We Are Image */}
                    <div className="relative">
                      <div className="relative bg-white p-2 rounded-xl shadow-sm ring-1 ring-gray-200">
                        {data.who_we_are_image ? (
                          <Image
                            src={getImageUrl(data.who_we_are_image) || ""}
                            alt="Who We Are"
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover rounded-xl"
                            onError={(e) => {
                              // Fallback if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              // Show fallback content
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement("div");
                                fallback.className =
                                  "w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center";
                                fallback.innerHTML =
                                  '<FaUsers className="text-6xl text-gray-400 opacity-50" />';
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                            <FaUsers className="text-6xl text-gray-400 opacity-50" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {data.who_we_are_features.map((feature, i) => (
                      <div
                        key={i}
                        className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex justify-center mb-6">
                          <div className="p-4 text-orange-700 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-all duration-200">
                            {renderIcon(feature.icon)}
                          </div>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 text-center mb-3">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 text-center leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Mission & Vision */}
              <section id="mission-vision" className="scroll-mt-24">
                <div className="text-center mb-12">
                  <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                    Our Purpose
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900">
                    {data.mission_vision_title}
                  </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Mission */}
                  <div className="group relative bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-gray-900 hover:shadow-md transition-all duration-300">
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-orange-100 rounded-xl">
                          <FaRocket className="text-2xl text-orange-700" />
                        </div>
                        <h3 className="text-2xl font-bold">
                          {data.mission_title}
                        </h3>
                      </div>
                      <div
                        className="text-gray-700 space-y-4 leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{
                          __html: data.mission_content,
                        }}
                      />
                    </div>

                    {/* Mission Image */}
                    {data.mission_image && (
                      <div className="mt-4">
                        <Image
                          src={getImageUrl(data.mission_image) || ""}
                          alt="Our Mission"
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover rounded-lg ring-1 ring-gray-200"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              const fallback = document.createElement("div");
                              fallback.className =
                                "w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center";
                              fallback.innerHTML =
                                '<FaRocket className="text-4xl text-gray-400" />';
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Vision */}
                  <div className="group relative bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-gray-900 hover:shadow-md transition-all duration-300">
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-orange-100 rounded-xl">
                          <FaEye className="text-2xl text-orange-700" />
                        </div>
                        <h3 className="text-2xl font-bold">
                          {data.vision_title}
                        </h3>
                      </div>
                      <div
                        className="text-gray-700 space-y-4 leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{
                          __html: data.vision_content,
                        }}
                      />
                    </div>

                    {/* Vision Illustration */}
                    <div className="mt-4">
                      <Image
                        src={getImageUrl(data.vision_image) || ""}
                        alt="Our Vision"
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg ring-1 ring-gray-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent) {
                            const fallback = document.createElement("div");
                            fallback.className =
                              "w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center";
                            fallback.innerHTML =
                              '<FaEye className="text-4xl text-gray-400" />';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
