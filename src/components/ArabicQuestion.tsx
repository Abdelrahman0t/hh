"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { story } from "@/data/story";
import { playPopSound, playBoingSound } from "@/lib/sound";
import { trackEvent } from "@/lib/tracking";

interface ArabicQuestionProps {
  onAnswer: (answer: "yes" | "no") => void;
}

export function ArabicQuestion({ onAnswer }: ArabicQuestionProps) {
  const [playfulNoFeedback, setPlayfulNoFeedback] = useState(false);

  const handleYes = () => {
    playPopSound();
    trackEvent("arabic_answer", { answer: "yes" });
    onAnswer("yes");
  };

  const handleNo = () => {
    playBoingSound();
    trackEvent("arabic_answer", { answer: "no" });
    setPlayfulNoFeedback(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      dir="rtl"
      className="flex flex-col items-center justify-center text-center px-4 w-full max-w-lg mx-auto font-[family-name:var(--font-cairo)]"
    >
      {/* Decorative Arabic-styled accent */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="w-14 h-14 rounded-2xl bg-[#FFF1DE] border-2 border-[#FED7AA] flex items-center justify-center text-2xl mb-4 shadow-sm"
      >
        ✨
      </motion.div>

      {/* Arabic question kicker */}
      <p className="text-[#C2410C] font-bold text-sm tracking-wider mb-2">
        {story.arabicQuestion.subtext}
      </p>

      {/* Arabic Question Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2A160B] mb-8 leading-tight">
        {story.arabicQuestion.text}
      </h2>

      {/* Playful 'No' feedback bubble if clicked */}
      <AnimatePresence>
        {playfulNoFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 px-4 py-2 bg-[#F97316] text-[#FFF7ED] rounded-xl font-bold text-base shadow-md"
          >
            {story.arabicQuestion.noReaction}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Equal Friendly Arabic Buttons */}
      <div className="flex flex-row items-center justify-center gap-4 w-full max-w-xs mt-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleYes}
          className="flex-1 py-4 px-6 bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] text-2xl font-black rounded-2xl shadow-[0_8px_20px_-4px_rgba(249,115,22,0.45)] hover:shadow-[0_12px_24px_-4px_rgba(249,115,22,0.55)] border-2 border-[#FED7AA]/50 cursor-pointer"
        >
          {story.arabicQuestion.yes}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleNo}
          className="flex-1 py-4 px-6 bg-[#FFF1DE] text-[#C2410C] hover:bg-[#FED7AA]/60 text-2xl font-black rounded-2xl shadow-sm border-2 border-[#FED7AA] cursor-pointer transition-colors"
        >
          {story.arabicQuestion.no}
        </motion.button>
      </div>
    </motion.div>
  );
}
