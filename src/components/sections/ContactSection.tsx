"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import Swal from "sweetalert2";

import locationService from "@/services/locationService";
import { getContactInfo, submitForm, submitNewsletter } from "@/services/contactServices";

/* ---------------------------------- */
/* FLOATING INPUT (Matches Modal Form) */
/* ---------------------------------- */
function FloatingInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: any) {
  const hasValue = value !== "" && value !== undefined && value !== null;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        placeholder=" "
        className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-black 
                   focus:border-orange-500 focus:ring-0 outline-none"
      />

      <label
        className={`absolute left-4 bg-white px-1 transition-all duration-200 
          ${hasValue
            ? "top-1 text-xs text-gray-500"
            : "top-3.5 text-gray-500 text-sm"
          }
          peer-focus:top-1 peer-focus:text-xs peer-focus:text-orange-500`}
      >
        {label}
      </label>
    </div>
  );
}

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [message, setMessage] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  /* Country + State */
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState<any>(null);

  /* Loading */
  const [loading, setLoading] = useState({
    countries: false,
    states: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Fetch Countries */
  useEffect(() => {
    const load = async () => {
      setLoading((p) => ({ ...p, countries: true }));
      const res = await locationService.fetchCountries();
      setCountries(res);
      setLoading((p) => ({ ...p, countries: false }));
    };
    load();
  }, []);

  useEffect(() => {

    const fetchContactInfo = async () => {
      try {
        const data = await getContactInfo();
        setContactInfo(data.data)
      }
      catch (error) {
        console.log("Error fetching contact info:", error);
      }
    }
    fetchContactInfo();

  }, []);

  console.log("Contact Info:", contactInfo);

  /* Fetch States */
  useEffect(() => {
    if (!selectedCountry) return;

    const load = async () => {
      setLoading((p) => ({ ...p, states: true }));
      const res = await locationService.fetchStatesByCountry(selectedCountry.code);
      setStates(res);
      setSelectedState(null);
      setLoading((p) => ({ ...p, states: false }));
    };

    load();
  }, [selectedCountry]);

  /* Handle Country Change */
  const handleCountryChange = (option: any) => {
    const country = countries.find((c) => c.code === option?.value);
    setSelectedCountry(country || null);
  };

  /* Handle State Change */
  const handleStateChange = (option: any) => {
    const state = states.find((s) => s.code === option?.value);
    setSelectedState(state || null);
  };

  /* Newsletter */
  const handleSubscribeChange = async (e: any) => {
    const checked = e.target.checked;
    setIsSubscribed(checked);

    if (checked) {
      try {
        const res = await submitNewsletter(name, email);
        Swal.fire("Subscribed!", res.message, "success");
      } catch (err: any) {
        console.error(err);
        Swal.fire("Error", err?.response?.data?.message, "error");
      }
    }
  };

  /* Submit Form */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name,
      email,
      phone,
      message,
      city,
      zip: zipCode,
      country: selectedCountry?.name || "",
      state: selectedState?.name || "",
      subject: "Website Contact",
      form_type: "contact",
      page_url: typeof window !== "undefined" ? window.location.href : "",
      custom_fields: {
        subscribed: isSubscribed ? "Yes" : "No",
      },
    };

    try {
      const res = await submitForm(payload);
      Swal.fire("Success!", res.message, "success");
    } catch (err: any) {
      Swal.fire("Error", "Submission failed", "error");
    }

    setIsSubmitting(false);
  };

  /* React-Select Styling (Matches Modal Popup UI) */
  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      padding: "2px",
      minHeight: "55px",
      borderRadius: "8px",
      borderColor: state.isFocused ? "#f97316" : "#d1d5db",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#fb923c",
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "#1e1410",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#9ca3af",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? "#fff7ed" : "white",
      color: state.isFocused ? "#9a3412" : "#1e1410",
    }),
  };

  return (
    <section className="mx-auto not-first:py-25 lg:py-0 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="md:mb-6 text-[#1E1410] text-center">
          <h2 className="section-title mb-4">Contact Us</h2>
          <p className="section-subtitle uppercase max-w-4xl mx-auto">CONTACT US OR GIVE US A CALL TO DISCOVER HOW WE CAN HELP.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Contact Form */}
          <div>
            <h3 className="text-md md:text-[30px] font-[300] mb-2 md:mb-6 mt-4 md:mt-10 text-[#1E1410]">Send Us a Message</h3>


            <form onSubmit={handleSubmit} className="space-y-6">

              <FloatingInput
                label="Name*"
                name="name"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />

              <FloatingInput
                label="Email*"
                name="email"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />

              {/* Subscribe */}
              <label
                htmlFor="subscribe"
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                {/* HIDDEN INPUT */}
                <input
                  id="subscribe"
                  type="checkbox"
                  className="sr-only"
                  checked={isSubscribed}
                  onChange={(e) => handleSubscribeChange(e)}
                />

                {/* CUSTOM BOX */}
                <div
                  className={`w-6 h-6 rounded border flex items-center justify-center transition-all
      ${isSubscribed ? "bg-orange-500 border-orange-500" : "border-gray-400"}
    `}
                >
                  {/* TICK ICON (always visible when checked) */}
                  {isSubscribed && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <span className="text-sm md:text-[15px] text-black/60">
                  Subscribe to our newsletter
                </span>
              </label>





              <FloatingInput
                label="Phone Number*"
                name="phone"
                value={phone}
                onChange={(e: any) => setPhone(e.target.value)}
              />

              {/* COUNTRY + STATE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  options={countries.map((c) => ({
                    label: c.name,
                    value: c.code,
                  }))}
                  value={
                    selectedCountry
                      ? { label: selectedCountry.name, value: selectedCountry.code }
                      : null
                  }
                  onChange={handleCountryChange}
                  isLoading={loading.countries}
                  placeholder="Search Country..."
                  styles={selectStyles}
                />

                <Select
                  options={states.map((s) => ({
                    label: s.name,
                    value: s.code,
                  }))}
                  value={
                    selectedState
                      ? { label: selectedState.name, value: selectedState.code }
                      : null
                  }
                  onChange={handleStateChange}
                  isDisabled={!selectedCountry}
                  isLoading={loading.states}
                  placeholder={
                    selectedCountry ? "Search State..." : "Select Country first"
                  }
                  styles={selectStyles}
                />
              </div>

              {/* CITY + ZIP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatingInput
                  label="City*"
                  value={city}
                  onChange={(e: any) => setCity(e.target.value)}
                />
                <FloatingInput
                  label="Zip Code*"
                  value={zipCode}
                  onChange={(e: any) => setZipCode(e.target.value)}
                />
              </div>

              <FloatingInput
                label="Message*"
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
              />

              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>

          {/* Right Column - Contact Information */}
          <div>
            <div className="mb-4 mt-1 md:mt-15">
              <h4 className="text-sm md:text-[16px] uppercase font-medium mb-4 text-[#1E1410]">CORPORATE HEADQUARTERS - DELHI, INDIA</h4>

              <div className="mb-4 md:mb-6">
                <h5 className="text-gray-700 text-sm md:text-[16px] md:mb-2 tracking-[1]">ENQUIRE US</h5>
                <div className="flex items-center text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 mr-2 md:mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-sm md:text-[16px] break-all">{contactInfo?.enquiry_number}</span>
                </div>
              </div>

              <div className="mb-4 md:mb-6">
                <h5 className="text-gray-700 md:mb-2 text-sm md:text-[16px] tracking-[1]">SEND AN EMAIL</h5>
                <div className="flex items-center text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm md:text-[16px] break-all">{contactInfo?.general_email}</span>
                </div>
              </div>

              <div className="mb-4 md:mb-6">
                <h5 className="text-gray-700 md:mb-2 text-sm md:text-[16px] tracking-[1]">CORPORATE HEADQUARTERS - DELHI, INDIA</h5>
                <div className="flex items-center text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-[16px]">{contactInfo?.hq_address}</span>
                </div>
              </div>
            </div>

            <div className="relative h-40 sm:h-81 rounded-lg overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2676026374565!2d77.28099627550043!3d28.621740775670638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce350d82a5555%3A0xded517f01ea7b98f!2sRealtime%20Biometrics!5e0!3m2!1sen!2sin!4v1760680350707!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} loading="lazy" ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;