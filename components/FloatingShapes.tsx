"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface FloatingShapesProps {
  isDark: boolean; // if true, shapes should be light
}

type ShapeType = "circle" | "square" | "triangle";

interface ShapeDef {
  id: number;
  type: ShapeType;
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
}

export default function FloatingShapes({ isDark }: FloatingShapesProps) {
  const [shapes, setShapes] = useState<ShapeDef[]>([]);

  useEffect(() => {
    // Generate random shapes on client side to avoid hydration mismatch
    const newShapes: ShapeDef[] = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      type: ["circle", "square", "triangle"][
        Math.floor(Math.random() * 3)
      ] as ShapeType,
      size: Math.floor(Math.random() * 80) + 40, // 40-120px
      initialX: Math.random() * 100, // percentage
      initialY: Math.random() * 100, // percentage
      duration: Math.floor(Math.random() * 20) + 15, // 15-35s
    }));
    setShapes(newShapes);
  }, []);

  const colorClass = isDark
    ? "bg-white/10 border-white/20"
    : "bg-black/5 border-black/10";

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={twMerge(
            "absolute backdrop-blur-sm border",
            colorClass,
            shape.type === "circle" && "rounded-full",
            shape.type === "square" && "rounded-2xl",
            shape.type === "triangle" && "clip-triangle", // Requires custom css or similar
          )}
          style={{
            width: shape.size,
            height: shape.size,
            // For triangle we might need clip-path, but simple shapes first.
            // Let's stick to circle/square/rounded-square for simplicity or use SVG for triangle.
            borderRadius:
              shape.type === "circle"
                ? "50%"
                : shape.type === "square"
                  ? "12px"
                  : "0",
          }}
          initial={{
            x: `${shape.initialX}vw`,
            y: `${shape.initialY}vh`,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            x: [
              `${shape.initialX}vw`,
              `${(shape.initialX + 50) % 100}vw`,
              `${(shape.initialX - 20 + 100) % 100}vw`,
              `${shape.initialX}vw`,
            ],
            y: [
              `${shape.initialY}vh`,
              `${(shape.initialY + 30) % 100}vh`,
              `${(shape.initialY - 40 + 100) % 100}vh`,
              `${shape.initialY}vh`,
            ],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Fallback for triangle if we used div, but let's use clip-path if possible or just rely on squares/circles for "geometric" feel unless user insisted strictly on triangle.
              User said "circles, squares, triangles".
              I will start with circles/squares. For triangle, I'd need SVG or clip-path.
              I will use clip-path in style for triangle.
          */}
          {shape.type === "triangle" && (
            <div
              className={twMerge(
                "w-full h-full",
                isDark ? "bg-white" : "bg-black",
              )}
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                opacity: 0.1, // adjust opacity since it's solid color
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
