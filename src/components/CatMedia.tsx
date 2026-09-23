"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CatMediaItem } from "@/data/cats";

interface CatMediaProps {
  item: CatMediaItem;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function CatMedia({ item, className = "", size = "lg" }: CatMediaProps) {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: "w-36 h-36",
    md: "w-56 h-56 sm:w-64 sm:h-64",
    lg: "w-64 h-64 sm:w-80 sm:h-80",
    xl: "w-72 h-72 sm:w-96 sm:h-96",
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
    >
      <div
        className={`relative ${sizeClasses[size]} rounded-3xl overflow-hidden bg-[#FFF1DE] border-3 border-[#FED7AA] shadow-[0_10px_25px_-5px_rgba(249,115,22,0.2)] flex items-center justify-center p-1.5`}
      >
        {!hasError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.alt}
            onError={() => setHasError(true)}
            className="w-full h-full object-contain rounded-2xl transition-transform duration-300"
            draggable={false}
          />
        ) : (
          <CatPlaceholder mood={item.fallbackMood} alt={item.alt} src={item.src} />
        )}
      </div>
    </div>
  );
}

function CatPlaceholder({
  mood,
  alt,
  src,
}: {
  mood: CatMediaItem["fallbackMood"];
  alt: string;
  src: string;
}) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center w-full h-full text-center p-3"
    >
      {/* Animated SVG stylized cat face based on mood */}
      <motion.div
        animate={
          mood === "wave"
            ? { rotate: [0, -10, 10, -5, 0] }
            : mood === "chaotic"
            ? { scale: [1, 1.08, 0.96, 1.05, 1], rotate: [0, -3, 3, -2, 0] }
            : mood === "bored"
            ? { y: [0, 4, 0] }
            : { y: [0, -6, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: mood === "chaotic" ? 0.4 : 2,
          ease: "easeInOut",
        }}
        className="w-24 h-24 mb-2 flex items-center justify-center"
      >
        {renderCatIllustration(mood)}
      </motion.div>

      <span className="text-xs font-semibold text-[#C2410C] tracking-wide">
        🐱 {alt}
      </span>
      <span className="text-[10px] text-[#A16207] mt-0.5 opacity-70 font-mono">
        (add {src})
      </span>
    </motion.div>
  );
}

function renderCatIllustration(mood: CatMediaItem["fallbackMood"]) {
  switch (mood) {
    case "wave":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          {/* Cat body & ears */}
          <path d="M25 85 C25 50 75 50 75 85 Z" fill="#FF8A3D" />
          <polygon points="25,50 35,22 48,45" fill="#F97316" />
          <polygon points="28,48 36,28 44,45" fill="#FED7AA" />
          <polygon points="75,50 65,22 52,45" fill="#F97316" />
          <polygon points="72,48 64,28 56,45" fill="#FED7AA" />
          <ellipse cx="50" cy="55" rx="30" ry="25" fill="#FF8A3D" />
          {/* Eyes happy */}
          <path d="M38 52 Q43 47 48 52" stroke="#2A160B" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M52 52 Q57 47 62 52" stroke="#2A160B" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Nose & mouth */}
          <polygon points="50,58 47,55 53,55" fill="#C2410C" />
          <path d="M47 59 Q50 63 53 59" stroke="#2A160B" strokeWidth="2" fill="none" />
          {/* Cheeks */}
          <circle cx="34" cy="58" r="4" fill="#FED7AA" />
          <circle cx="66" cy="58" r="4" fill="#FED7AA" />
          {/* Waving paw */}
          <motion.g
            animate={{ rotate: [-15, 25, -15] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            style={{ transformOrigin: "80px 75px" }}
          >
            <ellipse cx="78" cy="62" rx="7" ry="12" fill="#FF8A3D" />
            <circle cx="78" cy="54" r="5" fill="#FFF1DE" />
          </motion.g>
        </svg>
      );
    case "bored":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <ellipse cx="50" cy="58" rx="32" ry="26" fill="#FED7AA" />
          <polygon points="25,50 30,22 45,45" fill="#F97316" />
          <polygon points="75,50 70,22 55,45" fill="#F97316" />
          {/* Half closed straight bored eyes */}
          <line x1="34" y1="52" x2="46" y2="52" stroke="#2A160B" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="54" y1="52" x2="66" y2="52" stroke="#2A160B" strokeWidth="3.5" strokeLinecap="round" />
          {/* Flat mouth */}
          <line x1="46" y1="64" x2="54" y2="64" stroke="#2A160B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "suspicious":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <ellipse cx="50" cy="58" rx="32" ry="26" fill="#FED7AA" />
          <polygon points="25,50 30,25 45,45" fill="#F97316" />
          <polygon points="75,50 70,25 55,45" fill="#F97316" />
          {/* Side-eye squinting eyes */}
          <ellipse cx="38" cy="52" rx="6" ry="3" fill="#2A160B" />
          <circle cx="36" cy="52" r="1.5" fill="#FFF7ED" />
          <ellipse cx="62" cy="52" rx="7" ry="5" fill="#2A160B" />
          <circle cx="60" cy="52" r="2" fill="#FFF7ED" />
          {/* Wavy mouth */}
          <path d="M45 64 Q50 61 55 64" stroke="#2A160B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "happy":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <ellipse cx="50" cy="58" rx="32" ry="26" fill="#FF8A3D" />
          <polygon points="25,50 30,22 45,45" fill="#F97316" />
          <polygon points="75,50 70,22 55,45" fill="#F97316" />
          {/* Happy squint arcs */}
          <path d="M35 52 Q41 44 47 52" stroke="#2A160B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M53 52 Q59 44 65 52" stroke="#2A160B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* Open happy smile */}
          <path d="M44 60 Q50 70 56 60 Z" fill="#C2410C" />
          <circle cx="32" cy="58" r="5" fill="#FED7AA" />
          <circle cx="68" cy="58" r="5" fill="#FED7AA" />
        </svg>
      );
    case "chaotic":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <ellipse cx="50" cy="58" rx="32" ry="26" fill="#F97316" />
          <polygon points="22,50 25,18 42,45" fill="#C2410C" />
          <polygon points="78,50 75,18 58,45" fill="#C2410C" />
          {/* Huge frantic eyes */}
          <circle cx="38" cy="50" r="9" fill="#FFF7ED" stroke="#2A160B" strokeWidth="2" />
          <circle cx="38" cy="50" r="4" fill="#2A160B" />
          <circle cx="62" cy="50" r="9" fill="#FFF7ED" stroke="#2A160B" strokeWidth="2" />
          <circle cx="62" cy="50" r="4" fill="#2A160B" />
          {/* Gasping open mouth */}
          <ellipse cx="50" cy="65" rx="6" ry="8" fill="#2A160B" />
        </svg>
      );
    case "love":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <ellipse cx="50" cy="58" rx="32" ry="26" fill="#FF8A3D" />
          <polygon points="25,50 30,22 45,45" fill="#F97316" />
          <polygon points="75,50 70,22 55,45" fill="#F97316" />
          {/* Heart eyes */}
          <path d="M38 52 C35 46 30 48 30 52 C30 57 38 61 38 61 C38 61 46 57 46 52 C46 48 41 46 38 52 Z" fill="#EF4444" />
          <path d="M62 52 C59 46 54 48 54 52 C54 57 62 61 62 61 C62 61 70 57 70 52 C70 48 65 46 62 52 Z" fill="#EF4444" />
          {/* Smile */}
          <path d="M46 66 Q50 70 54 66" stroke="#2A160B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "apology":
    default:
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          <ellipse cx="50" cy="58" rx="32" ry="26" fill="#FED7AA" />
          <polygon points="25,50 28,26 42,45" fill="#F97316" />
          <polygon points="75,50 72,26 58,45" fill="#F97316" />
          {/* Puppy cat eyes */}
          <circle cx="38" cy="52" r="7" fill="#2A160B" />
          <circle cx="36" cy="50" r="2.5" fill="#FFF7ED" />
          <circle cx="62" cy="52" r="7" fill="#2A160B" />
          <circle cx="60" cy="50" r="2.5" fill="#FFF7ED" />
          {/* Drooped ears/mouth */}
          <path d="M46 65 Q50 62 54 65" stroke="#2A160B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Paws together */}
          <ellipse cx="45" cy="74" rx="5" ry="7" fill="#FF8A3D" />
          <ellipse cx="55" cy="74" rx="5" ry="7" fill="#FF8A3D" />
        </svg>
      );
  }
}
