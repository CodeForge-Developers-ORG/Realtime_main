import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ContactSection from "@/components/sections/ContactSection";
import BlogSection from "@/components/sections/BlogSection";
import SpotlightSection from "@/components/sections/SpotlightSection";
import ServicesSections from "@/components/sections/ServicesSections";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialCarousel from "@/components/sections/Testimonials";
import StatsCounter from "@/components/sections/StatsCounter";

type SiteSectionConfig = {
  key: string;
  component: string;
  title?: string;
  enabled?: boolean;
  order?: number;
};

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  HeroSection,
  SpotlightSection,
  ServicesSections,
  FeaturesSection,
  StatsCounter,
  SolutionsSection,
  TestimonialCarousel,
  BlogSection,
  ContactSection,
};

async function fetchSiteSections(): Promise<SiteSectionConfig[]> {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "https://app.realtimebiometrics.net/api";
    const res = await fetch(`${base}/site/sections`, { cache: "no-store" });
    const json = await res.json();
    const list = Array.isArray(json?.data) ? (json.data as SiteSectionConfig[]) : [];
    return list;
  } catch (e) {
    console.error("Failed to fetch site sections", e);
    return [];
  }
}

export default async function Home() {
  const apiSections = await fetchSiteSections();
  const activeSections = apiSections
    .filter((s) => s.enabled)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Fallback to default static order if API returns nothing
  const defaultOrder = [
    "HeroSection",
    "SpotlightSection",
    "ServicesSections",
    "FeaturesSection",
    "StatsCounter",
    "SolutionsSection",
    "TestimonialCarousel",
    "BlogSection",
    "ContactSection",
  ];

  const sectionsToRender: SiteSectionConfig[] =
    activeSections.length > 0
      ? activeSections
      : defaultOrder.map((name, idx) => ({ key: name, component: name, enabled: true, order: idx + 1 }));

  return (
    <Layout>
      <div className="space-y-8 bg-white">
        {sectionsToRender.map((s, idx) => {
          const Comp = SECTION_COMPONENTS[s.component];
          if (!Comp) return null;
          return <Comp key={`${s.component}-${s.key}-${idx}`} />;
        })}
      </div>
    </Layout>
  );
}
