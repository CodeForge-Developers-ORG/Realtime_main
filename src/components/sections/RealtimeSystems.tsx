"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { getSolutions } from "@/services/solutionServices";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

type Solution = {
  title: string;
  description?: string;
  // add other fields returned by getSolutions() as needed
};

export default function RealtimeScrollCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeCard, setActiveCard] = useState<number>(0);
  const [solutions, setSolutions] = useState<Solution[]>([]);

  // ✅ Fetch API Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getSolutions();
        setSolutions(response.data || []);
      } catch (error) {
        console.error("Error fetching solutions:", error);
      }
    }
    fetchData();
  }, []);

  // ✅ Scroll Animation
  useEffect(() => {
    if (!containerRef.current || solutions.length === 0) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        if (i === 0) {
          gsap.set(card, { position: "sticky", top: "20vh", zIndex: 1 });
        }

        ScrollTrigger.create({
          trigger: card,
          start: "top center", // Changed from "top bottom" to "top center"
          end: "top 20%",      // Changed from "top center" to "top 20%"
          scrub: true,
          onEnter: () => {
            setActiveCard(i);
            // Apply blur effect to lower cards only when card reaches the top center
            cardRefs.current.forEach((c, index) => {
              gsap.set(c, { zIndex: index <= i ? index + 1 : index });
              
              // Apply blur to cards below the current one (previous cards)
              if (index < i) {
                gsap.to(c, { 
                  filter: "blur(2px)", 
                  opacity: 0.7, 
                  duration: 0.5,
                  ease: "power2.inOut"
                });
              } else {
                gsap.to(c, { 
                  filter: "blur(0px)", 
                  opacity: 1, 
                  duration: 0.5,
                  ease: "power2.inOut"
                });
              }
            });
            gsap.to(card, { opacity: 1, scale: 1, duration: 0.3 });
          },
          onLeave: () => {
            gsap.set(card, {
              position: "sticky",
              top: `25vh`,
              zIndex: i + 1,
            });
          },
          onLeaveBack: () => {
            gsap.set(card, { position: "relative", zIndex: 1, top: 0 });
            
            // Reset blur for ALL cards when scrolling back up
            cardRefs.current.forEach((c) => {
              gsap.to(c, { 
                filter: "blur(0px)", 
                opacity: 1, 
                duration: 0.5,
                ease: "power2.inOut"
              });
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [solutions]);

  // ✅ Smooth Scroll + Focus
  const handleScrollTo = (index: number) => {
    const targetCard = cardRefs.current[index];
    if (!targetCard) return;

    setActiveCard(index);

    cardRefs.current.forEach((c, i) => {
      gsap.set(c, { zIndex: i === index ? 999 : i + 1 });
    });

    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: targetCard, offsetY: 120 },
      ease: "power2.inOut",
      onComplete: () => { gsap.set(targetCard, { zIndex: 999 }); },
    });

    gsap.fromTo(
      targetCard,
      { opacity: 0.8 },
      { opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  };

  return (
    <section ref={containerRef} className="bg-white py-10 relative">
      {/* ✅ Sticky Header (Dynamic Buttons) */}
      <div className="sticky lg:max-w-[75%] top-10 lg:top-3 bg-white z-50 rounded-full border-black/50 border-1 py-2 px-2 md:px-4 flex flex-nowrap items-center gap-2 mx-auto mb-6 overflow-x-auto  no-scrollbar" >
        {solutions.map((card, index) => (
          <button
            key={index}
            onClick={() => handleScrollTo(index)}
            className={`px-2 lg:px-5 py-1 lg:py-3  rounded-full text-[12px]  md:text-[18px] text-nowrap font-thin transition-all ${activeCard === index
                ? "bg-[#EFAF00] text-black"
                : "bg-[#F9F9F9] text-black"
              }`}
          >
            {card.title}
          </button>
        ))}
      </div>

      {/* ✅ Dynamic Cards Section */}
      <div
        className="relative container mx-auto px-4"
        style={{ minHeight: `${solutions.length * 50}vh` }}
        // Responsive minHeight using CSS media query in inline style
      >
        {solutions.map((card, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
            className={`relative ${i > 0 ? "mt-[50vh] md:mt-[100vh]" : ""}`}
            data-index={i}
          >
            <div className="bg-white rounded-xl shadow-sm border border-[#D9D9D9]  p-6 max-w-3xl mx-auto">
              {/* Top row: Number + Title */}
              <div className="flex items-center mb-3">
                <span className="text-orange-500 font-semibold text-3xl mr-3 bg-gray-100 rounded-md w-15 h-15 flex items-center justify-center">
                  {i + 1}
                </span>
                <h2 className=" text-lg lg:text-3xl font-thin text-gray-800 leading-snug">
                  {card.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm lg:text-lg mt-4 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>

        ))}
      </div>
    </section>
  );
}
