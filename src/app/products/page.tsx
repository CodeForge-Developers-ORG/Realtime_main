import Title from "@/components/common/Title";
import Layout from "@/components/layout/Layout";
import CatalogClient from "@/components/products/CatalogClient";
import React from "react";

const page = () => {
  return (
    <Layout>
      <Title title="Products" />
      <CatalogClient />
    </Layout>
  );
};

export default page;
