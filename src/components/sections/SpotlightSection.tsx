'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@/app/styles/spotlight.css';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SpotlightSection = () => {
  const [images] = useState([
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
  ]);

  useEffect(() => {
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
  }, []);

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

