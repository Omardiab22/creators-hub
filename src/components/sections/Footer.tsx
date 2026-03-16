"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full">
      {/* ===================== HERO (IMAGE) ===================== */}
      <div className="relative w-full overflow-hidden">
        <div className="relative w-full h-[533.33px] max-[1023px]:h-[420px] max-[767px]:h-[360px]">
          <img
            src="/footer/footer-hero.jpeg"
            alt=""
            draggable={false}
            className="h-full w-full object-cover object-[50%_35%] select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-black/5" />

          {/* rings bottom-left (hide on mobile) */}
          <div className="pointer-events-none absolute left-[-140px] bottom-[-140px] h-[340px] w-[340px] rounded-full border-[10px] border-white/18 max-[767px]:hidden" />
          <div className="pointer-events-none absolute left-[-85px] bottom-[-85px] h-[280px] w-[280px] rounded-full border-[10px] border-white/14 max-[767px]:hidden" />

          {/* WHITE CARD (ALWAYS OVERLAY) */}
          <div
            className="
              absolute z-[10]
              rounded-[12px] bg-white
              shadow-[0_14px_40px_rgba(0,0,0,0.22)]
              overflow-hidden

              /* Desktop exact */
              right-[56px] top-[44px]
              w-[342.33px] h-[329.36px]
              px-[22px] pt-[18px] pb-[18px]

              /* Tablet */
              max-[1023px]:right-[28px] max-[1023px]:top-[26px]
              max-[1023px]:w-[320px] max-[1023px]:h-[305px]
              max-[1023px]:px-[20px] max-[1023px]:pt-[16px] max-[1023px]:pb-[16px]

              /* Mobile: centered overlay فوق الصورة */
              max-[767px]:left-1/2
              max-[767px]:right-auto
              max-[767px]:top-auto
              max-[767px]:bottom-[18px]
              max-[767px]:-translate-x-1/2
              max-[767px]:w-[min(92vw,342.33px)]
              max-[767px]:h-auto
              max-[767px]:px-[18px] max-[767px]:pt-[16px] max-[767px]:pb-[16px]
            "
          >
            <div className="flex items-center justify-center">
              <img
                src="/footer/logo.svg"
                alt="Creators Hub"
                draggable={false}
                className="h-[32px] w-auto select-none pointer-events-none max-[767px]:h-[28px]"
              />
            </div>

            <div className="mt-[18px] space-y-[14px] max-[767px]:mt-[14px] max-[767px]:space-y-[12px]">
              <ActionButton bg="#E63A3A" ariaLabel="Email" />
              <ActionButton bg="#1DB954" ariaLabel="WhatsApp" />
              <ActionButton bg="#141B4D" ariaLabel="Phone" />
            </div>
          </div>
        </div>
      </div>

      {/* ===================== RED SECTION (454px) SPLIT IN 2 ===================== */}
      <div className="w-full bg-[#BC1E3C] h-[454px] overflow-hidden max-[1023px]:h-auto">
        {/* TOP HALF (no background stroke) */}
        <div className="mx-auto w-full max-w-[1180px] px-4 h-1/2 max-[1023px]:h-auto">
          <div
            className="pt-[44px] max-[1023px]:pt-[40px] max-[767px]:pt-[34px]"
            style={{ fontFamily: "var(--font-kollektif)" }}
          >
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
              <p className="max-w-[520px] text-white text-[24px] leading-[1.18] max-[767px]:text-[20px]">
                We are engineering high-impact <br className="hidden sm:block" />
                content for world’s leading brands
              </p>

              <div className="flex items-start gap-10 lg:gap-14 max-[767px]:flex-col max-[767px]:gap-8">
                <div className="hidden lg:block h-[116px] w-[1px] bg-white/12" />

                <div className="flex gap-10 lg:gap-14 max-[767px]:gap-12">
                  <div>
                    <div className="text-white/70 text-[10px] tracking-[0.16em]">
                      NAVIGATE
                    </div>
                    <ul className="mt-4 space-y-2 text-white text-[12px]">
                      <li>Our Work</li>
                      <li>Services</li>
                      <li>About Us</li>
                      <li>Testimonials</li>
                    </ul>
                  </div>

                  <div>
                    <div className="text-white/70 text-[10px] tracking-[0.16em]">
                      CONNECT
                    </div>
                    <ul className="mt-4 space-y-2 text-white text-[12px]">
                      <li>Email</li>
                      <li>WhatsApp</li>
                      <li>Phone Number</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="ml-2 flex h-[34px] w-[34px] items-center justify-center rounded-[8px] bg-white/10 text-white hover:bg-white/15 max-[767px]:ml-0"
                    aria-label="Back to top"
                  >
                    <UpIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM HALF (has background stroke) */}
        <div className="relative h-1/2 max-[1023px]:h-auto">
          {/* stroke background for bottom half only */}
          <img
            src="/footer/brand-stroke.svg"
            alt=""
            draggable={false}
            className="
              pointer-events-none select-none
              absolute inset-0 z-0
              w-full h-full
              object-cover object-bottom
            "
          />

          <div className="relative z-[2] mx-auto w-full max-w-[1180px] px-4 h-full flex flex-col justify-end pb-[52px] max-[1023px]:pt-[26px] max-[1023px]:pb-[40px]">
            <div
              className="
                text-white font-normal tracking-[0]
                text-[199.44px] leading-[269.2px]
                max-[1023px]:text-[140px] max-[1023px]:leading-[190px]
                max-[767px]:text-[72px]  max-[767px]:leading-[96px]
              "
              style={{ fontFamily: "var(--font-godber), Godber, serif" }}
            >
              Creators Hub
            </div>

            <div
              className="mt-[8px] text-white/75 text-[10px]"
              style={{ fontFamily: "var(--font-kollektif)" }}
            >
              © 2026 CREATORS HUB. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ActionButton({ bg, ariaLabel }: { bg: string; ariaLabel: string }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="flex w-full items-center justify-center rounded-[8px] h-[48px] max-[767px]:h-[44px]"
      style={{ backgroundColor: bg }}
    >
      <MailIcon />
    </button>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 7.5H19.5V16.5H4.5V7.5Z"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M5 8L12 13L19 8"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5l-7 7M12 5l7 7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}