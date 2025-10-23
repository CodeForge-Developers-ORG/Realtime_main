// components/blog/SingleBlogPage.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Blog } from "@/types/blog";

interface SingleBlogPageProps {
  blog: Blog;
}

const SingleBlogPage: React.FC<SingleBlogPageProps> = ({ blog }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Convert HTML content to React elements safely
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}

        {/* Article Container */}
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Article Header */}
          <div className="p-8 border-b border-gray-100">
            {/* Category and Reading Time */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                  {blog.category}
                </span>
                <span className="flex items-center gap-1 text-gray-500 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {blog.reading_time} min read
                </span>
              </div>

              <div className="text-sm text-gray-500">
                Updated: {formatDate(blog.updated_at)}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Author and Date */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {blog.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {blog.author.name}
                  </p>
                  <p className="text-sm text-gray-500">{blog.author.email}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Published on</p>
                <p className="font-medium text-gray-900">
                  {formatDate(blog.published_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-strong:text-gray-900
                prose-ul:text-gray-700
                prose-ol:text-gray-700
                prose-li:text-gray-700
                prose-blockquote:border-blue-500 prose-blockquote:text-gray-600
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100 text-gray-600"
              dangerouslySetInnerHTML={createMarkup(blog.content)}
            />
          </div>

          {/* Article Footer */}
          <div className="p-8 border-t border-gray-100 bg-gray-50">
            {/* Tags */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-white border border-gray-300 text-gray-700 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-900">Published:</span>{" "}
                {formatDate(blog.published_at)}
              </div>
              <div>
                <span className="font-medium text-gray-900">Last Updated:</span>{" "}
                {formatDate(blog.updated_at)}
              </div>
              <div>
                <span className="font-medium text-gray-900">Reading Time:</span>{" "}
                {blog.reading_time} minutes
              </div>
            </div>
          </div>
        </article>

        {/* Back to Blog Link */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
