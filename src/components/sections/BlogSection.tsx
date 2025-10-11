import Image from 'next/image';
import Link from 'next/link';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Smart Home Security',
      excerpt: 'Explore the latest trends in smart home security technology and what to expect in the coming years.',
      date: 'June 15, 2023',
      image: '/images/blog1.jpg',
    },
    {
      id: 2,
      title: 'How to Choose the Right Lock for Your Home',
      excerpt: 'A comprehensive guide to selecting the perfect lock system based on your security needs and budget.',
      date: 'May 28, 2023',
      image: '/images/blog2.jpg',
    },
    {
      id: 3,
      title: 'Business Security: Protecting Your Assets',
      excerpt: 'Learn about the essential security measures every business should implement to protect their assets.',
      date: 'May 10, 2023',
      image: '/images/blog3.jpg',
    },
    {
      id: 4,
      title: 'The Benefits of Biometric Security',
      excerpt: 'Discover how biometric security solutions can enhance your home or business protection systems.',
      date: 'April 22, 2023',
      image: '/images/blog4.jpg',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-10">
          <h2 className="text-3xl font-bold">Blogs</h2>
          <div className="h-1 bg-orange-500 w-24 ml-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative h-40">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <p className="text-gray-500 text-xs mb-2">{post.date}</p>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                <Link href={`/blog/${post.id}`} className="text-orange-500 hover:text-orange-600 text-sm font-medium inline-flex items-center">
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-right mt-6">
          <Link href="/blog" className="text-orange-500 hover:text-orange-600 text-sm font-medium inline-flex items-center">
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;