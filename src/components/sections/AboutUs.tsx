"use client";

import React from "react";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="w-full bg-white"
      style={{ fontFamily: "var(--font-kollektif)" }}
    >
      <div
        className="
          mx-auto w-full max-w-[1180px] px-4
          pt-[28px] pb-[40px]
          lg:h-[633px]
          lg:pt-[34px]
          lg:pb-[34px]
        "
      >
        <div className="flex h-full flex-col lg:justify-center">
          <h2
            className="
              mb-[18px]
              text-[40px]
              font-extrabold
              leading-[0.95]
              tracking-[-0.03em]
              text-[#0A0F2C]
              sm:text-[46px]
              lg:mb-[24px]
              lg:text-[56px]
            "
          >
            ABOUT US
          </h2>

          <div className="flex w-full items-stretch gap-[12px] max-lg:flex-col">
            {/* LEFT CARD */}
            <div
              className="
                relative w-full shrink-0 overflow-hidden
                rounded-[8.89px] bg-[#171C61]
                h-[417px]
                px-[22px] pt-[20px] pb-[22px]
                sm:px-[24px] sm:pt-[22px] sm:pb-[24px]
                lg:w-[348px] lg:h-[330px]
                lg:px-[28px] lg:pt-[24px] lg:pb-[24px]
              "
            >
              <div className="flex items-start justify-between">
                <div className="h-[30px] w-[118px] sm:h-[32px] sm:w-[124px]">
                  <img
                    src="/about/logo.svg"
                    alt="Creators Hub"
                    draggable={false}
                    className="pointer-events-none h-full w-full select-none object-contain"
                  />
                </div>

                <div className="h-[22px] w-[22px]">
                  <img
                    src="/about/target.svg"
                    alt="Target"
                    draggable={false}
                    className="pointer-events-none h-full w-full select-none object-contain"
                  />
                </div>
              </div>

              <p
                className="
                  absolute left-[22px] right-[22px] bottom-[24px]
                  text-left text-[15px] font-normal leading-[1.55] text-white
                  sm:left-[24px] sm:right-[24px]
                  lg:left-[28px] lg:right-auto lg:bottom-[24px]
                  lg:max-w-[255px] lg:text-[14px]
                "
              >
                Creators Hub is a creative content agency, We specialize in
                content creation for creators and brands, including video
                editing, short form videos, social media content, and designs.
                Our focus is helping creators grow.
              </p>
            </div>

            {/* RIGHT CARD */}
            <div
              className="
                relative w-full min-w-0 shrink-0
                h-[417px]
                lg:h-[330px] lg:flex-1 lg:shrink
              "
            >
              <div
                className="
                  relative h-full w-full overflow-hidden
                  rounded-[8.89px]
                  border border-[#B8BCD3]
                  bg-white
                "
              >
                {/* Header */}
                <div
                  className="
                    absolute left-0 right-0 top-0 z-[3]
                    px-[16px] pt-[24px] text-center
                    sm:px-[20px] sm:pt-[26px]
                    lg:px-[20px] lg:pt-[20px]
                  "
                >
                  <h3
                    className="
                      text-[18px] font-bold leading-[1.2] text-[#111640]
                      lg:text-[16px]
                    "
                  >
                    Based in Cairo, Egypt
                  </h3>

                  <div className="mt-[10px] flex items-center justify-center gap-[8px]">
                    <span
                      className="h-[8px] w-[8px] rounded-full bg-[#18E2AA]"
                      aria-hidden="true"
                    />
                    <span
                      className="
                        text-[11px] font-medium leading-[1]
                        tracking-[0.08em] text-[#111640]/70
                      "
                    >
                      AVAILABLE WORLDWIDE
                    </span>
                  </div>
                </div>

                {/* Globe */}
                <img
                  src="/about/globe.svg"
                  alt=""
                  draggable={false}
                  className="
                    pointer-events-none select-none
                    absolute left-1/2 bottom-[-6px] z-[1]
                    w-[470px] max-w-none -translate-x-1/2
                    sm:w-[560px]
                    md:w-[620px]
                    lg:bottom-[-14px] lg:w-[520px]
                  "
                />
              </div>

              {/* Rocket */}
              <img
                src="/about/rocket-green.svg"
                alt=""
                draggable={false}
                className="
                  pointer-events-none select-none
                  absolute z-[5]
                  right-[-2px] bottom-[-8px]
                  h-[72px] w-[72px]
                  sm:right-[-6px] sm:bottom-[-10px]
                  sm:h-[80px] sm:w-[80px]
                  lg:right-[-20px] lg:bottom-[-18px]
                  lg:h-[86px] lg:w-[86px]
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}