"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import locationService from "@/services/locationService";

function FormModalPopUp({ headerData }: any) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // -----------------------------------------
  // FORM STATE
  // -----------------------------------------
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    activity: "",
    activity_url: "",
    country: "",
    zipcode: "",
    state: "",
    area: "",
  });

  // -----------------------------------------
  // COUNTRY + STATE DATA
  // -----------------------------------------
  const [countryList, setCountryList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);

  // -----------------------------------------
  // FETCH COUNTRIES (WORKING API)
  // -----------------------------------------
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await locationService.fetchCountries(); // <-- SAME AS PARTNER PAGE

        const formatted = data.map((c: any) => ({
          label: c.name,
          value: c.code,
        }));

        setCountryList(formatted);
      } catch (err) {
        console.error("Country Load Failed", err);
      }
    };

    loadCountries();
  }, []);

  // -----------------------------------------
  // COUNTRY CHANGE
  // -----------------------------------------
  const handleCountryChange = async (option: any) => {
    setSelectedCountry(option);
    setSelectedState(null);
    setFormData({ ...formData, country: option.label, state: "" });

    // Fetch states based on country code
    try {
      const states = await locationService.fetchStatesByCountry(option.value); // <--- SAME AS PARTNER PAGE

      const formattedStates = states.map((s: any) => ({
        label: s.name,
        value: s.code,
      }));

      setStateList(formattedStates);
    } catch (error) {
      console.error("State Load Failed", error);
      setStateList([]);
    }
  };

  // -----------------------------------------
  // STATE CHANGE
  // -----------------------------------------
  const handleStateChange = (option: any) => {
    setSelectedState(option);
    setFormData({ ...formData, state: option.label });
  };

  // -----------------------------------------
  // NORMAL INPUT CHANGE
  // -----------------------------------------
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -----------------------------------------
  // SUBMIT FORM
  // -----------------------------------------
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://markvisitor.com/app/dev/website/saveactivity.php",
        formData
      );

      alert("Submitted Successfully!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error submitting form!");
    }
  };

  if (!open || !headerData?.status?.custom_activity_tracker) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-black/80 rounded-xl w-full max-w-lg p-6 shadow-lg relative">

        {/* HEADER */}
        <h2 className="text-xl font-semibold mb-5">User Activity Form</h2>
        <button
          className="absolute top-5 right-5 text-black"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid md:grid-cols-2 gap-6">

            <FloatingField
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <FloatingField
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <FloatingField
              name="activity"
              label="Activity"
              value={formData.activity}
              onChange={handleChange}
            />

            <FloatingField
              name="activity_url"
              label="Activity URL"
              value={formData.activity_url}
              onChange={handleChange}
            />

            {/* COUNTRY DROPDOWN */}
            <div> 
              <Select
                options={countryList}
                value={selectedCountry}
                onChange={handleCountryChange}
                placeholder="Search Country..."
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
            borderRadius: "8px",
            boxShadow: "none",
            minHeight: "55px",
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

            <FloatingField
              name="zipcode"
              label="Zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />

            {/* STATE DROPDOWN */}
            <div>
              <Select
                options={stateList}
                value={selectedState}
                onChange={handleStateChange}
                placeholder={
                  selectedCountry ? "Search State..." : "Select Country first"
                }
                isDisabled={!selectedCountry}
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
            borderRadius: "8px",
            boxShadow: "none",
            minHeight: "55px",
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

            <FloatingField
              name="area"
              label="Area"
              value={formData.area}
              onChange={handleChange}
            />

          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white py-3 rounded-md w-full hover:bg-orange-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------- Floating Input Component ---------------- */

function FloatingField({
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
        className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-black focus:border-orange-500 focus:ring-0 outline-none"
      />
      <label
        className={`absolute left-4 bg-white px-1 transition-all duration-200 
          ${
            hasValue
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

export default FormModalPopUp;






