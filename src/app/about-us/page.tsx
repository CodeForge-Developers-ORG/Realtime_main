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
      <div className="bg-white">
        <AdvancedBreadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 lg:px-10 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-orange-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-orange-200">
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
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-white hover:bg-orange-500 transition-all duration-300 group cursor-pointer">
                        <item.icon className="text-orange-500 group-hover:text-white transition-colors" />
                        <span className="font-medium">{item.name}</span>
                        <FaArrowRight className="ml-auto text-orange-300 group-hover:text-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
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
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
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
                      <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl transform rotate-2"></div>
                      <div className="relative bg-white p-2 rounded-2xl shadow-xl">
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
                                  "w-full h-64 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center";
                                fallback.innerHTML =
                                  '<FaUsers className="text-6xl text-orange-400 opacity-50" />';
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-64 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                            <FaUsers className="text-6xl text-orange-400 opacity-50" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {data.who_we_are_features.map((feature, i) => (
                      <div
                        key={i}
                        className="group bg-gradient-to-br from-white to-orange-50 p-8 rounded-2xl border border-orange-100 hover:border-orange-300 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                        <div className="flex justify-center mb-6">
                          <div className="p-4 text-black bg-orange-100 rounded-2xl group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
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
                  <div className="group relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl shadow-xl text-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white bg-opacity-20 rounded-2xl">
                          <FaRocket className="text-2xl" />
                        </div>
                        <h3 className="text-2xl font-bold">
                          {data.mission_title}
                        </h3>
                      </div>
                      <div
                        className="text-orange-50 space-y-4 leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{
                          __html: data.mission_content,
                        }}
                      />
                    </div>

                    {/* Mission Image */}
                    {data.mission_image && (
                      <div className="relative z-10">
                        <div className="absolute -inset-4 bg-white/10 rounded-2xl transform rotate-1"></div>
                        <div className="relative bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                          <Image
                            src={getImageUrl(data.mission_image) || ""}
                            alt="Our Mission"
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement("div");
                                fallback.className =
                                  "w-full h-48 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-lg flex items-center justify-center";
                                fallback.innerHTML =
                                  '<FaRocket className="text-4xl text-white/40" />';
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vision */}
                  <div className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl text-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white bg-opacity-20 rounded-2xl">
                          <FaEye className="text-2xl" />
                        </div>
                        <h3 className="text-2xl font-bold">
                          {data.vision_title}
                        </h3>
                      </div>
                      <div
                        className="text-gray-200 space-y-4 leading-relaxed mb-6"
                        dangerouslySetInnerHTML={{
                          __html: data.vision_content,
                        }}
                      />
                    </div>

                    {/* Vision Illustration */}
                    <div className="relative z-10">
                      <div className="absolute -inset-4 bg-white/10 rounded-2xl transform -rotate-1"></div>
                      <div className="relative bg-white/10 p-4 rounded-xl backdrop-blur-sm flex items-center justify-center">
                        <div className="w-full h-40 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                          {/* <FaEye className="text-4xl text-white/40" /> */}
                          {/* <div className="relative bg-white/10 p-2 rounded-xl backdrop-blur-sm"> */}
                          <Image
                            src={getImageUrl(data.vision_image) || ""}
                            alt="Our Mission"
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement("div");
                                fallback.className =
                                  "w-full h-48 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-lg flex items-center justify-center";
                                fallback.innerHTML =
                                  '<FaRocket className="text-4xl text-white/40" />';
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                          {/* </div> */}
                        </div>
                      </div>
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
