// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { blogService } from "@/services/blogService";
import { notFound } from "next/navigation";
import SingleBlogPage from "@/components/blog/SingleBlogPage";
import Layout from "@/components/layout/Layout";
import AdvancedBreadcrumb from "@/components/common/Bredacrumb";

interface Props {
  params: {
    slug: string;
  };
}

// ✅ Generate metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const response = await blogService.getBlogBySlug(params.slug);

    if (!response.success || response.data.length === 0) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const blog = response.data[0];

    return {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt,
      keywords: blog.tags.join(", "),
      authors: [{ name: blog.author.name }],
      openGraph: {
        title: blog.meta_title || blog.title,
        description: blog.meta_description || blog.excerpt,
        type: "article",
        publishedTime: blog.published_at,
        authors: [blog.author.name],
        tags: blog.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: blog.meta_title || blog.title,
        description: blog.meta_description || blog.excerpt,
      },
    };
  } catch {
    // ⚡ Ignore error silently but return fallback metadata
    return {
      title: "Blog Post",
      description: "Read this amazing blog post",
    };
  }
}

// ✅ Generate static paths for SSG
export async function generateStaticParams() {
  try {
    const response = await blogService.getPublishedBlogs({ per_page: 50 });

    // Unique slugs ke saath paths generate karo
    const uniqueSlugs = new Set<string>();
    const paths: { slug: string }[] = [];

    for (const blog of response.data) {
      if (blog.slug && !uniqueSlugs.has(blog.slug)) {
        uniqueSlugs.add(blog.slug);
        paths.push({ slug: blog.slug });
      }
    }

    return paths;
  } catch {
    // ⚡ Error ignore, empty list return
    return [];
  }
}

// ✅ Page component
export default async function BlogDetailPage({ params }: Props) {
  try {
    const response = await blogService.getBlogBySlug(params.slug);

    if (!response.success || response.data.length === 0) {
      notFound();
    }

    const blog = response.data[0];
    const breadcrumbItems = [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: blog.title }, // Current page - no href
    ];

    return (
      <Layout>
        <AdvancedBreadcrumb items={breadcrumbItems} />
        <SingleBlogPage blog={blog} />
      </Layout>
    );
  } catch {
    notFound();
  }
}
