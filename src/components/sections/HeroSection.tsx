"use client";

import Slider from "../ui/Slider";
import { useEffect, useState, useMemo } from "react";
import { getSliderData, imageLink } from "@/services/heroServices";
import DOMPurify from "dompurify";

// ✅ Types
export interface ApiResponse {
  success: boolean;
  data: SliderData[];
  count: number;
}

export interface SliderData {
  id: string;
  title: string;
  subtitle: string;
  content: string; // contains HTML string (escaped)
  content_file?: string; // path to HTML file relative to storage base
  image_alt: string | null;
  button_text: string | null;
  button_link: string | null;
  button_style: string;
  secondary_button_text: string | null;
  secondary_button_link: string | null;
  secondary_button_style: string;
  order: number;
  is_active: boolean;
  background_color: string;
  text_color: string;
  overlay_opacity: number;
  content_position: "left" | "center" | "right";
  animation_type: "fade" | "slide" | string;
  auto_play_delay: number;
  display_from: string | null;
  display_to: string | null;
  updated_at: string;
  created_at: string;
  image?: string;
}

// ✅ Helper to decode escaped HTML (\u003Cdiv... → <div...)
const decodeHTML = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

// ✅ Extract only <body> inner HTML if a full document is provided
const extractBodyContent = (html: string) => {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch && bodyMatch[1]) {
    return bodyMatch[1];
  }
  // Remove potential <html> and <head> wrappers to avoid invalid nesting
  const cleaned = html
    .replace(/<\/?html[^>]*>/gi, "")
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "");
  return cleaned;
};

// We intentionally avoid extra UI and only render slide content.

const HeroSection = () => {
  const [heroSlides, setHeroSlides] = useState<SliderData[]>([]);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const data: ApiResponse = await getSliderData();
        if (data.success) {
          console.log("[HeroSection] Fetched hero slides:", data.data);
          setHeroSlides(data.data);
        } else {
          console.error("Failed to load hero slides");
        }
      } catch (error) {
        console.error("Error fetching hero slides:", error);
      }
    };

    fetchHeroSlides();
  }, []);

  const autoPlayInterval = useMemo(() => {
    return heroSlides[0]?.auto_play_delay || 5000;
  }, [heroSlides]);

  return (
    <section
      className="pt-0"
      style={{ fontFamily: 'var(--font-montserrat)', paddingTop: 0, marginTop: 0 }}
    >
      <Slider
        autoPlay={true}
        autoPlayInterval={autoPlayInterval}
        showArrows={false}
        showDots={true}
        className="h-[80vh]"
        dotStyle={{
          size: 10,
          activeSize: 12,
          color: "#D1D5DB",
          activeColor: "#EA5921",
          position: "inside",
          containerClass: "bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full"
        }}
        slidesToShow={1}
        responsive={[{ breakpoint: 768, slidesToShow: 1, showDots: true }]}
      >
        {heroSlides.map((slide) => (
          <div key={slide.id}>
            {slide.content_file ? (
              <iframe
                src={`/api/hero-content?file=${encodeURIComponent(slide.content_file)}`}
                style={{ width: "100%", height: "80vh", border: "none" }}
                title={`hero-slide-${slide.id}`}
              />
            ) : (
              slide.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      extractBodyContent(decodeHTML(slide.content))
                    ),
                  }}
                />
              )
            )}
          </div>
        ))}
      </Slider>
    </section>
  );
};


export default HeroSection;




// {/* Feature Labels */} {slide.features.map((feature, index) => { const positions = [ 'absolute -left-10 sm:-left-40 md:-left-50 bottom-40 md:bottom-70', 'absolute -left-10 sm:-left-30 md:-left-35 bottom-25 md:bottom-46', 'absolute -right-10 sm:-right-30 md:-right-35 bottom-40 md:bottom-72', 'absolute -right-10 sm:-right-40 md:-right-45 bottom-25 md:bottom-50', 'absolute right-15 sm:-right-35 md:-right-40 bottom-5 sm:bottom-10 md:bottom-22', ]; return ( <div key={feature.id} className={${positions[index]} bg-[#ffefec]/40 backdrop-blur-md border border-white/40 px-2 sm:px-6 py-1 sm:py-3 rounded-full shadow-md text-[10px] sm:text-sm md:text-xl flex items-center w-auto z-20}> <span className="mr-1">{feature.icon}</span> <span className="font-medium text-black tracking-wide">{feature.name}</span> </div> ); })}