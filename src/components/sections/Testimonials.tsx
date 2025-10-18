"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  message: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rahul Mehta",
    role: "HR Manager",
    company: "TechNova Solutions",
    message:
      "The biometric attendance system has completely streamlined our workforce management. No more manual errors or proxy attendance—everything is accurate and real-time. Highly recommend their solutions!",
  },
  {
    id: 2,
    name: "Sneha Kapoor",
    role: "Operations Head",
    company: "BrightWorks Pvt Ltd",
    message:
      "Exceptional service and easy integration. Their product truly saves us hours every week and boosts accuracy.",
  },
  {
    id: 3,
    name: "Arjun Rao",
    role: "CTO",
    company: "NextGen Systems",
    message:
      "We’ve seen massive improvement in our attendance accuracy. The dashboard insights are just perfect!",
  },
  {
    id: 4,
    name: "Priya Nair",
    role: "HR Executive",
    company: "PeopleFirst India",
    message:
      "Smooth onboarding process and extremely user-friendly. Their team support is excellent!",
  },
];

export default function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000 })]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <section className="bg-[#f8f8f8] py-16 px-4 md:px-12 lg:px-20">
      <h2 className="text-4xl md:text-5xl font-[300] text-left text-[#1E1410] ml-[60px] -mb-5">
        What our Clients Say
      </h2>

      <div className="relative max-w-6xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={scrollPrev}
          className="absolute left-[-10px] top-1/2 -translate-y-1/2 z-10 cursor-pointer rounded-full p-2 hover:bg-gray-100">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden m-10" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className=" flex-[0_0_90%] md:flex-[0_0_48%] lg:flex-[0_0_48.2%] mx-3 bg-white rounded-2xl shadow-sm border border-gray-200 p-0 overflow-hidden  ">
                <div className="flex items-start justify-content-between gap-4 h-[168px]">
                  <div className="text-orange-500 bg-[#F5F5F5] w-[80px] h-[80px] flex items-center justify-center mb-4">
                    <Quote className="w-8 h-6" fill="currentColor" />
                  </div>
                  <div className="p-6 w-[80%]">
                    <p className="text-[#4F423D] font-[300]  leading-relaxed mb-6">{`"${t.message}"`}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-[300] text-[#9B918D] text-sm">{t.name},</p>
                  <p className="text-[#1E1410] font-[300] text-sm">
                    {t.role}
                    {t.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollNext}
          className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-10  rounded-full p-2 hover:bg-gray-100 cursor-pointer">
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </section>
  );
}
