import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PopupModal from "../common/PopupModal";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PopupModal />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
