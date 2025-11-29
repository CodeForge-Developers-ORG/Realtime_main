"use client";
import AdvancedBreadcrumb from "@/components/common/Bredacrumb";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaUniversity, FaCopy } from "react-icons/fa";

const Page = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Pay", href: "/pay" },
  ];

  return (
    <Layout>
      <AdvancedBreadcrumb items={breadcrumbItems} />

      <section className="container mx-auto px-4 md:px-8 py-8 md:py-12" style={{ fontFamily: "var(--font-montserrat)" }}>
        {/* Page heading */}
        <div className="text-center mb-8">
          <h1 className="section-title">Payments</h1>
          <p className="section-subtitle mt-2">Pay securely via PayU or Paytm</p>
        </div>

        {/* Top bank info row */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <FaUniversity className="text-orange-600 w-6 h-6" />
            <div>
              <div className="text-xs text-gray-500">NEFT NOW</div>
              <div className="text-sm font-medium text-gray-900">Realtime Biometrics India Pvt. Ltd.</div>
              <div className="text-xs text-gray-600">Branch Name: Preet Vihar</div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div>
              <div className="text-xs text-gray-500">ICICI Account Number</div>
              <div className="text-sm font-medium text-gray-900">003705020179</div>
            </div>
            <button
              onClick={() => navigator.clipboard?.writeText("003705020179")}
              className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700">
              <FaCopy className="w-5 h-5" />
              <span className="text-xs">Copy</span>
            </button>
          </div>
          <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div>
              <div className="text-xs text-gray-500">ICICI IFSC Code</div>
              <div className="text-sm font-medium text-gray-900">ICIC0000037</div>
            </div>
            <button
              onClick={() => navigator.clipboard?.writeText("ICIC0000037")}
              className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700">
              <FaCopy className="w-5 h-5" />
              <span className="text-xs">Copy</span>
            </button>
          </div>
        </div>

        {/* Payment options */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start mt-8 md:mt-12">
          {/* PayUMoney / UPI */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-5 px-6 flex items-center gap-3 text-white">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/PayU.svg/1200px-PayU.svg.png" alt="PayU logo" width={120} height={40} className="h-9 w-auto" />
              <span className="font-semibold">Pay via PayU or any UPI App</span>
            </div>
            <div className="bg-white flex flex-col items-center justify-center p-6">
              <div className="text-gray-900 font-medium">Realtime Biometrics</div>
              <Image
                src="https://app.realtimebiometrics.net/storage/gallery/5QbhnTKkykcGUxBcqqdQyuoT3OSwetP09c2lXF3b.jpg"
                alt="PayU barcode"
                width={400}
                height={400}
                className="mt-4 w-56 md:w-64 h-auto rounded-md border border-gray-200"
              />
              <Link
                href="https://payu.in/web/987B6EFBB6EDCAC2CAA841A408CFFB76"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center px-5 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition">
                Pay via PayU Link
              </Link>
              <p className="mt-2 text-xs text-gray-500">Scan QR with any UPI app or use the PayU link</p>
            </div>
          </div>

          {/* Paytm / UPI */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-sky-600 to-sky-700 py-5 px-6 flex items-center gap-3 text-white">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png" alt="Paytm logo" width={120} height={40} className="h-9 w-auto" />
              <span className="font-semibold">Pay via Paytm or any UPI App</span>
            </div>
            <div className="bg-white flex flex-col items-center justify-center p-6">
              <div className="text-gray-900 font-medium">Verified Merchant</div>
              <Image
                src="https://app.realtimebiometrics.net/storage/gallery/uceotQEn0RCWRbgBOK2HLQNv7uAixTVz9TnFpkOU.jpg"
                alt="Paytm barcode"
                width={400}
                height={400}
                className="mt-4 w-56 md:w-64 h-auto rounded-md border border-gray-200"
              />
              <p className="mt-5 text-xs text-gray-500">Scan QR with Paytm or any UPI app</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Page;