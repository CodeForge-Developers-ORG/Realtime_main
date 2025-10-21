import Title from "@/components/common/Title";
import Layout from "@/components/layout/Layout";
import ContactSection from "@/components/sections/ContactSection";
import React from "react";

const page = () => {
  return (
    <Layout>
      <Title title="Support" />
      <ContactSection />
    </Layout>
  );
};

export default page;
