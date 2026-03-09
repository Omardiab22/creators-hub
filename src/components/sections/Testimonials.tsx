"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiStar } from "react-icons/fi";

type Testimonial = {
  id: string;
  rating: number;
  stars: number;
  text: string;
  name: string;
  variant: "small" | "medium" | "tall";
};

const BRAND_NAVY = "#151A43";
const CARD_BLUE = "#3F7BFF";
const STAR_YELLOW = "#FFE600";
const RED = "#FF1E1E";

function StarsRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-[6px]" aria-label={`${count} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          className="text-[14px]"
          style={{ color: i < count ? STAR_YELLOW : "rgba(255,255,255,0.32)" }}
        />
      ))}
    </div>
  );
}

function cardSpec(v: Testimonial["variant"], idx: number) {
  // sizes close to reference feel (not uniform)
  // yOffsets stagger to create the “not same level” look
  const yOffsets = [18, 0, 26, 10, 22, 6, 30, 12];
  const y = yOffsets[idx % yOffsets.length];

  if (v === "small")
    return {
      w: "w-[270px] sm:w-[290px]",
      minH: "min-h-[280px] sm:min-h-[300px]",
      y,
      nameSize: "text-[22px]",
      textSize: "text-[12.5px]",
      pad: "px-6 py-6",
    };

  if (v === "tall")
    return {
      w: "w-[330px] sm:w-[370px]",
      minH: "min-h-[420px] sm:min-h-[460px]",
      y,
      nameSize: "text-[26px]",
      textSize: "text-[13px]",
      pad: "px-7 py-7",
    };

  // medium
  return {
    w: "w-[320px] sm:w-[360px]",
    minH: "min-h-[360px] sm:min-h-[400px]",
    y,
    nameSize: "text-[24px]",
    textSize: "text-[13px]",
    pad: "px-7 py-7",
  };
}

export default function Testimonials() {
  const items: Testimonial[] = useMemo(
    () => [
      {
        id: "t1",
        rating: 5.0,
        stars: 5,
        variant: "tall",
        text:
          "I’ve worked with agencies before, but no one understands the 'Launch' phase like these guys. We spent weeks building the roadmap together, and their attention to detail on the visuals was incredible—it finally felt like my brand looked as professional as the content I was producing",
        name: "MR BEAST",
      },
      {
        id: "t2",
        rating: 5.0,
        stars: 5,
        variant: "medium",
        text:
          "Before working with the team, I was drowning in the day-to-day. I had the ideas, but no clear roadmap to execute them. They didn't just give me advice; they took over the entire lifecycle of my brand. From the moment they redesigned my visual identity to the day we managed the launch of my latest series, the quality shift was night and day",
        name: "MR BEAST",
      },
      {
        id: "t3",
        rating: 5.0,
        stars: 5,
        variant: "small",
        text:
          "Most people in this industry handle one piece of the puzzle. What sets this team apart is that they manage the entire lifecycle",
        name: "MR BEAST",
      },
      {
        id: "t4",
        rating: 5.0,
        stars: 5,
        variant: "medium",
        text:
          "The turnaround was fast, but the quality never dipped. Everything shipped with a system behind it—clean visuals, consistent voice, and a plan we could actually execute.",
        name: "MR BEAST",
      },
      {
        id: "t5",
        rating: 5.0,
        stars: 5,
        variant: "small",
        text:
          "We finally had a real pipeline. The work felt premium from day one, and the results were obvious in the content performance.",
        name: "MR BEAST",
      },
    ],
    []
  );

  // Infinite loop: 2 copies, animate x, wrap.
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 80, damping: 18, mass: 0.9 });

  const [halfWidth, setHalfWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const SPEED = 52; // px/s

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setHalfWidth(el.scrollWidth / 2);
    };
    measure();

    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!halfWidth) return;

    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = (now - last) / 1000;
      last = now;

      if (isDragging) return;

      const cur = x.get();
      let next = cur - SPEED * dt;
      if (next <= -halfWidth) next += halfWidth;
      x.set(next);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [halfWidth, isDragging, x]);

  const onDragStart = () => setIsDragging(true);
  const onDragEnd = () => {
    setIsDragging(false);
    if (!halfWidth) return;
    let norm = x.get();
    while (norm > 0) norm -= halfWidth;
    while (norm <= -halfWidth) norm += halfWidth;
    x.set(norm);
  };

  return (
    <section id="testimonials" className="relative w-full overflow-hidden bg-white">
      {/* Background faint */}
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 700px at 50% 20%, rgba(21,26,67,0.06) 0%, rgba(255,255,255,0) 55%)",
          }}
        />
        <div
          className="absolute right-[-140px] top-[-120px] text-[220px] font-extrabold tracking-tight select-none"
          style={{ color: "rgba(21,26,67,0.04)" }}
        >
          W
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 py-14 sm:py-18">
        {/* Header */}
        <div className="text-center">
          <div className="text-[11px] tracking-[0.20em] font-semibold" style={{ color: BRAND_NAVY, opacity: 0.7 }}>
            ( TESTIMONIALS )
          </div>

          <h2 className="mt-3 text-[26px] sm:text-[34px] md:text-[40px] font-extrabold tracking-tight" style={{ color: BRAND_NAVY }}>
            DON&apos;T TAKE OUR WORD FOR IT
          </h2>

          <div className="mt-3 flex items-center justify-center gap-10 text-[11px] tracking-[0.28em] font-extrabold">
            <span style={{ color: RED }}>•</span>
            <span style={{ color: RED }}>TAKE THEIRS</span>
            <span style={{ color: RED }}>•</span>
          </div>
        </div>

        {/* Marquee (NO white fade overlays) */}
        <div className="mt-10 sm:mt-12">
          <div ref={containerRef} className="relative w-full overflow-hidden">
            <motion.div
              ref={trackRef}
              className="flex gap-7 will-change-transform"
              style={{ x: xSpring }}
              drag="x"
              dragConstraints={{ left: -Infinity, right: Infinity }}
              dragElastic={0.06}
              dragMomentum={true}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            >
              {[...items, ...items].map((t, idx) => (
                <TestimonialCard key={`${t.id}-${idx}`} t={t} idx={idx} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t, idx }: { t: Testimonial; idx: number }) {
  const spec = cardSpec(t.variant, idx);
  const phase = (idx % 7) * 0.17;

  return (
    <motion.div
      className={[
        "shrink-0 rounded-[10px] flex flex-col",
        spec.w,
        spec.minH,
        spec.pad,
      ].join(" ")}
      style={{
        background: CARD_BLUE,
        boxShadow: "0 22px 50px rgba(0,0,0,0.12)",
      }}
      initial={false}
      animate={{
        y: [spec.y, spec.y - 10, spec.y], // floating stagger
        scale: [1, 1.03, 1],
      }}
      transition={{
        duration: 3.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: phase,
      }}
      whileHover={{ scale: 1.045 }}
    >
      {/* top row */}
      <div className="flex items-center gap-4 text-white">
        <div className="text-[18px] font-extrabold">{t.rating.toFixed(1)}</div>
        <StarsRow count={t.stars} />
      </div>

      <div className="mt-5 h-[1px] w-full bg-white/25" />

      <p className={["mt-5 text-white/90 leading-[1.65]", spec.textSize].join(" ")}>
        “{t.text}”
      </p>

      <div className="mt-auto pt-7">
        <div
          className={["text-white font-extrabold tracking-wide", spec.nameSize].join(" ")}
          style={{ fontFamily: "var(--font-godber)" }}
        >
          {t.name}
        </div>
      </div>
    </motion.div>
  );
}