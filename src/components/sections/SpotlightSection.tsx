'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import '@/app/styles/spotlight.css';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define the card data structure
interface CardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bgColor: string;
  images: string;
}

const SpotlightSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Dynamic card data
  const cards: CardData[] = [
    {
      id: 'innovation',
      title: 'Innovation at Core',
      subtitle: 'Pioneering fingerprint and biometric solutions.',
      description: 'Cutting-edge technology built on our own proprietary systems.',
      bgColor: 'bg-[#EA5921]',
      images: '/images/spotlight1.png',
    },
    {
      id: 'security',
      title: 'Advanced Security',
      subtitle: 'Military-grade encryption for all devices.',
      description: 'Secure authentication with multi-factor verification systems.',
      bgColor: 'bg-[#EFAF00]',
      images: '/images/spotlight2.png',
    },
    {
      id: 'reliability',
      title: 'Unmatched Reliability',
      subtitle: '99.9% uptime with failsafe mechanisms.',
      description: 'Trusted by government agencies and Fortune 500 companies.',
      bgColor: 'bg-[#EA5921]',
      images: '/images/spotlight5.png',
    },
    {
      id: 'integration',
      title: 'Seamless Integration',
      subtitle: 'Works with all major smart home systems.',
      description: 'Easy installation and configuration for any environment.',
      bgColor: 'bg-[#EFAF00]',
      images: '/images/spotlight2.png',
    },
    {
      id: 'support',
      title: '24/7 Support',
      subtitle: 'Expert assistance whenever you need it.',
      description: 'Dedicated team of specialists for all your security needs.',
      bgColor: 'bg-[#EA5921]',
      images: '/images/spotlight5.png',
    },
  ];

  // Check if we're on mobile and set state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // GSAP animation for desktop
  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) return;

    // Initialize ScrollTrigger
    const sections = gsap.utils.toArray('.banner-item');
    
    // Create a timeline for the horizontal scrolling
     const tl = gsap.timeline({
        ease: "none",
       scrollTrigger: {
         trigger: '.scrolling-section',
          start: 'top-=200 top', // Adjusted to start much higher on the page
         end: () => '+=' + ((document.querySelector('.banner-container') as HTMLElement)?.offsetWidth || 0) * 0.8,
         pin: true,
         pinSpacing: true,
         scrub: 1.2,
         anticipatePin: 0,
         preventOverlaps: true,
         refreshPriority: 1,
         onEnter: () => {
           // Prevent default scroll behavior when entering the trigger area
           document.body.style.overflow = 'auto';
         },
         onLeave: () => {
           // Restore default scroll behavior when leaving the trigger area
           document.body.style.overflow = 'auto';
         }
       }
     });
    
    // Add the animation to the timeline
    tl.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      duration: 1
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.body.style.overflow = 'auto';
    };
  }, [isMobile]);

  // Mobile view
  if (isMobile) {
    return (
      <section className="lg:hidden bg-white pt-2 md:pt-6 pb-0">
        <div className="container-fluid px-4 mx-auto relative">
          <div className="text-center py-4 mb-6">
            <h2 className="text-xl sm:text-3xl text-black font-thin ">
              World-Class Biometric Solutions
            </h2>
            <p className="text-xs font-light text-black/70">
              Innovating smarter, safer access for all.
            </p>
          </div>

          <div className="relative pb-2">
            <div
              ref={scrollRef}
              className="scroll-container flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4"
            >
              {cards.map((card) => (
                <div className="scroll-item w-[85vw] flex-shrink-0 snap-center" key={card.id}>
                  <div
                    className={`relative rounded-xl  shadow-lg ${card.bgColor} text-white pb-0 px-4  pt-4 h-[200px] flex flex-col`}
                  >
                    <h3 className="text-xl font-light mb-2">{card.title}</h3>

                    <div className='flex h-full '>
                      <div className='w-[50%]'>
                      <p className="text-[10px] leading-3 bg-white text-black rounded-lg p-1 mb-2 inline-block line-clamp-3">
                      {card.subtitle}
                    </p>
                      <p className="text-[10px] leading-3 bg-white text-black rounded-lg p-1 line-clamp-3">
                        {card.description}
                      </p>
                      </div>
                    <div className="flex items-end w-[80%] h-[100%] justify-end mt-0 relative">
                      <Image
                        src={card.images}
                        alt={card.id}
                        height={500}
                        width={400}
                        className="h-full w-full object-cover "
                      />
                    </div>
                    </div>


                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-0 gap-1">
              {cards.map((card, index) => (
                <button
                  key={index}
                  className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-500 focus:bg-gray-700"
                  onClick={() => {
                    if (scrollRef.current) {
                      const scrollItems = scrollRef.current.querySelectorAll('.scroll-item');
                      if (scrollItems[index]) {
                        scrollItems[index].scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest',
                          inline: 'center',
                        });
                      }
                    }
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop view with GSAP
  return (
    <section className="hidden lg:block spotlight-section bg-white relative py-14">
      <div className="text-center sticky top-14  bg-white mb-[10%]">
        <h2 className="text-3xl lg:text-4xl text-black font-thin mb-3">
          World-Class Biometric Solutions
        </h2>
        <p className="text-sm lg:text-[15px] uppercase text-black/80 font-light mb-6">
          Innovating smarter, safer access for all.
        </p>
      </div>

      <div className="container-fluid px-8 lg:px-14 mx-auto ">
        <div className="scrolling-section">
          <div className="banner-container ">
            <div className="scrolling-banner">
              {cards.map((card) => (
                <div className="banner-item" key={card.id}>
                  <div
                    className={`relative ${card.bgColor} text-white rounded-2xl overflow-hidden shadow-xl mx-4 h-110  flex flex-col p-8 lg:pb-0 lg:p-12`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex relative flex-col lg:flex-row items-center justify-center h-full">
                        <h3 className="text-4xl w-1/4 pe-20 lg:text-6xl font-light mb-4 absolute inset-0">
                          {card.title}
                        </h3>
                        <div className="flex item-end justify-end w-1/2 h-[500px] ">
                          <Image
                            src={card.images}
                            alt={card.id}
                            height={600}
                            width={600}
                            className="h-full w-full object-contain absolute -right-10 bottom-0"
                          />
                        </div>
                        <div className=" w-1/4 h-full relative">
                          <div className="bg-white text-black w-fit p-4 rounded-xl shadow-md absolute top-1 -left-20">
                            <p className="font-medium text-lg">{card.subtitle}</p>
                          </div>
                          <div className="bg-white text-black w-fit p-4 rounded-xl shadow-md  absolute -left-20 top-1/3 ">
                            <p className='text-lg font-medium'>{card.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
