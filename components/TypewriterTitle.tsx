"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface TypewriterTitleProps {
  text: string;
  className?: string; // For styling (color, font size, etc.)
}

export default function TypewriterTitle({
  text,
  className,
}: TypewriterTitleProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    // Sequence: Type In (2s) -> Hold (3s) -> Type Out (1.5s)
    // Total: 6.5s (Fits within 7s update interval)
    const controls = animate(count, [0, text.length, text.length, 0], {
      duration: 6.5,
      times: [0, 0.3, 0.8, 1],
      ease: "linear",
    });

    return controls.stop;
  }, [text, count]);

  return (
    <motion.h1 className={className}>
      <motion.span>{displayText}</motion.span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
      />
    </motion.h1>
  );
}
