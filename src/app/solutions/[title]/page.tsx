"use client";
import { useEffect, useState } from "react";
import { getSolutionBySlug } from "@/services/solutionServices";
import SolutionDetails from "@/components/sections/SolutionDetails";
import Layout from "@/components/layout/Layout";
import { useParams } from "next/navigation";

const SolutionDetailPage = () => {
  const [solution, setSolution] = useState<any>(null);
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