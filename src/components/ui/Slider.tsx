"use client"
import React, { useState, useEffect, ReactNode } from 'react';

interface SliderProps {
  children: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  slidesToShow?: number;
  responsive?: {
    breakpoint: number;
    slidesToShow: number;
  }[];
  dotStyle?: {
    size?: number;
    activeSize?: number;
    color?: string;
    activeColor?: string;
    position?: 'inside' | 'outside';
  };
}

const Slider: React.FC<SliderProps> = ({
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
  slidesToShow = 1,
  responsive = [],
  dotStyle = {
    size: 12,
    activeSize: 15,
    color: '#fff',
    activeColor: '#EA5921',
    position: 'inside',
  },
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [currentSlidesToShow, setCurrentSlidesToShow] = useState(slidesToShow);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const totalSlides = React.Children.count(children);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (responsive.length === 0) return;
      
      // Sort responsive breakpoints in descending order
      const sortedBreakpoints = [...responsive].sort((a, b) => b.breakpoint - a.breakpoint);
      
      // Find the appropriate slidesToShow value based on current window width
      const width = window.innerWidth;
      const matchedBreakpoint = sortedBreakpoints.find(item => width <= item.breakpoint);
      
      setCurrentSlidesToShow(matchedBreakpoint ? matchedBreakpoint.slidesToShow : slidesToShow);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [responsive, slidesToShow]);

  // Calculate slide width when container is available or window resizes
  useEffect(() => {
    if (!containerRef) return;
    
    const updateSlideWidth = () => {
      if (containerRef) {
        const containerWidth = containerRef.offsetWidth;
        setSlideWidth(containerWidth / currentSlidesToShow);
      }
    };
    
    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    
    return () => {
      window.removeEventListener('resize', updateSlideWidth);
    };
  }, [containerRef, currentSlidesToShow]);

  // Handle auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying && totalSlides > 1) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => {
          const maxSlide = Math.max(0, totalSlides - currentSlidesToShow);
          return prev >= maxSlide ? 0 : prev + 1;
        });
      }, autoPlayInterval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, totalSlides, autoPlayInterval, currentSlidesToShow]);

  // Navigation functions
  const goToNextSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, totalSlides - currentSlidesToShow);
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, totalSlides - currentSlidesToShow);
      return prev === 0 ? maxSlide : prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    const maxSlide = Math.max(0, totalSlides - currentSlidesToShow);
    setCurrentSlide(Math.min(index, maxSlide));
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (autoPlay) setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    if (autoPlay) setIsAutoPlaying(true);
    
    // Reset mouse states if mouse leaves container while dragging
    if (isMouseDown) {
      setIsMouseDown(false);
      setIsSwiping(false);
    }
  };

  // Mouse Event Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setIsMouseDown(true);
    setIsSwiping(true);
    
    // Pause autoplay during mouse interaction
    if (autoPlay) setIsAutoPlaying(false);
    
    // Prevent default behaviors
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    
    setCurrentX(e.clientX);
    
    // Prevent default to avoid text selection while swiping
    e.preventDefault();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    
    const diff = startX - currentX;
    const swipeThreshold = slideWidth * 0.2; // 20% of slide width
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goToNextSlide(); // Swipe left -> Next slide
      } else {
        goToPrevSlide(); // Swipe right -> Previous slide
      }
    }
    
    // Reset states
    setIsMouseDown(false);
    setIsSwiping(false);
    
    // Resume autoplay if enabled
    if (autoPlay) setIsAutoPlaying(true);
    
    // Prevent default behaviors
    e.preventDefault();
  };

  // Touch Event Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    setIsSwiping(true);
    
    // Pause autoplay during touch interaction
    if (autoPlay) setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    
    setCurrentX(e.touches[0].clientX);
    
    // Prevent default to avoid page scrolling while swiping
    if (Math.abs(startX - currentX) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    
    const diff = startX - currentX;
    const swipeThreshold = slideWidth * 0.2; // 20% of slide width
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goToNextSlide(); // Swipe left -> Next slide
      } else {
        goToPrevSlide(); // Swipe right -> Previous slide
      }
    }
    
    // Reset states
    setIsSwiping(false);
    
    // Resume autoplay if enabled
    if (autoPlay) setIsAutoPlaying(true);
  };

  // Calculate the transform value based on current slide and swipe position
  const getTransformValue = () => {
    const baseTransform = -currentSlide * 100 / currentSlidesToShow;
    
    if (isSwiping && slideWidth > 0) {
      // Calculate the percentage of swipe relative to slide width
      const swipeDiff = startX - currentX;
      const swipePercentage = (swipeDiff / slideWidth) * (100 / currentSlidesToShow);
      return `${baseTransform - swipePercentage}%`;
    }
    
    return `${baseTransform}%`;
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={setContainerRef}
    >
      <div 
        className={`flex ${!isSwiping ? 'transition-transform duration-500 ease-in-out' : ''}`}
        style={{ transform: `translateX(${getTransformValue()})`,  }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {React.Children.map(children, (child, index) => (
          <div 
            key={index} 
            className="flex-shrink-0" 
            style={{ width: `${100 / currentSlidesToShow}%` }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <button 
            onClick={goToPrevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md z-10 transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={goToNextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md z-10 transition-all duration-300"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && totalSlides > 1 && (
        <div className="absolute left-0 right-0 flex justify-center">
          <div className={`${dotStyle.position === 'outside' ? 'bottom-[-20px]' : 'bottom-4'} absolute bg-black/20 px-4 py-[5px] border rounded-full flex gap-2 items-center`}>
            {Array.from({ length: Math.ceil(totalSlides / currentSlidesToShow) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index * currentSlidesToShow)}
                className={`rounded-full transition-all duration-300`}
                style={{
                  height: `${Math.floor(currentSlide / currentSlidesToShow) === index ? dotStyle.activeSize : dotStyle.size}px`,
                  width: `${Math.floor(currentSlide / currentSlidesToShow) === index ? dotStyle.activeSize : dotStyle.size}px`,
                  backgroundColor: Math.floor(currentSlide / currentSlidesToShow) === index ? dotStyle.activeColor : dotStyle.color
                }}
                aria-label={`Go to slide group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
