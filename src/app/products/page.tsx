import Title from "@/components/common/Title";
import CatalogClient from "@/components/products/CatalogClient";
import React from "react";

const page = () => {
  return (
    <>
      <Title title="Products" />
      <CatalogClient />
    </>
  );
};

export default page;
