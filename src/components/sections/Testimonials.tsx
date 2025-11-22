"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { getTestimonials } from "@/services/testimonialService";
import Slider from "@/components/ui/Slider";
import Image from "next/image";
import { baseUri } from "@/services/constant";

type Testimonial = {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating?: number;
  featured?: boolean;
  status?: boolean | number | string;
  sort_order?: number;
  image?: string;
  created_at?: string;
};

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await getTestimonials();
        setTestimonials(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  const ordered = useMemo(() => {
    // Consider only active testimonials
    const active = testimonials.filter((t) => {
      const s = t?.status;
      if (typeof s === "boolean") return s;
      if (typeof s === "number") return s === 1;
      if (typeof s === "string") return ["1", "true", "active"].includes(s.toLowerCase());
      return false;
    });

    return [...active]
      .sort((a, b) => {
        // featured first
        const f = Number(b?.featured) - Number(a?.featured);
        if (f !== 0) return f;
        // then sort_order asc
        const s = Number(a?.sort_order ?? 0) - Number(b?.sort_order ?? 0);
        if (s !== 0) return s;
        // then recent first
        const da = new Date(a?.created_at ?? 0).getTime();
        const db = new Date(b?.created_at ?? 0).getTime();
        return db - da;
      });
  }, [testimonials]);

  function getInitials(name?: string) {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const last = parts[parts.length - 1]?.[0] ?? "";
    return (first + last).toUpperCase();
  }

  // If not loading and there are no active testimonials, do not render the section
  if (!loading && (error || ordered.length === 0)) {
    return null;
  }

  return (
    <section
      className="bg-white py-10 md:py-16 lg:py-20 px-4 md:px-12 lg:px-20"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="section-title mx-auto">Trusted by Industry Leaders</h2>
          <p className="text-center text-slate-600 mt-2 md:mt-3">
            See what our customers say about their experience with Realtime Biometrics
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40 text-gray-500 mt-8">
            Loading testimonials...
          </div>
        ) : (
          <div className="mt-8">
            <Slider
              autoPlay={true}
              autoPlayInterval={5000}
              showArrows={false}
              showDots={true}
              slidesToShow={4}
              className="h-full"
              responsive={[
                { breakpoint: 1024, slidesToShow: 3, showDots: true },
                { breakpoint: 768, slidesToShow: 2, showDots: true },
                { breakpoint: 480, slidesToShow: 1, showDots: true },
              ]}
              dotStyle={{
                position: 'outside',
                containerClass: 'mt-3 bg-transparent px-0 py-0',
                size: 8,
                activeSize: 10,
                color: '#e5e7eb',
                activeColor: '#FF6000',
              }}
            >
              {ordered.map((t) => (
                <div key={t.id} className="px-2 md:px-3">
                  <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 h-[280px] md:h-[320px] flex flex-col">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Number(t.rating ?? 0) ? "text-yellow-500" : "text-gray-300"}`}
                          fill="currentColor"
                        />
                      ))}
                    </div>

                    <p className="text-slate-800 text-sm md:text-base leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      “{t.content.length > 300 ? t.content.slice(0, 300) + "…" : t.content}”
                    </p>

                    <div className="flex items-center gap-3 mt-6 md:mt-auto">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center">
                        {t.image ? (
                          <Image
                            src={`${baseUri}${t.image}`}
                            alt={t.name ? `${t.name} photo` : "Testimonial"}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="bg-orange-600 text-white w-full h-full flex items-center justify-center font-semibold">
                            {getInitials(t.name)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-slate-900 font-medium text-sm md:text-base">{t.name}</p>
                        <p className="text-slate-600 text-xs md:text-sm">{t.position}</p>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
}
