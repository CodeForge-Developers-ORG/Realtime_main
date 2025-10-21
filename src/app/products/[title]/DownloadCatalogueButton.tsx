"use client";

import { useState } from "react";
import { ArrowDownToLine } from "lucide-react";
import CTAButton from "@/components/common/CTAButton";
import fileDownload from "js-file-download";
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
      alert("No catalogue available.");
      return;
    }

    try {
      setIsDownloading(true);
      const pdfUrl = `${baseUri}${catalogueDoc}`;
      const res = await fetch(pdfUrl);

      if (!res.ok) throw new Error("Failed to download catalogue");

      const blob = await res.blob();
      const filename =
        catalogueDoc.split("/").pop() ||
        `${productTitle.replace(/\s+/g, "_")}_catalogue.pdf`;

      fileDownload(blob, filename);
    } catch (err) {
      console.error(err);
      alert("Download failed. Try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <CTAButton
      variant="yellow"
      onClick={handleDownload}
    //   disabled={isDownloading || !catalogueDoc}
    >
      <span>
        <ArrowDownToLine className="w-[16px]" />
      </span>{" "}
      {isDownloading ? "DOWNLOADING..." : "DOWNLOAD CATALOGUE"}
    </CTAButton>
  );
}
