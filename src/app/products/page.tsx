import AdvancedBreadcrumb from "@/components/common/Bredacrumb";
import Title from "@/components/common/Title";
import Layout from "@/components/layout/Layout";
import CatalogClient from "@/components/products/CatalogClient";
import React from "react";

const page = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];
  return (
    <Layout>
      <AdvancedBreadcrumb items={breadcrumbItems} />
      <Title title="Products" />
      <CatalogClient />
    </Layout>
  );
};

export default page;
