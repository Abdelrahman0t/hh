"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CatMedia } from "@/components/CatMedia";
import { cats } from "@/data/cats";
import { story, getCatReactionForScore } from "@/data/story";
import { playSliderTick, playPopSound } from "@/lib/sound";
import { trackEvent } from "@/lib/tracking";

interface MissSliderProps {
  initialScore?: number;
  onConfirm: (score: number) => void;
}

export function MissSlider({ initialScore = 0, onConfirm }: MissSliderProps) {
  const [score, setScore] = useState<number>(initialScore);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const reactionData = getCatReactionForScore(score);
  const activeCat = cats[reactionData.key];

  const handleInteractionStart = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    const val = parseInt(e.target.value, 10);
    setScore(val);
    playSliderTick(300 + val * 45);
  };

  const handleConfirm = () => {
    playPopSound();
    trackEvent("miss_score", { score });
    onConfirm(score);
  };

  // Slider percentage from 0 to 10
  const sliderPercentage = (score / 10) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center px-4 w-full max-w-lg mx-auto"
    >
      {/* 1. TEXT ON TOP OF SCALE: Kicker & Title */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-[#C2410C] font-bold text-sm tracking-wider uppercase mb-1"
      >
        {story.missQuestion.kicker}
      </motion.p>

      <motion.h2
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="text-2xl sm:text-3xl font-extrabold text-[#2A160B] mb-2 leading-tight"
      >
        {story.missQuestion.title}
      </motion.h2>

      {/* 2. BIG ANIMATED NUMBER COUNTER (ON TOP OF SCALE) */}
      <div className="relative my-2 flex flex-col items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={score}
            initial={{ y: -15, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 15, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            className={`text-6xl sm:text-7xl font-black ${
              score === 10 ? "text-[#C2410C]" : "text-[#F97316]"
            } drop-shadow-sm select-none`}
          >
            {score}
          </motion.span>
        </AnimatePresence>
        <span className="text-xs font-bold text-[#A16207] tracking-wider uppercase mt-1">
          out of 10
        </span>
      </div>

      {/* 3. REACTION SPEECH BADGE (ON TOP OF SCALE) */}
      <div className="mb-4 h-9 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {hasInteracted ? (
            <motion.div
              key={reactionData.key}
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -5 }}
              transition={{ duration: 0.2 }}
              className={`px-4 py-1.5 rounded-full text-sm font-extrabold shadow-sm ${reactionData.badgeColor} flex items-center gap-1.5`}
            >
              <span>{reactionData.text}</span>
              <span className="opacity-80 text-xs font-normal">
                ({reactionData.subtext})
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 py-1.5 rounded-full text-xs font-bold text-[#A16207] bg-[#FED7AA]/40 border border-[#FED7AA]/60 flex items-center gap-1.5 animate-pulse"
            >
              <span>slide the scale to answer 🐾</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. THE SCALE (SLIDER FROM 0 TO 10) */}
      <div className="w-full px-4 max-w-sm mb-6">
        <div className="relative flex items-center">
          {/* Custom Track Background */}
          <div className="absolute inset-0 h-4 my-auto rounded-full bg-[#FFF1DE] border-2 border-[#FED7AA] overflow-hidden">
            {/* Glowing fill progress */}
            <div
              className="h-full bg-gradient-to-r from-[#FF8A3D] to-[#F97316] transition-all duration-100 ease-out"
              style={{ width: `${sliderPercentage}%` }}
            />
          </div>

          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={score}
            onChange={handleChange}
            onPointerDown={handleInteractionStart}
            onTouchStart={handleInteractionStart}
            onMouseDown={handleInteractionStart}
            aria-label="How much did you miss me slider"
            className="relative z-10 py-3"
          />
        </div>

        {/* Labels under slider: 0, 5, 10 */}
        <div className="flex justify-between items-center text-xs font-bold text-[#A16207] px-1 mt-2">
          <span>0</span>
          <span className="opacity-40">5</span>
          <span>10</span>
        </div>
      </div>

      {/* 5. THE GIF / CAT CARD (UNDER THE SCALE - ONLY DISPLAYED ONCE TOUCHED) */}
      <AnimatePresence>
        {hasInteracted && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.9 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden mb-6 flex flex-col items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCat.src}
                initial={{ opacity: 0, scale: 0.92, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center pt-2"
              >
                <CatMedia item={activeCat} size="md" />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. CONFIRMATION BUTTON */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleConfirm}
        className="w-full max-w-xs py-3.5 px-6 bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] font-bold rounded-2xl shadow-[0_8px_20px_-4px_rgba(249,115,22,0.45)] hover:shadow-[0_12px_24px_-4px_rgba(249,115,22,0.55)] transition-all border border-[#FED7AA]/50 cursor-pointer text-base"
      >
        {story.missQuestion.button}
      </motion.button>
    </motion.div>
  );
}
