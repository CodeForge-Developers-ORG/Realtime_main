import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#2B2B2B] text-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
          {/* Contact Section */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-base md:text-lg uppercase mb-4 md:mb-6 font-medium">CONTACT</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@realtimebiometrics.com" className="text-white/55 hover:text-orange-500 text-sm md:text-base">info@realtimebiometrics.com</a>
              </li>
              <li>
                <a href="tel:+918860886086" className="text-white/55 hover:text-orange-500 text-sm md:text-base">+91-8860 8860 86</a>
              </li>
              <li className="border-t border-[#F4F4F4] w-full md:w-[50%] my-3 md:my-5"></li>
              <li className="text-white/55 text-sm md:text-base">
                C-83, Ganesh Nagar, Pandav<br />
                Nagar, New Delhi, Delhi, 110092
              </li>
            </ul>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {/* Company Links */}
            <div>
              <h3 className="text-base md:text-lg uppercase mb-4 md:mb-6 font-medium">COMPANY</h3>
              <ul className="space-y-2 md:space-y-3">
                <li><Link href="/" className="text-white hover:text-white text-sm md:text-base">Home</Link></li>
                <li><Link href="/about" className="text-white/55 hover:text-white text-sm md:text-base">About</Link></li>
                <li><Link href="/solution" className="text-white/55 hover:text-white text-sm md:text-base">Solution</Link></li>
                <li><Link href="/product" className="text-white/55 hover:text-white text-sm md:text-base">Product</Link></li>
                <li><Link href="/software" className="text-white/55 hover:text-white text-sm md:text-base">Software</Link></li>
              </ul>
            </div>
            
            {/* Resources Links */}
            <div>
              <h3 className="text-base md:text-lg uppercase mb-4 md:mb-6 font-medium">RESOURCES</h3>
              <ul className="space-y-2 md:space-y-3">
                <li><Link href="/contact" className="text-white/55 hover:text-white text-sm md:text-base">Contact</Link></li>
                <li><Link href="/privacy-policy" className="text-white/55 hover:text-white text-sm md:text-base">Privacy Policy</Link></li>
                <li><Link href="/user-agreement" className="text-white/55 hover:text-white text-sm md:text-base">User Agreement</Link></li>
                <li><Link href="/refund-and-cancellation-policy" className="text-white/55 hover:text-white text-sm md:text-base truncate">Refund Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-white/55 hover:text-white text-sm md:text-base">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="flex justify-center md:justify-start mt-10 md:mt-16 mb-6 md:mb-0">
          <Image 
            src="/logo.png" 
            alt="Realtime Logo" 
            width={200} 
            height={100} 
            className="h-12 md:h-16 w-auto"
            unoptimized
          />
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-white/20 mt-6 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-white/70 text-sm md:text-base mb-6 md:mb-0 text-center md:text-left">
            Realtime Biometrics © 2016-{new Date().getFullYear()}. All Rights Reserved. | <Link href="/legal" className="text-white/70 hover:text-white">Legal</Link>
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 p-2 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 hover:border-orange-500 hover:bg-orange-500/10 transition-colors">
              <svg className="h-4 w-4 md:h-5 md:w-5 text-[#fff]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 p-2 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 hover:border-orange-500 hover:bg-orange-500/10 transition-colors">
              <svg className="h-4 w-4 md:h-5 md:w-5 text-[#fff]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 p-2 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 hover:border-orange-500 hover:bg-orange-500/10 transition-colors">
              <svg className="h-4 w-4 md:h-5 md:w-5 text-[#fff]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;