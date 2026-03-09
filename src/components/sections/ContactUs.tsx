"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const YELLOW = "#F3FF00";
const NAVY = "#151A43";
const RED = "#FF1E1E";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function onChange<K extends keyof typeof form>(key: K, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Contact form:", form);
  }

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: YELLOW }}
    >
      <div className="w-full px-4 sm:px-6">
        <div className="mx-auto w-full max-w-[1240px]">
          <div className="grid w-full lg:grid-cols-2 lg:h-[680px]">
            {/* LEFT: image */}
            <div className="relative h-[420px] sm:h-[520px] lg:h-full">
              <img
                src="/contact/contact-photo.png"
                alt="Contact"
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />

              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end px-6 sm:px-10 pb-10 sm:pb-14">
                <h3 className="text-white font-extrabold leading-[1.05] tracking-tight text-[30px] sm:text-[40px]">
                  NEED HELP GROWING
                  <br />
                  YOUR CONTENT?
                </h3>

                <p className="mt-5 max-w-[520px] text-white/90 text-[13px] sm:text-[14px] leading-[1.7]">
                  Have a question or need support? Get in touch and let us handle
                  your content, design, and growth.
                </p>
              </div>
            </div>

            {/* RIGHT: form */}
            <div className="relative h-full overflow-hidden">
              {/* ✅ content: نازل لتحت + يمين سنة */}
              <div className="relative z-10 h-full">
                <div
                  className="
                    w-full
                    px-6 sm:px-10 lg:px-12
                    py-10 sm:py-12
                    lg:py-0
                  "
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    // نزّل الكونتنت لتحت سنة زي الريفرنس
                    paddingTop: "clamp(48px, 7.5vh, 86px)",
                    // نزقه يمين سنة (في اللابتوب)
                    paddingLeft: "clamp(24px, 2.2vw, 44px)",
                  }}
                >
                  <h3
                    className="font-extrabold tracking-tight text-[34px] sm:text-[44px]"
                    style={{ color: NAVY }}
                  >
                    CONTACT US
                  </h3>

                  <form onSubmit={onSubmit} className="mt-7 space-y-6 max-w-[560px]">
                    <Field
                      label="Name*"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(v) => onChange("name", v)}
                    />
                    <Field
                      label="Email*"
                      placeholder="Johndoe@gmail.com"
                      value={form.email}
                      onChange={(v) => onChange("email", v)}
                    />
                    <Field
                      label="Message*"
                      placeholder="I was asking about...."
                      value={form.message}
                      onChange={(v) => onChange("message", v)}
                      textarea
                    />

                    {/* Buttons row */}
                    <div className="pt-2 flex items-stretch gap-3">
                      <motion.button
                        type="submit"
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 240, damping: 18 }}
                        className="h-[52px] flex-1 rounded-[10px] font-semibold text-white cursor-pointer"
                        style={{
                          backgroundColor: RED,
                          boxShadow: "0 18px 50px rgba(255,30,30,0.26)",
                        }}
                      >
                        Send Message
                      </motion.button>

                      <motion.button
                        type="submit"
                        aria-label="Send"
                        whileHover={{ y: -2, scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 240, damping: 18 }}
                        className="h-[52px] w-[58px] rounded-[10px] grid place-items-center cursor-pointer"
                        style={{
                          backgroundColor: RED,
                          boxShadow: "0 18px 50px rgba(255,30,30,0.26)",
                        }}
                      >
                        <FiArrowRight className="text-white text-[20px]" />
                      </motion.button>
                    </div>
                  </form>

                  {/* ✅ مساحة صغيرة تحت الزرار عشان waves تبان “حتة” زي الريفرنس */}
                  <div className="h-[42px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-[#151A43] mb-2">
        {label}
      </label>

      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className="w-full resize-none rounded-[10px] border border-black/25 bg-transparent px-4 py-3 text-[13px] outline-none placeholder:text-black/35 focus:border-black/40"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-[10px] border border-black/25 bg-transparent px-4 py-3 text-[13px] outline-none placeholder:text-black/35 focus:border-black/40"
        />
      )}
    </div>
  );
}