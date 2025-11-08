"use client";

import { useState } from "react";
import { ArrowDownToLine } from "lucide-react";
import CTAButton from "@/components/common/CTAButton";
import fileDownload from "js-file-download";
import Swal from "sweetalert2";
import { baseUri } from "@/services/constant";

export default function DownloadCatalogueButton({
  productTitle,
  catalogueDoc,
}: {
  productTitle: string;
  catalogueDoc?: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!catalogueDoc) {
      Swal.fire({
        icon: "warning",
        title: "No Catalogue Found",
        text: "Catalogue is not available for this product.",
      });
      return;
    }

    try {
      setIsDownloading(true);

      // ✅ Clean URL (avoid double slashes)
      const pdfUrl = `${baseUri.replace(/\/+$/, "")}/${catalogueDoc.replace(/^\/+/, "")}`;

      // Download start alert
      Swal.fire({
        title: "Downloading...",
        text: "Please wait while your catalogue is being downloaded.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await fetch(pdfUrl, { cache: "no-cache" });
      if (!res.ok) throw new Error("Failed to download catalogue");

      const blob = await res.blob();
      const filename =
        catalogueDoc.split("/").pop() ||
        `${productTitle.replace(/\s+/g, "_")}_catalogue.pdf`;

      fileDownload(blob, filename);

      // ✅ Success Alert
      Swal.fire({
        icon: "success",
        title: "Download Complete",
        text: "Your catalogue has been downloaded successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      console.error(err);
      // ❌ Error Alert
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Something went wrong while downloading the catalogue. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <CTAButton
      variant="yellow"
      onClick={handleDownload}
      // disabled={isDownloading || !catalogueDoc}
    >
      <span>
        <ArrowDownToLine className="w-[16px]" />
      </span>{" "}
      {isDownloading ? "DOWNLOADING..." : "DOWNLOAD CATALOGUE"}
    </CTAButton>
  );
}
