import Image from "next/image";
import React from "react";

export default function ProductImage({
  src = "/images/device.png",
  alt = "product",
  className = "",
}) {
  return (
    <div
      className={`p-6 rounded-xl bg-white shadow-sm ring-1 ring-gray-100 ${className}`}>
      <div className="w-full max-w-[520px] flex-wrap h-auto rounded-lg overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={700}
          height={480}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}
