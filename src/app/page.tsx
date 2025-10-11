import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';
import BlogSection from '@/components/sections/BlogSection';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <SolutionsSection />
      <TestimonialsSection />
      <ContactSection />
      <BlogSection />
    </Layout>
  );
}
