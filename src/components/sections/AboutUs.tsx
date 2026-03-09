"use client";

import React from "react";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="w-full bg-white"
      style={{ fontFamily: "var(--font-kollektif)" }}
    >
      <div className="mx-auto w-full max-w-[1180px] px-4 pt-[32px] pb-[40px]">
        {/* heading */}
        <h2
          className="
            mb-[18px]
            text-[#0A0F2C]
            font-extrabold
            leading-[1]
            tracking-[-0.01em]
            text-[44px]
            max-[1199px]:text-[clamp(34px,4vw,44px)]
          "
        >
          ABOUT US
        </h2>

        {/* row */}
        <div
          className="
            flex gap-[16px]
            items-stretch
            w-full
            max-[1199px]:flex-col
            max-[1199px]:items-center
          "
        >
          {/* LEFT CARD */}
          <div
            className="
              relative
              flex-1
              min-w-[360px]
              h-[360px]
              rounded-[14px]
              bg-[#141B4D]
              p-[18px]
              overflow-hidden
              max-[1199px]:w-[min(680px,100%)]
              max-[1199px]:min-w-0
              max-[767px]:w-full
              max-[767px]:h-auto max-[767px]:min-h-[320px]
            "
          >
            {/* top row: full width */}
            <div className="flex items-start justify-between w-full">
              {/* logo container (fixed box) -> img fills (w-full h-full) */}
              <div className="h-[28px] w-[120px]">
                <img
                  src="/about/logo.svg"
                  alt="Creators Hub"
                  draggable={false}
                  className="h-full w-full object-contain select-none pointer-events-none"
                />
              </div>

              {/* right side: target + squares */}
              <div className="flex items-center gap-[12px]">
                {/* target container -> img fills (w-full h-full) */}
                <div className="h-[16px] w-[16px]">
                  <img
                    src="/about/target.svg"
                    alt="Target"
                    draggable={false}
                    className="h-full w-full object-contain select-none pointer-events-none"
                  />
                </div>
               </div>
            </div>

            {/* paragraph */}
            <p
              className="
                absolute left-[18px] bottom-[22px]
                max-w-[250px]
                text-white
                text-[12.5px]
                leading-[1.35]
                font-normal
                text-left
                max-[767px]:static max-[767px]:mt-[18px]
              "
            >
              Creators Hub is a creative content agency, We specialize in content
              creation for creators and brands, including video editing, short form
              videos, social media content, and designs. Our focus is helping creators
              grow.
            </p>
          </div>

          {/* RIGHT WRAPPER */}
          <div
            className="
              relative overflow-visible
              flex-[1.5]
              min-w-[420px]
              h-[360px]
              max-[1199px]:w-[min(680px,100%)]
              max-[1199px]:min-w-0
              max-[767px]:w-full
              max-[767px]:h-auto max-[767px]:min-h-[320px]
            "
          >
            {/* right card */}
            <div
              className="
                relative w-full h-full
                rounded-[14px]
                border border-[#B7B7C9]
                bg-white
                overflow-hidden
                pt-[18px] pr-[18px] pb-[18px] pl-[28px]
                max-[767px]:pl-[18px]
                max-[767px]:h-auto max-[767px]:min-h-[320px]
              "
            >
              {/* header block CENTERED */}
              <div className="relative z-[2] w-full text-center">
                <div className="text-[#0A0F2C] text-[14px] font-bold">
                  Based in Cairo, Egypt
                </div>

                <div className="mt-[6px] flex items-center justify-center gap-[8px]">
                  <span
                    className="h-[7px] w-[7px] rounded-full bg-[#22D3A6]"
                    aria-hidden="true"
                  />
                  <span className="text-[10.5px] font-medium tracking-[0.08em] text-[#0A0F2C]/55">
                    AVAILABLE WORLDWIDE
                  </span>
                </div>
              </div>

              {/* globe */}
              <img
                src="/about/globe.svg"
                alt=""
                draggable={false}
                className="
                  pointer-events-none select-none
                  absolute bottom-0 z-[1]
                  left-[60px]
                  w-[520px] h-auto
                  max-[1199px]:left-[40px]
                  max-[767px]:relative max-[767px]:left-0
                  max-[767px]:mt-[14px]
                  max-[767px]:mx-auto
                  max-[767px]:w-[min(520px,100%)]
                "
              />
            </div>

            {/* rocket sticker */}
            <img
              src="/about/rocket-green.svg"
              alt=""
              draggable={false}
              className="
                pointer-events-none select-none
                absolute z-[5]
                right-[-18px] bottom-[-8px]
                w-[86px] h-[86px]
                max-[767px]:right-[-10px] max-[767px]:bottom-[-6px]
                max-[767px]:w-[74px] max-[767px]:h-[74px]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
