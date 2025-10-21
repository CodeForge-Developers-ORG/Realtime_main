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
  const headerRef = useRef(null);
  // Create an array of refs with the correct length
  const imageRefs = useRef(serviceCardsData.map(() => React.createRef()));
  
  useEffect(() => {
    const section = sectionRef.current;
    const headerElement = headerRef.current;
    
    // Get all image elements from refs
    const imageElements = imageRefs.current.map(ref => ref.current);
    
    // Check if all elements are available
    if (!section || imageElements.some(el => !el) || !headerElement) return;
    
    // Create a container for animation context
    const ctx = gsap.context(() => {
      // Make the first image sticky immediately
      gsap.set(imageElements[0], { 
        position: "sticky",
        top: "25vh",
        zIndex: 1
      });
      
      // Create a ScrollTrigger for the header to hide it when last card is in view
      const lastCardIndex = imageElements.length - 1;
      ScrollTrigger.create({
        trigger: imageElements[lastCardIndex],
        start: "top center",
        end: "bottom top",
        onEnter: () => {
          // Hide the header when the last card enters the viewport
          gsap.to(headerElement, {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              // Remove from DOM flow after animation
              gsap.set(headerElement, {  position: "unset",});
            }
          });
        },
        onLeaveBack: () => {
          // Show the header again when scrolling back up
          gsap.set(headerElement, { 
            display: "block",
            position: "sticky",
            top: "20px",
            zIndex: 10,
            opacity: 0
          });
          gsap.to(headerElement, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
      
      // Create animations for each image (except the first one)
      for (let i = 1; i < imageElements.length; i++) {
        const currentImage = imageElements[i];
        const zIndex = i + 1;
        const offsetPixels = i * 10; // Increasing offset: 10px, 20px, 30px, etc.
        const isLastCard = i === imageElements.length - 1;
        
        // Create ScrollTrigger for each image
        ScrollTrigger.create({
          trigger: currentImage,
          start: "top bottom", // Trigger when element's top reaches bottom of viewport
          end: "top center",
          ease: true,
          scrub: 0.3, // Decrease scroll duration (smaller value = faster response)
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
            
            // If this is the last card, ensure it's fully visible
            if (isLastCard) {
              gsap.set(currentImage, { 
                visibility: "visible",
                opacity: 1
              });
            }
          },
          onEnterBack: () => {
            // Reset animation when scrolling back up with a smoother transition
            gsap.to(currentImage, {
              y: "80%", 
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
                
                // If this is the last image and animation is complete, hide the header
                if (isLastCard) {
                  // Add a small delay to ensure the animation is complete
                  gsap.delayedCall(0.2, () => {
                    gsap.to(headerElement, {
                      opacity: 0,
                      y: -50,
                      duration: 0.5,
                      ease: "power2.out",
                      onComplete: () => {
                        // Remove from DOM flow after animation
                        gsap.set(headerElement, { 
                          position: "unset" // Reset position to prevent sticky behavior issues
                        });
                      }
                    });
                  });
                }
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
      <div className="container mx-auto relative py-5 md:py-14 px-4 md:px-6 lg:px-0">
        {/* Desktop heading with sticky behavior */}
        <div ref={headerRef} className="hidden md:block text-center mb-8 sticky top-20 pb-14 bg-white">
          <h2 className="text-5xl lg:text-6xl text-[#1E1410] font-thin mb-4">Services</h2>
          <p className="text-lg md:text-xl text-gray-700 uppercase tracking-[1px] px-2">Wide-Range of Attendance Recorder & Access Control</p>
        </div>
        
        {/* Mobile heading with static behavior */}
        <div className="md:hidden text-center mb-0 pb-4 bg-white">
          <h2 className="text-2xl text-[#1E1410] font-thin mb-1">Services</h2>
          <p className="text-xs text-gray-700 uppercase tracking-[0.5px] font-thin px-5">Wide-Range of Attendance Recorder & Access Control</p>
        </div>

        {/* Desktop view with scroll animations */}
        <div className="hidden md:block w-full" style={{ minHeight: `${serviceCardsData.length * 100}vh` }}>
          {serviceCardsData.map((card, index) => (
            <div 
              key={card.id}
              ref={imageRefs.current[index]}
              className={`relative ${index > 0 ? 'mt-[100vh]' : ''}`}
              style={{ zIndex: index + 1 }}
            >
              <div className="flex w-full align-center justify-between items-center border-[#d8d8d8] border-2 rounded-3xl overflow-hidden bg-[#fff]">
                <div className="image-box w-[50%] lg:w-[60%] object-content">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    width={400}
                    height={300}
                    className='h-auto w-full'
                    unoptimized
                  />
                </div>
                <div className="flex flex-col mx-6 lg:mx-14 me-6 lg:me-20">
                  <h2 className="text-2xl md:text-3xl lg:text-[46px] font-[100] text-black mb-3 md:mb-5 leading-snug">{card.title}</h2>
                  <p className="text-base md:text-lg lg:text-[20px] font-[100] text-light text-black/60 mb-3 md:mb-5 tracking-wide">{card.description}</p>
                </div>
                <button className="w-100 uppercase text-[#EA5921] text-lg md:text-xl lg:text-2xl tracking-wide flex items-center mr-4 md:mr-0">
                  {card.buttonText}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view with horizontal slider */}
        <div className="md:hidden">
          <div className="relative pb-4">
            <div className="scroll-container flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
              {serviceCardsData.map((card) => (
                <div 
                  key={card.id} 
                  className="flex-shrink-0 w-[80%] mx-2 snap-center border-[#d8d8d8] border-2 rounded-2xl overflow-hidden bg-[#fff] shadow-md"
                >
                  <div className="w-full">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      width={300}
                      height={200}
                      className='h-auto w-full'
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-thin text-black mb-1">{card.title}</h2>
                    <p className="text-sm font-[100] text-light text-black/60 mb-2">{card.description}</p>
                    <button className="uppercase text-[#EA5921] text-sm tracking-wide flex items-center">
                      {card.buttonText}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12" />
                      </svg>
                    </button>
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

export default ServicesSections;