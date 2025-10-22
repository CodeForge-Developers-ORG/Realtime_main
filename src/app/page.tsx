import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ProductsSection from '@/components/sections/ProductsSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import ContactSection from '@/components/sections/ContactSection';
import BlogSection from '@/components/sections/BlogSection';
import SpotlightSection from '@/components/sections/SpotlightSection'
import ServicesSections from '@/components/sections/ServicesSections'
import TestimonialCarousel from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <SpotlightSection />
      <ServicesSections/>
      <ProductsSection />
      <SolutionsSection />
      <TestimonialCarousel />
      <ContactSection />
      <BlogSection />
    </Layout>
  );
}
