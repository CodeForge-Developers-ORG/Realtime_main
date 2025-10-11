import Image from 'next/image';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      position: 'Homeowner',
      content: 'The smart lock system has completely transformed how I secure my home. The fingerprint recognition is lightning fast and the app is intuitive.',
      image: '/images/testimonial1.jpg',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Business Owner',
      content: 'We installed Realtime security systems across all our retail locations. The customer service was exceptional and the products are top-notch.',
      image: '/images/testimonial2.jpg',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-10">
          <h2 className="text-3xl font-bold">What our partners Say</h2>
          <div className="h-1 bg-orange-500 w-24 ml-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="mb-6">
                <span className="text-orange-500 text-5xl font-serif">&ldquo;</span>
                <p className="text-gray-700 italic">{testimonial.content}</p>
              </div>
              <div className="flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                  unoptimized
                />
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;