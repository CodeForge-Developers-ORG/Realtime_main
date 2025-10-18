import Image from 'next/image';
import Link from 'next/link';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Smart Home Security',
      excerpt: 'Explore the latest trends in smart home security technology and what to expect in the coming years.',
      date: 'June 15, 2023',
      image: '/images/blog1.png',
    },
    {
      id: 2,
      title: 'How to Choose the Right Lock for Your Home',
      excerpt: 'A comprehensive guide to selecting the perfect lock system based on your security needs and budget.',
      date: 'May 28, 2023',
      image: '/images/blog2.png',
    },
    {
      id: 3,
      title: 'Business Security: Protecting Your Assets',
      excerpt: 'Learn about the essential security measures every business should implement to protect their assets.',
      date: 'May 10, 2023',
      image: '/images/blog3.png',
    },
    {
      id: 4,
      title: 'The Benefits of Biometric Security',
      excerpt: 'Discover how biometric security solutions can enhance your home or business protection systems.',
      date: 'April 22, 2023',
      image: '/images/blog4.png',
    },
  ];

  return (
    <section className="py-20 bg-[#E8E9E3]">
      <div className="container mx-auto px-4">
        <div className=" mb-10">
          <h2 className="text-7xl font-thin text-[#1E1410]  mb-8">Blogs</h2>
          <p className="text-3xl font-thin uppercase bg-amber-400 p-1 px-2 text-black inline-block">Our Leatest Updates</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-4xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative h-90">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-light text-black mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-400 text-md font-light mb-3 line-clamp-2">{post.excerpt}</p>
                <p className="text-gray-600 text-sm mb-2">Posted on :  {post.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-right mt-6">
          <Link href="/blog" className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition inline-flex items-center">
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