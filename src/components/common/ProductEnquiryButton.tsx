"use client";

import { useState } from "react";
import SendRequirementModal from "./SendRequirementModal";

export default function ProductEnquiryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#EA5921] text-white hover:bg-orange-600 inline-flex items-center gap-2 text-[12px] lg:text-[16px] px-2 lg:px-4 py-2 rounded-md font-[400] shadow-sm transition cursor-pointer"
      >
        Enquire Now
      </button>

      <SendRequirementModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
