import Image from 'next/image';
import Link from 'next/link';
import Slider from '../ui/Slider';

const ProductsSection = () => {
  // Original products array
  const originalProducts = [
    {
      id: 1,
      name: 'Realtime C101',
      category: 'Bio Metric Attendance',
      image: '/images/product1.png',
    },
    {
      id: 2,
      name: 'Realtime C101',
      category: 'Bio Metric Attendance',
      image: '/images/product1.png',
    },
    {
      id: 3,
      name: 'Realtime C101',
      category: 'Bio Metric Attendance',
      image: '/images/product1.png',
    },
    {
      id: 4,
      name: 'Realtime C101',
      category: 'Bio Metric Attendance',
      image: '/images/product1.png',
    },
    {
      id: 5,
      name: 'Realtime C101',
      category: 'Bio Metric Attendance',
      image: '/images/product1.png',
    },
  ];
  
  // Duplicate the products array to create an infinite scroll effect
  const products = [...originalProducts, ...originalProducts, ...originalProducts];

  return (
    <section className="py-20 bg-[#FFE8DF] ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-6xl font-thin text-black  mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 uppercase">OUR BEST-IN-CLASS SECURITY PRODUCTS</p>
        </div>
        
        <div >
                    <Slider 
                 autoPlay={true}
        autoPlayInterval={2000}
        showArrows={false}
        showDots={false}
        slidesToShow={3.3}
        className='h-full'
          >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="rounded-3xl p-8  transition-transform  mx-4"
              style={{
                background: product.id % 2 === 0 ? 
                  'linear-gradient(to bottom, #FFCC33, #FFB347)' : 
                  'linear-gradient(to bottom, #FF7F50, #FF6347)' , 
              }}
            >
              <div className=" flex flex-col ">
                <div className="relative h-90 w-full mb-4 bg-white rounded-xl ">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    
                  />
                </div>
                <div style={{
                  color: product.id % 2 === 0 ? '#000' : '#fff'
              }}>
                  <p className="text-xl font-thin mb-1">{product.category}</p>
                  <h3 className="text-4xl font-thin tracking-[3]">{product.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>  
        </div>


        <div className="text-center mt-10">
          <Link 
            href="/products" 
            className="inline-flex items-center bg-orange-500 text-white px-6 py-2 rounded-md font-medium hover:bg-orange-600 transition"
          >
            VIEW ALL
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;