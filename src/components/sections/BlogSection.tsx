"use client";

import Image from "next/image";
import Link from "next/link";
import Slider from "../ui/Slider";
import { useEffect, useState } from "react";
import { blogService } from "@/services/blogService";
import { Blog } from "@/types/blog";
import { baseUri } from "@/services/constant";

const BlogSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getPublishedBlogs();
        if (response?.success && Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Skeleton loader
  if (loading) {
    return (
      <section className="py-5 md:py-20 bg-[#E8E9E3]">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 w-1/3 bg-gray-300 mb-3 rounded"></div>
            <div className="h-4 w-1/4 bg-gray-200 mb-6 rounded"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm h-60"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No blogs case
  if (!blogs.length) {
    return (
      <section className="py-5 md:py-20 bg-[#E8E9E3] text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-4xl font-thin text-[#1E1410]">
            No Blogs Found
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 md:py-20 bg-[#e8e9e3]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 md:mb-10">
          <h2 className="text-xl md:text-6xl font-thin text-[#1E1410] md:mb-3 md:mb-8">
            Blogs
          </h2>
          <p className="text-shadow-amber-100 text-sm md:text-3xl font-thin uppercase bg-amber-400 p-1 px-2 text-black inline-block">
            Our Latest Updates
          </p>
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <Slider
            autoPlay
            autoPlayInterval={3000}
            showArrows={false}
            showDots
            slidesToShow={1.2}
            responsive={[
              { breakpoint: 640, slidesToShow: 2, showDots: false },
            ]}
            className="pb-8"
          >
            {blogs.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="relative h-30 md:h-48">
                  <Image
                    src={
                      post.image
                        ? `${baseUri}${post.image}`
                        : "/images/blog1.png"
                    }
                    alt={post.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-2 md:p-4">
                  <h3 className="text-sm md:text-lg font-light text-black md:mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm font-light md:mb-2 line-clamp-2">
                    {post.excerpt || ""}
                  </p>
                  <p className="text-gray-600 text-[8px] mb-0">
                    Posted on:{" "}
                    {new Date(post.published_at || post.created_at).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-4xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="relative h-60 lg:h-48 xl:h-60">
                <Image
                  src={
                    post.image
                      ? `${baseUri}${post.image}`
                      : "/images/blog1.png" 
                  }
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-light text-black mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-md font-light mb-3 line-clamp-2">
                  {post.excerpt || ""}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  Posted on:{" "}
                  {new Date(post.published_at || post.created_at).toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" }
                  )}
                </p>
                <p className="text-gray-500 text-xs">
                  Author: {post.author?.name || "Unknown"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-right mt-0 md:mt-6">
          <Link
            href="/blog"
            className="bg-orange-500 text-white text-xs md:text-sm px-4 py-2 md:px-6 md:py-3 rounded-md font-medium hover:bg-orange-600 transition inline-flex items-center"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
