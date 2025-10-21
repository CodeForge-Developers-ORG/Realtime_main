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

      <main className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            {/* About Section */}
            <div className="hidden fle flex-col md:flex-row items-center mb-12 bg-gray-50 p-4 md:p-8 rounded-lg">
              <div className="w-full md:w-1/3 md:pr-8 mb-6 md:mb-0">
                <Image
                  src="/images/solution1.jpg"
                  alt="Realtime Biometrics Solutions"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md w-full h-auto"
                  priority
                />
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">
                  About Realtime Biometrics
                </h2>
                <p className="text-gray-700 mb-4">
                  This is a growing market. Security incidents in schools grab
                  the headlines, emotions and budgets. Realtime aims to also use
                  security technology to improve business processes and
                  strategies.
                </p>
                <p className="text-gray-700">
                  Realtime offers a wide range of solutions to help you
                  streamline your operations and enhance security. Our products
                  are designed with your specific needs in mind, ensuring
                  optimal performance and reliability.
                </p>
              </div>
            </div>
            <AboutRealtimeBiometrics />

            {/* Solutions Navigation */}
            <div className="relative mb-8 hidden ">
              <div className="flex items-center justify-between">
                {showScrollButtons && (
                  <button
                    className="bg-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onClick={() => scrollTabs("left")}
                    aria-label="Scroll tabs left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}

                <div className="overflow-hidden mx-2 flex-grow" ref={tabsRef}>
                  <div>
                    <div className="flex space-x-4 ">
                      {solutions.map((solution) => (
                        <button
                          key={solution.id}
                          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors cursor-pointer ${
                            activeTab === solution.id
                              ? "bg-yellow-400 text-gray-800"
                              : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
                          }`}
                          onClick={() => setActiveTab(solution.id)}
                          onKeyDown={(e) => handleTabKeyDown(e, solution.id)}
                          aria-selected={activeTab === solution.id}
                          role="tab"
                          tabIndex={0}>
                          {solution.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {showScrollButtons && (
                  <button
                    className="bg-gray-200 rounded-full cursor-pointer p-2 hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onClick={() => scrollTabs("right")}
                    aria-label="Scroll tabs right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Solution Content Sections */}
            <div className="space-y-6 hidden">
              {contentItems
                .filter(
                  (item) => activeTab === "about" || activeTab === item.type
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="p-4 md:p-6 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-300"
                    tabIndex={0}>
                    <div className="flex flex-col md:flex-row md:items-start">
                      <div className="flex-shrink-0 bg-orange-50 rounded-full p-2 mb-4 md:mb-0 md:mr-4 w-10 h-10 flex items-center justify-center">
                        <span className="font-semibold text-orange-500">
                          {item.id}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <RealtimeSystems />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SolutionsPage;
