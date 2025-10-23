import AdvancedBreadcrumb from "@/components/common/Bredacrumb";
import Title from "@/components/common/Title";
import Layout from "@/components/layout/Layout";
import ContactSection from "@/components/sections/ContactSection";
import React from "react";

const page = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Support", href: "/support" },
  ];
  return (
    <Layout>
      <AdvancedBreadcrumb items={breadcrumbItems} />
      <Title title="Support" />
      <ContactSection />
    </Layout>
  );
};

export default page;
