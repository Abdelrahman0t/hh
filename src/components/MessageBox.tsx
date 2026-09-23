"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { story } from "@/data/story";
import { cats } from "@/data/cats";
import { CatMedia } from "@/components/CatMedia";
import { CatCaptchaGame } from "@/components/CatCaptchaGame";
import { submitMessage, trackEvent } from "@/lib/tracking";
import { saveResponse } from "@/lib/supabase";
import { playPopSound, playSuccessChime } from "@/lib/sound";

export function MessageBox() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [branchSelected, setBranchSelected] = useState<"hate" | "surprised" | null>(null);
  const [selectedOption, setSelectedOption] = useState<{ text: string; reaction: string } | null>(null);
  const [showNextPhase, setShowNextPhase] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    playPopSound();
    setIsSubmitting(true);
    saveResponse("message", message.trim());

    try {
      await submitMessage(message);
      setIsSubmitted(true);
      playSuccessChime();
      try {
        confetti({
          particleCount: 65,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#F97316", "#FF8A3D", "#FED7AA", "#C2410C"],
        });
      } catch {
        // ignore
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBranchClick = (branch: "hate" | "surprised", label: string) => {
    playPopSound();
    setBranchSelected(branch);
    trackEvent("message_submitted", { message: `branch_clicked: ${label}`, timestamp: new Date().toISOString() });
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#F97316", "#FF8A3D", "#FED7AA"],
      });
    } catch {
      // ignore
    }
  };

  const handleOptionClick = (opt: { text: string; reaction: string }) => {
    playSuccessChime();
    setSelectedOption(opt);
    trackEvent("message_submitted", { message: `branch_option_selected: ${opt.text}`, timestamp: new Date().toISOString() });
    try {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.65 },
        colors: ["#F97316", "#FF8A3D", "#FED7AA", "#C2410C"],
      });
    } catch {
      // ignore
    }
  };

  const branchData =
    branchSelected === "hate"
      ? story.branchQuestions.hateBranch
      : branchSelected === "surprised"
      ? story.branchQuestions.surprisedBranch
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className={`flex flex-col items-center justify-center text-center px-1 sm:px-4 w-full transition-all duration-500 ${
        showNextPhase ? "max-w-[1440px]" : "max-w-xl"
      } mx-auto`}
    >
      <AnimatePresence mode="wait">
        {/* STAGE 1: Typing message */}
        {!isSubmitted && (
          <motion.div
            key="input-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full flex flex-col items-center"
          >
            {/* Kicker badge */}
            {story.final.kicker && (
              <p className="text-[#C2410C] font-bold text-xs uppercase tracking-widest mb-3 bg-[#FED7AA]/50 px-3.5 py-1 rounded-full inline-block">
                {story.final.kicker}
              </p>
            )}

            {/* Conversational Title */}
            <h2 className="text-lg sm:text-xl font-bold text-[#2A160B] leading-relaxed mb-2.5 max-w-lg text-center px-2">
              {story.final.title}
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-semibold text-[#A16207] mb-6">
              {story.final.subtitle}
            </p>

            {/* Message Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center">
              <div className="relative w-full rounded-3xl bg-[#FFF1DE] border-3 border-[#FED7AA] p-4 shadow-[0_10px_25px_-5px_rgba(249,115,22,0.15)] focus-within:border-[#F97316] focus-within:shadow-[0_12px_28px_-5px_rgba(249,115,22,0.25)] transition-all">
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={story.final.placeholder}
                  disabled={isSubmitting}
                  className="w-full bg-transparent resize-none border-none outline-none text-[#2A160B] text-base placeholder-[#A16207]/50 font-medium leading-relaxed"
                />

                <div className="flex justify-end items-center mt-2 pt-2 border-t border-[#FED7AA]/50 text-xs text-[#A16207] font-semibold">
                  <span>🐾 note to my daddy (plz don&apos;t get mad)</span>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!message.trim() || isSubmitting}
                whileHover={message.trim() ? { scale: 1.04 } : {}}
                whileTap={message.trim() ? { scale: 0.95 } : {}}
                className={`w-full max-w-xs py-3.5 px-6 mt-6 rounded-2xl font-bold text-lg shadow-[0_8px_20px_-4px_rgba(249,115,22,0.45)] border border-[#FED7AA]/50 flex items-center justify-center gap-2 transition-all ${
                  message.trim() && !isSubmitting
                    ? "bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] cursor-pointer hover:shadow-[0_12px_24px_-4px_rgba(249,115,22,0.55)]"
                    : "bg-[#FED7AA] text-[#C2410C]/50 cursor-not-allowed shadow-none"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>delivering...</span>
                  </>
                ) : (
                  <span>{story.final.button}</span>
                )}
              </motion.button>
            </form>
          </motion.div>
        )}

        {/* STAGE 2: Message received + GIF + 2 buttons */}
        {isSubmitted && !branchSelected && (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="flex flex-col items-center justify-center py-4 px-4 w-full max-w-md mx-auto"
          >
            {/* Text on top of the GIF */}
            <motion.h2
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-black text-[#2A160B] mb-5 tracking-tight"
            >
              {story.final.successHeading}
            </motion.h2>

            {/* Proud Of You Good Job Cat GIF */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-5"
            >
              <CatMedia item={cats.proud} size="lg" />
            </motion.div>

            {/* Text under the GIF */}
            {story.final.successText && (
              <motion.p
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-lg font-bold text-[#C2410C] mb-6 max-w-xs mx-auto leading-snug"
              >
                {story.final.successText}
              </motion.p>
            )}

            {/* 2 Buttons triggering branch questions */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-sm mb-4"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBranchClick("hate", story.final.button1)}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] font-bold rounded-2xl shadow-[0_8px_20px_-4px_rgba(249,115,22,0.45)] hover:shadow-[0_12px_24px_-4px_rgba(249,115,22,0.55)] cursor-pointer text-base transition-all border border-[#FED7AA]/50"
              >
                {story.final.button1}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBranchClick("surprised", story.final.button2)}
                className="w-full py-3.5 px-5 bg-[#FFF1DE] text-[#C2410C] font-bold rounded-2xl shadow-sm border-2 border-[#FED7AA] hover:bg-[#FED7AA]/50 cursor-pointer text-base transition-colors"
              >
                {story.final.button2}
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 3: Branch Question with 3 Options based on what she clicked */}
        {isSubmitted && branchSelected && branchData && !showNextPhase && (
          <motion.div
            key={`branch-${branchSelected}`}
            initial={{ opacity: 0, y: 15, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center justify-center py-4 px-4 w-full max-w-lg mx-auto"
          >
            {/* Tag showing what she clicked */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-3.5 py-1 rounded-full bg-[#FED7AA]/50 text-xs font-bold text-[#C2410C] mb-3 uppercase tracking-wider"
            >
              &quot;{branchSelected === "hate" ? "بومة والله" : "hmmm"}&quot;
            </motion.div>

            {/* Branch Question Title */}
            <h2 className="text-xl sm:text-2xl font-black text-[#2A160B] mb-4 leading-tight">
              {branchData.question}
            </h2>

            {/* Cat GIF for the selected branch */}
            <div className="mb-4">
              <CatMedia
                item={branchSelected === "hate" ? cats.hateBranchCat : cats.surprisedBranchCat}
                size="md"
              />
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-semibold text-[#A16207] mb-4">
              {branchData.subtitle}
            </p>

            {/* 3 Options */}
            <div className="flex flex-col gap-3 w-full max-w-md mx-auto mb-4">
              {branchData.options.map((option, idx) => {
                const isSelected = selectedOption?.text === option.text;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleOptionClick(option)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-base transition-all cursor-pointer text-center ${
                      isSelected
                        ? "bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] shadow-[0_8px_20px_-4px_rgba(249,115,22,0.45)] border-2 border-[#FED7AA]"
                        : "bg-[#FFF1DE] text-[#2A160B] hover:bg-[#FED7AA]/60 border-2 border-[#FED7AA] shadow-sm"
                    }`}
                  >
                    {option.text}
                  </motion.button>
                );
              })}
            </div>

            {/* Reaction Message after picking one of the 3 options */}
            <AnimatePresence>
              {selectedOption && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="mt-2 p-4 rounded-2xl bg-[#FFF1DE] border-2 border-[#F97316]/50 shadow-md max-w-sm w-full text-center flex flex-col items-center"
                >
                  <p className="text-xs font-bold text-[#A16207] uppercase tracking-wider mb-1">
                    daddy&apos;s reaction:
                  </p>
                  <p className="text-lg font-black text-[#C2410C] mb-3">
                    {selectedOption.reaction}
                  </p>

                  {/* Button to go to next phase */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playPopSound();
                      if (selectedOption) {
                        saveResponse("surgery_option", selectedOption.text, { reaction: selectedOption.reaction });
                      }
                      setShowNextPhase(true);
                    }}
                    className="w-full py-3 px-5 bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] font-bold rounded-2xl shadow-[0_6px_16px_-3px_rgba(249,115,22,0.4)] cursor-pointer text-base transition-all border border-[#FED7AA]/50"
                  >
                    {story.branchQuestions.nextPhaseButton}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* STAGE 4: Next Phase - The Cat CAPTCHA Game to unlock the letter */}
        {isSubmitted && branchSelected && showNextPhase && (
          <CatCaptchaGame />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
