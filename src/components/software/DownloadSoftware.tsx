"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import DownloadModal from "./DownloadModal";
import { div } from "framer-motion/client";

type Software = {
  name: string;
  version: string;
  note?: string;
};

const softwares: Software[] = [
  { name: "Realsoft v12.6", version: "v12.6" },
  { name: "Realsoft v12.4", version: "v12.4" },
  {
    name: "Realtime Attendance Tracker v11.8",
    version: "v11.8",
    note: "🔥 New",
  },
  { name: "Realtime Attendance Tracker v11.7", version: "v11.7" },
  {
    name: "Attendance Tracker 11.7 (UP Paramedical Attendance System)",
    version: "11.7",
  },
  { name: "Realtime 10.9", version: "10.9" },
  { name: "Reports - Feb 2025", version: "Feb2025" },
  { name: "Web Attendance Application", version: "webapp" },
  { name: "Old Web Attendance Application", version: "oldweb" },
  { name: "Access Control 2011 For 4D Controller", version: "2011" },
  { name: "Realsoft 11.6 (14 April 2021)", version: "11.6-2021" },
  {
    name: "Realsoft 11.6 (July 2022) with All Pro models",
    version: "11.6-2022",
  },
  { name: "Realtime 10.9 Updated Patch (1 June 2020)", version: "10.9-2020" },
  { name: "Realtime 11.6 Updated Patch (15 April 2023)", version: "11.6-2023" },
  {
    name: "Attendance Tracker (18 digit Enrollment Number)",
    version: "18digit",
  },
];

export default function DownloadSoftware() {
  const [selectedSoftware, setSelectedSoftware] = useState<Software | null>(
    null
  );

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-neutral-800">
          Download Attendance Software
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {softwares.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 hover:bg-neutral-100 transition">
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                {s.name}
                {s.note && (
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md font-semibold">
                    {s.note}
                  </span>
                )}
              </div>

              <button
                onClick={() => setSelectedSoftware(s)}
                className="text-orange-600 font-semibold flex items-center gap-1 cursor-pointer">
                Download <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedSoftware && (
          <DownloadModal
            software={selectedSoftware}
            onClose={() => setSelectedSoftware(null)}
          />
        )}
      </div>
    </div>
  );
}
