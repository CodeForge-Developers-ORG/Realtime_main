// components/LayoutWrapper.tsx
"use client";

import React from "react";
import Footer from "./Footer";
import PopupModal from "../common/PopupModal";
import Header from "./Header";

interface LayoutWrapperProps {
  children: React.ReactNode;
  headerData: any;
}

const LayoutWrapper = ({ children, headerData }: LayoutWrapperProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header initialData={headerData} />
      {/* <PopupModal /> */}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutWrapper;