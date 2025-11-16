"use client";

import React from "react";
import AboutRealtimeBiometrics from "@/components/sections/AboutRealtimeBiometrics";
import RealtimeSystems from "@/components/sections/RealtimeSystems";
import Title from "@/components/common/Title";
import Layout from "@/components/layout/Layout";

// Components for the solutions page
const SolutionsPage = () => {
  // Removing unused router variable


  return (
    <Layout>
      <Title title="Solutions" />
      <main className=" bg-gray-50">
        {/* Page Header */}
        <div className="bg-gray-50 py-4 h-auto">
          <div className="container-fluid mx-auto px-4">
            <AboutRealtimeBiometrics />
            <RealtimeSystems />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SolutionsPage;
