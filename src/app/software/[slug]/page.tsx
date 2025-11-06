import { Metadata } from "next";
import { cache } from "react";
import axiosClient from "@/services/axiosClient";
import SoftwareDetailClient from "./SoftwareDetailClient";
import AdvancedBreadcrumb from "@/components/common/Bredacrumb";
import Layout from "@/components/layout/Layout";

type Software = {
  id: string;
  slug: string;
  title: string;
  version: string;
  file?: string | null;
  external_url?: string | null;
  price?: string;
  license?: string;
  is_free?: boolean;
  one_line_description?: string;
  description?: string;
  developer?: string;
  requirements?: string[];
  platforms?: string[];
  tags?: string[];
  size?: string | null;
  released_at?: string | null;
  updated_at?: string;
  download_count?: number;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
};

// Cache the data fetching function
const getSoftwareData = cache(
  async (
    slug: string
  ): Promise<{ software: Software | null; error: string | null }> => {
    try {
      console.log(`Fetching software with slug: ${slug}`);

      if (!slug || slug === "undefined") {
        return { software: null, error: "Invalid software slug" };
      }

      const res = await axiosClient.get(`/content/software/${slug}`);

      console.log("API Response:", res.data);

      if (res.data?.success) {
        return { software: res.data.data, error: null };
      } else {
        console.log("API success false:", res.data);
        return { software: null, error: "Failed to load software" };
      }
    } catch (error: any) {
      console.error("Error fetching software:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      if (error.response?.status === 404) {
        return { software: null, error: "Software not found" };
      }

      return {
        software: null,
        error: "Something went wrong while fetching data",
      };
    }
  }
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { software } = await getSoftwareData(slug);

  if (!software) {
    return {
      title: "Software Not Found - Realtime Biometrics",
      description: "The requested software could not be found.",
    };
  }

  const metaTitle =
    software.meta_title ||
    `${software.title} ${software.version} - Download ${
      software.is_free ? "Free" : "Paid"
    } | Realtime Biometrics`;

  const metaDescription =
    software.meta_description ||
    software.one_line_description ||
    (software.description ? software.description.substring(0, 160) : "") ||
    `Download ${software.title} ${software.version} - ${
      software.is_free ? "Free" : "Paid"
    } software by ${software.developer || "Realtime Biometrics"}`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
      url: `https://realtimebiometrics.net/software/${slug}`,
      siteName: "Realtime Biometrics",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
  };
}

export async function generateStaticParams() {
  try {
    console.log("Generating static params...");
    const res = await axiosClient.get("/content/software");
    console.log("Software list response:", res.data);

    const softwares = res.data?.data || [];

    const params = softwares.map((software: Software) => ({
      slug: software.slug,
    }));

    console.log("Generated params:", params);
    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function SoftwareDetailPage({ params }: PageProps) {
  const { slug } = await params;
  console.log("Page params slug:", slug);

  const { software, error } = await getSoftwareData(slug);
  console.log("Page data:", { software, error });
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Software", href: "/software" },
    {label:slug,href:''}
  ];
  return (
    <Layout>
      <AdvancedBreadcrumb items={breadcrumbItems} />
      <SoftwareDetailClient software={software} error={error} />
    </Layout>
  );
}
