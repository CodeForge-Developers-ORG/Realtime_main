"use client";
import { useEffect, useRef, useState } from "react";

type StatItem = {
  label: string;
  value: number;
  suffix?: string;
};

const defaultStats: StatItem[] = [
  { label: "Current Clients", value: 180, suffix: "+" },
  { label: "Years Of Experience", value: 10, suffix: "+" },
  { label: "Awards Winning", value: 35, suffix: "+" },
  { label: "Our Solutions", value: 10, suffix: "+" },
];

export default function StatsCounter({
  stats = defaultStats,
  durationMs = 3000,
  title = "RealTime by the Numbers",
  subtitle = "Our impact at a glance",
}: {
  stats?: StatItem[];
  durationMs?: number;
  title?: string;
  subtitle?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [dataStats, setDataStats] = useState<StatItem[]>(stats);
  const [displayValues, setDisplayValues] = useState<number[]>(stats.map(() => 0));
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  // Fetch counters dynamically from API
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("https://app.realtimebiometrics.net/api/site/counters");
        const json = await res.json();
        const list = Array.isArray(json?.data) ? json.data : [];
        const mapped: StatItem[] = list.map((item: any) => {
          const raw = String(item?.value ?? "");
          const numMatch = raw.match(/\d+/);
          const num = numMatch ? parseInt(numMatch[0], 10) : 0;
          const suffix = raw.replace(/\d+/g, "").trim();
          return {
            label: String(item?.label ?? item?.key ?? ""),
            value: isNaN(num) ? 0 : num,
            suffix,
          };
        });
        if (!cancelled && mapped.length > 0) {
          setDataStats(mapped);
          setDisplayValues(mapped.map(() => 0));
          setAnimated(false); // allow animation with new data
        }
      } catch (e) {
        console.error("Failed to load counters:", e);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!visible || animated) return;
    setAnimated(true);

    const duration = durationMs; // ms, slower for a more relaxed count-up
    const start = performance.now();
    const startValues = dataStats.map(() => 0);
    const endValues = dataStats.map((s) => s.value);

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const next = endValues.map((end, i) => Math.floor(startValues[i] + (end - startValues[i]) * eased));
      setDisplayValues(next);
      if (progress < 1) requestAnimationFrame(step);
    };

    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplayValues(endValues);
    } else {
      requestAnimationFrame(step);
    }
  }, [visible, animated, dataStats, durationMs]);

  return (
    <section className="bg-white pt-4 pb-6">
      <div ref={containerRef} className="container mx-auto px-6 md:px-8">
        {/* Section heading */}
        <div className="text-center mb-3 md:mb-4">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle mt-2">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {dataStats.map((stat, idx) => {
            const value = displayValues[idx] ?? stat.value;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <div className="text-4xl md:text-5xl font-semibold text-orange-500 tracking-wider">
                  [{value}
                  {stat.suffix || ""}]
                </div>
                <div className="mt-2 text-gray-900 font-semibold">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}