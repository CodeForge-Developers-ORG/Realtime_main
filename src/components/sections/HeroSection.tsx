import Image from 'next/image';
import Link from 'next/link';
import Slider from '../ui/Slider';

// Define types for CMS integration
interface SlideItem {
  id: string;
  imageUrl: string;
  altText: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
}

// Sample data - this would come from your CMS
const heroSlides: SlideItem[] = [
  {
    id: '1',
    imageUrl: '/images/banner.png',
    altText: 'Glass Door Lock',
    title: 'Smart Door Lock',
    description: 'Advanced security for your home',
    ctaText: 'Learn More',
    ctaUrl: '/products/door-lock'
  },
  {
    id: '2',
    imageUrl: '/images/banner.png',
    altText: 'Glass Door Lock',
    title: 'Easy Installation',
    description: 'Set up in minutes with no special tools',
    ctaText: 'View Guide',
    ctaUrl: '/installation'
  }
];

const HeroSection = () => {
  return (
    <section className="bg-[#FFF5F2] from-pink-100 to-orange-50">
      <Slider 
        autoPlay={true}
        autoPlayInterval={3000}
        showArrows={false}
        showDots={true}
        slidesToShow={1}
      >
        {heroSlides.map((slide) => (
          <div key={slide.id} className="relative h-full w-full object-contain">
            <Image 
              src={slide.imageUrl}
              alt={slide.altText}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-[82vh] relative z-10"
              style={{ width: '100%' }}
              unoptimized
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSection;