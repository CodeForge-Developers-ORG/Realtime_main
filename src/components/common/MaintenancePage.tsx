// app/maintenance/page.tsx
import { realtimeAppPlayStore, realtimeAppStore } from "@/services/constant";
import { fetchContactInfo } from "@/services/contactService";
import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Phone,
  Mail,
} from "lucide-react";

export const metadata = {
  title: "Under Maintenance | Realtime Biometrics",
  description:
    "Our website is currently under construction. We'll be back very soon with something amazing!",
};

export default async function MaintenancePage() {
  const info = await fetchContactInfo();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-xl w-full p-10 text-center">
        {/* Logo */}
        <img
          src="/images/logo-black.png"
          alt="Realtime Logo"
          className="mx-auto h-16 mb-6"
        />

        {/* Main Title */}
        <h1 className="text-3xl font-extrabold text-gray-900">
          We&apos;re Under Maintenance
        </h1>

        {/* Description */}
        <p className="text-gray-600 mt-3">
          Our new website is being crafted with care. We&apos;re working hard to
          bring you something amazing and will be launching very soon!
        </p>

        {/* Contact Info */}
        <div className="flex flex-col items-center gap-3 mt-6 text-gray-700">
          {info?.enquiry_number && (
            <p className="flex items-center gap-2">
              <Phone size={18} /> {info.enquiry_number}
            </p>
          )}

          {info?.general_email && (
            <p className="flex items-center gap-2">
              <Mail size={18} /> {info.general_email}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <a
            href="https://www.supportrealtime.com/"
            className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-700 transition"
          >
            Download Softwares
          </a>

          <a
            href="#"
            className="bg-teal-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-teal-800 transition"
          >
            Request a call back
          </a>
        </div>

        {/* App Download */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold">Download Our App</h3>

          <div className="flex justify-center gap-4 mt-5">
            <a href={realtimeAppStore} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:opacity-80 transition">
              <img src="/images/app-store.png" alt="Apple" className="h-6" />
              <span className="text-sm text-left leading-tight">
                <span className="block text-[10px]">Download on the</span>
                <span className="font-semibold text-sm">App Store</span>
              </span>
            </a>

            <a href={realtimeAppPlayStore} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:opacity-80 transition">
              <img src="/images/gplay.png" alt="Google Play" className="h-6" />
              <span className="text-sm text-left leading-tight">
                <span className="block text-[10px]">GET IT ON</span>
                <span className="font-semibold text-sm">Google Play</span>
              </span>
            </a>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t mt-10 pt-6 flex justify-center gap-5 text-gray-600">
          {info?.social_media_links?.facebook && (
            <a href={info.social_media_links.facebook} target="_blank">
              <Facebook className="hover:text-blue-600" />
            </a>
          )}

          {info?.social_media_links?.twitter && (
            <a href={info.social_media_links.twitter} target="_blank">
              <Twitter className="hover:text-blue-400" />
            </a>
          )}

          {info?.social_media_links?.linkedin && (
            <a href={info.social_media_links.linkedin} target="_blank">
              <Linkedin className="hover:text-blue-700" />
            </a>
          )}

          {info?.social_media_links?.instagram && (
            <a href={info.social_media_links.instagram} target="_blank">
              <Instagram className="hover:text-pink-600" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
