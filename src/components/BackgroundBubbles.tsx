"use client";
import { motion } from "framer-motion";

const shapes = [
  "bg-purple-500",
  "bg-pink-500",
  "bg-blue-500",
  "bg-green-500",
];

export default function BackgroundShapes() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {shapes.map((color, i) => (
        <motion.div
          key={i}
          className={`absolute w-32 h-32 ${color} opacity-30 rounded-lg blur-2xl`}
          style={{ top: `${i * 20}%`, left: `${i * 25}%` }}
          animate={{ y: [0, -60, 0] }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
