"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiGlobe, FiArrowRight, FiMenu, FiX, FiCheck } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "#our-work", label: "OUR WORK" },
  { href: "#services", label: "SERVICES" },
  { href: "#about-us", label: "ABOUT US" },
  { href: "#testimonials", label: "TESTIMONIALS" },
];

type Lang = "EN" | "AR";
const LANG_STORAGE_KEY = "ch_lang";

function applyDocLang(next: Lang) {
  if (typeof document === "undefined") return;
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

  // ✅ بقى ref على wrapper شامل nav + dropdown (عشان click outside يشتغل صح)
  const navWrapRef = useRef<HTMLDivElement>(null);

  const closeAll = () => {
    setMenuOpen(false);
    setLangOpen(false);
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const savedRaw = localStorage.getItem(LANG_STORAGE_KEY);
    const saved: Lang = savedRaw === "AR" || savedRaw === "EN" ? savedRaw : "EN";

    setLang(saved);
    applyDocLang(saved);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
      setLangOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mounted]);

  // ✅ Close on outside click + on scroll
  useEffect(() => {
    if (!mounted) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!navWrapRef.current) return;
      const target = e.target as Node;
      if (!navWrapRef.current.contains(target)) closeAll();
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
    // ✅ الهيدر Sticky عادي… بس هيكبر لتحت لما المنيو تفتح
    <header className="sticky top-0 z-[9999] w-full pt-[env(safe-area-inset-top)]">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6">
        {/* ✅ wrapper بيحتوي nav + mobile menu (عشان المنيو تبقى جزء من الـ layout) */}
        <motion.div
          ref={navWrapRef}
          initial={{ opacity: 0, y: -36, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.08,
            type: "spring",
            stiffness: 180,
            damping: 18,
            mass: 0.9,
          }}
          className="relative w-full"
        >
          {/* NAV BAR */}
          <nav
            className="
              relative
              h-[72px]
              w-full
              rounded-[16px]
              px-4 sm:px-6
              flex
              items-center
              justify-between
              will-change-transform
              backdrop-blur-xl
              border border-white/10
              shadow-[0_8px_32px_rgba(0,255,182,0.08)]
            "
            style={{
              background: "linear-gradient(135deg, rgba(21,26,67,0.85) 0%, rgba(21,26,67,0.75) 100%)",
            }}
          >
            {/* LEFT: Logo */}
            <div className="flex items-center min-w-[140px]">
              <Link href="/" aria-label="Creators Hub Home" className="inline-flex items-center">
                <div className="relative h-[28px] w-[140px]">
                  <Image src="/brand/logo.svg" alt="Creators Hub" fill className="object-contain" priority />
                </div>
              </Link>
            </div>

            {/* CENTER: Links (Desktop only) */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="
                    group relative
                    text-[12px] font-semibold tracking-[0.12em]
                    text-white/85
                    transition-all duration-300
                    hover:text-white
                  "
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute left-0 -bottom-[8px]
                      h-[2.5px] w-full
                      origin-left
                      scale-x-0
                      rounded-full
                      bg-gradient-to-r from-[#00FFB6] to-[#00D4A6]
                      transition-transform duration-300 ease-out
                      group-hover:scale-x-100
                    "
                  />
                </Link>
              ))}
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-3">
              {/* Language */}
              <div className="relative">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.18 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setLangOpen((v) => !v);
                    if (!langOpen) setMenuOpen(false);
                  }}
                  className="
                    h-[44px]
                    rounded-[10px]
                    px-4
                    flex
                    items-center
                    gap-2
                    text-[13px]
                    font-semibold
                    text-white/90
                    cursor-pointer
                    border border-white/15
                    transition-all duration-300
                    hover:border-white/30
                    hover:bg-white/5
                    hover:text-white
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#00FFB6]/50
                  "
                  aria-label="Change language"
                  aria-expanded={langOpen}
                  aria-haspopup="menu"
                >
                  <FiGlobe className="text-[16px]" />
                  <span className="hidden sm:inline">{lang}</span>
                </motion.button>

                {/* Language dropdown */}
                <div
                  className={`
                    absolute right-0 top-[52px] z-[10000]
                    w-[140px]
                    overflow-hidden
                    rounded-[12px]
                    backdrop-blur-xl
                    border border-white/15
                    shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                    transition-all duration-150
                    ${langOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}
                  `}
                  style={{
                    background: "linear-gradient(135deg, rgba(21,26,67,0.9) 0%, rgba(21,26,67,0.8) 100%)",
                  }}
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
                      text-white/85
                      hover:text-white
                      hover:bg-white/5
                      transition
                    "
                    role="menuitem"
                  >
                    <span>English</span>
                    {lang === "EN" ? <FiCheck className="text-[16px] text-[#00FFB6]" /> : <span className="w-[16px]" />}
                  </button>

                  <div className="h-px w-full bg-white/5" />

                  <button
                    type="button"
                    onClick={() => handleLangSelect("AR")}
                    className="
                      w-full
                      px-4 py-3
                      flex items-center justify-between
                      text-[13px] font-medium
                      text-white/85
                      hover:text-white
                      hover:bg-white/5
                      transition
                    "
                    role="menuitem"
                  >
                    <span>العربية</span>
                    {lang === "AR" ? <FiCheck className="text-[16px] text-[#00FFB6]" /> : <span className="w-[16px]" />}
                  </button>
                </div>
              </div>

              {/* Contact (Desktop + Tablet) */}
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.18 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#contact"
                  className="
                    hidden sm:flex
                    h-[44px]
                    rounded-[10px]
                    px-5
                    items-center
                    gap-3
                    text-[13px]
                    font-semibold
                    text-white
                    border border-[#00FFB6]/40
                    transition-all duration-300
                    hover:border-[#00FFB6]/80
                    hover:bg-[#00FFB6]/10
                    hover:shadow-[0_0_20px_rgba(0,255,182,0.25)]
                  "
                  aria-label="Contact us"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="uppercase tracking-[0.08em]">CONTACT US</span>
                  <FiArrowRight className="text-[18px]" />
                </Link>
              </motion.div>

              {/* Contact (Mobile XS) */}
              <motion.div
                className="sm:hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.18 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="#contact"
                  className="
                    h-[44px]
                    w-[44px]
                    rounded-[10px]
                    flex
                    items-center
                    justify-center
                    text-white
                    border border-[#00FFB6]/40
                    transition-all duration-300
                    hover:border-[#00FFB6]/80
                    hover:bg-[#00FFB6]/10
                    hover:shadow-[0_0_20px_rgba(0,255,182,0.25)]
                  "
                  aria-label="Contact us"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiArrowRight className="text-[18px]" />
                </Link>
              </motion.div>

              {/* Burger (Mobile/Tablet only) */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="
                  lg:hidden
                  h-[44px]
                  w-[44px]
                  rounded-[10px]
                  border border-white/15
                  flex
                  items-center
                  justify-center
                  text-white/85
                  cursor-pointer
                  transition-all duration-300
                  hover:border-white/30
                  hover:bg-white/5
                  hover:text-white
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
              </motion.button>
            </div>
          </nav>

          {/* ✅ Mobile Menu (جزء من الـ layout.. بيدز المحتوى لتحت) */}
          <AnimatePresence initial={false}>
            {menuOpen && (
              <motion.div
                id="mobile-nav"
                className="lg:hidden mt-3 w-full overflow-hidden rounded-[14px] px-6 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,255,182,0.08)]"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "linear-gradient(135deg, rgba(21,26,67,0.85) 0%, rgba(21,26,67,0.75) 100%)",
                }}
              >
                <div className="py-4 flex flex-col gap-3">
                  {navLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="
                        relative
                        py-2
                        text-[12px] font-semibold tracking-[0.12em] text-white/85
                        transition-colors duration-200
                        hover:text-white
                      "
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}
