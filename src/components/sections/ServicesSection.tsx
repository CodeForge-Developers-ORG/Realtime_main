import Image from 'next/image';
import Link from 'next/link';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Residential Security',
      description: 'Smart locks and security systems for homes',
      icon: '/images/service1.jpg',
    },
    {
      id: 2,
      title: 'Commercial Security',
      description: 'Advanced security solutions for businesses',
      icon: '/images/service2.jpg',
    },
    {
      id: 3,
      title: 'Industrial Security',
      description: 'Heavy-duty security systems for industrial facilities',
      icon: '/images/service3.jpg',
    },
    {
      id: 4,
      title: 'Access Control',
      description: 'Manage and control access to your property',
      icon: '/images/service4.jpg',
    },
    {
      id: 5,
      title: 'Smart Locks',
      description: 'Keyless entry solutions for modern living',
      icon: '/images/service5.jpg',
    },
    {
      id: 6,
      title: 'Consultation',
      description: 'Expert security consultation and planning',
      icon: '/images/service6.jpg',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-10">
          <h2 className="text-3xl font-bold">Services</h2>
          <div className="h-1 bg-orange-500 w-24 ml-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="flex items-start">
                <div className="mr-5 mt-1">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={40}
                    height={40}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/services" className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;