import { getPrivacyData } from "@/services/privacyService";
import { Metadata } from "next";
import DOMPurify from "./dompurifire";
import Layout from "@/components/layout/Layout";

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "Privacy Policy | Realtime Biomatrix",
  description:
    "Read Realtime Biomatrix’s privacy policy on biometric data handling, data protection, and user rights.",
};

// ✅ Fetch policy data (server-side)
async function getPrivacyPolicy() {
  try {
    const res = await getPrivacyData();
    return res.data;
  } catch (error) {
    console.error("Privacy Policy Fetch Error:", error);
    return null;
  }
}

// ✅ Safe decode function (same logic as disclaimer)
function safeDecodeContent(raw: string = ""): string {
  try {
    if (!raw) return "";
    const cleaned = raw
      .replace(/\\u003C/g, "<")
      .replace(/\\u003E/g, ">")
      .replace(/\\u0026/g, "&")
      .replace(/\\n/g, "")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\")
      .replace(/\r/g, "");
    return decodeURIComponent(cleaned);
  } catch (err) {
    console.error("Decode Error:", err);
    return raw;
  }
}

// ✅ Page component
export default async function PrivacyPolicyPage() {
  const policy = await getPrivacyPolicy();

  if (!policy) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Privacy Policy</h1>
        <p className="text-gray-700">
          Unable to load content. Please try again later.
        </p>
      </section>
    );
  }

  // Use the safer decoder
  const decodedContent = safeDecodeContent(policy.content);
  const sanitizedContent = DOMPurify.sanitize(decodedContent || "");

  return (
    <Layout>
      <section className="min-h-screen bg-white py-16 px-6 md:px-12 lg:px-28">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 text-center">
            {policy.title}
          </h1>

          <article
            className="prose prose-gray text-black max-w-none prose-h2:text-2xl prose-h2:font-semibold prose-a:text-black hover:prose-a:underline prose-strong:font-semibold prose-li:marker:text-gray-700"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      </section>
    </Layout>
  );
}
