import { Metadata } from "next";
import DOMPurify from "./dompurifire";
import { getCookiePolicyData } from "@/services/cookiePolicyService";
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

const CookiePolicyPage = async () => {
  let decodedContent = "";

  try {
    const res = await getCookiePolicyData();
    if (res.success && res.data) {
      const encodedContent = res.data.content;
      decodedContent = decodeURIComponent(
        encodedContent
          .replace(/\"/g, '"')
          .replace(/\\/g, "")
          .replace(/\n/g, "")
          .replace(/\r/g, "")
      );
    } else {
      decodedContent = "<p>No content found.</p>";
    }
  } catch (error) {
    console.error("Failed to fetch cookie policy data:", error);
    decodedContent = "<p>Error loading content. Please try again later.</p>";
  }

  const sanitizedContent = DOMPurify.sanitize(decodedContent);

  return (
    <Layout>
      <div className="prose max-w-none p-6 bg-white rounded-lg shadow-md min-h-screen">
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </div>
    </Layout>
  );
};

export default CookiePolicyPage;
