"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiGlobe, FiArrowRight, FiMenu, FiX, FiCheck } from "react-icons/fi";

const navLinks = [
  { href: "#our-work", label: "OUR WORK" },
  { href: "#services", label: "SERVICES" },
  { href: "#about-us", label: "ABOUT US" },
  { href: "#testimonials", label: "TESTIMONIALS" },
];

type Lang = "EN" | "AR";
const LANG_STORAGE_KEY = "ch_lang";

function applyDocLang(next: Lang) {
  if (typeof document === "undefined") return; // safety
  const html = document.documentElement;

  if (next === "AR") {
    html.setAttribute("dir", "rtl");
    html.setAttribute("lang", "ar");
    html.classList.remove("font-en");
    html.classList.add("font-ar");
  } else {
    html.setAttribute("dir", "ltr");
    html.setAttribute("lang", "en");
    html.classList.remove("font-ar");
    html.classList.add("font-en");
  }
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("EN");

  const navRef = useRef<HTMLElement>(null);

  const closeAll = () => {
    setMenuOpen(false);
    setLangOpen(false);
  };

  // ✅ mark mounted (client only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Load saved language AFTER mount (prevents hydration mismatch)
  useEffect(() => {
    if (!mounted) return;

    const savedRaw = localStorage.getItem(LANG_STORAGE_KEY);
    const saved: Lang = savedRaw === "AR" || savedRaw === "EN" ? savedRaw : "EN";

    setLang(saved);
    applyDocLang(saved);
  }, [mounted]);

  // ✅ Close menus on resize to desktop
  useEffect(() => {
    if (!mounted) return;

    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false); // lg
      setLangOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mounted]);

  // ✅ Close on outside click + on scroll
  useEffect(() => {
    if (!mounted) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current) return;
      const target = e.target as Node;
      if (!navRef.current.contains(target)) closeAll();
    };

    const onScroll = () => {
      if (menuOpen || langOpen) closeAll();
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted, menuOpen, langOpen]);

  const handleLangSelect = (next: Lang) => {
    setLang(next);
    setLangOpen(false);
    localStorage.setItem(LANG_STORAGE_KEY, next);
    applyDocLang(next);
  };

  return (
    <header className="w-full">
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <nav
          ref={navRef}
          className="
            relative
            h-[72px]
            w-full
            rounded-[14px]
            bg-[#151A43]
            px-6
            flex
            items-center
            justify-between
          "
        >
          {/* LEFT: Logo */}
          <div className="flex items-center">
            <Link href="/" aria-label="Creators Hub Home" className="inline-flex items-center">
              <div className="relative h-[28px] w-[140px]">
                <Image
                  src="/brand/logo.svg"
                  alt="Creators Hub"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* CENTER: Links (Desktop only) */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[12px] font-medium tracking-[0.12em] text-white/90"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3">
            {/* Language (Desktop: icon + EN/AR) (Mobile: icon only) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLangOpen((v) => !v);
                  if (!langOpen) setMenuOpen(false);
                }}
                className="
                  h-[44px]
                  rounded-[10px]
                  bg-[#EDE7DF]
                  px-4
                  flex
                  items-center
                  gap-2
                  text-[13px]
                  font-medium
                  text-[#111327]
                "
                aria-label="Change language"
                aria-expanded={langOpen}
                aria-haspopup="menu"
              >
                <FiGlobe className="text-[16px]" />
                <span className="hidden sm:inline">{lang}</span>
              </button>

              {/* Language dropdown */}
              <div
                className={`
                  absolute right-0 top-[52px] z-50
                  w-[140px]
                  overflow-hidden
                  rounded-[12px]
                  bg-[#EDE7DF]
                  shadow-lg
                  transition-all duration-150
                  ${langOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}
                `}
                role="menu"
                aria-label="Language menu"
              >
                <button
                  type="button"
                  onClick={() => handleLangSelect("EN")}
                  className="
                    w-full
                    px-4 py-3
                    flex items-center justify-between
                    text-[13px] font-medium
                    text-[#111327]
                  "
                  role="menuitem"
                >
                  <span>English</span>
                  {lang === "EN" ? <FiCheck className="text-[16px]" /> : <span className="w-[16px]" />}
                </button>

                <div className="h-px w-full bg-black/10" />

                <button
                  type="button"
                  onClick={() => handleLangSelect("AR")}
                  className="
                    w-full
                    px-4 py-3
                    flex items-center justify-between
                    text-[13px] font-medium
                    text-[#111327]
                  "
                  role="menuitem"
                >
                  <span>العربية</span>
                  {lang === "AR" ? <FiCheck className="text-[16px]" /> : <span className="w-[16px]" />}
                </button>
              </div>
            </div>

            {/* Contact (Desktop + Tablet) */}
            <Link
              href="#contact"
              className="
                hidden sm:flex
                h-[44px]
                rounded-[10px]
                bg-[#EDE7DF]
                px-5
                items-center
                gap-3
                text-[13px]
                font-semibold
                text-[#111327]
              "
              aria-label="Contact us"
              onClick={() => setMenuOpen(false)}
            >
              <span className="uppercase tracking-[0.08em]">CONTACT US</span>
              <FiArrowRight className="text-[18px]" />
            </Link>

            {/* Contact (Mobile XS) icon-only */}
            <Link
              href="#contact"
              className="
                sm:hidden
                h-[44px]
                w-[44px]
                rounded-[10px]
                bg-[#EDE7DF]
                flex
                items-center
                justify-center
                text-[#111327]
              "
              aria-label="Contact us"
              onClick={() => setMenuOpen(false)}
            >
              <FiArrowRight className="text-[18px]" />
            </Link>

            {/* Burger (Mobile/Tablet only) */}
            <button
              type="button"
              className="
                lg:hidden
                h-[44px]
                w-[44px]
                rounded-[10px]
                bg-white/10
                flex
                items-center
                justify-center
                text-white
              "
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => {
                setMenuOpen((v) => !v);
                if (!menuOpen) setLangOpen(false);
              }}
            >
              {menuOpen ? <FiX className="text-[20px]" /> : <FiMenu className="text-[20px]" />}
            </button>
          </div>

          {/* Mobile Dropdown */}
          <div
            id="mobile-nav"
            className={`
              lg:hidden
              absolute
              left-0
              right-0
              top-[78px]
              z-50
              overflow-hidden
              rounded-[14px]
              bg-[#151A43]
              px-6
              transition-all
              duration-200
              ${menuOpen ? "max-h-[360px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
            `}
          >
            <div className="py-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-[12px] font-medium tracking-[0.12em] text-white/90"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
