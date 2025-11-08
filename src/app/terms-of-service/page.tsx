import { getTermsData } from "@/services/termsService";
import { Metadata } from "next";
import DOMPurify from "./dompurifire";
import Layout from "@/components/layout/Layout";

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "Terms of Service | Realtime Biomatrix",
  description:
    "Read Realtime Biomatrix's terms of service for using our biometric solutions and services.",
};

// ✅ Fetch terms data (server-side)
async function getTermsOfService() {
  try {
    const res = await getTermsData();
    return res.data;
  } catch (error) {
    console.error("Terms of Service Fetch Error:", error);
    return null;
  }
}

// ✅ Helper: Decode escaped Unicode HTML (like \u003Cdiv → <div>)
function decodeHTML(html: string) {
  if (!html) return "";
  return html
    .replace(/\\u003C/g, "<")
    .replace(/\\u003E/g, ">")
    .replace(/\\u0026/g, "&")
    .replace(/\\n/g, "\n");
}

// ✅ Page component
export default async function TermsOfServicePage() {
  const terms = await getTermsOfService();

  if (!terms) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Terms of Service</h1>
        <p className="text-gray-500">Unable to load content. Please try again later.</p>
      </section>
    );
  }

  const decodedContent = decodeHTML(terms.content);
  const sanitizedContent = DOMPurify.sanitize(decodedContent);

  return (
    <Layout>
    <section className="min-h-screen bg-white py-16 px-6 md:px-12 lg:px-28">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 text-center">
          {terms.title}
        </h1>

        <article
          className="text-black prose prose-gray max-w-none prose-h2:text-2xl prose-h2:font-semibold prose-a:text-blue-600 hover:prose-a:underline prose-strong:font-semibold prose-li:marker:text-gray-500"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
    </section>
    </Layout>
  );
}