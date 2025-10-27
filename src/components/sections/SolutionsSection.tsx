import Image from 'next/image';
import Link from 'next/link';
import Slider from '../ui/Slider';

const SolutionsSection = () => {
  const solutions = [
    {
      id: 1,
      title: 'Office Management',
      description: 'Streamline your office operations with our advanced biometric solutions.',
      image: '/images/solution1.png',
    },
    {
      id: 2,
      title: 'School Management',
      description: 'Enhance security and attendance tracking in educational institutions.',
      image: '/images/solution3.png',
    },
    {
      id: 3,
      title: 'Office Management',
      description: 'Secure access control systems for corporate environments.',
      image: '/images/solution1.png',
    },
    {
      id: 4,
      title: 'Retail Solutions',
      description: 'Biometric solutions for retail environments and customer authentication.',
      image: '/images/solution3.png',
    },
    {
      id: 5,
      title: 'Healthcare Systems',
      description: 'Patient identification and secure access for healthcare facilities.',
      image: '/images/solution1.png',
    }
  ];

  return (
    <section className="py-5 md:py-20 bg-[#2B2B2B]">
      <div className="container mx-auto px-6">
        {/* Mobile layout - stacked */}
        <div className="md:hidden">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-4xl font-thin text-white sm:mb-3">Solutions</h2>
            <p className="text-xs sm:text-lg text-white font-[100] uppercase mb-1 sm:mb-4 tracking-[1px]">India&apos;s Leading Biometric Solutions</p>
            <p className="text-xs text-white font-thin tracking-[0.5px] mb-6">This is a growing market. Security incidents in schools grab the headlines, Emotions and budget allocations. How to address security concerns leaves room for many opinions and strategies.</p>
          </div>
          
          <Slider 
            autoPlay={true}
            autoPlayInterval={2000}
            showArrows={false}
            showDots={true}
            slidesToShow={2.4}
            className="h-full mb-8"
            responsive={[
              {
                breakpoint:992,
                slidesToShow:2,
                showDots:false

              }
            ]}
          >
            {solutions.map((solution) => (
              <div 
                key={solution.id} 
                className="rounded-md md:rounded-2xl transition-transform mx-1 md:mx-2 overflow-hidden border-grey-500  h-55 sm:h-auto  border-1 bg-[#414141]"
              >
                <div className="flex flex-col">
                  <div className="relative h-[100px] md:h-[200px] w-full">
                    <Image
                      src={solution.image || '/images/solution1.png'}
                      alt={solution.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                  <div className="text-white p-2 md:p-4">
                    <h3 className="text-md md:text-2xl font-thin mb-1 md:mb-2 leading-4">{solution.title}</h3>
                    <p className="text-xs md:text-sm text-gray-300 line-clamp-5">{solution.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          
          <div className="text-center  md:mt-6">
            <Link href="/solutions" className="bg-orange-500 text-xs md:text-lg text-white px-3 md:px-5 py-2 md:py-2 rounded-md font-medium hover:bg-orange-600 transition inline-block">
              View All Solutions
            </Link>
          </div>
        </div>
        
        {/* Desktop layout - grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-10">
          <div className="col-span-1">
            <h2 className="text-4xl lg:text-6xl font-[300] text-white mb-4">Solutions</h2>
            <p className="text-[16px] text-white font-[300] uppercase mb-6 tracking-[1px]">India&apos;s Leading Biometric Solutions</p>
            <p className="text-[14px] text-white font-[300] tracking-[1px]">This is a growing market. Security incidents in schools grab the headlines, Emotions and budget allocations. How to address security concerns leaves room for many opinions and strategies.</p>
            <div className="">
              <Link href="/solutions" className="bg-orange-500 mt-38 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition inline-block">
                View All Solutions
              </Link>
            </div>
          </div>
          
          <div className="col-span-2 pb-10">
            <Slider 
              autoPlay={true}
              autoPlayInterval={3000}
              showArrows={false}
              showDots={false}
              slidesToShow={2.4}
              className="h-full"
            >
              {solutions.map((solution) => (
                <div 
                  key={solution.id} 
                  className="rounded-2xl transition-transform mx-4 overflow-hidden border-[#414141] border-1 bg-[#414141]"
                >
                  <div className="flex flex-col">
                    <div className="relative h-[329px] w-full mb-3">
                      <Image
                        src={solution.image || '/images/solution1.png'}
                        alt={solution.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        unoptimized
                      />
                    </div>
                    <div className="text-white px-3 pb-4">
                      <h3 className="text-lg lg:text-xl font-thin mb-2 mt-3 ms-4">{solution.title}</h3>
                      {/* <p className="text-sm text-gray-300">{solution.description}</p> */}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>  
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;