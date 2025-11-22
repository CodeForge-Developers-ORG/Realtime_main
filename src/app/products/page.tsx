import AdvancedBreadcrumb from "@/components/common/Bredacrumb";
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
      <section className="pt-0 pb-0">
        <div className="max-w-7xl mx-auto px-4 lg:px-10">
          <div className="flex justify-center">
            <h1 className="section-title">Products</h1>
          </div>
          <p className="section-subtitle text-center max-w-2xl mx-auto">
            Explore our product catalog.
          </p>
        </div>
      </section>
      <CatalogClient />
    </Layout>
  );
};

export default page;
