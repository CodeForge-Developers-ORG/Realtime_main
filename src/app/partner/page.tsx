"use client";

import { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import Swal from "sweetalert2";
import axiosClient from "@/services/axiosClient";
import locationService from "@/services/locationService";
import Layout from "@/components/layout/Layout";

interface Country {
  name: string;
  code: string;
}
interface State {
  name: string;
  code: string;
  countryCode?: string;
}

interface PartnershipType {
  title: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

interface PartnershipTypesResponse {
  [key: string]: PartnershipType;
}

interface Option {
  value: string;
  label: string;
}

// Tracking interface
interface TrackingInfo {
  ip_address: string;
  user_agent: string;
  page_url: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  status: string;
  priority: string;
}

// Form interface
interface FormData {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  postal_code: string;
  business_type: string;
  years_in_business: string;
  partnership_type: string;
  areas_of_interest: string;
  target_markets: string;
  existing_partnerships: string;
  why_partner: string;
  business_plan: string;
  references: string;
  certifications: string;
}

export default function PartnerRegisterPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [partnershipTypes, setPartnershipTypes] = useState<PartnershipTypesResponse>({});
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedPartnershipType, setSelectedPartnershipType] = useState<Option | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPartnershipDetails, setShowPartnershipDetails] = useState(false);

  // 🌍 Tracking Info
  const [tracking, setTracking] = useState<TrackingInfo>({
    ip_address: "Detecting...",
    user_agent: "",
    page_url: "",
    referrer: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    status: "new",
    priority: "medium",
  });

  const [form, setForm] = useState<FormData>({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    postal_code: "",
    business_type: "",
    years_in_business: "",
    partnership_type: "",
    areas_of_interest: "",
    target_markets: "",
    existing_partnerships: "",
    why_partner: "",
    business_plan: "",
    references: "",
    certifications: "",
  });

  // ✅ Fetch IP + UTM + tracking info
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const defaultTracking: TrackingInfo = {
      ip_address: "Detecting...",
      user_agent: navigator.userAgent || "",
      page_url: window.location.href,
      referrer: document.referrer || "",
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
      status: "new",
      priority: "medium",
    };

    setTracking(defaultTracking);

    // 🧩 Fetch public IP
    const fetchIP = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setTracking((prev) => ({ ...prev, ip_address: data.ip }));
      } catch {
        console.warn("ipify failed, trying ipapi...");
        try {
          const res2 = await fetch("https://ipapi.co/json/");
          const data2 = await res2.json();
          setTracking((prev) => ({ ...prev, ip_address: data2.ip || "Unavailable" }));
        } catch {
          console.error("Both IP fetch failed",);
          setTracking((prev) => ({ ...prev, ip_address: "Unavailable" }));
        }
      }
    };
    fetchIP();
  }, []);

  // 🌍 Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await locationService.fetchCountries();
        setCountries(data || []);
      } catch (err) {
        console.error("Failed to load countries", err);
      }
    };
    fetchCountries();
  }, []);

  // 🤝 Fetch partnership types
  useEffect(() => {
    const fetchPartnershipTypes = async () => {
      try {
        const response = await axiosClient.get("/partners/types");
        if (response.data.success) {
          setPartnershipTypes(response.data.data);
        }
      } catch (err) {
        console.error("Failed to load partnership types", err);
        Swal.fire({
          icon: "warning",
          title: "Notice",
          text: "Partnership types could not be loaded. Please contact support.",
        });
      }
    };
    fetchPartnershipTypes();
  }, []);

  // 🗺 Fetch states
  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      setSelectedState(null);
      return;
    }

    const fetchStates = async () => {
      try {
        const data = await locationService.fetchStatesByCountry(selectedCountry.code);
        setStates(data || []);
      } catch (err) {
        console.error("Failed to load states", err);
        setStates([]);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle partnership type selection with React Select
  const handlePartnershipTypeChange = (option: SingleValue<Option>) => {
    setSelectedPartnershipType(option);
    
    if (option) {
      setForm((prev) => ({ ...prev, partnership_type: option.value }));
      setShowPartnershipDetails(true);
    } else {
      setForm((prev) => ({ ...prev, partnership_type: "" }));
      setShowPartnershipDetails(false);
    }
  };

  // Handle country selection
  const handleCountryChange = (option: SingleValue<Option>) => {
    if (option) {
      setSelectedCountry({ code: option.value, name: option.label });
    } else {
      setSelectedCountry(null);
    }
  };

  // Handle state selection
  const handleStateChange = (option: SingleValue<Option>) => {
    if (option) {
      setSelectedState({ code: option.value, name: option.label });
    } else {
      setSelectedState(null);
    }
  };

  // ✅ Validation
  const validate = (): string | null => {
    if (!form.company_name.trim()) return "Company name is required";
    if (!form.contact_person.trim()) return "Contact person is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.phone.trim()) return "Phone is required";
    if (!form.business_type.trim()) return "Business type is required";
    if (!form.years_in_business.trim()) return "Years in business is required";
    if (!selectedPartnershipType) return "Partnership type is required";
    return null;
  };

  // 📨 Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errMsg = validate();
    if (errMsg) {
      Swal.fire({ icon: "warning", title: "Validation", text: errMsg });
      return;
    }

    setIsLoading(true);

    const payload = {
      ...form,
      country: selectedCountry?.code || "",
      state: selectedState?.name || "",
      partnership_type: selectedPartnershipType?.value || "",
      areas_of_interest: form.areas_of_interest
        ? form.areas_of_interest.split(",").map((s) => s.trim())
        : [],
      target_markets: form.target_markets
        ? form.target_markets.split(",").map((s) => s.trim())
        : [],
      existing_partnerships: form.existing_partnerships
        ? form.existing_partnerships.split(",").map((s) => s.trim())
        : [],
      references: form.references
        ? form.references.split(",").map((s) => s.trim())
        : [],
      certifications: form.certifications
        ? form.certifications.split(",").map((s) => s.trim())
        : [],
      ...tracking,
    };

try {
  const res = await axiosClient.post("/partners/register", payload);
  const data = res?.data;

  if (data?.success) {
    const reg = data?.data || {};
    const messageLines = [
      data.message || "Registration successful.",
      reg.registration_id ? `<b>Registration ID:</b> ${reg.registration_id}` : "",
      reg.estimated_response_time
        ? `<b>Expected Response:</b> ${reg.estimated_response_time}`
        : "",
    ].filter(Boolean);

    await Swal.fire({
      icon: "success",
      title: "Registration Submitted 🎉",
      html: `<div style='text-align:left;'>${messageLines.join("<br/>")}</div>`,
      confirmButtonColor: "#f97316",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Submission Failed",
      text: data?.message || "Something went wrong.",
    });
  }

  // Reset form
  setForm({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    postal_code: "",
    business_type: "",
    years_in_business: "",
    partnership_type: "",
    areas_of_interest: "",
    target_markets: "",
    existing_partnerships: "",
    why_partner: "",
    business_plan: "",
    references: "",
    certifications: "",
  });
  setSelectedCountry(null);
  setSelectedState(null);
  setSelectedPartnershipType(null);
  setShowPartnershipDetails(false);
  setStates([]);
} catch (err: unknown) {
  console.error("Submit error:", err);
  
  // Type-safe error handling
  let errorMessage = "Network error. Try again.";
  
  if (typeof err === 'object' && err !== null) {
    // Axios error check
    if ('response' in err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      errorMessage = axiosError.response?.data?.message || errorMessage;
    } 
    // Generic Error object check
    else if ('message' in err && typeof (err as { message: string }).message === 'string') {
      errorMessage = (err as Error).message;
    }
  }

  Swal.fire({
    icon: "error",
    title: "Submission Failed",
    text: errorMessage,
  });
} finally {
  setIsLoading(false);
}
  };

  const countryOptions: Option[] = countries.map((c) => ({ value: c.code, label: c.name }));
  const stateOptions: Option[] = states.map((s) => ({ value: s.code, label: s.name }));
  const partnershipTypeOptions: Option[] = Object.entries(partnershipTypes).map(([key, type]) => ({
    value: key,
    label: type.title,
  }));

  return (
    <Layout>
      <section className="bg-white py-12 md:py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-light mb-2 text-[#1E1410]">
            Partner Registration
          </h1>
          <p className="text-gray-600 mb-10 text-sm md:text-base">
            Fill in the details below to become an official partner of Realtime Biometrics.
          </p>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "company_name",
                "contact_person",
                "email",
                "phone",
                "website",
                "address",
                "city",
                "postal_code",
                "business_type",
                "years_in_business",
              ].map((field) => (
                <FloatingInput
                  key={field}
                  name={field}
                  label={field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  type={field === "email" ? "email" : field === "years_in_business" ? "number" : "text"}
                  value={(form as never)[field]}
                  onChange={handleChange}
                />
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <SelectBox
                label="Country"
                options={countryOptions}
                value={
                  selectedCountry
                    ? { value: selectedCountry.code, label: selectedCountry.name }
                    : null
                }
                onChange={handleCountryChange}
                placeholder="Search Country..."
              />

              <SelectBox
                label="State"
                options={stateOptions}
                value={
                  selectedState
                    ? { value: selectedState.code, label: selectedState.name }
                    : null
                }
                onChange={handleStateChange}
                placeholder={selectedCountry ? "Search State..." : "Select Country first"}
                isDisabled={!selectedCountry}
              />
            </div>

            {/* Partnership Type Selection with React Select */}
            <div className="space-y-4">
              <SelectBox
                label="Partnership Type *"
                options={partnershipTypeOptions}
                value={selectedPartnershipType}
                onChange={handlePartnershipTypeChange}
                placeholder="Select partnership type..."
                isDisabled={partnershipTypeOptions.length === 0}
              />

              {/* Partnership Type Details */}
              {showPartnershipDetails && selectedPartnershipType && partnershipTypes[selectedPartnershipType.value] && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mt-4">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">
                    {partnershipTypes[selectedPartnershipType.value].title}
                  </h3>
                  <p className="text-orange-700 mb-4">
                    {partnershipTypes[selectedPartnershipType.value].description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-orange-800 mb-2">Requirements</h4>
                      <ul className="list-disc list-inside space-y-1 text-orange-700">
                        {partnershipTypes[selectedPartnershipType.value].requirements.map((req, index) => (
                          <li key={index} className="text-sm">{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-orange-800 mb-2">Benefits</h4>
                      <ul className="list-disc list-inside space-y-1 text-orange-700">
                        {partnershipTypes[selectedPartnershipType.value].benefits.map((benefit, index) => (
                          <li key={index} className="text-sm">{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <FloatingTextArea
              name="why_partner"
              label="Why Partner With Us?"
              value={form.why_partner}
              onChange={handleChange}
            />
            <FloatingTextArea
              name="business_plan"
              label="Business Plan"
              value={form.business_plan}
              onChange={handleChange}
            />

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "areas_of_interest",
                "target_markets",
                "existing_partnerships",
                "references",
                "certifications",
              ].map((field) => (
                <FloatingInput
                  key={field}
                  name={field}
                  label={field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  value={(form as never)[field]}
                  onChange={handleChange}
                />
              ))}
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-all font-medium disabled:opacity-60"
              >
                {isLoading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}

/* ---------- Reusable Floating Inputs ---------- */

interface FloatingInputProps {
  name: string;
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FloatingInput({
  name,
  label,
  type = "text",
  value,
  onChange,
}: FloatingInputProps) {
  const hasValue = value !== "" && value !== undefined && value !== null;
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="peer w-full border border-gray-300 rounded-xl px-4 pt-5 pb-2 text-[15px] text-black focus:border-orange-500 focus:ring-0 outline-none transition-all"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute left-4 bg-white px-1 transition-all duration-200 ${
          hasValue
            ? "top-1 text-[12px] text-gray-500"
            : "top-3.5 text-gray-400 text-[15px]"
        } peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-orange-500`}
      >
        {label}
      </label>
    </div>
  );
}

interface FloatingTextAreaProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function FloatingTextArea({
  name,
  label,
  value,
  onChange,
}: FloatingTextAreaProps) {
  const hasValue = value !== "" && value !== undefined && value !== null;
  return (
    <div className="relative">
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-[15px] text-black focus:border-orange-500 focus:ring-0 outline-none transition-all"
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute left-4 bg-white px-1 transition-all duration-200 ${
          hasValue
            ? "top-1 text-[12px] text-orange-500"
            : "top-4 text-gray-400 text-[15px]"
        } peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-orange-500`}
      >
        {label}
      </label>
    </div>
  );
}

interface SelectBoxProps {
  label: string;
  options: Option[];
  value: Option | null;
  onChange: (opt: SingleValue<Option>) => void;
  placeholder: string;
  isDisabled?: boolean;
}

function SelectBox({
  label,
  options,
  value,
  onChange,
  placeholder,
  isDisabled,
}: SelectBoxProps) {
  return (
    <div>
      <label className="text-black/60 text-xs mb-1 block">{label}</label>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        isSearchable
        placeholder={placeholder}
        isDisabled={isDisabled}
        className="react-select-container"
        classNames={{
          control: (state) =>
            `border border-gray-300 rounded-xl hover:border-orange-400 focus:border-orange-500 transition-all ${
              state.isFocused ? "border-orange-500 ring-0" : ""
            }`,
          option: (state) =>
            `${
              state.isFocused ? "bg-orange-50 text-orange-800" : "bg-white text-gray-800"
            }`,
        }}
        styles={{
          control: (base) => ({
            ...base,
            padding: "2px",
            borderRadius: "12px",
            boxShadow: "none",
            minHeight: "52px",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#fff7ed" : "white",
            color: state.isFocused ? "#9a3412" : "#1e1410",
            ":active": {
              backgroundColor: "#fed7aa",
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: "#1e1410",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9ca3af",
          }),
        }}
      />
    </div>
  );
}