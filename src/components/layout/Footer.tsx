"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axiosClient from "@/services/axiosClient";

type FooterData = {
  branding: {
    footer_logo_url: string;
    footer_description: string;
    footer_copyright: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social_media: Record<string, string | null>;
  quick_links: Record<
    "company" | "products" | "support" | "legal",
    { title: string; url: string }[]
  >;
};

const Footer = () => {
  const [data, setData] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        // static build-like behavior by caching once in sessionStorage
        const cached = sessionStorage.getItem("footerData");
        if (cached) {
          setData(JSON.parse(cached));
          return;
        }

        const res = await axiosClient.get("/site/footer");
        const footerData = res.data.data;
        setData(footerData);
        sessionStorage.setItem("footerData", JSON.stringify(footerData));
      } catch (error) {
        console.error("Footer API Error:", error);
      }
    };

    fetchFooter();
  }, []);

  if (!data) return null;

  const { branding, contact, social_media, quick_links } = data;

  const socialIcons: Record<string, JSX.Element> = {
    facebook: (
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    ),
    twitter: (
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    ),
    linkedin: (
      <path
        fillRule="evenodd"
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
        clipRule="evenodd"
      />
    ),
    instagram: (
      <path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9a3.5 3.5 0 003.5-3.5v-9A3.5 3.5 0 0016.5 4h-9zm9.25 1a.75.75 0 110 1.5.75.75 0 010-1.5zM12 8a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z" />
    ),
  };

  return (
    <footer className="bg-[#2B2B2B] text-white py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
          {/* Contact */}
          <div>
            <h3 className="text-lg uppercase mb-4 font-medium">CONTACT</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white/55 hover:text-orange-500"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-white/55 hover:text-orange-500"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="border-t border-[#F4F4F4] w-1/2 my-3" />
              <li className="text-white/55 text-sm">{contact.address}</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg uppercase mb-4 font-medium">COMPANY</h3>
            <ul className="space-y-2">
              {quick_links.company.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-white/55 hover:text-white text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg uppercase mb-4 font-medium">PRODUCTS</h3>
            <ul className="space-y-2">
              {quick_links.products.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-white/55 hover:text-white text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg uppercase mb-4 font-medium">LEGAL</h3>
            <ul className="space-y-2">
              {quick_links.legal.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-white/55 hover:text-white text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center md:justify-start mt-10 md:mt-16">
          <Image
            src={branding.footer_logo_url}
            alt="Footer Logo"
            width={200}
            height={100}
            className="h-12 md:h-16 w-auto"
            unoptimized
          />
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-6 md:mb-0 text-center md:text-left">
            {branding.footer_copyright}
          </p>

          {/* Social */}
          <div className="flex space-x-4">
            {Object.entries(social_media).map(([key, url]) =>
              url ? (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/30 p-2 flex items-center justify-center w-10 h-10 hover:border-orange-500 hover:bg-orange-500/10 transition-colors"
                >
                  <svg
                    className="h-4 w-4 text-[#fff]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {socialIcons[key]}
                  </svg>
                </a>
              ) : null
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
