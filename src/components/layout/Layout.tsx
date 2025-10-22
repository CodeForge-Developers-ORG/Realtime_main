import React from "react";
import Footer from "./Footer";
import PopupModal from "../common/PopupModal";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <PopupModal /> */}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
