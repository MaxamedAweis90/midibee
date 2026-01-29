"use client";

import { motion } from "framer-motion";

interface LanguageToggleProps {
  language: "EN" | "SO";
  toggleLanguage: () => void;
  isDark: boolean;
}

export default function LanguageToggle({
  language,
  toggleLanguage,
  isDark,
}: LanguageToggleProps) {
  return (
    <button
      onClick={toggleLanguage}
      className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-full font-medium text-sm transition-colors duration-300 ${
        isDark
          ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
          : "bg-black/5 text-black hover:bg-black/10 border border-black/10"
      }`}
    >
      {language === "EN" ? "SO" : "EN"}
    </button>
  );
}
