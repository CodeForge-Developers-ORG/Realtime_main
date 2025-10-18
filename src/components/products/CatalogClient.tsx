"use client";

import { useEffect, useState } from "react";
import SectionList from "./SectionList";
import Sidebar from "./Sidebar";

export type Category = {
  title: string;
  items: { id: string; name: string; image: string }[];
};

export default function CatalogClient() {
  const [data, setData] = useState<Category[] | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    fetch("/api/categories")
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return;
        setData(json);
      })
      .catch((err) => console.error(err));
    return () => {
      mounted = false;
    };
  }, []);

  if (!data) return <div className="text-center py-20">Loading...</div>;

  // 👇 Check if last section is active
  const isLastActive = activeIndex === data.length - 1;

  return (
    <div
      className={`flex gap-6 bg-white p-[100px] transition-all duration-300 ${
        isLastActive ? "sticky " : "sticky -top-20"
      }`}
    >
      <aside className="w-64">
        <Sidebar
          categories={data}
          activeIndex={activeIndex}
          onSelect={(i) => setActiveIndex(i)}
        />
      </aside>

      <section className="flex-1">
        <SectionList
          categories={data}
          activeIndex={activeIndex}
          onActiveChange={(i) => setActiveIndex(i)}
        />
      </section>
    </div>
  );
}
