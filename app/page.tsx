"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import FloatingShapes from "@/components/FloatingShapes";
import LanguageToggle from "@/components/LanguageToggle";
import TypewriterTitle from "@/components/TypewriterTitle";
import { getColor, DEFAULT_COLOR, ColorDefinition } from "@/lib/colors";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [currentColor, setCurrentColor] =
    useState<ColorDefinition>(DEFAULT_COLOR);
  const [language, setLanguage] = useState<"EN" | "SO">("EN");
  const [showAllTools, setShowAllTools] = useState(false);

  // Auto-rotate language every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLanguage((prev) => (prev === "EN" ? "SO" : "EN"));
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawValue = e.target.value;
    // Don't lower/trim the DISPLAY value, but lower/trim for checking
    // "Command Box: ... automatically lowercase/trim user input to match the Flat Map."
    // This might mean force the INPUT to be lowercase?
    // "automatically lowercase/trim user input" often means input transformation.
    // But "match the Flat Map" implies the check.
    // I'll keep input as user types but check against normalized.
    // However, the prompt said "automatically lowercase ... user input".
    // I will lowercase the input value visually too as requested.

    // Wait, prompt: "automatically lowercase/trim user input to match the Flat Map".
    // Usually means the internal logic match. But if it says "Command Box... automatically lowercase", maybe visual too.
    // I'll lowercase visually for style to mimic a "command" terminal feel.

    const newValue = rawValue; // .toLowerCase(); // Let's allow typing, but maybe CSS lowercase?
    // Let's stick to normal typing but match normalized.

    setInputValue(newValue);

    const match = getColor(newValue);
    if (match) {
      setCurrentColor(match);
    }
  };

  const toggleLanguage = () => {
    // Reset timer on manual toggle? Ideally yes, but for simplicity just toggle state.
    // The interval continues running, so it might switch back quickly if near 7s mark,
    // but user didn't ask for complex timer reset logic.
    setLanguage((prev) => (prev === "EN" ? "SO" : "EN"));
  };

  // Contrast logic
  const isDark = currentColor.isDark;
  const textColor = isDark ? "text-white" : "text-black";
  const placeholderColor = isDark
    ? "placeholder-white/50"
    : "placeholder-black/50";
  const borderColor = isDark ? "border-white/20" : "border-black/10";
  const bgInput = isDark ? "bg-white/10" : "bg-black/5";

  const titleText =
    language === "EN"
      ? "Type a color in Somali to change the background."
      : "Ku qor midab af-Soomaali ah si aad u beddesho midibka.";

  return (
    <div
      className={twMerge(
        "relative flex min-h-screen w-full flex-col items-center overflow-hidden transition-colors duration-700 ease-in-out",
        currentColor.tailwindClass,
      )}
    >
      <FloatingShapes isDark={isDark} />

      <LanguageToggle
        language={language}
        toggleLanguage={toggleLanguage}
        isDark={isDark}
      />

      <main className="z-10 flex flex-1 w-full max-w-4xl flex-col items-center justify-center gap-12 px-4 text-center">
        {/* Centered Heading */}
        <div className="space-y-4 min-h-[120px] flex items-center justify-center">
          <TypewriterTitle
            text={titleText}
            className={twMerge(
              "text-3xl font-bold tracking-tight sm:text-6xl",
              textColor,
            )}
          />
        </div>

        {/* Command Box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full max-w-lg px-4 sm:px-0"
        >
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder={language === "EN" ? "Type a color..." : "Qor midab..."}
            rows={1}
            className={twMerge(
              "w-full resize-none rounded-2xl border p-4 sm:p-6 text-center shadow-2xl backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 font-mono text-xl sm:text-2xl",
              bgInput,
              borderColor,
              textColor,
              placeholderColor,
              isDark ? "focus:ring-white" : "focus:ring-black",
            )}
            spellCheck={false}
            autoFocus
            style={{ textTransform: "lowercase" }}
          />
        </motion.div>
      </main>

      <motion.footer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className={twMerge(
          "z-10 flex w-[calc(100%-2rem)] max-w-lg flex-row items-center justify-between gap-4 rounded-2xl border p-4 backdrop-blur-md transition-all duration-300 sm:w-full sm:px-8 mb-8 mt-auto",
          bgInput,
          borderColor,
          textColor,
        )}
      >
        {/* Developer Info */}
        <div className="flex items-center gap-3">
          <Link
            href="https://www.engaweis.space"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-current">
              <Image
                src="/ugaas.png"
                alt="eng_aweis"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm leading-tight">eng_aweis</span>
              <span className="text-xs opacity-70">Full Stack Developer</span>
            </div>
          </Link>
        </div>

        {/* Tools Icons - Unified Pill */}
        <div className="flex items-center gap-4 px-5 py-2.5 rounded-2xl border border-black/10 bg-white/90 text-black backdrop-blur-md shadow-sm">
          {/* Next.js (Always Visible) */}
          <Link
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            title="Next.js"
            className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="h-6 w-6"
              aria-label="Next.js"
              strokeLinejoin="round"
            >
              <g clipPath="url(#clip0_53_108)">
                <circle
                  cx="8"
                  cy="8"
                  r="7.375"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.63 11V5"
                  stroke="url(#paint0_linear_53_108vsxrmxu21)"
                  strokeWidth="1.25"
                  strokeMiterlimit="1.41421"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.995 5.00087V5H4.745V11H5.995V6.96798L12.3615 14.7076C12.712 14.4793 13.0434 14.2242 13.353 13.9453L5.99527 5.00065L5.995 5.00087Z"
                  fill="url(#paint1_linear_53_108vsxrmxu21)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_53_108vsxrmxu21"
                  x1="11.13"
                  y1="5"
                  x2="11.13"
                  y2="11"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop
                    offset="0.609375"
                    stopColor="white"
                    stopOpacity="0.57"
                  />
                  <stop offset="0.796875" stopColor="white" stopOpacity="0" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_53_108vsxrmxu21"
                  x1="9.9375"
                  y1="9.0625"
                  x2="13.5574"
                  y2="13.3992"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <clipPath id="clip0_53_108">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>

          {/* Desktop Tools (Hidden on Mobile) */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Tailwind CSS */}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Tailwind CSS"
              className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
                aria-label="Tailwind CSS"
              >
                <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
              </svg>
            </a>

            {/* Framer Motion */}
            <a
              href="https://www.framer.com/motion/"
              target="_blank"
              rel="noopener noreferrer"
              title="Framer Motion"
              className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
            >
              <svg
                viewBox="0 0 14 21"
                fill="currentColor"
                className="h-6 w-auto" // Preserves aspect ratio
                aria-label="Framer Motion"
              >
                <path d="M0 0h14v7H7L0 0zm0 7h7l7 7H7v7l-7-7V7z" />
              </svg>
            </a>
          </div>

          {/* Mobile Tools (Popup) */}
          <div className="relative sm:hidden">
            {/* +2 Badge */}
            <button
              onClick={() => setShowAllTools((prev) => !prev)}
              className={twMerge(
                "flex h-8 w-8 items-center justify-center rounded-full border border-current text-xs font-bold transition-all hover:scale-105 active:scale-95",
                isDark
                  ? "bg-white text-black border-transparent"
                  : "bg-black text-white border-transparent",
              )}
              title="Show more tools"
            >
              +2
            </button>

            {/* Popup */}
            <AnimatePresence>
              {showAllTools && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className={twMerge(
                    "absolute bottom-full right-0 mb-3 flex items-center gap-4 rounded-xl border p-3 shadow-xl backdrop-blur-xl",
                    bgInput,
                    borderColor,
                    textColor,
                  )}
                >
                  {/* Tailwind CSS */}
                  <a
                    href="https://tailwindcss.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Tailwind CSS"
                    className="hover:scale-110 transition-transform"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                      aria-label="Tailwind CSS"
                    >
                      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                    </svg>
                  </a>

                  {/* Framer Motion */}
                  <a
                    href="https://www.framer.com/motion/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Framer Motion"
                    className="hover:scale-110 transition-transform"
                  >
                    <svg
                      viewBox="0 0 14 21"
                      fill="currentColor"
                      className="h-6 w-auto" // Preserves aspect ratio
                      aria-label="Framer Motion"
                    >
                      <path d="M0 0h14v7H7L0 0zm0 7h7l7 7H7v7l-7-7V7z" />
                    </svg>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
