"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
// Removing unused imports
import { useRouter } from "next/navigation";
import AboutRealtimeBiometrics from "@/components/sections/AboutRealtimeBiometrics";
import RealtimeSystems from "@/components/sections/RealtimeSystems";
import Footer from "@/components/layout/Footer";
import Title from "@/components/common/Title";
import Layout from "@/components/layout/Layout";

// Components for the solutions page
const SolutionsPage = () => {
  // Removing unused router variable

  // Define all solution tabs
  const solutions = [
    {
      id: "about",
      title: "About Realtime Biometrics",
    },
    {
      id: "office",
      title: "Office Management System",
    },
    {
      id: "school",
      title: "School Management System",
    },
    {
      id: "visitor",
      title: "Visitor Management System",
    },
    {
      id: "finance",
      title: "Finance Management System",
    },
    {
      id: "cloud",
      title: "Cloud Attendance and Payroll Software",
    },
  ];

  // State for active tab - default to office to match reference image
  const [activeTab, setActiveTab] = useState("office");

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

  // Function to scroll tabs left or right
  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      if (direction === "left") {
        tabsRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        tabsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  // Handle tab change with keyboard
  const handleTabKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveTab(tabId);
    }
  };

  // Content items to display based on the reference image
  const contentItems = [
    {
      id: "1",
      type: "office",
      title: "Office Management System",
      description:
        "Realtime Office Management System is a comprehensive solution for managing office operations. It includes features for access control, time and attendance tracking, and visitor management. Perfect for businesses of all sizes looking to enhance security and streamline operations in a cost-effective manner.",
    },
    {
      id: "2",
      type: "school",
      title: "School Management System",
      description:
        "Realtime School Management System helps educational institutions enhance security and streamline administrative tasks. With features like student attendance tracking, secure access control, and emergency protocols, our system is designed to create a safer learning environment while reducing administrative burden.",
    },
    {
      id: "3",
      type: "office",
      title: "Office Management System",
      description:
        "Our Office Management System provides advanced security features including biometric access control, time and attendance tracking, and comprehensive reporting. The system is designed to integrate seamlessly with your existing infrastructure, providing a robust solution for modern office environments.",
    },
    {
      id: "4",
      type: "school",
      title: "School Management System",
      description:
        "The School Management System offers a complete solution for educational institutions of all sizes. From attendance tracking to secure facility access, our system helps schools maintain a safe environment while improving operational efficiency and providing valuable insights through detailed reporting.",
    },
    {
      id: "5",
      type: "visitor",
      title: "Visitor Management System",
      description:
        "Realtime Visitor Management System streamlines the visitor check-in process while enhancing security. Features include pre-registration, ID verification, badge printing, and automated host notifications. The system maintains a comprehensive log of all visitors for security and compliance purposes.",
    },
    {
      id: "6",
      type: "finance",
      title: "Finance Management System",
      description:
        "Our Finance Management System provides secure identity verification and transaction processing for financial institutions. With multi-factor authentication and advanced fraud prevention features, the system helps protect sensitive financial data and ensure regulatory compliance.",
    },
    {
      id: "7",
      type: "cloud",
      title: "Cloud Attendance and Payroll Software",
      description:
        "Realtime Cloud Attendance and Payroll Software integrates seamlessly to automate wage calculations based on accurate attendance data. This cloud-based solution eliminates manual processes, reduces errors, and provides real-time access to critical payroll and attendance information from anywhere.",
    },
  ];

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
