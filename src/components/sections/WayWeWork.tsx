"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";

/* =========================
   PAGE
========================= */

export default function Page() {
  return (
    <main className="w-full">
      <WayWeWork />

      <HowWeHelp
        bigIcon={
          <Image
            src="/howwehelp/notebook.svg"
            alt=""
            width={260}
            height={170}
            priority
          />
        }
      />
    </main>
  );
}

/* =========================
   WAY WE WORK (YELLOW)
========================= */

function WayWeWork() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      id="our-work"
      className="w-full bg-white overflow-x-hidden"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        <div className="relative w-full overflow-visible">
          {/* ✅ ثابت */}
          <div className="relative z-20 w-full h-[420px] sm:h-[520px] lg:h-[560px] rounded-[22px] overflow-hidden bg-[#F3FF00]">
            {/* ✅ الصورة نفسها: Pulse أسرع + يمين/شمال + ميل خفيف */}
            <motion.img
              src="/waywork/bg.svg"
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover"
              style={{
                transformOrigin: "50% 50%",
                willChange: "transform",
              }}
              animate={{
                scale: [1, 1.065, 1],     // ✅ نبضة
                x: [0, 18, 0, -18, 0],    // ✅ يمين/شمال
                rotate: [0, 0.6, 0, -0.6, 0], // ✅ ميل بسيط
              }}
              transition={{
                duration: 2.6, // ✅ أسرع
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* vignette خفيف للقراءة */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(1200px 650px at 50% 50%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 62%)",
              }}
            />
          </div>

          {/* content overlay */}
          <div className="pointer-events-none absolute inset-0 z-30">
            <h2
              className="
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                w-full px-6 sm:px-10
                text-[#0D1440]
                font-extrabold tracking-tight leading-[0.9]
                text-center
                select-none
                text-[clamp(44px,7vw,132px)]
                lg:whitespace-nowrap
              "
            >
              The Way We Work
            </h2>

            <AirPill
              progress={scrollYProgress}
              strength={120}
              label="DISCOVERY & STRATEGY"
              className="left-[34%] top-[16%] sm:left-[25%] sm:top-[20%]"
              trail="left"
              pillClass="bg-white text-[#B7AE00]"
              trailClass="bg-[#C9D240]/45"
            />
            <AirPill
              progress={scrollYProgress}
              strength={140}
              label="PROFESSIONALISM"
              className="left-[74%] top-[10%] sm:left-[84%] sm:top-[16%]"
              trail="right"
              pillClass="bg-[#151B3A] text-white"
              trailClass="bg-[#D8D8DD]/55"
            />
            <AirPill
              progress={scrollYProgress}
              strength={150}
              label="CREATIVE PRODUCTION & DESIGN"
              className="left-[72%] top-[24%] sm:left-[58%] sm:top-[30%]"
              trail="right"
              pillClass="bg-[#3F7BFF] text-white"
              trailClass="bg-[#AFC6FF]/45"
            />
            <AirPill
              progress={scrollYProgress}
              strength={110}
              label="TRANSPARENCY"
              className="left-1/2 top-[55%] sm:left-[46%] sm:top-[54%]"
              trail="left"
              pillClass="bg-[#10E6C6] text-[#08352F]"
              trailClass="bg-[#10E6C6]/22"
            />
            <AirPill
              progress={scrollYProgress}
              strength={150}
              label="ANALYSIS & OPTIMIZATION"
              className="left-[30%] top-[72%] sm:left-[16%] sm:top-[68%]"
              trail="left"
              pillClass="bg-[#151B3A] text-white"
              trailClass="bg-[#151B3A]/30"
            />
            <AirPill
              progress={scrollYProgress}
              strength={170}
              label="EXECUTION & MANAGEMENT"
              className="left-[64%] top-[86%] sm:left-[64%] sm:top-[82%]"
              trail="right"
              pillClass="bg-[#C0183C] text-white"
              trailClass="bg-[#B58C0E]/45"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AirPill({
  label,
  className,
  trail,
  pillClass,
  trailClass,
  progress,
  strength = 140,
}: {
  label: string;
  className: string;
  trail: "left" | "right" | "none";
  pillClass: string;
  trailClass: string;
  progress: MotionValue<number>;
  strength?: number;
}) {
  const dir = trail === "right" ? 1 : trail === "left" ? -1 : 0;

  const x = useTransform(
    progress,
    [0, 0.5, 1],
    [dir * strength, 0, dir * -strength]
  );

  const xSpring = useSpring(x, { stiffness: 120, damping: 22, mass: 0.8 });

  const opacity = useTransform(progress, [0.08, 0.18, 0.9], [0, 1, 1]);
  const opacitySpring = useSpring(opacity, { stiffness: 120, damping: 24 });

  return (
    <motion.div
      style={{ x: xSpring, opacity: opacitySpring }}
      className={["absolute -translate-x-1/2 -translate-y-1/2", className].join(
        " "
      )}
    >
      {trail !== "none" && (
        <span
          aria-hidden="true"
          className={[
            "absolute top-1/2 -translate-y-1/2",
            "h-[45px] sm:h-[45px]",
            "w-[220vw]",
            "rounded-[18px]",
            trailClass,
            trail === "right" ? "left-[58%]" : "right-[58%]",
          ].join(" ")}
        />
      )}

      <div
        className={[
          "relative z-10",
          "h-[44px] sm:h-[48px]",
          "px-10",
          "rounded-full",
          "flex items-center justify-center",
          "text-[12px] sm:text-[13px]",
          "font-semibold whitespace-nowrap",
          "shadow-[0_14px_28px_rgba(0,0,0,0.18)]",
          pillClass,
        ].join(" ")}
      >
        {label}
      </div>
    </motion.div>
  );
}

/* =========================
   HOW WE HELP (NAVY)
========================= */

type Tab = {
  id: string;
  number: string;
  label: string;
  title: string;
  desc: string;
  bullets: string[];
};

type HowWeHelpProps = {
  bigIcon?: React.ReactNode;
  className?: string;
};

const NAVY = "#181B4A";
const NEON = "#00FFB6";
const NEON_48 = "rgba(0,255,182,0.48)";
const NEON_22 = "rgba(0,255,182,0.22)";

function HowWeHelp({ bigIcon, className = "" }: HowWeHelpProps) {
  const tabs: Tab[] = useMemo(
    () => [
      {
        id: "t1",
        number: "01",
        label: "Content Creation",
        title: "Content Creation",
        desc: "Our content creation process is a comprehensive, end-to-end engine designed to transform raw ideas into high-performing digital assets.",
        bullets: [
          "Custom Design & Visuals",
          "Social Media Management",
          "Growth & Strategy",
          "Analytics & Reporting",
        ],
      },
      { id: "t2", number: "02", label: "Design", title: "Design", desc: "", bullets: [] },
      { id: "t3", number: "03", label: "Social Media Management", title: "Social Media Management", desc: "", bullets: [] },
      { id: "t4", number: "04", label: "Growth & Strategy", title: "Growth & Strategy", desc: "", bullets: [] },
      { id: "t5", number: "05", label: "Analytics & Reporting", title: "Analytics & Reporting", desc: "", bullets: [] },
    ],
    []
  );

  const [activeId, setActiveId] = useState<string>(tabs[0].id);

  const ordered = useMemo(() => {
    const a = tabs.find((t) => t.id === activeId)!;
    const rest = tabs.filter((t) => t.id !== activeId);
    rest.sort((x, y) => x.number.localeCompare(y.number));
    return [a, ...rest];
  }, [tabs, activeId]);

  const active = ordered[0];

  return (
    <section id="how-we-help" className={`relative w-full ${className}`} style={{ background: NAVY }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-[140px] sm:-top-[170px] h-[170px] sm:h-[210px]"
        style={{ backgroundColor: NAVY }}
      />

      <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-start">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2" style={{ background: NEON }} />
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: NEON }}>
              HOW WE HELP
            </h2>
          </div>

          <p className="text-sm md:text-base leading-relaxed" style={{ color: NEON_48 }}>
            We handle the entire lifecycle of your content. We build your roadmap, create your visuals, manage
            your launch, and scale your reach.
          </p>
        </div>

        <div className="mt-10">
          <div className="hidden md:block">
            <motion.div layout className="grid gap-6" style={{ gridTemplateColumns: "minmax(0, 1fr) repeat(4, 78px)" }}>
              <motion.div layout transition={{ type: "spring", stiffness: 380, damping: 34 }}>
                <ActivePanel tab={active} bigIcon={bigIcon} />
              </motion.div>

              {ordered.slice(1).map((t) => (
                <motion.div key={t.id} layout transition={{ type: "spring", stiffness: 380, damping: 34 }}>
                  <ClosedColumn tab={t} onClick={() => setActiveId(t.id)} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Active Panel
========================= */

function ActivePanel({ tab, bigIcon }: { tab: Tab; bigIcon?: React.ReactNode }) {
  return (
    <div
      className="relative h-[470px] overflow-hidden"
      style={{
        borderRadius: 14,
        border: `1px solid ${NEON_48}`,
        background:
          "radial-gradient(900px 520px at 40% 28%, rgba(0,255,182,0.09) 0%, rgba(0,0,0,0) 62%)," +
          "radial-gradient(700px 420px at 88% 70%, rgba(0,255,182,0.06) 0%, rgba(0,0,0,0) 70%)," +
          "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.00) 55%, rgba(0,0,0,0.06) 100%)",
      }}
    >
      <div className="absolute right-10 top-9">
        <span className="text-[22px] font-semibold tracking-wide" style={{ color: NEON }}>
          {tab.number}
        </span>
      </div>

      <div className="h-full px-10 pt-10 pb-10">
        <h3 className="text-[38px] leading-[1.05] font-medium" style={{ color: NEON }}>
          {tab.title}
        </h3>

        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.55]" style={{ color: NEON_48 }}>
          {tab.desc}
        </p>

        <ul className="mt-24 space-y-3">
          {tab.bullets.map((b) => (
            <li key={b} className="flex items-center gap-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: NEON }}>
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-[14px] font-medium" style={{ color: NEON }}>
                {b}
              </span>
            </li>
          ))}
        </ul>

        <div className="pointer-events-none absolute bottom-10 right-10">
          <div className="h-[170px] w-[260px]">{bigIcon ?? null}</div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   Closed Column
========================= */

function ClosedColumn({ tab, onClick }: { tab: Tab; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-[470px] w-[78px] overflow-hidden"
      style={{
        borderRadius: 14,
        border: `1px solid ${NEON_22}`,
        background:
          "radial-gradient(260px 520px at 50% 20%, rgba(0,255,182,0.06) 0%, rgba(0,0,0,0) 60%)," +
          "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.00) 70%)",
      }}
    >
      <div className="absolute left-1/2 -translate-x-1/2 top-10">
        <span className="text-[22px] font-semibold tracking-wide" style={{ color: NEON_48 }}>
          {tab.number}
        </span>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-20">
        <span
          className="whitespace-nowrap text-[22px] font-medium"
          style={{
            color: NEON_48,
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            transformOrigin: "bottom center",
          }}
        >
          {tab.label}
        </span>
      </div>
    </button>
  );
}
