import Navbar from "@/components/sections/Navbar";
import { FiSearch } from "react-icons/fi";

export default function Hero() {
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
      {/* ✅ Full-width container */}
      <div className="relative z-10 w-full px-4 sm:px-6 pt-4 sm:pt-6">
        {/* ✅ Navbar centered */}
        <div className="mx-auto w-full max-w-[1240px]">
          <Navbar />
        </div>

        {/* ✅ Hero area full width لكن المحتوى جوه centered */}
        <div className="relative mt-6 sm:mt-10 min-h-[520px] sm:min-h-[560px] pb-[120px] sm:pb-[140px] w-full">
          {/* ✅ Frame lines must match the centered "big div" width */}
          <div className="pointer-events-none absolute inset-0">
            <div className="mx-auto h-full w-full max-w-[1240px] relative">

            </div>
          </div>

          {/* ✅ Plus strips (above fade) */}
          <div className="pointer-events-none absolute inset-0 z-20">
            <div className="mx-auto h-full w-full max-w-[1240px] relative">
              {/* LEFT strip */}
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

              {/* RIGHT strip */}
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

          {/* ✅ Floating icons (responsive sizes) */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="mx-auto h-full w-full max-w-[1240px] relative">
              {/* target */}
              <span
                aria-hidden="true"
                className="
                  absolute
                  left-[70px] sm:left-[110px]
                  top-[70px] sm:top-[78px]
                  block
                  h-[46px] w-[46px]
                  sm:h-[60px] sm:w-[60px]
                "
                style={{
                  backgroundImage: "url('/hero/svg/target.svg')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />

              {/* wifi */}
              <span
                aria-hidden="true"
                className="
                  absolute
                  right-[70px] sm:right-[120px]
                  top-[58px] sm:top-[60px]
                  block
                  h-[70px] w-[70px]
                  sm:h-[120px] sm:w-[120px]
                "
                style={{
                  backgroundImage: "url('/hero/svg/wifi.svg')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />

              {/* rocket */}
              <span
                aria-hidden="true"
                className="
                  absolute
                  left-[30px] sm:left-[70px]
                  bottom-[70px] sm:bottom-[90px]
                  block
                  h-[140px] w-[140px]
                  sm:h-[210px] sm:w-[210px]
                "
                style={{
                  backgroundImage: "url('/hero/svg/rocket.svg')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />

              {/* bulb */}
              <span
                aria-hidden="true"
                className="
                  absolute
                  right-[70px] sm:right-[120px]
                  bottom-[80px] sm:bottom-[110px]
                  block
                  h-[105px] w-[105px]
                  sm:h-[150px] sm:w-[150px]
                "
                style={{
                  backgroundImage: "url('/hero/svg/bulb.svg')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
          </div>

          {/* ✅ Center content */}
          <div className="relative z-30 mx-auto w-full max-w-[1240px] px-2 sm:px-6">
            <div className="flex flex-col items-center text-center pt-8 sm:pt-10">
              {/* pill */}
              <div className="mb-5 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] text-[#151A43] backdrop-blur">
                (WELCOME) <span className="text-[13px] sm:text-[14px] leading-none">→</span>
              </div>

              {/* Title responsive */}
              <h1 className="max-w-[980px] text-[#151A43]">
                <span className="block text-[34px] sm:text-[52px] md:text-[66px] leading-[1.02] tracking-[-0.01em]">
                  <span className="font-head">CREATORS HUB - </span>
                  <span className="font-bold">WHERE</span>
                </span>

                <span className="block text-[34px] sm:text-[52px] md:text-[66px] leading-[1.02] tracking-[-0.01em] font-bold">
                  IDEAS FIND THEIR VOICE
                </span>
              </h1>

              {/* paragraph responsive */}
              <p className="mt-5 sm:mt-6 max-w-[560px] text-[14px] sm:text-[18px] leading-[1.6] font-medium text-[#151A43]/85 px-2">
                Creators Hub is a professional, trustworthy platform for content creators.
              </p>

              {/* CTA */}
              <div className="mt-7 sm:mt-9 flex items-center gap-3">
                <button
                  type="button"
                  className="h-[48px] sm:h-[54px] rounded-[10px] bg-[#FF1E1E] px-6 sm:px-8 text-[13px] sm:text-[14px] font-medium text-white"
                >
                  Search Creator
                </button>

                <button
                  type="button"
                  aria-label="Search"
                  className="h-[48px] w-[48px] sm:h-[54px] sm:w-[54px] rounded-[10px] bg-[#FF1E1E] text-white flex items-center justify-center"
                >
                  <FiSearch className="text-[16px] sm:text-[18px]" />
                </button>
              </div>
            </div>
          </div>

          {/* ✅ Fade UNDER the plus strips (z-0) */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[160px] z-0 bg-gradient-to-b from-white/0 via-white/75 to-white" />
        </div>
      </div>
    </section>
  );
}
