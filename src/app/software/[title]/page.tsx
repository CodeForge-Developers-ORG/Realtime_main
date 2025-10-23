import AdvancedBreadcrumb from "@/components/common/Bredacrumb";
import Title from "@/components/common/Title";
import Layout from "@/components/layout/Layout";
import DownloadSoftware from "@/components/software/DownloadSoftware";
import React from "react";

const page = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Software", href: "/software" },
  ];
  return (
    <Layout>
      <AdvancedBreadcrumb items={breadcrumbItems} />
      <Title title="Software" />
      <DownloadSoftware />
    </Layout>
  );
};

export default page;
