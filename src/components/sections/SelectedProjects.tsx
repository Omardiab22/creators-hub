"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

type Project = {
  id: string;
  label: string;
  video: string;          // ✅ local mp4 path
  subtitle?: string;
  paragraphs?: string[];
  thumbs?: string[];      // ✅ local images (optional)
};

const popIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { delay, type: "spring" as const, stiffness: 180, damping: 18 },
});

const R = 5.33;
const LABEL_MARGIN = 16;

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}
function fmtTime(sec: number) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function SelectedProjects() {
  // ✅ ضع ملفات mp4 في public/projects/ بالأسماء دي
  const projects: Project[] = useMemo(
    () => [
      {
        id: "p1",
        label: "KAI CENAT / NEW MERCH",
        video: "/projects/kai.mp4",
        subtitle: "[SELECTED PROJECTS]",
        paragraphs: [
          "In this collaboration, our design team spearheaded the creative development and technical execution for Kai Cenat’s signature apparel line.",
          "Our work focused on bridging the gap between high-energy creator culture and premium streetwear aesthetics.",
        ],
        thumbs: [
          // optional: ضع الصور دي في public/projects/thumbs/
          "/projects/thumbs/t1.jpg",
          "/projects/thumbs/t2.jpg",
          "/projects/thumbs/t3.jpg",
          "/projects/thumbs/t4.jpg",
          "/projects/thumbs/t5.jpg",
          "/projects/thumbs/t6.jpg",
        ],
      },
      { id: "p2", label: "PROJECT TWO / PROMO", video: "/projects/p2.mp4", subtitle: "[SELECTED PROJECTS]" },
      { id: "p3", label: "PROJECT THREE / CAMPAIGN", video: "/projects/p3.mp4", subtitle: "[SELECTED PROJECTS]" },
      { id: "p4", label: "PROJECT FOUR / EDIT", video: "/projects/p4.mp4", subtitle: "[SELECTED PROJECTS]" },
      { id: "p5", label: "PROJECT FIVE / SHORT", video: "/projects/p5.mp4", subtitle: "[SELECTED PROJECTS]" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const active = projects[index];

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

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
      if (!isFullscreen) {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      } else {
        // داخل fullscreen: الأسهم تغير الفيديو كمان
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, isFullscreen]);

  // Drag/swipe على الكارد (بره fullscreen فقط)
  const startXRef = useRef<number | null>(null);
  const lastXRef = useRef<number | null>(null);
  const draggingRef = useRef(false);

  const onCardPointerDown = (e: React.PointerEvent) => {
    if (isFullscreen) return;
    const t = e.target as HTMLElement | null;
    if (t?.closest?.("[data-play-btn]")) return;

    draggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onCardPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || isFullscreen) return;
    lastXRef.current = e.clientX;
  };
  const onCardPointerUp = () => {
    if (!draggingRef.current || isFullscreen) return;
    draggingRef.current = false;

    const startX = startXRef.current;
    const lastX = lastXRef.current;
    startXRef.current = null;
    lastXRef.current = null;

    if (startX == null || lastX == null) return;
    const dx = lastX - startX;
    const TH = 70;
    if (Math.abs(dx) < TH) return;

    go(dx < 0 ? 1 : -1);
  };

  // Animations
  const labelVariants = {
    enter: (d: 1 | -1) => ({ x: d === 1 ? -80 : 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: 1 | -1) => ({ x: d === 1 ? 80 : -80, opacity: 0 }),
  };

  // Fullscreen player
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);
  const rafRef = useRef<number | null>(null);

  const stopRAF = () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };
  const tick = () => {
    const v = videoRef.current;
    if (!v) return;
    setT(v.currentTime || 0);
    rafRef.current = requestAnimationFrame(tick);
  };
  const startRAF = () => {
    stopRAF();
    rafRef.current = requestAnimationFrame(tick);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    setMuted(next);
    v.muted = next;
  };
  const seekTo = (next: number) => {
    const v = videoRef.current;
    if (!v) return;
    const to = clamp(next, 0, dur || 0);
    v.currentTime = to;
    setT(to);
  };

  // sync video events when fullscreen + project changes
  useEffect(() => {
    if (!isFullscreen) {
      stopRAF();
      setIsPlaying(false);
      setT(0);
      setDur(0);
      return;
    }

    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => setDur(v.duration || 0);
    const onPlay = () => {
      setIsPlaying(true);
      startRAF();
    };
    const onPause = () => {
      setIsPlaying(false);
      stopRAF();
    };
    const onEnded = () => {
      setIsPlaying(false);
      stopRAF();
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);

    v.muted = muted;
    v.currentTime = 0;
    v.play().catch(() => {});

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      stopRAF();
    };
  }, [isFullscreen, active.id, muted]);

  const progress = dur > 0 ? t / dur : 0;

  // card placeholder bg
  const cardBg = useMemo(() => {
    const bgs = [
      "linear-gradient(180deg, rgba(250,230,175,1) 0%, rgba(220,185,120,1) 100%)",
      "linear-gradient(180deg, rgba(250,230,175,1) 0%, rgba(220,185,120,1) 100%)",
      "linear-gradient(180deg, rgba(250,230,175,1) 0%, rgba(220,185,120,1) 100%)",
      "linear-gradient(180deg, rgba(250,230,175,1) 0%, rgba(220,185,120,1) 100%)",
      "linear-gradient(180deg, rgba(250,230,175,1) 0%, rgba(220,185,120,1) 100%)",
    ];
    return bgs[index % bgs.length];
  }, [index]);

  return (
    <section id="selected-projects" className="relative w-full overflow-hidden" style={{ backgroundColor: "#00FFB6" }}>
      {/* background waves */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero/Frame 30.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 1,
        }}
      />

      {/* content */}
      <div className="relative z-30 w-full px-4 sm:px-6 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-[1240px]">
          <div className="relative grid gap-10 lg:grid-cols-[380px_1fr] lg:items-center">
            {/* LEFT */}
            <div className="relative z-10 text-[#151A43]">
              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  aria-label="Previous project"
                  onClick={() => go(-1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="h-[34px] w-[34px] rounded-full bg-white/30 backdrop-blur flex items-center justify-center"
                >
                  <FiChevronLeft className="text-[18px] text-[#151A43]" />
                </motion.button>

                <span className="text-[12px] font-bold tracking-[0.22em] text-[#151A43]">SWIPE</span>

                <motion.button
                  type="button"
                  aria-label="Next project"
                  onClick={() => go(1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="h-[34px] w-[34px] rounded-full bg-white/30 backdrop-blur flex items-center justify-center"
                >
                  <FiChevronRight className="text-[18px] text-[#151A43]" />
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

              <div className="mt-6 flex w-[260px] max-w-full gap-2">
                {projects.map((p, i) => (
                  <span
                    key={p.id}
                    className={["h-[3px] flex-1 rounded-full transition-all duration-300", i === index ? "bg-[#151A43]" : "bg-[#151A43]/25"].join(" ")}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="relative z-10">
              <div className="relative flex justify-end">
                <div className="relative w-[min(900px,100%)] aspect-video" style={{ marginRight: "clamp(-90px, -5vw, -24px)" }}>
                  <div className="relative h-full w-full" style={{ transform: "rotate(-2.3deg)", transformOrigin: "70% 50%" }}>
                    {/* under layers */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        transform: "translate(40px, 34px)",
                        background: "#08A678",
                        borderRadius: R,
                        clipPath: "polygon(0 0, 92% 0, 100% 22%, 100% 100%, 0 100%)",
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        transform: "translate(26px, 22px)",
                        background: "#1FC393",
                        borderRadius: R,
                        clipPath: "polygon(0 0, 92% 0, 100% 22%, 100% 100%, 0 100%)",
                      }}
                    />

                    {/* lightning */}
                    <div className="pointer-events-none absolute left-0 top-0" style={{ zIndex: 80, transform: "translate(-68%, -68%)" }}>
                      <img src="/hero/bar2.svg" alt="" draggable={false} style={{ width: 128, height: 128 }} />
                    </div>

                    {/* main card */}
                    <div
                      className="relative h-full w-full overflow-hidden"
                      style={{
                        borderRadius: R,
                        boxShadow: "0 34px 70px rgba(0,0,0,0.22), 0 18px 36px rgba(0,0,0,0.14)",
                        clipPath: "polygon(0 0, 92% 0, 100% 22%, 100% 100%, 0 100%)",
                        cursor: "grab",
                        touchAction: "pan-y",
                        background: cardBg,
                      }}
                      onPointerDown={onCardPointerDown}
                      onPointerMove={onCardPointerMove}
                      onPointerUp={onCardPointerUp}
                      onPointerCancel={onCardPointerUp}
                    >
                      <button
                        data-play-btn
                        type="button"
                        aria-label="Play video"
                        onPointerDownCapture={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsFullscreen(true);
                        }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ width: 92, height: 92, zIndex: 60, cursor: "pointer" }}
                      >
                        <img src="/playicon.svg" alt="" draggable={false} style={{ width: 92, height: 92 }} />
                      </button>

                      {/* white rect */}
                      <div className="pointer-events-none absolute" style={{ left: LABEL_MARGIN, right: LABEL_MARGIN, bottom: 18, height: 66 }}>
                        <div aria-hidden="true" className="absolute inset-0" style={{ transform: "translate(0px, 10px)", background: "rgba(0,0,0,0.65)", borderRadius: R }} />
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-white"
                          style={{
                            borderRadius: R,
                            fontFamily: "var(--font-godber)",
                            fontWeight: 400,
                            fontSize: 36,
                            color: "#FF1E1E",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            padding: "0 12px",
                          }}
                        >
                          {active.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN player */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div className="absolute inset-0 z-[200] overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* full background video */}
            <video
              ref={videoRef}
              src={active.video}
              className="absolute inset-0 h-full w-full object-cover"
              playsInline
              muted={muted}
              controls={false}
              preload="metadata"
            />

            {/* overlay (contrast like reference) */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(900px 600px at 18% 25%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0) 58%)," +
                  "linear-gradient(90deg, rgba(20,20,28,0.68) 0%, rgba(20,20,28,0.18) 55%, rgba(20,20,28,0.10) 100%)",
              }}
            />

            {/* close */}
            <button
              type="button"
              aria-label="Close"
              onClick={() => setIsFullscreen(false)}
              className="absolute right-6 top-6 z-[230] h-[38px] w-[38px] rounded-full bg-white/20 backdrop-blur grid place-items-center"
            >
              <FiX className="text-white text-[18px]" />
            </button>

            {/* Left text */}
            <div className="absolute left-8 top-8 z-[220] max-w-[420px] text-white">
              <div className="text-[10px] tracking-[0.18em] opacity-70">{active.subtitle ?? "[SELECTED PROJECTS]"}</div>

              <div className="mt-3 leading-[0.95] font-extrabold">
                <div className="text-[56px]">{active.label.split("/")[0]?.trim()}</div>
                <div className="text-[56px]">/ {active.label.split("/")[1]?.trim()}</div>
              </div>

              <div className="mt-10 space-y-8 text-[14px] leading-[1.7] opacity-90">
                {(active.paragraphs ?? []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Bottom: thumbs + timeline */}
            <div className="absolute left-0 right-0 bottom-0 z-[230] px-8 pb-8">
              {/* thumbs + prev/next (تغيير المشروع/الفيديو) */}
              <div className="flex items-center gap-4 mb-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="h-[36px] w-[36px] rounded-full bg-white/15 backdrop-blur text-white grid place-items-center"
                  aria-label="Previous video"
                >
                  <FiChevronLeft />
                </button>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-3">
                    {(active.thumbs ?? []).slice(0, 7).map((src, i) => (
                      <img
                        key={src + i}
                        src={src}
                        alt=""
                        draggable={false}
                        className="h-[48px] w-[74px] object-cover"
                        style={{
                          borderRadius: 6,
                          boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
                          opacity: i === 0 ? 1 : 0.9,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => go(1)}
                  className="h-[36px] w-[36px] rounded-full bg-white/15 backdrop-blur text-white grid place-items-center"
                  aria-label="Next video"
                >
                  <FiChevronRight />
                </button>
              </div>

              {/* controls row */}
              <div className="flex items-center gap-4 text-white/90">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="h-[34px] w-[34px] rounded-full bg-white/15 backdrop-blur grid place-items-center"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <span className="text-[14px] font-bold">||</span> : <span className="text-[14px] font-bold">▶</span>}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="h-[34px] px-3 rounded-full bg-white/15 backdrop-blur text-[12px]"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? "MUTED" : "SOUND"}
                </button>

                <div className="text-[12px] w-[54px]">{fmtTime(t)}</div>

                <div className="flex-1">
                  <div className="relative h-[6px] rounded-full bg-white/25">
                    <div className="absolute left-0 top-0 h-[6px] rounded-full bg-white" style={{ width: `${(dur > 0 ? (t / dur) * 100 : 0)}%` }} />
                    <input
                      type="range"
                      min={0}
                      max={dur || 0}
                      step={0.1}
                      value={t}
                      onChange={(e) => seekTo(Number(e.target.value))}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer"
                      aria-label="Seek"
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 h-[14px] w-[14px] rounded-full bg-white" style={{ left: `calc(${(dur > 0 ? (t / dur) * 100 : 0)}% - 7px)` }} />
                  </div>
                </div>

                <div className="text-[12px] w-[54px] text-right">{fmtTime(dur)}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}