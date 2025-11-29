"use client";
import AdvancedBreadcrumb from "@/components/common/Bredacrumb";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import StatsCounter from "@/components/sections/StatsCounter";
import {
  FaFingerprint,
  FaDoorOpen,
  FaTrafficLight,
  FaCamera,
  FaLaptopCode,
  FaLock,
  FaTools,
  FaShieldAlt,
  FaCloud,
  FaCogs,
  FaSyncAlt,
  FaHeadset,
  FaIndustry,
} from "react-icons/fa";

const Page = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
  ];

  return (
    <Layout>
      <div className="bg-white" style={{ fontFamily: "var(--font-montserrat)" }}>
        <AdvancedBreadcrumb items={breadcrumbItems} />

        {/* Hero */}
        <section className="container mx-auto px-4 md:px-8 pt-8 md:pt-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                With You Towards A Safer, Smarter Tomorrow
              </h1>
              <p className="mt-4 text-gray-700 text-base md:text-lg">
                Realtime Biometrics is an active technology developer specializing in Biometric Attendance,
                Time & Attendance, Access Control, and Workplace Automation. We deliver
                enterprise-ready solutions across India, the UAE, the Middle East, and Europe.
              </p>
            </div>
            <div className="relative h-56 md:h-72 rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm">
              <Image
                src="https://app.realtimebiometrics.net/storage/gallery/jGdRJVj73zfzERBn1a2p4rtoWvtxMnYbfw70fqv8.jpg"
                alt="About Realtime Biometrics"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="container mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
            <div className="text-center">
              <h2 className="section-title">Our Story</h2>
              <p className="section-subtitle mt-2">We build secure, scalable, and smart systems</p>
            </div>
            <div className="mt-6 text-gray-700 leading-relaxed space-y-4">
              <p>
                Our journey is ongoing — beginning with a vision to transform how enterprises manage time,
                people, and security. Today, we embed AI, Machine Learning, and Cloud-native architectures
                across our devices and software to create multi-layered security systems for businesses of all sizes.
              </p>
              <p>
                We design for reliability, scale, and interoperability — integrating seamlessly with HRMS, ERP,
                and facility systems. From biometric attendance to access and entrance control, our solutions are
                engineered to be robust and future-ready.
              </p>
              <p>
                At Realtime Biometrics, we collaborate closely with customers to understand on-ground requirements
                and deliver solutions that improve security, compliance, and productivity.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="container mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="text-center mb-6">
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle mt-2">Engineered for seamless integration across industries</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Time Attendance & Biometric Access Control Systems", Icon: FaFingerprint },
              { title: "Entrance Control Solutions", Icon: FaDoorOpen },
              { title: "Parking & Traffic Control Systems", Icon: FaTrafficLight },
              { title: "Inspection Control Systems", Icon: FaCamera },
              { title: "Software & Applications", Icon: FaLaptopCode },
              { title: "UL Listed EM Locks", Icon: FaLock },
              { title: "Accessories", Icon: FaTools },
            ].map((item) => (
              <div key={item.title} className="group bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-orange-50 text-orange-600 group-hover:bg-orange-100 transition">
                    <item.Icon className="w-6 h-6" />
                  </span>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base text-center">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Realtime Biometrics */}
        <section className="container mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="text-center mb-6">
            <h2 className="section-title">Why Choose Realtime Biometrics</h2>
            <p className="section-subtitle mt-2">Built for reliability, scale, and seamless integration</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Secure by Design", desc: "Multi-layered security with encrypted data flows and role-based access.", Icon: FaShieldAlt },
              { title: "Cloud & On-Premise", desc: "Flexible deployments to match your infrastructure and compliance needs.", Icon: FaCloud },
              { title: "Easy Integration", desc: "RESTful APIs and connectors for HRMS, ERP, and facility systems.", Icon: FaSyncAlt },
              { title: "Configurable Workflows", desc: "Adapt rules, schedules, and policies to match your operations.", Icon: FaCogs },
              { title: "Enterprise Support", desc: "Implementation assistance, training, and 24/7 support options.", Icon: FaHeadset },
              { title: "Industry Ready", desc: "Solutions tailored for manufacturing, corporate, education, and more.", Icon: FaIndustry },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-orange-50 text-orange-600">
                    <f.Icon className="w-6 h-6" />
                  </span>
                </div>
                <h3 className="text-center mt-4 font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-gray-700 text-sm text-center">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="container mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="text-center mb-6">
            <h2 className="section-title">Industries We Serve</h2>
            <p className="section-subtitle mt-2">Cross-industry deployments at scale</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Manufacturing",
              "Corporate Offices",
              "Education",
              "Healthcare",
              "Retail",
              "Government",
              "Logistics",
              "Hospitality",
            ].map((i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-sm">
                {i}
              </span>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="container mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 text-center">Our Mission</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                To design and develop world-class smart security and automation products under one roof,
                helping clients across industries secure, manage, and automate their premises effectively.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 text-center">Our Vision</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                To become one of the top five global leaders in Biometric Attendance, Time & Attendance,
                Access Control, Entrance Control, Traffic & Parking, and Inspection Control Systems — known
                for quality, innovation, and customer satisfaction.
              </p>
            </div>
          </div>

          {/* Values section removed per request */}
        </section>

        {/* Stats */}
        <StatsCounter
          title="Strong Track Record"
          subtitle="Trusted by businesses across regions"
          stats={[
            { label: "Years Experience", value: 9, suffix: "+" },
            { label: "Happy Clients", value: 10000, suffix: "+" },
            { label: "Countries", value: 50, suffix: "+" },
            { label: "Products & Solutions", value: 20, suffix: "+" },
          ]}
        />

        {/* Presence */}
        <section className="container mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-10 shadow-sm">
            <div className="text-center">
              <h2 className="section-title">Strong Presence in Major Cities</h2>
              <p className="section-subtitle mt-2">India & GCC</p>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 text-center">India</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Delhi NCR",
                    "Mumbai",
                    "Bengaluru",
                    "Hyderabad",
                    "Chennai",
                    "Pune",
                    "Kolkata",
                    "Ahmedabad",
                    "Surat",
                    "Jaipur",
                    "Lucknow",
                    "Indore",
                    "Coimbatore",
                    "Kochi",
                    "Bhubaneswar",
                  ].map((city) => (
                    <span key={city} className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-sm">
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 text-center">GCC & Europe</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["UAE", "Saudi Arabia", "Oman", "Qatar", "Bahrain", "Kuwait", "Germany", "United Kingdom"].map((region) => (
                    <span key={region} className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-sm">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Image src="/images/map.jpg" alt="Global presence" width={1200} height={600} className="w-full h-56 md:h-72 object-cover rounded-xl ring-1 ring-gray-200" />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Page;
