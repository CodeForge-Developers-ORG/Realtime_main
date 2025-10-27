import Link from 'next/link';
import Slider from '../ui/Slider';
import Image from 'next/image';

// Define types for CMS integration
interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  features: Feature[];
  ctaText?: string;
  ctaUrl?: string;
  bgColor: string;
  textColor: string;
  image: string;

}

interface Feature {
  id: string;
  name: string;
  icon: string;
}

// Sample data - this would come from your CMS
const heroSlides: SlideItem[] = [
  {
    id: '1',
    title: 'Glass Door Lock',
    subtitle: 'SMART WIFI',
    features: [
      { id: 'f1', name: 'FINGER PRINT UNLOCK', icon: '👆' },
      { id: 'f2', name: 'RFID CARD UNLOCK', icon: '💳' },
      { id: 'f3', name: 'WIFI SMART LOCK', icon: '📶' },
      { id: 'f4', name: 'ACCESS CONTROL', icon: '🔐' },
      { id: 'f5', name: 'PASSWORD UNLOCK', icon: '🔢' }
    ],
    ctaText: 'GLS 700',
    ctaUrl: '/products/door-lock',
    bgColor: 'bg-[#FFF6F5]',
    textColor: 'text-[#FF9E80]',
    image: '/images/smart-door-lock.png',
  },
  {
    id: '2',
    title: 'Smart Home Security',
    subtitle: 'EASY INSTALLATION',
    features: [
      { id: 'f1', name: 'FINGER PRINT UNLOCK', icon: '👆' },
      { id: 'f2', name: 'RFID CARD UNLOCK', icon: '💳' },
      { id: 'f3', name: 'WIFI SMART LOCK', icon: '📶' },
      { id: 'f4', name: 'ACCESS CONTROL', icon: '🔐' },
      { id: 'f5', name: 'PASSWORD UNLOCK', icon: '🔢' }
    ],
    ctaText: 'View Guide',
    ctaUrl: '/installation',
    bgColor: 'bg-[#FFF5F2]',
    textColor: 'text-[#FF9E80]',
    image: '/images/smart-door-lock.png',

  }
];

const HeroSection = () => {
  return (
    <section className="bg-[#FFF5F2]">
      <Slider
        autoPlay={true}
        autoPlayInterval={5000}
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
          <div key={slide.id} className={`relative w-full ${slide.bgColor} min-h-[60vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[82vh] flex  justify-center overflow-hidden`}>
            {/* Center shadow effect */}
            <div className="absolute z-10  inset-0 flex justify-center items-center">
              <div className="w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(255,200,200,0.8),transparent_70%)] blur-3xl "></div>
            </div>
            <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
               <div className="absolute  text-center left-[30%] sm:left-[47%] top-3 sm:top-7 px-7 py-1 mb-4 rounded-full text-black bg-yellow-500 text-xs sm:text-lg tracking-wide font-medium">
                    {slide.subtitle}
                  </div>
                   {slide.ctaText && (
                    <Link href={slide.ctaUrl || '#'} className=" absolute top-11 sm:top-16 left-[43%] sm:left-[52%] px-7 py-1 bg-[#1E1410] text-white text-xs sm:text-lg uppercase rounded-full hover:bg-gray-800 transition-colors transform-3d z-1" style={{ transform: 'rotate(-5deg)' }}>
                      {slide.ctaText}
                    </Link>
                  )}
                <h1 className={`text-[40px] sm:text-[60px] md:text-[80px] leading-none lg:text-[110px] mb-6 relative  left-0 md:left-0 top-12 sm:top-20 md:top-0 text-[#F8D1C7] text-center whitespace-wrap sm:whitespace-nowrap`} style={{ fontWeight: 'bolder' }}>
                    {slide.title}
                </h1>
                  <div className="w-full  relative">
                    <div className="absolute inset-0 top-[30px] sm:top-[100px] md:top-[-50px] mx-auto w-[230px] sm:w-[280px] md:w-[400px] h-[280px] sm:h-[400px] md:h-[500px]">
                      {/* Smart Lock Device */}
                      <Image
                        src={slide.image}
                        width={400}
                        height={500}
                        className="object-contain"
                        alt="Smart Door Lock"
                        priority
                      />

                      {/* Feature Labels */}
                      {slide.features.map((feature, index) => {
                        const positions = [
                          'absolute -left-10 sm:-left-40 md:-left-50 bottom-40 md:bottom-70',
                          'absolute -left-10 sm:-left-30 md:-left-35 bottom-25 md:bottom-46',
                          'absolute -right-10 sm:-right-30 md:-right-35 bottom-40 md:bottom-72',
                          'absolute -right-10 sm:-right-40 md:-right-45 bottom-25 md:bottom-50',
                          'absolute right-15 sm:-right-35 md:-right-40 bottom-5 sm:bottom-10 md:bottom-22',
                        ];

                        return (
                          <div key={feature.id} className={`${positions[index]} bg-[#ffefec]/40 backdrop-blur-md border border-white/40 px-2 sm:px-6 py-1 sm:py-3 rounded-full shadow-md text-[10px] sm:text-sm md:text-xl flex items-center w-auto z-20`}>
                            <span className="mr-1">{feature.icon}</span>
                            <span className="font-medium text-black tracking-wide">{feature.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSection;