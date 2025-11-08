"use client";
import { useEffect, useState } from "react";
import { getSolutionBySlug } from "@/services/solutionServices";
import SolutionDetails from "@/components/sections/SolutionDetails";
import Layout from "@/components/layout/Layout";
import { useParams } from "next/navigation";

export interface Solution {
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
  category: string | null;
  price_range: string | null;
  delivery_time: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  meta_title: string | null;
  created_at: string;
  updated_at: string;
}


const SolutionDetailPage = () => {
  const [solution, setSolution] = useState<Solution | null>(null);
  const params = useParams();
  const title = params?.title as string;




  useEffect(() => {
    const fetchSolution = async () => {
      if (!title) return;
      
      const response = await getSolutionBySlug(title);
      setSolution(response.data); // API response is the data
    };

    fetchSolution();
  }, [title]);




  if (!solution) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading solution details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SolutionDetails solution={solution} />
    </Layout>
  );
};

export default SolutionDetailPage;