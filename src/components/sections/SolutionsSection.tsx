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
    <section className="py-20 bg-[#2B2B2B]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <h2 className="text-6xl font-thin text-white mb-4">Solutions</h2>
            <p className="text-lg text-white font-[100] uppercase mb-5 tracking-[1]">India's Leading Biometric Solutions</p>
            <p className="text-lg text-white font-thin tracking-[1]">This is a growing market. Security incidents in schools grab the headlines, Emotions and budget allocations. How to address security concerns leaves room for many opinions and strategies.</p>
            <div className="mt-50">
              <Link href="/solutions" className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition">
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
              slidesToShow={2.3}
              className="h-full"
            >
            {solutions.map((solution) => (
              <div 
                key={solution.id} 
                className="rounded-2xl transition-transform mx-4 overflow-hidden border border-1 bg-[#414141] h-135"
              >
                <div className="flex flex-col ">
                  <div className="relative h-110 w-full mb-4 object-contain ">
                    <Image
                      src={solution.image || '/images/solution1.png'}
                      alt={solution.title}
                      fill
                      style={{ objectFit: 'fill' , objectPosition:'left' }}
                      unoptimized
                    />
                  </div>
                  <div className="text-white  ">
                    <h3 className="text-3xl font-thin mb-2 mt-5 ms-3">{solution.title}</h3>
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