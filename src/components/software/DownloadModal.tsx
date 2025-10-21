import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";

type Props = {
  software: { name: string; version: string };
  onClose: () => void;
};

export default function DownloadModal({ software, onClose }: Props) {
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [form, setForm] = useState({
    name: "",
    email: "",
    pin: "",
    phone: "",
  });
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (step === "otp" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
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

  const handleVerify = () => {
    const entered = otp.join("");
    if (entered === "1234") {
      setStep("success");
    } else {
      setError(true);
    }
  };

  const handleSendOtp = () => {
    setStep("otp");
    setTimeLeft(30);
    setOtp(["", "", "", ""]);
    setError(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg relative animate-in fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold text-neutral-800">
            Download {software.name} v{software.version}
          </h3>
          <button onClick={onClose}>
            <X className="cursor-pointer w-5 h-5 text-neutral-500 hover:text-neutral-800" />
          </button>
        </div>

        {/* ================= FORM STEP ================= */}
        {step === "form" && (
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700">
                Name*
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                placeholder="Enter your name"
                className="w-full placeholder:text-[#21191666] border border-neutral-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700">
                Email address*
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                placeholder="example@email.com"
                className="w-full placeholder:text-[#21191666] border border-neutral-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700">
                PIN Code*
              </label>
              <input
                name="pin"
                value={form.pin}
                onChange={handleFormChange}
                placeholder="Enter PIN Code"
                className="w-full border placeholder:text-[#21191666] border-neutral-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700">
                Phone Number*
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                placeholder="Enter phone number"
                className="w-full border placeholder:text-[#21191666] border-neutral-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-neutral-200 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-300">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendOtp}
                className="cursor-pointer px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700">
                Get OTP
              </button>
            </div>
          </form>
        )}

        {/* ================= OTP STEP ================= */}
        {step === "otp" && (
          <div className="flex flex-col items-center">
            <p className="text-base font-semibold text-neutral-800 mb-1">
              Enter OTP
            </p>
            <p className="text-sm text-neutral-600 mb-6">
              Enter 4 Digit OTP sent to{" "}
              <span className="text-orange-600 font-medium">
                (215) 424-7763
              </span>
            </p>

            <div className="flex gap-3 mb-2">
              {otp.map((d, i) => (
                <input
                  key={i}
                  value={d}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  maxLength={1}
                  className={`w-12 h-12 text-center text-[#333] text-lg border rounded-lg outline-none transition-all ${
                    error
                      ? "border-red-500"
                      : "border-neutral-300 focus:ring-2 focus:ring-orange-500"
                  }`}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-1">
                Incorrect OTP{" "}
                <span
                  className="text-orange-600 ml-3 cursor-pointer"
                  onClick={handleSendOtp}>
                  Send Again
                </span>
              </p>
            )}

            <p className="text-neutral-400 text-sm mt-3">
              {`00:${timeLeft.toString().padStart(2, "0")}`}
            </p>

            <div className="flex justify-end gap-3 mt-8 w-full">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-neutral-200 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-300">
                Cancel
              </button>
              <button
                onClick={handleVerify}
                className="cursor-pointer px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700">
                Verify
              </button>
            </div>
          </div>
        )}

        {/* ================= SUCCESS STEP ================= */}
        {step === "success" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-600 text-xl">✅</span>
              <p className="text-green-700 font-medium">
                Your mobile number is successfully verified
              </p>
            </div>

            <div className="space-y-1 mb-6 text-sm text-neutral-700">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {form.name || "Jhon"}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {form.email || "kurt_bates@outlook.com"}
              </p>
              <p>
                <span className="font-semibold">Mobile No.:</span>{" "}
                {form.phone || "(215) 424-7763"}
              </p>
              <p>
                <span className="font-semibold">Pincode:</span>{" "}
                {form.pin || "713347"}
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-xl py-6 flex flex-col items-center">
              <p className="text-orange-700 font-medium mb-5">
                Your software is ready for download
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className=" cursor-pointer px-4 py-2 bg-neutral-200 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-300">
                  Cancel
                </button>
                <button className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700">
                  Download <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
