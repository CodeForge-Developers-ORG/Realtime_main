"use client";

import { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import Swal from "sweetalert2";
import axiosClient from "@/services/axiosClient";
import Layout from "@/components/layout/Layout";

interface Option {
  value: string;
  label: string;
}

interface PostOffice {
  Name: string;
  District: string;
  State: string;
  Country: string;
  Block: string;
}

interface PincodeResponse {
  Message: string;
  Status: string;
  PostOffice: PostOffice[];
}

interface ContactInfo {
  customer_support_number: string;
  partner_support_number: string;
  enquiry_number: string;
  service_center_number: string;
  general_email: string;
  support_email: string;
  business_hours: {
    [key: string]: string;
  };
  social_media_links: {
    facebook: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
}

// Form interface
interface FormData {
  name: string;
  phone: string;
  email: string;
  pin_code: string;
  state: string;
  city: string;
  area: string;
  message: string;
  category: string;
  priority: string;
}

export default function SupportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingPincode, setIsFetchingPincode] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [postOffices, setPostOffices] = useState<PostOffice[]>([]);
  const [selectedPostOffice, setSelectedPostOffice] =
    useState<PostOffice | null>(null);

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    pin_code: "",
    state: "",
    city: "",
    area: "",
    message: "",
    category: "",
    priority: "medium",
  });

  // Category options
  const categoryOptions: Option[] = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "product", label: "Product Inquiry" },
    { value: "billing", label: "Billing Issue" },
    { value: "complaint", label: "Complaint" },
  ];

  // general,technical,product,billing,complaint
  // Priority options
  const priorityOptions: Option[] = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ];

  // Fetch contact info on component mount
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axiosClient.get("/content/contact-info");
        if (response.data.success) {
          setContactInfo(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch contact info:", error);
      }
    };
    fetchContactInfo();
  }, []);

  // Fetch pincode details when pincode changes
  useEffect(() => {
    const fetchPincodeDetails = async () => {
      if (form.pin_code.length === 6) {
        setIsFetchingPincode(true);
        try {
          const response = await fetch(
            `https://api.postalpincode.in/pincode/${form.pin_code}`
          );
          const data: PincodeResponse[] = await response.json();

          if (data[0].Status === "Success" && data[0].PostOffice) {
            setPostOffices(data[0].PostOffice);
            // Auto-fill state and city from first post office
            if (data[0].PostOffice.length > 0) {
              const firstOffice = data[0].PostOffice[0];
              setForm((prev) => ({
                ...prev,
                state: firstOffice.State,
                city: firstOffice.District,
              }));
              setSelectedPostOffice(firstOffice);
            }
          } else {
            setPostOffices([]);
            setSelectedPostOffice(null);
          }
        } catch (error) {
          console.error("Failed to fetch pincode details:", error);
          setPostOffices([]);
          setSelectedPostOffice(null);
        } finally {
          setIsFetchingPincode(false);
        }
      } else {
        setPostOffices([]);
        setSelectedPostOffice(null);
      }
    };

    const timer = setTimeout(fetchPincodeDetails, 500);
    return () => clearTimeout(timer);
  }, [form.pin_code]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle post office selection
  const handlePostOfficeChange = (option: SingleValue<Option>) => {
    if (option) {
      const selected = postOffices.find((po) => po.Name === option.value);
      setSelectedPostOffice(selected || null);
      if (selected) {
        setForm((prev) => ({
          ...prev,
          area: selected.Name,
          city: selected.District,
          state: selected.State,
        }));
      }
    } else {
      setSelectedPostOffice(null);
    }
  };

  // Handle category selection
  const handleCategoryChange = (option: SingleValue<Option>) => {
    setForm((prev) => ({
      ...prev,
      category: option?.value || "",
    }));
  };

  // Handle priority selection
  const handlePriorityChange = (option: SingleValue<Option>) => {
    setForm((prev) => ({
      ...prev,
      priority: option?.value || "medium",
    }));
  };

  // ✅ Validation
  const validate = (): string | null => {
    if (!form.name.trim()) return "Name is required";
    if (!form.phone.trim()) return "Phone number is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.message.trim()) return "Message is required";
    if (!form.category.trim()) return "Category is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email))
      return "Please enter a valid email address";

    return null;
  };

  // 📨 Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errMsg = validate();
    if (errMsg) {
      Swal.fire({
        icon: "warning",
        title: "Validation",
        text: errMsg,
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosClient.post("/support/tickets", form);

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          icon: "success",
          title: "Ticket Created Successfully!",
          html: `
            <div style="text-align:left;">
              <p>Your support ticket has been submitted successfully.</p>
              <p class="mt-2"><b>Ticket ID:</b> ${
                response.data.data.ticket_id || "N/A"
              }</p>
              <p><b>Priority:</b> ${form.priority.toUpperCase()}</p>
              <p><b>Expected Response:</b> Within 24 hours</p>
            </div>
          `,
          confirmButtonColor: "#2563eb",
        });

        // Reset form
        setForm({
          name: "",
          phone: "",
          email: "",
          pin_code: "",
          state: "",
          city: "",
          area: "",
          message: "",
          category: "",
          priority: "medium",
        });
        setPostOffices([]);
        setSelectedPostOffice(null);
      } else {
        throw new Error(response.data?.message || "Failed to create ticket");
      }
    } catch (err: unknown) {
      console.error("Submit error:", err);

      let errorMessage = "Network error. Please try again.";

      if (typeof err === "object" && err !== null) {
        if ("response" in err) {
          const axiosError = err as {
            response?: { data?: { message?: string } };
          };
          errorMessage = axiosError.response?.data?.message || errorMessage;
        } else if (
          "message" in err &&
          typeof (err as { message: string }).message === "string"
        ) {
          errorMessage = (err as Error).message;
        }
      }

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: errorMessage,
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const postOfficeOptions: Option[] = postOffices.map((po) => ({
    value: po.Name,
    label: `${po.Name} (${po.Block})`,
  }));

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br bg-gray-50 py-8 md:py-12">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Support Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-8 bg-orange-600 rounded-full mr-3"></div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Submit Support Ticket
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-orange-600 pl-3">
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FloatingInput
                        name="name"
                        label="Full Name *"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                      />
                      <FloatingInput
                        name="phone"
                        label="Phone Number *"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                      />
                      <FloatingInput
                        name="email"
                        label="Email Address *"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                      <div className="relative">
                        <FloatingInput
                          name="pin_code"
                          label="PIN Code"
                          type="text"
                          value={form.pin_code}
                          onChange={handleChange}
                          maxLength={6}
                        />
                        {isFetchingPincode && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-600"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Auto-fetched Address Section */}
                  {postOffices.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-orange-600 pl-3">
                          Address Details
                        </h3>
                        <span className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                          ✓ Auto-detected
                        </span>
                      </div>

                      <SelectBox
                        label="Select Post Office / Area"
                        options={postOfficeOptions}
                        value={
                          selectedPostOffice
                            ? {
                                value: selectedPostOffice.Name,
                                label: `${selectedPostOffice.Name} (${selectedPostOffice.Block})`,
                              }
                            : null
                        }
                        onChange={handlePostOfficeChange}
                        placeholder="Choose your area..."
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        <FloatingInput
                          name="city"
                          label="City"
                          type="text"
                          value={form.city}
                          onChange={handleChange}
                        />
                        <FloatingInput
                          name="state"
                          label="State"
                          type="text"
                          value={form.state}
                          onChange={handleChange}
                        />
                      </div>

                      <FloatingInput
                        name="area"
                        label="Area / Locality"
                        type="text"
                        value={form.area}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  {/* Manual Address Entry if no pincode found */}
                  {form.pin_code.length === 6 &&
                    postOffices.length === 0 &&
                    !isFetchingPincode && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-orange-400 pl-3">
                          Address Details
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          <FloatingInput
                            name="state"
                            label="State"
                            type="text"
                            value={form.state}
                            onChange={handleChange}
                          />
                          <FloatingInput
                            name="city"
                            label="City"
                            type="text"
                            value={form.city}
                            onChange={handleChange}
                          />
                          <FloatingInput
                            name="area"
                            label="Area / Locality"
                            type="text"
                            value={form.area}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}

                  {/* Ticket Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-orange-400 pl-3">
                      Ticket Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <SelectBox
                        label="Category *"
                        options={categoryOptions}
                        value={
                          categoryOptions.find(
                            (opt) => opt.value === form.category
                          ) || null
                        }
                        onChange={handleCategoryChange}
                        placeholder="Select category..."
                      />
                      <SelectBox
                        label="Priority"
                        options={priorityOptions}
                        value={
                          priorityOptions.find(
                            (opt) => opt.value === form.priority
                          ) || null
                        }
                        onChange={handlePriorityChange}
                        placeholder="Select priority..."
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-red-400 pl-3">
                      Describe Your Issue
                    </h3>
                    <FloatingTextArea
                      name="message"
                      label=""
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Please provide detailed information about your issue, including any error messages, steps to reproduce, and what you were trying to accomplish..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-orange-600 text-white px-12 py-4 rounded-xl hover:bg-orange-700 w-full cursor-pointer font-semibold disabled:opacity-60 disabled:cursor-not-allowed text-lg min-w-48 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Submit Ticket"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-8 bg-orange-600 rounded-full mr-3"></div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Contact Information
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Phone Numbers */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Customer Support
                        </h4>
                        <p className="text-gray-600">
                          {contactInfo?.customer_support_number ||
                            "+91-8743 8743 34"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Service Center
                        </h4>
                        <p className="text-gray-600">
                          {contactInfo?.service_center_number ||
                            "+91-7303 9600 28"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Email Support
                      </h4>
                      <p className="text-gray-600">
                        {contactInfo?.support_email ||
                          "support@realtimebiometrics.com"}
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">
                      Business Hours
                    </h4>
                    <div className="space-y-2">
                      {contactInfo?.business_hours ? (
                        Object.entries(contactInfo.business_hours).map(
                          ([day, hours]) => (
                            <div
                              key={day}
                              className="flex justify-between text-sm">
                              <span className="text-gray-600 capitalize">
                                {day}:
                              </span>
                              <span className="text-gray-900 font-medium">
                                {hours}
                              </span>
                            </div>
                          )
                        )
                      ) : (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Mon - Sat:</span>
                            <span className="text-gray-900 font-medium">
                              9:30 AM - 6:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Sunday:</span>
                            <span className="text-gray-900 font-medium">
                              Closed
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Tips Card */}
              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200 hidden">
                <h3 className="font-semibold text-orange-900 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Quick Tips
                </h3>
                <ul className="space-y-3 text-sm text-orange-800">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Include specific error messages and device details
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Describe steps to reproduce the issue
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Attach screenshots if possible
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Check our knowledge base for quick solutions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* ---------- Reusable Floating Inputs ---------- */

interface FloatingInputProps {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
}

function FloatingInput({
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  maxLength,
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
        maxLength={maxLength}
        className="peer w-full border border-gray-300 rounded-xl px-4 pt-5 pb-2 text-[15px] text-black focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
        placeholder={placeholder || " "}
      />
      <label
        htmlFor={name}
        className={`absolute left-4 bg-white px-1 transition-all duration-200 ${
          hasValue
            ? "top-1 text-[12px] text-gray-500"
            : "top-3.5 text-gray-400 text-[15px]"
        } peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-orange-500`}>
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
  placeholder?: string;
}

function FloatingTextArea({
  name,
  label,
  value,
  onChange,
  placeholder,
}: FloatingTextAreaProps) {
  const hasValue = value !== "" && value !== undefined && value !== null;
  return (
    <div className="relative">
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={5}
        className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-[15px] text-black focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-vertical bg-white"
        placeholder={placeholder || " "}
      />
      <label
        htmlFor={name}
        className={`absolute left-4 bg-white px-1 transition-all duration-200 ${
          hasValue
            ? "top-1 text-[12px] text-gray-500"
            : "top-4 text-gray-400 text-[15px]"
        } peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-orange-500`}>
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
      <label className="text-black/60 text-xs mb-2 block font-medium">
        {label}
      </label>
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
            `border border-gray-300 rounded-xl hover:border-orange-400 focus:border-orange-500 transition-all bg-white ${
              state.isFocused ? "border-orange-500 ring-2 ring-orange-200" : ""
            }`,
          option: (state) =>
            `${
              state.isFocused
                ? "bg-orange-50 text-orange-800"
                : "bg-white text-gray-800"
            }`,
        }}
        styles={{
          control: (base) => ({
            ...base,
            padding: "2px",
            borderRadius: "12px",
            boxShadow: "none",
            minHeight: "52px",
            borderColor: "#d1d5db",
            backgroundColor: "white",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#dbeafe" : "white",
            color: state.isFocused ? "#1e40af" : "#1e1410",
            ":active": {
              backgroundColor: "#93c5fd",
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
