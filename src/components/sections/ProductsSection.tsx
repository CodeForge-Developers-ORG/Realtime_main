import Image from 'next/image';
import Link from 'next/link';

const ProductsSection = () => {
  const products = [
    {
      id: 1,
      name: 'Smart Lock Pro',
      description: 'Advanced fingerprint and PIN code lock',
      price: '$199.99',
      image: '/images/product1.jpg',
    },
    {
      id: 2,
      name: 'Access Control System',
      description: 'Complete access management solution',
      price: '$349.99',
      image: '/images/product2.jpg',
    },
    {
      id: 3,
      name: 'Security Camera Bundle',
      description: 'HD cameras with motion detection',
      price: '$299.99',
      image: '/images/product3.jpg',
    },
    {
      id: 4,
      name: 'Smart Door Lock',
      description: 'Keyless entry with smartphone control',
      price: '$249.99',
      image: '/images/product4.jpg',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-10">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <div className="h-1 bg-orange-500 w-24 ml-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">{product.price}</span>
                  <Link href={`/products/${product.id}`} className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm hover:bg-orange-600 transition">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/products" className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;