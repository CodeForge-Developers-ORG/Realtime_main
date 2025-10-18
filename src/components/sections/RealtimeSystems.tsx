"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  type: string;
};

const contentItems: Project[] = [
  {
    id: "1",
    type: "office",
    title: "Office Management System",
    description:
      "Multiple locations (multiple office attendance management): This process can deliver attendance System for Multi Locations for monitoring attendance of employees in Organizations or Enterprises. It is possible through the concept of push data, which requires one data and one public IP and eliminates the installation of servers/software in all the branches.",
  },
  {
    id: "2",
    type: "school",
    title: "School Management System",
    description:
      "Realtime School Management System helps educational institutions enhance security and streamline administrative tasks.",
  },
  {
    id: "3",
    type: "finance",
    title: "Finance Management System",
    description:
      "School Attendance management solutions with SMS: Through this solution we automate the attendance for all students including the School staff. It is all managed by our Biometric time and attendance machines which are used to capture the attendance of the child. This can be done by using the RFID cards, fingerprint of child, face recognition technology.",
  },
  {
    id: "4",
    type: "visitor",
    title: "Visitor Management System",
    description:
      "Realtime Visitor Management System streamlines the visitor check-in process while enhancing security.",
  },
  {
    id: "5",
    type: "cloud",
    title: "Cloud Attendance and Payroll Software",
    description:
      "Realtime Cloud Attendance and Payroll Software integrates seamlessly to automate wage calculations based on accurate attendance data.",
  },
];

const Card = ({
  project,
  i,
  progress,
  range,
  targetScale,
  cardRefs,
  lastCardRef,
}: {
  project: Project;
  i: number;
  progress: any;
  range: [number, number];
  targetScale: number;
  cardRefs: React.MutableRefObject<HTMLDivElement[]>;
  lastCardRef?: React.RefObject<HTMLDivElement>;
}) => {
  const container = useRef<HTMLDivElement | null>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  useEffect(() => {
    if (container.current) cardRefs.current[i] = container.current;
  }, [cardRefs, i]);

  return (
    <div
      ref={lastCardRef ? lastCardRef : container}
      className="flex justify-center sticky top-28 py-5">
      <motion.div
        // style={{ scale }}
        className="relative flex flex-col bg-white w-[90%] md:w-[900px] h-[280px] border border-gray-200 rounded-3xl p-10 shadow-xl origin-top">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="flex-shrink-0 bg-[#F5F5F5] rounded-lg p-2 mb-4 md:mb-0 md:mr-4 w-[50px] h-[50px] flex items-center justify-center">
            <span className="font-semibold text-orange-500">{project.id}</span>
          </div>
          <div>
            <h3 className="text-[20px] font-semibold text-gray-800 mb-2">
              {project.title}
            </h3>
            <p className="text-[#4F423D] font-light text-[14px] leading-[150%]">
              {project.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function StackedScrollCards() {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeTab, setActiveTab] = useState<string>("1");
  const [isLastCentered, setIsLastCentered] = useState(false);
  const lastCardRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  // ✅ Detect when last card is centered
  useEffect(() => {
    const handleScroll = () => {
      if (!lastCardRef.current) return;
      const rect = lastCardRef.current.getBoundingClientRect();
      const screenCenter = window.innerHeight / 2;
      const cardCenter = rect.top + rect.height / 2;
      const diff = Math.abs(cardCenter - screenCenter);
      setIsLastCentered(diff < 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Update active tab accurately on scroll (including last one)
  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const middle = window.innerHeight / 2;
        if (rect.top <= middle && rect.bottom >= middle) {
          setActiveTab(contentItems[index].id);
          found = true;
        }
      });

      // if scrolled beyond last card area
      if (!found && lastCardRef.current) {
        const rect = lastCardRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom < window.innerHeight) {
          setActiveTab(contentItems[contentItems.length - 1].id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = (targetY: number, duration = 600) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateScroll = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const timeElapsed = timestamp - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const customSmoothScroll = (targetY: number, duration = 600) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime: number | null = null;

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * eased);

    if (elapsed < duration) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};


  // ✅ Perfectly center card on nav click (both forward & backward)
const scrollToCard = (id: string) => {
  const targetCard = cardRefs.current.find(
    (el) => el && el.querySelector("span")?.textContent === id
  );

  if (!targetCard) return;

  const navbar = document.querySelector("[data-nav]");
  const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;

  const cardRect = targetCard.getBoundingClientRect();
  const scrollContainer = document.documentElement || document.body;

  // ✅ Always compute scroll based on current absolute scroll
  const targetY =
    scrollContainer.scrollTop +
    cardRect.top +
    cardRect.height / 2 -
    window.innerHeight / 2 +
    navbarHeight / 2;

  // ✅ use consistent smooth scroll animation
  customSmoothScroll(targetY, 600);
};

  // ↔️ Horizontal scroll for tabs
  const scrollTabs = (dir: "left" | "right") => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({
        left: dir === "left" ? -250 : 250,
        behavior: "smooth",
      });
    }
  };

  return (
    <main
      ref={container}
      className="relative bg-gray-50 flex flex-col items-center">
      {/* 🧭 Sticky Navigation */}
      <div
        data-nav
        className={`${
          isLastCentered ? "relative" : "sticky top-0"
        } z-50 bg-gray-50 w-full py-4 transition-all duration-300 shadow-sm`}>
        <div className="flex items-center justify-between px-4">
          <button
            onClick={() => scrollTabs("left")}
            className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition">
            ←
          </button>

          <div
            ref={tabsRef}
            className="overflow-hidden flex-grow mx-2 scrollbar-hide">
            <div className="flex space-x-3 w-max">
              {contentItems.map((solution) => (
                <button
                  key={solution.id}
                  className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                    activeTab === solution.id
                      ? "bg-yellow-400 text-gray-800"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => scrollToCard(solution.id)}>
                  {solution.title}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => scrollTabs("right")}
            className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition">
            →
          </button>
        </div>
      </div>

      {/* 📄 Cards */}
      {contentItems.map((project, i) => {
        const targetScale = 1 - (contentItems.length - i) * 0.07;
        const isLast = i === contentItems.length - 1;
        return (
          <Card
            key={`card_${i}`}
            i={i}
            project={project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
            cardRefs={cardRefs}
            {...(isLast ? { lastCardRef } : {})}
          />
        );
      })}
    </main>
  );
}
