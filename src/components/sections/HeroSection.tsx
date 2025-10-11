import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-pink-100 to-orange-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              <span className="text-orange-500">Glass</span> Door Lock
            </h1>
            <div className="space-y-5 mb-10">
              <div className="flex items-center">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <span>1</span>
                </div>
                <p className="text-gray-700 font-medium">FINGERPRINT UNLOCK</p>
              </div>
              <div className="flex items-center">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <span>2</span>
                </div>
                <p className="text-gray-700 font-medium">PIN CODE UNLOCK</p>
              </div>
              <div className="flex items-center">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <span>3</span>
                </div>
                <p className="text-gray-700 font-medium">RFID CARD UNLOCK</p>
              </div>
              <div className="flex items-center">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  <span>4</span>
                </div>
                <p className="text-gray-700 font-medium">MECHANICAL KEY UNLOCK</p>
              </div>
            </div>
            
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full blur-xl opacity-70"></div>
              <Image 
                src="/images/door-lock.png" 
                alt="Glass Door Lock" 
                width={500} 
                height={500}
                className="mx-auto relative z-10"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;