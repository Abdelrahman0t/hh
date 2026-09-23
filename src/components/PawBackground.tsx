"use client";

import { motion } from "framer-motion";

export function PawBackground() {
  const pawPoints = [
    { top: "8%", left: "7%", size: 36, rotate: 20, delay: 0 },
    { top: "14%", right: "9%", size: 44, rotate: -25, delay: 1.2 },
    { bottom: "12%", left: "10%", size: 40, rotate: 35, delay: 0.8 },
    { bottom: "16%", right: "8%", size: 32, rotate: -15, delay: 2.1 },
    { top: "45%", left: "3%", size: 28, rotate: -10, delay: 1.6 },
    { top: "55%", right: "4%", size: 30, rotate: 18, delay: 0.4 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft warm radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#FED7AA]/35 via-[#FFF1DE]/50 to-transparent blur-3xl" />

      {/* Floating subtle ambient paws */}
      {pawPoints.map((paw, index) => (
        <motion.div
          key={index}
          style={{
            top: paw.top,
            bottom: paw.bottom,
            left: paw.left,
            right: paw.right,
          }}
          animate={{
            y: [0, -8, 0],
            rotate: [paw.rotate, paw.rotate + 6, paw.rotate],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 4.5 + index * 0.7,
            repeat: Infinity,
            delay: paw.delay,
            ease: "easeInOut",
          }}
          className="absolute"
        >
          <svg
            width={paw.size}
            height={paw.size}
            viewBox="0 0 24 24"
            fill="#F97316"
          >
            <circle cx="8" cy="7" r="2" />
            <circle cx="12" cy="5" r="2" />
            <circle cx="16" cy="7" r="2" />
            <circle cx="6" cy="11" r="1.6" />
            <path d="M12 10.5 C8 10.5 6 13.5 7.5 17.5 C9 20 15 20 16.5 17.5 C18 13.5 16 10.5 12 10.5 Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
