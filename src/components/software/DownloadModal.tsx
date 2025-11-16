"use client";

import { useState, useEffect } from "react";
import { ArrowDownToLine, Edit, X } from "lucide-react";
import axios from "axios";
import { baseUri } from "@/services/constant";

type Software = {
  id: string;
  title: string;
  version: string;
  file?: string | null;
  external_url?: string | null;
};

type Props = {
  software: Software;
  onClose: () => void;
};

export default function DownloadModal({ software, onClose }: Props) {
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "", zip: "" });
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setOtpExpired(true);
    }
    return () => clearTimeout(timer);
  }, [step, timeLeft]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    setError(false);
  };

  const sendOtp = async () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);

    await axios.post(
      "https://n8n.ria.markvisitor.com/webhook/softwareDownloads",
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        zip: form.zip || "",
        software: software.title,
        otp: newOtp,
      }
    );

    setStep("otp");
    setTimeLeft(30);
    setOtp(["", "", "", ""]);
    setError(false);
    setOtpExpired(false);
  };

  const handleSendOtp = async () => {
    if (!form.name || !form.email || !form.phone || !form.zip) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await sendOtp();
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (otpExpired) {
      alert("OTP expired. Please resend OTP.");
      return;
    }
    if (enteredOtp === generatedOtp) {
      setStep("success");
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-2xl font-medium text-[#222]">
            Download {software.title}
          </h3>
          <button onClick={onClose}>
            <X className="cursor-pointer w-6 h-6 text-gray-500 hover:text-gray-800" />
          </button>
        </div>


        {/* FORM STEP */}
        {step === "form" && (
          <div className="space-y-4">
            {/* Name */}
            <div className="border border-[#D6D6D6] rounded-lg px-4 py-[6px] ">
              <label
                className="block text-sm text-gray-600 mb-0 font-[400] text-[14px] leading-[14px]"
                style={{ letterSpacing: "0%" }}>
                Name*
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                placeholder="Enter Name"
                className="w-full text-black border-0 focus:outline-none focus:ring-0 font-[400] text-[14px] leading-[14px]"
                style={{ letterSpacing: "0%" }}
              />
            </div>

            {/* Email */}
            <div className="border border-[#D6D6D6] rounded-lg px-4 py-[6px]">
              <label className="block text-sm text-gray-600 mb-0 font-[400] text-[14px] leading-[14px]">
                Email address*
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                placeholder="Enter Email"
                className="w-full text-black border-0 focus:outline-none focus:ring-0 font-[400] text-[14px] leading-[14px]"
              />
            </div>

            {/* PIN */}
            <div className="border border-[#D6D6D6] rounded-lg px-4 py-[6px]">
              <label className="block text-sm text-gray-600 mb-0 font-[400] text-[14px] leading-[14px]">
                PIN Code*
              </label>
              <input
                name="zip"
                placeholder="Enter PIN Code"
                value={form.zip}
                onChange={handleFormChange}
                className="w-full text-black border-0 focus:outline-none focus:ring-0 font-[400] text-[14px] leading-[14px]"
              />
            </div>

            {/* Phone */}
            <div className="border border-[#D6D6D6] rounded-lg px-4 py-[6px]">
              <label className="block text-sm text-gray-600 mb-0 font-[400] text-[14px] leading-[14px]">
                Phone Number*
              </label>
              <input
                name="phone"
                placeholder="(215) 424-7763"
                value={form.phone}
                onChange={handleFormChange}
                className="w-full text-black border-0 focus:outline-none focus:ring-0 font-[400] text-[14px] leading-[14px]"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
                Cancel
              </button>
              <button
                onClick={handleSendOtp}
                disabled={isSubmitting}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium">
                {isSubmitting ? "Sending OTP..." : "Get OTP"}
              </button>
            </div>
          </div>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <div className="flex flex-col">
            <h1 className="text-[#243138] font-[500] text-left text-[30px]">
              Enter OTP
            </h1>
            <p className="text-[#8B9297] text-[14px] font-[500] py-3">
              Enter 4 Digit OTP sent to{" "}
              <span className="text-[#EA5921]">
                {form?.phone}{" "}
                <Edit
                  className="w-3 cursor-pointer inline-block"
                  onClick={() => setStep("form")}
                />
              </span>
            </p>

            {/* OTP Inputs */}
            <div className="flex gap-2 mb-4">
              {otp.map((d, i) => (
                <input
                  key={i}
                  value={d}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  maxLength={1}
                  className={`w-12 h-12 text-black text-center border rounded-lg text-lg ${
                    error || otpExpired ? "border-red-500" : "border-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Error + Timer or Resend */}
            {(error || otpExpired) && (
              <div className="flex justify-between items-center w-55">
                <p className="text-red-500 text-sm mb-2">
                  {otpExpired ? "OTP expired" : "Incorrect OTP"}
                </p>
                {otpExpired && (
                  <p
                    onClick={sendOtp}
                    className="text-red-500 text-sm mb-2 cursor-pointer">
                    Send Again
                  </p>
                )}
              </div>
            )}

            {!otpExpired && (
              <p className="text-sm text-black mb-4">Time left: {timeLeft}s</p>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 w-full">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
                Cancel
              </button>
              {!otpExpired && (
                <button
                  onClick={handleVerify}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium">
                  Verify OTP
                </button>
              )}
            </div>
          </div>
        )}

        {/* SUCCESS STEP */}
        {step === "success" && (
          <div>
            <p className="text-green-600 font-medium mb-4">
              ✅ Your mobile Number is successfully verified
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <div>
                <span className="font-medium text-gray-500 mr-2">Name:</span>
                {form?.name}
              </div>
              <div>
                <span className="font-medium text-gray-500 mr-2">Email:</span>
                {form?.email}
              </div>
              <div>
                <span className="font-medium text-gray-500 mr-2">
                  Mobile N.o:
                </span>
                {form?.phone}
              </div>
              <div>
                <span className="font-medium text-gray-500 mr-2">Pincode:</span>
                {form?.zip}
              </div>
            </div>

            <div className="mt-6 bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-orange-600 font-semibold mb-4">
                Your software is ready for download
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md font-medium hover:bg-gray-300 transition">
                  CANCEL
                </button>

                {software.file ? (
                  <a
                    href={`${baseUri}${software.file}`}
                    download
                    className="bg-orange-600 text-white px-5 py-2 rounded-md font-medium hover:bg-orange-700 transition flex items-center gap-2">
                    DOWNLOAD <ArrowDownToLine className="w-5" />
                  </a>
                ) : software.external_url ? (
                  <a
                    href={software.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-600 text-white px-5 py-2 rounded-md font-medium hover:bg-orange-700 transition flex items-center gap-2">
                    GO TO DOWNLOAD <ArrowDownToLine className="w-5" />
                  </a>
                ) : (
                  <p>No download available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
