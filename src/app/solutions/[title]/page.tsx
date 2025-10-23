"use client";

import React, { useState, useRef, useEffect } from "react";
import AboutRealtimeBiometrics from "@/components/sections/AboutRealtimeBiometrics";
import RealtimeSystems from "@/components/sections/RealtimeSystems";
import Title from "@/components/common/Title";
import Layout from "@/components/layout/Layout";

// Components for the solutions page
const SolutionsPage = () => {
  // Reference for scrolling tabs
  const tabsRef = useRef<HTMLDivElement>(null);
  // State for checking if scroll buttons should be visible
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  // Check if scroll buttons should be visible
  useEffect(() => {
    const checkScrollable = () => {
      if (tabsRef.current) {
        const { scrollWidth, clientWidth } = tabsRef.current;
        setShowScrollButtons(scrollWidth > clientWidth);
      }
    };

    // Check on initial render and window resize
    checkScrollable();
    window.addEventListener("resize", checkScrollable);

    return () => {
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  return (
    <Layout>
      <Title title="Solutions" />
      <main className=" bg-gray-50">
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
