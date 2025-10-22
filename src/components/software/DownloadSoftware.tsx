"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import DownloadModal from "./DownloadModal";
import axiosClient from "@/services/axiosClient";

type Software = {
  id: string;
  title: string;
  version: string;
  file?: string | null;
  external_url?: string | null;
  price?: string;
  license?: string;
  is_free?: boolean;
  one_line_description?: string;
};

export default function DownloadSoftware() {
  const [softwares, setSoftwares] = useState<Software[]>([]);
  const [selectedSoftware, setSelectedSoftware] = useState<Software | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSoftwares() {
      try {
        const res = await axiosClient.get("/content/software");
        if (res.data?.success) {
          setSoftwares(res.data.data || []);
        } else {
          setError("Failed to load software list.");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    }

    fetchSoftwares();
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-neutral-800">
          Download Attendance Software
        </h2>

        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading software list...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : softwares.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No software available.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {softwares.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 hover:bg-neutral-100 transition">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                    {s.title}
                    {s.is_free ? (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-md font-semibold">
                        Free
                      </span>
                    ) : (
                      <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-md font-semibold">
                        Paid
                      </span>
                    )}
                  </div>
                  {s.one_line_description && (
                    <p className="text-xs text-neutral-500">{s.one_line_description}</p>
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
        )}

        {/* Modal */}
        {selectedSoftware && (
          <DownloadModal
            software={{
              id: selectedSoftware.id,
              title: selectedSoftware.title,
              version: selectedSoftware.version,
              file: selectedSoftware.file,
              external_url: selectedSoftware.external_url,
            }}
            onClose={() => setSelectedSoftware(null)}
          />
        )}
      </div>
    </div>
  );
}
