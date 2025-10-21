"use client"
import Slider from '../ui/Slider';
import Image from 'next/image';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "The biometric attendance system has completely streamlined our workforce management. No more manual errors or proxy attendance—everything is accurate and real-time. Highly recommend their solutions!",
      author: "Rahul Mehta",
      position: "HR Manager, TechNova Solutions"
    },
    {
      id: 2,
      quote: "The biometric attendance system has completely streamlined our workforce management. No more manual errors or proxy attendance—everything is accurate and real-time. Highly recommend their solutions!",
      author: "Priya Sharma",
      position: "HR Manager, TechNova Solutions"
    },
    {
      id: 3,
      quote: "Implementing this biometric solution has improved our security protocols significantly. The system is reliable and the support team is always responsive.",
      author: "Vikram Singh",
      position: "Security Head, GlobalSecure"
    },
    {
      id: 4,
      quote: "The ease of integration with our existing systems was impressive. The biometric solutions have enhanced our access control measures tremendously.",
      author: "Ananya Patel",
      position: "CTO, FutureTech Industries"
    }
  ];

  return (
    <section className="py-5 md:py-16 bg-[#FFF2EC]">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-6xl font-thin text-black mb-3 md:mb-20 text-center">What our partners Say</h2>
        
        <div className="pb-2 md:pb-10">
          <Slider 
            autoPlay={true}
            autoPlayInterval={5000}
            showArrows={false}
            showDots={false}
            slidesToShow={2}
            className="h-full"
            responsive={[
              {
                breakpoint: 768,
                  slidesToShow: 1,
                  showDots: false,
              }
            ]}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="mx-2 md:mx-4"
              >
                <div className="bg-white rounded-lg md:rounded-4xl border-[#F5F5F5] border-2 overflow-hidden p-5 md:p-10  h-[230px] md:h-[280px] relative ">
                  <div className="flex items-center justify-center mb-0 md:mb-4 bg-[#F5F5F5] absolute top-0 left-0 h-10 md:h-30 w-10 md:w-30 overflow-hiddne">
                    <Image
                    src='/images/testimonialIcon.png'
                    alt='testimonialIcon'
                    width={0}
                    height={0}
                    className='h-3 md:h-20 w-3 md:w-20'
                  />
                  </div>
                  <p className="text-gray-700 font-thin text-sm mb-2 md:mb-10 ms-10 md:ms-30 tracking-[0.4] ">{`"${testimonial.quote}"`}</p>
                  <div className="mt-auto mt-1 absolute bottom-5 md:bottom-10 left-5 md:left-10">
                    <p className="text-gray-500 font-medium text-sm md:text-xl ">{testimonial.author}</p>
                    <p className="text-black/70 text-xs md:text-lg">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;