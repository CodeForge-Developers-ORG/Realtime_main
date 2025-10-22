// components/blog/BlogCard.tsx
import React from 'react';
import Link from 'next/link';
import { Blog } from '@/types/blog';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="p-6">
        {/* Category and Reading Time */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-[#ffa78452] text-[#EA5921] text-xs px-2 py-1 rounded">
            {blog.category}
          </span>
          <span className="text-xs text-gray-500">
            {blog.reading_time} min read
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          {blog.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Author and Date */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {blog.author.name.charAt(0)}
            </div>
            <div className="ml-2">
              <p className="text-xs font-medium text-gray-900">
                {blog.author.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(blog.published_at)}
              </p>
            </div>
          </div>

          <Link
            href={`/blog/${blog.slug}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;