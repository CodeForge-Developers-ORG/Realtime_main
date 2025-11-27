"use client";
import { Fingerprint, Clock3, BarChart2, Users, Shield, Globe } from "lucide-react";
import "./features-section.css";

type Feature = {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    Icon: Fingerprint,
    title: "Biometric Authentication",
    description:
      "Advanced fingerprint, face, and iris recognition with 99.9% accuracy",
  },
  {
    Icon: Clock3,
    title: "Real-time Tracking",
    description:
      "Live attendance monitoring with instant notifications and alerts",
  },
  {
    Icon: BarChart2,
    title: "Analytics Dashboard",
    description:
      "Comprehensive reports and insights for informed decision making",
  },
  {
    Icon: Users,
    title: "HRM Integration",
    description:
      "Seamless integration with payroll, leave management, and HR systems",
  },
  {
    Icon: Shield,
    title: "Security & Compliance",
    description:
      "Bank-grade security with GDPR compliance and data encryption",
  },
  {
    Icon: Globe,
    title: "Multi-location Support",
    description:
      "Centralized management across multiple offices and time zones",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="features-section">
      <div className="container">
        {/* Header */}
        <div className="features-header">
          <h2 className="features-title section-title">Advanced Features for Modern Workforce</h2>
          <p className="features-subtitle section-subtitle">
            Comprehensive biometric solutions with seamless HRM integration
          </p>
        </div>

        {/* Grid - redesigned to match provided example */}
        <div className="features-grid redesigned">
          {features.map(({ Icon, title, description }, idx) => (
            <div key={idx} className="feature-item">
              <div className="feature-circle">
                <span className="feature-circle-accent" aria-hidden="true"></span>
                <Icon className="feature-circle-icon" />
              </div>
              <h3 className="feature-item-title">{title}</h3>
              <p className="feature-item-desc">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}