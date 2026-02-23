"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type Project = {
  id: string;
  label: string;
  thumb: string; // image path (public/...)
  video: string; // mp4 url/path
};

const popIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: {
    delay,
    type: "spring" as const,
    stiffness: 180,
    damping: 18,
  },
});

// 👇 حط هنا نفس path بتاع البرق الأصفر اللي عندكم
const LIGHTNING_PATH_D =
  "M60 5 L35 55 H58 L45 115 L90 55 H65 Z";

export default function SelectedProjects() {
  const projects: Project[] = useMemo(
    () => [
      {
        id: "p1",
        label: "KAI CENAT / NEW MERCH",
        thumb: "/projects/kai.jpg", // عدّل
        video: "/projects/kai.mp4", // عدّل
      },
      {
        id: "p2",
        label: "PROJECT TWO / PROMO",
        thumb: "/projects/p2.jpg",
        video: "/projects/p2.mp4",
      },
      {
        id: "p3",
        label: "PROJECT THREE / CAMPAIGN",
        thumb: "/projects/p3.jpg",
        video: "/projects/p3.mp4",
      },
      {
        id: "p4",
        label: "PROJECT FOUR / EDIT",
        thumb: "/projects/p4.jpg",
        video: "/projects/p4.mp4",
      },
      {
        id: "p5",
        label: "PROJECT FIVE / SHORT",
        thumb: "/projects/p5.jpg",
        video: "/projects/p5.mp4",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1); // 1 next, -1 prev

  const active = projects[index];

  const [isOpen, setIsOpen] = useState(false);

  const go = useCallback(
    (nextDir: 1 | -1) => {
      setDir(nextDir);
      setIndex((i) => {
        const n = projects.length;
        return (i + nextDir + n) % n;
      });
    },
    [projects.length]
  );

  // Keyboard (optional)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Drag/swipe on card (pointer)
  const startXRef = useRef<number | null>(null);
  const lastXRef = useRef<number | null>(null);
  const draggingRef = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    lastXRef.current = e.clientX;
  };

  const onPointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const startX = startXRef.current;
    const lastX = lastXRef.current;
    startXRef.current = null;
    lastXRef.current = null;

    if (startX == null || lastX == null) return;

    const dx = lastX - startX;
    const TH = 70;

    if (Math.abs(dx) < TH) return;

    // dx < 0 => swipe right->left => NEXT
    go(dx < 0 ? 1 : -1);
  };

  // Label animation requirement:
  // - If user swipes right->left (NEXT), label should move left->right while switching (positive X)
  // We'll implement label motion based on dir.
  const labelVariants = {
    enter: (d: 1 | -1) => ({
      x: d === 1 ? -48 : 48,
      opacity: 0,
      filter: "blur(2px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (d: 1 | -1) => ({
      // NEXT => move left->right (positive X) ✅
      x: d === 1 ? 48 : -48,
      opacity: 0,
      filter: "blur(2px)",
    }),
  };

  return (
    <section
      id="selected-projects"
      className="relative w-full overflow-hidden bg-white"
      style={{
        backgroundImage: "url('/hero/waves.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* subtle teal overlay like screenshot */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,255,182,0.62) 0%, rgba(0,214,255,0.54) 100%)",
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 py-10 sm:py-14">
        <div className="mx-auto w-full max-w-[1240px]">
          <div className="relative grid gap-8 lg:grid-cols-[360px_1fr] lg:items-center">
            {/* Lightning (fixed position - keep) */}
            <motion.svg
              width="110"
              height="110"
              viewBox="0 0 120 120"
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[-18px] -translate-x-1/2 z-20 drop-shadow-[0_12px_0_rgba(0,0,0,0.10)]"
              initial={{ opacity: 0, scale: 0.9, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.05, type: "spring", stiffness: 170, damping: 18 }}
            >
              <path d={LIGHTNING_PATH_D} fill="#FFE600" />
            </motion.svg>

            {/* Left */}
            <div className="relative z-10 text-[#151A43]">
              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  aria-label="Previous project"
                  onClick={() => go(-1)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="h-[44px] w-[44px] rounded-full border border-black/20 bg-white/30 backdrop-blur flex items-center justify-center"
                >
                  <span className="text-[26px] leading-none">‹</span>
                </motion.button>

                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold tracking-[0.22em]">SWIPE</span>
                </div>

                <motion.button
                  type="button"
                  aria-label="Next project"
                  onClick={() => go(1)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="h-[44px] w-[44px] rounded-full border border-black/20 bg-white/30 backdrop-blur flex items-center justify-center"
                >
                  <span className="text-[26px] leading-none">›</span>
                </motion.button>
              </div>

              <motion.h2
                className="mt-6 text-[#151A43] font-extrabold tracking-tight leading-[0.95] text-[clamp(34px,6vw,56px)]"
                initial={popIn(0.08).initial}
                animate={popIn(0.08).animate}
                transition={popIn(0.08).transition}
              >
                SELECTED <br /> PROJECTS
              </motion.h2>

              {/* progress */}
              <div className="mt-6 flex w-[240px] max-w-full gap-2">
                {projects.map((p, i) => {
                  const active = i === index;
                  return (
                    <span
                      key={p.id}
                      className={[
                        "h-[3px] flex-1 rounded-full transition-all duration-300",
                        active ? "bg-black/70" : "bg-black/20",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  );
                })}
              </div>
            </div>

            {/* Right card */}
            <div className="relative z-10 flex justify-end">
              <motion.div
                className="relative w-full max-w-[720px] aspect-video rounded-[14px]"
                initial={popIn(0.12).initial}
                animate={popIn(0.12).animate}
                transition={popIn(0.12).transition}
              >
                {/* card media */}
                <div
                  className="relative h-full w-full overflow-hidden rounded-[14px] shadow-[0_28px_70px_rgba(0,0,0,0.18)] cursor-grab active:cursor-grabbing"
                  style={{ touchAction: "pan-y" }}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active.id}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1.02 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={active.thumb}
                        alt=""
                        fill
                        priority={index === 0}
                        className="select-none object-cover"
                        draggable={false}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* play overlay */}
                  <button
                    type="button"
                    aria-label="Play video"
                    onClick={() => setIsOpen(true)}
                    className="absolute inset-0 grid place-items-center"
                  >
                    <div className="h-[92px] w-[92px] rounded-full bg-white/35 backdrop-blur shadow-[0_16px_40px_rgba(0,0,0,0.22)] relative">
                      <span
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: "translate(-35%,-50%)",
                          width: 0,
                          height: 0,
                          borderLeft: "20px solid rgba(0,0,0,0.82)",
                          borderTop: "12px solid transparent",
                          borderBottom: "12px solid transparent",
                        }}
                      />
                    </div>
                  </button>
                </div>

                {/* label */}
                <div className="pointer-events-none absolute left-[26%] right-[6%] -bottom-[16px] h-[52px]">
                  <div className="relative h-[52px]">
                    <AnimatePresence mode="wait" initial={false} custom={dir}>
                      <motion.div
                        key={active.id + "-label"}
                        custom={dir}
                        variants={labelVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          duration: 0.24,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0 flex items-center px-5 rounded-[8px] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.16)] font-extrabold tracking-[0.02em] text-[#FF1E1E]"
                      >
                        {active.label}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* ground shadow */}
                <div className="pointer-events-none absolute left-[12%] right-[8%] -bottom-[34px] h-[18px] rounded-full bg-black/15 blur-[10px]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal (temporary simple popup) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* overlay */}
            <button
              type="button"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative mx-auto mt-[6vh] w-[min(980px,calc(100%-32px))] overflow-hidden rounded-[14px] bg-black shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
              initial={{ scale: 0.96, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 z-10 h-[40px] w-[40px] rounded-full border border-white/20 bg-white/10 text-white text-[22px]"
              >
                ×
              </button>

              <div className="aspect-video w-full">
                <video
                  src={active.video}
                  className="h-full w-full bg-black"
                  controls
                  playsInline
                  autoPlay
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}