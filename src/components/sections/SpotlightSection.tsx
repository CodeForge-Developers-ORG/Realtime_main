'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@/app/styles/spotlight.css';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SpotlightSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  // const gsapContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const images = [
    {
      src: '/images/serviceBanner1.png',
      title: 'SMART LOCKS'
    },
    {
      src: '/images/serviceBanner2.png',
      title: 'ACCESS CONTROL'
    },
    {
      src: '/images/serviceBanner3.png',
      title: 'Customer-Centric Approach'
    },
    {
      src: '/images/serviceBanner4.png',
      title: 'OUR MISSION'
    },
    {
      src: '/images/serviceBanner5.png',
      title: 'OUR VISSION'
    },
  ];

  // Check if we're on mobile and set state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // GSAP animation for desktop
  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) return;

    // Initialize ScrollTrigger
    const sections = gsap.utils.toArray('.banner-item');
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.scrolling-section',
        start: 'center center+=50', // Changed from 'center+20 center' to start animation lower
        pin: '.scrolling-section',
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        end: () => '+=' + ((document.querySelector('.banner-container') as HTMLElement)?.offsetWidth || 0),
      },
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  // Mobile view
  if (isMobile) {
    return (
      <section className="bg-[#FFE8DF] pt-4 md:pt-6 pb-4">
        <div className="container-fluid px-2 md:px-4 mx-auto relative">
          <div className="text-center bg-[#FFE8DF] py-2 mb-3  md:mb-6">
            <h2 className="text-[15px] sm:text-3xl text-black md:tracking-[2] font-thin md:mb-2">World-Class Biometric & Security Solutions</h2>
            <p className="text-[10px] md:text-base font-thin md:font-light text-black/70 md:tracking-[1]">Innovating smarter, safer access for homes, businesses, and enterprises.</p>
          </div>

          <div className="relative pb-0 h-[20vh]">
            <div
              ref={scrollRef}
              className="scroll-container flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
            >
              {images.map((item, index) => (
                <div
                  className="scroll-item w-full  flex-shrink-0 snap-center px-2 hide-scrollbar"
                  key={index}
                >
                  <div className="relative rounded-lg shadow-lg overflow-hidden w-full">
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={500}
                      height={400}
                      sizes="55vw"
                      className="h-[15vh] w-[100%] transition-transform hover:scale-105 duration-300"
                      priority={index < 2}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-3 mb-1 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-500 focus:bg-gray-700"
                  onClick={() => {
                    if (scrollRef.current) {
                      const scrollItems = scrollRef.current.querySelectorAll('.scroll-item');
                      if (scrollItems[index]) {
                        scrollItems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
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
    <section className="spotlight-section bg-[#FFE8DF]">
      <div className="container-fluid px-14 mx-auto py-14 relative">
        <div className="text-center mb-8 sticky top-20 bg-[#FFE8DF]">
          <h2 className="text-5xl text-black tracking-[2] font-thin mb-3">World-Class Biometric & Security Solutions</h2>
          <p className="text-2xl text-black/70 tracking-[1] mb-15">Innovating smarter, safer access for homes, businesses, and enterprises.</p>
        </div>
        
        <div className="scrolling-section mt-5">
          <div className="banner-container overflow-hidden relative ">
            <div className="scrolling-banner">
              {images.map((item, index) => (
                <div className="banner-item" key={index}>
                  <div className="relative">
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={0}
                      height={0}
                      className='h-auto w-full'
                      unoptimized
                    />
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

