"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { CatMedia } from "@/components/CatMedia";
import { cats } from "@/data/cats";
import { story, getCatReactionForScore } from "@/data/story";
import { playPopSound, playBoingSound, playSuccessChime, playSliderTick } from "@/lib/sound";
import { trackEvent } from "@/lib/tracking";

interface SureSequenceProps {
  score: number;
  onProceed: () => void;
}

export function SureSequence({ score, onProceed }: SureSequenceProps) {
  const isLowScore = score < story.sureSequence.threshold;

  // Escalation stages:
  // -1: initial "are you sure?"
  // 0, 1, 2, ... : stages in escalationSteps
  // "overriding": dramatic slider animation up to 10
  // "revealed": "hahahaha", "I knew it.", "I missed you too, cupcake ❤️"
  const [escalationIndex, setEscalationIndex] = useState<number>(-1);
  const [isOverriding, setIsOverriding] = useState<boolean>(false);
  const [overrideScore, setOverrideScore] = useState<number>(score);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const escalationSteps = story.sureSequence.escalationSteps;
  const currentStep = escalationIndex >= 0 ? escalationSteps[escalationIndex] : null;

  const handleYesClick = () => {
    playPopSound();

    if (!isLowScore) {
      // Direct pass for 8, 9, 10
      trackEvent("are_you_sure_clicked", { originalScore: score, attemptCount: 1 });
      onProceed();
      return;
    }

    // Low score escalation
    const nextIndex = escalationIndex + 1;
    if (nextIndex < escalationSteps.length) {
      setEscalationIndex(nextIndex);
      playBoingSound();
      trackEvent("escalation_step", {
        stepIndex: nextIndex,
        question: escalationSteps[nextIndex].question,
      });
    } else {
      // Reached end of low score escalation -> trigger dramatic override to 10 on the exact same scale!
      startOverrideAnimation();
    }
  };

  const startOverrideAnimation = () => {
    setIsOverriding(true);
    trackEvent("slider_overridden", { fromScore: score, toScore: 10 });

    let current = score;
    const interval = setInterval(() => {
      current += 1;
      setOverrideScore(current);
      playSliderTick(300 + current * 50);

      if (current >= 10) {
        clearInterval(interval);
        setTimeout(() => {
          setIsOverriding(false);
          setIsRevealed(true);
          playSuccessChime();

          // Celebration confetti burst
          try {
            confetti({
              particleCount: 75,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#F97316", "#FF8A3D", "#FED7AA", "#C2410C"],
            });
          } catch {
            // ignore
          }
        }, 650);
      }
    }, 280);
  };

  // If score is above 7: show surprise message + space for another GIF + next button
  if (!isLowScore) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center text-center px-4 w-full max-w-lg mx-auto"
      >
        {/* Selected Score Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF1DE] border-2 border-[#FED7AA] shadow-sm mb-4">
          <span className="text-xs font-bold text-[#A16207] uppercase tracking-wider">
            your answer:
          </span>
          <span className="text-lg font-black text-[#F97316]">
            {score} / 10
          </span>
        </div>

        {/* Surprise text */}
        <h2 className="text-lg sm:text-xl font-bold text-[#2A160B] leading-relaxed mb-6 max-w-md mx-auto">
          {story.sureSequence.highScore.text}
        </h2>

        {/* Space for another GIF */}
        <div className="mb-6">
          <CatMedia item={cats.highScore} size="lg" />
        </div>

        {/* Next button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            playPopSound();
            trackEvent("are_you_sure_clicked", { originalScore: score, attemptCount: 1 });
            onProceed();
          }}
          className="w-full max-w-xs py-3.5 px-6 bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] text-lg font-bold rounded-2xl shadow-[0_8px_20px_-4px_rgba(249,115,22,0.45)] hover:shadow-[0_12px_24px_-4px_rgba(249,115,22,0.55)] border border-[#FED7AA]/50 cursor-pointer transition-all"
        >
          {story.sureSequence.highScore.button}
        </motion.button>
      </motion.div>
    );
  }

  // If already revealed: romantic cupcake reveal
  if (isRevealed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="flex flex-col items-center justify-center text-center px-4 w-full max-w-md mx-auto"
      >
        {/* Glow halo */}
        <div className="relative mb-5">
          <div className="absolute inset-0 rounded-full bg-[#FF8A3D]/30 blur-2xl animate-pulse" />
          <CatMedia item={cats.cupcake} size="lg" />
        </div>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-black text-[#F97316] mb-1 tracking-wider uppercase"
        >
          {story.sureSequence.reveal.laugh}
        </motion.p>

        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-4xl font-black text-[#2A160B] mb-2"
        >
          {story.sureSequence.reveal.knewIt}
        </motion.h2>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl sm:text-2xl font-bold text-[#C2410C] mb-8"
        >
          {story.sureSequence.reveal.cupcake}
        </motion.p>

        <motion.button
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playPopSound();
            onProceed();
          }}
          className="w-full max-w-xs py-3.5 px-6 bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] font-bold rounded-2xl shadow-[0_10px_25px_-5px_rgba(249,115,22,0.5)] cursor-pointer text-lg"
        >
          {story.sureSequence.reveal.button}
        </motion.button>
      </motion.div>
    );
  }

  // Override in progress: RENDER THE EXACT SAME SCALE AND STRUCTURE
  if (isOverriding) {
    const reactionData = getCatReactionForScore(overrideScore);
    const activeCat = cats[reactionData.key];
    const sliderPercentage = (overrideScore / 10) * 100;

    return (
      <div className="flex flex-col items-center justify-center text-center px-4 w-full max-w-lg mx-auto">
        {/* Same Kicker & Title */}
        <p className="text-[#C2410C] font-bold text-sm tracking-wider uppercase mb-1 animate-pulse">
          ⚡ wait a minute...
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2A160B] mb-2 leading-tight">
          {story.missQuestion.title}
        </h2>

        {/* Same Big Animated Number Counter */}
        <div className="relative my-2 flex flex-col items-center justify-center">
          <motion.span
            key={overrideScore}
            initial={{ scale: 0.85 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 0.2 }}
            className={`text-6xl sm:text-7xl font-black ${
              overrideScore === 10 ? "text-[#C2410C]" : "text-[#F97316]"
            } drop-shadow-sm select-none`}
          >
            {overrideScore}
          </motion.span>
          <span className="text-xs font-bold text-[#A16207] tracking-wider uppercase mt-1">
            out of 10
          </span>
        </div>

        {/* Same Reaction Badge */}
        <div className="mb-4 h-9 flex items-center justify-center">
          <div
            className={`px-4 py-1.5 rounded-full text-sm font-extrabold shadow-sm ${reactionData.badgeColor} flex items-center gap-1.5 transition-all`}
          >
            <span>{reactionData.text}</span>
            <span className="opacity-80 text-xs font-normal">
              ({reactionData.subtext})
            </span>
          </div>
        </div>

        {/* The Exact Same Scale (Animated Up) */}
        <div className="w-full px-4 max-w-sm mb-6">
          <div className="relative flex items-center py-3">
            {/* Custom Track Background */}
            <div className="absolute inset-0 h-4 my-auto rounded-full bg-[#FFF1DE] border-2 border-[#FED7AA] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF8A3D] to-[#F97316] transition-all duration-200 ease-out"
                style={{ width: `${sliderPercentage}%` }}
              />
            </div>

            {/* Simulated exact slider thumb moving dynamically */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-[#F97316] border-4 border-[#FFF1DE] shadow-[0_4px_14px_rgba(249,115,22,0.45),0_0_20px_rgba(255,138,61,0.4)] pointer-events-none transition-all duration-200"
              style={{ left: `${sliderPercentage}%` }}
            />
          </div>

          {/* Labels under slider: 0, 5, 10 */}
          <div className="flex justify-between items-center text-xs font-bold text-[#A16207] px-1 mt-2">
            <span>0</span>
            <span className="opacity-40">5</span>
            <span>10</span>
          </div>
        </div>

        {/* The Exact Same Cat Card Under The Scale */}
        <div className="relative mb-6 flex flex-col items-center">
          <CatMedia item={activeCat} size="md" />
        </div>

        {/* Overriding Indicator Note */}
        <p className="text-xs font-bold text-[#C2410C] uppercase tracking-widest bg-[#FED7AA]/50 px-4 py-1.5 rounded-full">
          overriding your answer... 🐾
        </p>
      </div>
    );
  }

  // Escalating typography & chaos styles based on index
  const questionText =
    escalationIndex === -1
      ? story.sureSequence.initialQuestion
      : currentStep?.question || "are you sure?";

  const buttonText =
    escalationIndex === -1
      ? story.sureSequence.initialButton
      : currentStep?.button || "yes";

  const noteText = currentStep?.note;

  const fontSizes = [
    "text-3xl sm:text-4xl", // initial
    "text-4xl sm:text-5xl", // REALLY sure
    "text-5xl sm:text-6xl font-black tracking-tight", // fr sure??
    "text-4xl sm:text-5xl font-black italic", // actually actually sure???
    "text-6xl sm:text-7xl font-black", // BRO.
    "text-5xl sm:text-6xl font-black tracking-wide", // OKAY THEN.
  ];

  const currentFontSize = fontSizes[Math.min(escalationIndex + 1, fontSizes.length - 1)];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col items-center justify-center text-center px-4 w-full max-w-md mx-auto"
    >
      {/* Corner chaotic cats if escalation is high (>= 2) */}
      {escalationIndex >= 2 && (
        <>
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -top-12 -left-8 text-3xl pointer-events-none select-none"
          >
            🙀
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: 30 }}
            animate={{ scale: 1, rotate: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="absolute -top-10 -right-8 text-3xl pointer-events-none select-none"
          >
            👀
          </motion.div>
        </>
      )}

      {/* Subtitle / note */}
      {noteText && (
        <motion.p
          key={noteText}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold text-[#C2410C] tracking-widest uppercase mb-3 bg-[#FED7AA]/50 px-3 py-1 rounded-full"
        >
          {noteText}
        </motion.p>
      )}

      {/* Selected Score Badge */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF1DE] border-2 border-[#FED7AA] shadow-sm mb-4"
      >
        <span className="text-xs font-bold text-[#A16207] uppercase tracking-wider">
          your answer:
        </span>
        <span className="text-lg font-black text-[#F97316]">
          {score} / 10
        </span>
      </motion.div>

      {/* Question Heading with escalating shake/rotation */}
      <motion.h2
        key={questionText}
        initial={{ scale: 0.8, rotate: escalationIndex % 2 === 0 ? -3 : 3 }}
        animate={{
          scale: 1,
          rotate:
            escalationIndex >= 3
              ? [escalationIndex % 2 === 0 ? -4 : 4, escalationIndex % 2 === 0 ? 4 : -4]
              : 0,
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 0.4, repeatType: "reverse" },
          scale: { type: "spring", stiffness: 400, damping: 20 },
        }}
        className={`${currentFontSize} text-[#2A160B] mb-8 leading-snug`}
      >
        {questionText}
      </motion.h2>

      {/* Cat reaction image */}
      <div className="mb-8">
        <CatMedia
          item={
            escalationIndex <= 0
              ? cats.medium
              : escalationIndex >= 4
              ? cats.disbelief
              : escalationIndex === 3
              ? cats.idea
              : cats.low
          }
          size="md"
        />
      </div>

      {/* Functional, clickable YES button with escalating punch */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.93 }}
        onClick={handleYesClick}
        className="w-full max-w-xs py-4 px-8 bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] text-xl font-black rounded-2xl shadow-[0_10px_25px_-5px_rgba(249,115,22,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(249,115,22,0.6)] transition-all border-2 border-[#FED7AA]/60 cursor-pointer"
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
}
