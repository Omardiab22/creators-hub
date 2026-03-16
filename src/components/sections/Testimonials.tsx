"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type TestimonialCard = {
  id: string;
  image: string;
  alt: string;
  width: number;
  height: number;
};

const BRAND_NAVY = "#151A43";
const RED = "#FF1E1E";
const SECTION_BG = "/testimonials/background.png";

/**
 * المقاسات الأصلية من الديزاين:
 * 1) 560.56 x 425
 * 2) 504.56 x 425
 * 3) 393.56 x 425
 * 4) 393.56 x 425
 *
 * بنحافظ على نفس النسب باستخدام scale موحد لكل breakpoint
 */
function cardSpec(card: TestimonialCard, idx: number) {
  const desktopScale = 1;
  const tabletScale = 0.78;
  const mobileScale = 0.58;

  const yBase = [26, 74, 40, 88, 32, 70, 44, 84][idx % 8];

  return {
    className: [
      `w-[${card.width * mobileScale}px]`,
      `sm:w-[${card.width * tabletScale}px]`,
      `lg:w-[${card.width * desktopScale}px]`,
      `h-[${card.height * mobileScale}px]`,
      `sm:h-[${card.height * tabletScale}px]`,
      `lg:h-[${card.height * desktopScale}px]`,
    ].join(" "),
    yBase,
  };
}

export default function Testimonials() {
  const items: TestimonialCard[] = useMemo(
    () => [
      {
        id: "card-01",
        image: "/testimonials/cards/card-01.svg",
        alt: "Testimonial card 1",
        width: 560.56,
        height: 425,
      },
      {
        id: "card-02",
        image: "/testimonials/cards/card-02.svg",
        alt: "Testimonial card 2",
        width: 504.56,
        height: 425,
      },
      {
        id: "card-03",
        image: "/testimonials/cards/card-03.svg",
        alt: "Testimonial card 3",
        width: 393.56,
        height: 425,
      },
      {
        id: "card-04",
        image: "/testimonials/cards/card-04.svg",
        alt: "Testimonial card 4",
        width: 393.56,
        height: 425,
      },
    ],
    []
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstSetRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const xSpring = useSpring(x, {
    stiffness: 90,
    damping: 24,
    mass: 0.95,
  });

  const [setWidth, setSetWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const SPEED = 58;

  useEffect(() => {
    const measure = () => {
      if (!firstSetRef.current) return;
      setSetWidth(firstSetRef.current.scrollWidth);
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (firstSetRef.current) ro.observe(firstSetRef.current);
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (!setWidth) return;

    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = (now - last) / 1000;
      last = now;

      if (isDragging) return;

      let next = x.get() - SPEED * dt;

      if (next <= -setWidth) {
        next += setWidth;
      }

      x.set(next);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [setWidth, isDragging, x]);

  const normalizeX = () => {
    if (!setWidth) return;

    let current = x.get();

    while (current > 0) current -= setWidth;
    while (current <= -setWidth) current += setWidth;

    x.set(current);
  };

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-x-hidden bg-[#F4F4F4]"
    >
      {/* background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${SECTION_BG}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          opacity: 1,
        }}
      />

      {/* header */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 pt-14 sm:pt-16 lg:pt-18">
        <div className="text-center">
          <div
            className="text-[11px] sm:text-[12px] font-semibold tracking-[0.22em]"
            style={{ color: BRAND_NAVY, opacity: 0.72 }}
          >
            ( TESTIMONIALS )
          </div>

          <h2
            className="mt-3 text-[30px] sm:text-[42px] lg:text-[56px] font-extrabold tracking-tight leading-[0.95]"
            style={{ color: BRAND_NAVY }}
          >
            DON&apos;T TAKE OUR WORD FOR IT
          </h2>

          <div className="mt-5 flex items-center justify-center gap-8 sm:gap-10">
            <span
              className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.28em]"
              style={{ color: RED }}
            >
              •
            </span>
            <span
              className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.34em]"
              style={{ color: RED }}
            >
              TAKE THEIRS
            </span>
            <span
              className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.28em]"
              style={{ color: RED }}
            >
              •
            </span>
          </div>
        </div>
      </div>

      {/* marquee */}
      <div className="relative z-10 mt-12 sm:mt-14 lg:mt-16 pb-20 sm:pb-24 lg:pb-28">
        <div
          ref={containerRef}
          className="
            relative w-full overflow-hidden
            min-h-[360px]
            sm:min-h-[470px]
            lg:min-h-[620px]
          "
        >
          <motion.div
            className="flex w-max will-change-transform pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-20 lg:pb-24"
            style={{ x: xSpring }}
            drag="x"
            dragConstraints={{ left: -Infinity, right: Infinity }}
            dragElastic={0.03}
            dragMomentum
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => {
              setIsDragging(false);
              normalizeX();
            }}
          >
            <div
              ref={firstSetRef}
              className="flex items-start gap-4 sm:gap-5 lg:gap-7 px-3 sm:px-4 lg:px-5"
            >
              {items.map((card, idx) => (
                <ImageCard key={`${card.id}-set1`} card={card} idx={idx} />
              ))}
            </div>

            <div className="flex items-start gap-4 sm:gap-5 lg:gap-7 px-3 sm:px-4 lg:px-5">
              {items.map((card, idx) => (
                <ImageCard
                  key={`${card.id}-set2`}
                  card={card}
                  idx={idx + items.length}
                />
              ))}
            </div>

            <div className="flex items-start gap-4 sm:gap-5 lg:gap-7 px-3 sm:px-4 lg:px-5">
              {items.map((card, idx) => (
                <ImageCard
                  key={`${card.id}-set3`}
                  card={card}
                  idx={idx + items.length * 2}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ImageCard({
  card,
  idx,
}: {
  card: TestimonialCard;
  idx: number;
}) {
  const spec = cardSpec(card, idx);

  /**
   * أنيميشن رأسي أنعم:
   * - مش هزة
   * - حركة بسيطة
   * - offsets مختلفة بين الكاردات
   */
  const travelUp = 10;
  const travelDown = 8;
  const phase = (idx % 4) * 0.35;

  return (
    <motion.article
      className={[
        "relative shrink-0 overflow-hidden rounded-[14px]",
        spec.className,
      ].join(" ")}
      style={{
        boxShadow: "0 18px 42px rgba(0,0,0,0.08)",
      }}
      initial={false}
      animate={{
        y: [
          spec.yBase,
          spec.yBase - travelUp,
          spec.yBase,
          spec.yBase + travelDown,
          spec.yBase,
        ],
      }}
      transition={{
        duration: 5.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: phase,
      }}
      whileHover={{
        y: spec.yBase - 4,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
    >
      <img
        src={card.image}
        alt={card.alt}
        draggable={false}
        className="h-full w-full select-none object-cover"
      />
    </motion.article>
  );
}