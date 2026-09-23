"use client";

import { motion } from "framer-motion";
import { CatMedia } from "@/components/CatMedia";
import { cats } from "@/data/cats";
import { story } from "@/data/story";
import { playPopSound } from "@/lib/sound";

interface MyBadProps {
  onNext: () => void;
}

export function MyBad({ onNext }: MyBadProps) {
  const handleClick = () => {
    playPopSound();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center px-4 w-full max-w-sm mx-auto"
    >
      {/* Funny / Apologetic Cat */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mb-6"
      >
        <CatMedia item={cats.myBad} size="lg" />
      </motion.div>

      {/* Main Title */}
      <h2 className="text-3xl sm:text-4xl font-black text-[#2A160B] mb-2 lowercase tracking-tight">
        {story.myBad.title}
      </h2>

      {/* Subtitle */}
      <p className="text-base font-semibold text-[#A16207] mb-8">
        {story.myBad.subtitle}
      </p>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleClick}
        className="w-full max-w-xs py-3.5 px-6 bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] font-bold rounded-2xl shadow-[0_8px_20px_-4px_rgba(249,115,22,0.45)] hover:shadow-[0_12px_24px_-4px_rgba(249,115,22,0.55)] border border-[#FED7AA]/50 cursor-pointer text-base"
      >
        {story.myBad.button}
      </motion.button>
    </motion.div>
  );
}
