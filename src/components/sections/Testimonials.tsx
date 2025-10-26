"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { getTestimonials } from "@/services/testimonialService";

type Testimonial = {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
};

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000 })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <section className="bg-[#f8f8f8] py-5 md:py-16 px-4 md:px-12 lg:px-20">
        <h2 className="text-xl md:text-4xl font-thin text-black text-center">What our partners Say</h2>


      <div className="relative max-w-6xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={scrollPrev}
          aria-label="Previous testimonial"
          className="absolute left-[-10px] top-1/2 -translate-y-1/2 z-10 rounded-full p-2 hover:bg-gray-100">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Carousel */}
        <div
          className="overflow-hidden my-5 md:my-10 lg:my-10 lg:mx-10 mx-5"
          ref={emblaRef}>
          {loading ? (
            <div className="flex justify-center items-center h-40 text-gray-500">
              Loading testimonials...
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center text-gray-500">No testimonials available</div>
          ) : (
            <div className="flex">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex-[0_0_100%] md:flex-[0_0_48%] lg:flex-[0_0_48.2%] mx-3 bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="flex items-start gap-4 lg:h-[168px] ">
                    <div className="text-orange-500 bg-[#F5F5F5] w-[50] md:w-[80px] h-[50] md:h-[80px] flex items-center justify-center">
                      <Quote className="w-5 md:w-8 h-4 md:h-6" fill="currentColor" />
                    </div>
                    <div className="p-5 md:p-6 w-[85%]">
                      <p className="text-[#4F423D] font-[300] text-[13px] lg:text-[16px] leading-relaxed mb-0 ">
                        “{t.content.slice(0, 300)}”
                      </p>
                    </div>
                  </div>
                  <div className="py-0 px-6 md:py-6 md:px-6 ">
                    <p className="font-light text-[#070504] text-sm">{t.name},</p>
                    <p className="text-[#6d6765] font-light text-sm">
                      {t.position} – {t.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollNext}
          aria-label="Next testimonial"
          className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-10 rounded-full p-2 hover:bg-gray-100">
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </section>
  );
}
