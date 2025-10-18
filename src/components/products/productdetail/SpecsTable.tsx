import React from "react";

type Spec = {
  key: string;
  value: string | number | undefined;
};

interface SpecsTableProps {
  specs?: Spec[];
}

export default function SpecsTable({ specs = [] }: SpecsTableProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-[#DDDDDD] w-full mb-4 text-white bg-transparent">
      <div className="divide-y divide-[#DDDDDD]">
        {specs.map((s, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_auto_1fr] items-center text-sm">
            {/* Key */}
            <div className="py-3 px-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#1E1410] rounded-full" />
              <span className="text-[#1E1410] text-sm font-[400]">{s.key}</span>
            </div>

            {/* Vertical divider */}
            <div className="h-full w-px bg-[#DDDDDD] mx-auto" />

            {/* Value */}
            <div className="py-3 px-4 text-left text-[#1E1410]">
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
