"use client";

import { motion } from "framer-motion";
import { CatMedia } from "@/components/CatMedia";
import { cats } from "@/data/cats";
import { story } from "@/data/story";
import { playPopSound } from "@/lib/sound";

interface CatIntroProps {
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function CatIntro({ onNext }: CatIntroProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playPopSound();
    onNext(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center px-4 w-full max-w-sm mx-auto"
    >
      {/* Cat bouncing subtly */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="mb-6"
      >
        <CatMedia item={cats.hello} size="lg" />
      </motion.div>

      {/* "hi" */}
      <motion.h1
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 20 }}
        className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#2A160B] mb-8 lowercase"
      >
        {story.intro.greeting}
      </motion.h1>

      {/* Large orange rounded squishy button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92, borderRadius: "2rem" }}
        onClick={handleClick}
        className="w-full max-w-xs py-4 px-8 bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] text-xl font-bold rounded-2xl shadow-[0_10px_25px_-5px_rgba(249,115,22,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(249,115,22,0.6)] transition-shadow border-2 border-[#FED7AA]/40 cursor-pointer flex items-center justify-center gap-2 group"
      >
        <span>{story.intro.button}</span>
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-xl inline-block"
        >
          🐾
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
