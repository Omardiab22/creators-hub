"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/sections/Navbar";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

const popIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.55, y: 14 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: {
    delay,
    type: "spring" as const,
    stiffness: 180,
    damping: 16,
  },
});

function useTypeLoop(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const current = useMemo(() => words[wordIndex] ?? "", [words, wordIndex]);

  useEffect(() => {
    const TYPE_SPEED = 90;
    const DELETE_SPEED = 55;
    const HOLD_AFTER_TYPE = 900;
    const HOLD_AFTER_DELETE = 220;

    let t: number;

    // finished typing current word
    if (!deleting && text === current) {
      t = window.setTimeout(() => setDeleting(true), HOLD_AFTER_TYPE);
      return () => window.clearTimeout(t);
    }

    // finished deleting
    if (deleting && text === "") {
      t = window.setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, HOLD_AFTER_DELETE);
      return () => window.clearTimeout(t);
    }

    // typing/deleting step
    t = window.setTimeout(() => {
      const next = deleting
        ? current.slice(0, Math.max(0, text.length - 1))
        : current.slice(0, text.length + 1);

      setText(next);
    }, deleting ? DELETE_SPEED : TYPE_SPEED);

    return () => window.clearTimeout(t);
  }, [text, deleting, current, words.length]);

  return text;
}

export default function Hero() {
  // ✅ typing text (تقدر تزود كلمات لو تحب)
  const typed = useTypeLoop(["WELCOME"]);

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      style={{
        backgroundImage: "url('/hero/waves.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 w-full px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="mx-auto w-full max-w-[1240px]">
          <Navbar />
        </div>

        <div className="relative mt-6 sm:mt-10 min-h-[520px] sm:min-h-[560px] pb-[120px] sm:pb-[140px] w-full">
          {/* Frame container */}
          <div className="pointer-events-none absolute inset-0">
            <div className="mx-auto h-full w-full max-w-[1240px] relative" />
          </div>

          {/* Plus strips */}
          <div className="pointer-events-none absolute inset-0 z-20">
            <div className="mx-auto h-full w-full max-w-[1240px] relative">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[20px] bottom-[20px] w-[20px]"
                style={{
                  backgroundImage: "url('/hero/svg/plus.svg')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
              <span
                aria-hidden="true"
                className="absolute right-0 top-[20px] bottom-[20px] w-[20px]"
                style={{
                  backgroundImage: "url('/hero/svg/plus.svg')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>

          {/* Floating icons */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="mx-auto h-full w-full max-w-[1240px] relative">
              {/* TARGET */}
              <motion.div
                className="
                  absolute
                  left-[70px] sm:left-[110px]
                  top-[70px] sm:top-[78px]
                  h-[46px] w-[46px]
                  sm:h-[60px] sm:w-[60px]
                  will-change-transform
                "
                initial={popIn(0.12).initial}
                animate={popIn(0.12).animate}
                transition={popIn(0.12).transition}
              >
                <motion.img
                  src="/hero/svg/target.svg"
                  alt=""
                  draggable={false}
                  className="h-full w-full select-none"
                  animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              {/* WIFI */}
              <motion.div
                className="
                  absolute
                  right-[70px] sm:right-[120px]
                  top-[58px] sm:top-[60px]
                  h-[70px] w-[70px]
                  sm:h-[120px] sm:w-[120px]
                  will-change-transform
                "
                initial={popIn(0.2).initial}
                animate={popIn(0.2).animate}
                transition={popIn(0.2).transition}
              >
                <motion.img
                  src="/hero/svg/wifi.svg"
                  alt=""
                  draggable={false}
                  className="h-full w-full select-none"
                  animate={{ scale: [1, 1.09, 1], y: [0, -6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              {/* ROCKET */}
              <motion.div
                className="
                  absolute
                  left-[30px] sm:left-[70px]
                  bottom-[70px] sm:bottom-[90px]
                  h-[140px] w-[140px]
                  sm:h-[210px] sm:w-[210px]
                  will-change-transform
                "
                initial={popIn(0.28).initial}
                animate={popIn(0.28).animate}
                transition={popIn(0.28).transition}
              >
                <motion.img
                  src="/hero/svg/rocket.svg"
                  alt=""
                  draggable={false}
                  className="h-full w-full select-none"
                  animate={{ y: [0, -10, 0], rotate: [0, -1.2, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              {/* BULB */}
              <motion.div
                className="
                  absolute
                  right-[70px] sm:right-[120px]
                  bottom-[80px] sm:bottom-[110px]
                  h-[105px] w-[105px]
                  sm:h-[150px] sm:w-[150px]
                  will-change-transform
                "
                initial={popIn(0.34).initial}
                animate={popIn(0.34).animate}
                transition={popIn(0.34).transition}
              >
                <motion.img
                  src="/hero/svg/bulb.svg"
                  alt=""
                  draggable={false}
                  className="h-full w-full select-none"
                  animate={{ scale: [1, 1.03, 1], y: [0, -6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Center content */}
          <div className="relative z-30 mx-auto w-full max-w-[1240px] px-2 sm:px-6">
            <div className="flex flex-col items-center text-center pt-8 sm:pt-10">
              {/* ✅ WELCOME typing pill */}
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.08, type: "spring", stiffness: 160, damping: 18 }}
                className="mb-5 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] text-[#151A43] backdrop-blur"
              >
                <span>(</span>

                {/* typing text */}
                <span className="inline-flex items-center">
                  <span className="min-w-[62px] text-left">{typed}</span>
                  {/* blinking cursor */}
                  <motion.span
                    aria-hidden="true"
                    className="ml-[2px] inline-block h-[12px] w-[1.5px] bg-[#151A43]"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </span>

                <span>)</span>
                <span className="text-[13px] sm:text-[14px] leading-none">→</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, type: "spring", stiffness: 140, damping: 18 }}
                className="max-w-[980px] text-[#151A43]"
              >
                <span className="block text-[34px] sm:text-[52px] md:text-[66px] leading-[1.02] tracking-[-0.01em]">
                  <span className="font-head">CREATORS HUB - </span>
                  <span className="font-bold">WHERE</span>
                </span>

                <span className="block text-[34px] sm:text-[52px] md:text-[66px] leading-[1.02] tracking-[-0.01em] font-bold">
                  IDEAS FIND THEIR VOICE
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 140, damping: 18 }}
                className="mt-5 sm:mt-6 max-w-[560px] text-[14px] sm:text-[18px] leading-[1.6] font-medium text-[#151A43]/85 px-2"
              >
                Creators Hub is a professional, trustworthy platform for content creators.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.26, type: "spring", stiffness: 160, damping: 18 }}
                className="mt-7 sm:mt-9 flex items-center gap-3"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-[48px] sm:h-[54px] rounded-[10px] bg-[#FF1E1E] px-6 sm:px-8 text-[13px] sm:text-[14px] font-medium text-white"
                >
                  Search Creator
                </motion.button>

                <motion.button
                  type="button"
                  aria-label="Search"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="h-[48px] w-[48px] sm:h-[54px] sm:w-[54px] rounded-[10px] bg-[#FF1E1E] text-white flex items-center justify-center"
                >
                  <FiSearch className="text-[16px] sm:text-[18px]" />
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[160px] z-0 bg-gradient-to-b from-white/0 via-white/75 to-white" />
        </div>
      </div>
    </section>
  );
}
