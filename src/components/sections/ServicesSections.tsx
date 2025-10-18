"use client"
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@/app/styles/spotlight.css';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Define service card data outside the component
const serviceCardsData = [
  {
    id: 1,
    src: '/images/serviceImg1.png',
    alt: 'Attendance Recorder',
    title:'Realtime Attendance Cum Access Control',
    description:'Realtime makes simple work of the repetitive errands required with observing representative time...',
    buttonText:'Know More'
  },
  {
    id: 2,
    src: '/images/serviceImg2.png',
    alt: 'Access Control',
    title:'Access Control',
    description:'Realtime makes simple work of the repetitive errands required with observing representative time...',
    buttonText:'Read More'
  },
  {
    id: 3,
    src: '/images/serviceImg3.png',
    alt: 'Entrance Control',
    title:'Entrance Control',
    description:'Realtime makes simple work of the repetitive errands required with observing representative time...',
    buttonText:'Read More'
  },
  {
    id: 4,
    src: '/images/serviceImg4.png',
    alt: 'Time Management',
    title:'Realtime Attendance Cum Access Control',
    description:'Realtime makes simple work of the repetitive errands required with observing representative time...',
    buttonText:'Read More'
  }
];

const ServicesSections = () => {
  const sectionRef = useRef(null);
  // Create an array of refs with the correct length
  const imageRefs = useRef(serviceCardsData.map(() => React.createRef()));
  
  useEffect(() => {
    const section = sectionRef.current;
    
    // Get all image elements from refs
    const imageElements = imageRefs.current.map(ref => ref.current);
    
    // Check if all elements are available
    if (!section || imageElements.some(el => !el)) return;
    
    // Create a container for animation context
    const ctx = gsap.context(() => {
      // Make the first image sticky immediately
      gsap.set(imageElements[0], { 
        position: "sticky",
        top: "25vh",
        zIndex: 1
      });
      
      // Create animations for each image (except the first one)
      for (let i = 1; i < imageElements.length; i++) {
        const currentImage = imageElements[i];
        const zIndex = i + 1;
        const offsetPixels = i * 10; // Increasing offset: 10px, 20px, 30px, etc.
        
        // Create ScrollTrigger for each image
        ScrollTrigger.create({
          trigger: currentImage,
          start: "top bottom", // Changed to trigger when element's top reaches 60% of viewport height
          end: "top center",
          scrub: 0.2, // Decrease scroll duration (smaller value = faster response)
          onEnter: () => {
            console.log(`Animation triggered for image ${i}`);
            // Start animation when image reaches center of viewport with improved easing
            gsap.fromTo(currentImage, 
              { y: "50%", opacity: 0 },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.3,
                ease: "power3.out"
              }
            );
          },
          onEnterBack: () => {
            // Reset animation when scrolling back up with a smoother transition
            gsap.to(currentImage, {
              y: "100%", 
              opacity: 0, 
              position: "relative",
              duration: 0.5,
              ease: "power2.in"
            });
          },
          onLeave: () => {
            // When image reaches the top position, make it sticky with increasing offset
            gsap.to(currentImage, {
              position: "sticky",
              top: `calc(25vh + ${offsetPixels}px)`, // Increasing offset for each element
              y: 0,
              zIndex: zIndex,
              duration: 0.5,
              onComplete: () => {
                console.log(`Image ${i} is now sticky at offset ${offsetPixels}px`);
              }
            });
          }
        });
      }
    }, section);
    
    // Cleanup function
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
 
  return (
    <section ref={sectionRef} className="bg-[#FFFF]">
      <div className="container mx-auto relative py-14">
        <div className="text-center mb-8 sticky top-20 pb-14">
          <h2 className="text-6xl text-[#1E1410] font-thin mb-4">Services</h2>
          <p className="text-xl text-gray-700 uppercase tracking-[1]">Wide-Range of Attendance Recorder & Access Control</p>
        </div>

        <div className="w-full" style={{ minHeight: `${serviceCardsData.length * 100}vh` }}>
          {serviceCardsData.map((card, index) => (
            <div 
              key={card.id}
              ref={imageRefs.current[index]}
              className={`relative ${index > 0 ? 'mt-[100vh]' : ''}`}
              style={{ zIndex: index + 1 }}
            >
            <div className="flex w-full align-center justify-between items-center  border border-2 rounded-3xl overflow-hidden bg-[#fff]">
                
                <div className="image-box w-[60%] object-content">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      width={400}
                      height={300}
                      className='h-[400] w-full'
                      unoptimized
                    />
                </div>
                <div className="flex flex-col mx-14 me-20 ">
                    <h2 className="text-[46px] font-[100] text-black mb-5 leading-snug ">{card.title}</h2>
                    <p className="text-[20px] font-[100] text-light text-black/60 mb-5 tracking-wide ">{card.description}</p>
                </div>
                <button className="w-100 uppercase text-[#EA5921] text-2xl tracking-wide flex items-center">
                  {card.buttonText}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12" />
                  </svg>
                </button>
            </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSections;