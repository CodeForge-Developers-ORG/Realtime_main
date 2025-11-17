"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Shows the four-square preloader animation briefly on initial mount
// and on every route change, ensuring a visible loader even when
// Next.js app router does not trigger loading.tsx.
export default function GlobalPreloader() {
  const pathname = usePathname();
  const search = useSearchParams();
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  // Helper to show the preloader for a short duration
  const trigger = (duration = 700) => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }
    setVisible(true);
    hideTimer.current = setTimeout(() => setVisible(false), duration);
  };

  // Show once on initial hydration
  useEffect(() => {
    trigger(800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show on pathname or search param changes
  useEffect(() => {
    trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search?.toString()]);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FFE8DF]/80 backdrop-blur-sm">
      {/* Preloader animation from globals.css (.loader and spans) */}
      <div className="loader">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}