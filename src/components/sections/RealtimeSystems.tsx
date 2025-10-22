"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const cardsData = [
  {
    id: "1",
    src: "/images/serviceImg1.png",
    title: "Realtime Attendance Cum Access Control",
    description:
      "Realtime makes simple work of the repetitive errands required with observing representative time...",
  },
  {
    id: "2",
    src: "/images/serviceImg2.png",
    title: "Access Control",
    description:
      "Realtime makes simple work of the repetitive errands required with observing representative time...",
  },
  {
    id: "3",
    src: "/images/serviceImg3.png",
    title: "Entrance Control",
    description:
      "Realtime makes simple work of the repetitive errands required with observing representative time...",
  },
  {
    id: "4",
    src: "/images/serviceImg4.png",
    title: "Time Management",
    description:
      "Realtime makes simple work of the repetitive errands required with observing representative time...",
  },
];

export default function RealtimeScrollCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeCard, setActiveCard] = useState("1");

  // Scroll animation logic
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        // Make first card sticky
        if (i === 0) {
          gsap.set(card, { position: "sticky", top: "20vh", zIndex: 1 });
        }

        ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "top center",
          scrub: true,
          onEnter: () => {
            setActiveCard(card.dataset.id || "1");

            // Increase zIndex of current card so it comes above others
            cardRefs.current.forEach((c, index) => {
              gsap.set(c, { zIndex: index <= i ? index + 1 : index });
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
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Scroll to card + bring to front
  const handleScrollTo = (id: string) => {
    const targetIndex = cardsData.findIndex((c) => c.id === id);
    const targetCard = cardRefs.current[targetIndex];
    if (!targetCard) return;

    setActiveCard(id);

    // Bring clicked card to top
    cardRefs.current.forEach((c, index) => {
      gsap.set(c, { zIndex: index === targetIndex ? 999 : index + 1 });
    });

    // Smooth scroll
    gsap.to(window, {
      duration: 0.8,
      scrollTo: { y: targetCard, offsetY: 120 },
      ease: "power2.inOut",
      onComplete: () => {
        // Keep clicked card on top
        gsap.set(targetCard, { zIndex: 999 });
      },
    });

    // Animate focus
    gsap.fromTo(
      targetCard,
      { opacity: 0.8 },
      { opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  };

  return (
    <section ref={containerRef} className="bg-white py-10 relative">
      {/* Sticky Header (Always Visible) */}
      <div className="sticky top-0 bg-white z-50 shadow-sm py-4 flex flex-wrap justify-center gap-2">
        {cardsData.map((card) => (
          <button
            key={card.id}
            onClick={() => handleScrollTo(card.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCard === card.id
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {card.title}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div
        className="relative container mx-auto px-4"
        style={{ minHeight: `${cardsData.length * 100}vh` }}
      >
        {cardsData.map((card, i) => (
          <div
            key={card.id}
            data-id={card.id}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
            className={`relative ${i > 0 ? "mt-[100vh]" : ""}`}
          >
            <div className="flex border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-md">
              <div className="w-1/2">
                <Image
                  src={card.src}
                  alt={card.title}
                  width={400}
                  height={300}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
              <div className="w-1/2 p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                  {card.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                <button className="uppercase text-orange-500 font-medium flex items-center">
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 11l5-5m0 0l5 5M12 6v12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
