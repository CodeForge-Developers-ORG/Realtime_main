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
        responsive={[
          {
            breakpoint: 768,
            showDots: false,
            slidesToShow: 1
          }
        ]}
      >
        {heroSlides.map((slide) => (
          <div key={slide.id} className="relative w-full">
            <div className="relative">
              <Image 
                src={slide.imageUrl}
                alt={slide.altText}
                width={0}
                height={0}
                sizes="60vw"
                className="w-[100vw] h-[28vh] sm:h-[60vh] md:h-[70vh] lg:h-[82vh] object-cover relative z-10"
                priority
                unoptimized
              />
       
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSection;