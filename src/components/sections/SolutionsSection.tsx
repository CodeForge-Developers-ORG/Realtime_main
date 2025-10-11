import Image from 'next/image';
import Link from 'next/link';

const SolutionsSection = () => {
  const solutions = [
    {
      id: 1,
      title: 'Home Security',
      description: 'Comprehensive security solutions for residential properties',
      image: '/images/solution1.jpg',
    },
    {
      id: 2,
      title: 'Business Security',
      description: 'Advanced security systems for commercial establishments',
      image: '/images/solution2.jpg',
    },
    {
      id: 3,
      title: 'Smart Integration',
      description: 'Seamless integration with existing smart home systems',
      image: '/images/solution3.jpg',
    },
    {
      id: 4,
      title: 'Remote Monitoring',
      description: 'Monitor your security systems from anywhere in the world',
      image: '/images/solution4.jpg',
    },
    {
      id: 5,
      title: 'Access Control',
      description: 'Advanced access control for restricted areas',
      image: '/images/solution3.jpg',
    },
    {
      id: 6,
      title: 'Surveillance',
      description: '24/7 monitoring with high-definition cameras',
      image: '/images/solution4.jpg',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-10">
          <h2 className="text-3xl font-bold">Solutions</h2>
          <div className="h-1 bg-orange-500 w-24 ml-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution) => (
            <div key={solution.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{solution.description}</p>
                <Link href={`/solutions/${solution.id}`} className="text-orange-500 hover:text-orange-600 text-sm font-medium inline-flex items-center">
                  Learn more 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/solutions" className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition">
            View All Solutions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;