"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldCheck, Lock, Heart, FileText, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { story } from "@/data/story";
import { cats } from "@/data/cats";
import { CatMedia } from "@/components/CatMedia";
import { playPopSound, playSuccessChime, playBoingSound } from "@/lib/sound";
import { saveResponse } from "@/lib/supabase";

// ─── Proposal Phase Sub-Component ────────────────────────────────────────────
function ProposalPhase() {
  const [accepted, setAccepted] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [hasClickedNo, setHasClickedNo] = useState(false);
  const [tarhaNoCount, setTarhaNoCount] = useState(0);
  const [tarhaOk, setTarhaOk] = useState(false);

  const escapeNo = () => {
    const rx = (Math.random() - 0.5) * 380;
    const ry = (Math.random() - 0.5) * 260;
    setNoOffset({ x: rx, y: ry });
  };

  const handleNoClick = () => {
    if (!hasClickedNo) {
      // First click — activate dodging and immediately jump
      setHasClickedNo(true);
    }
    escapeNo();
  };

  return (
    <motion.div
      key="ultimate-final-stage"
      initial={{ opacity: 0, y: 25, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="w-full"
    >
      <AnimatePresence mode="wait">
        {!accepted ? (
          /* ── SINGLE CARD: closing content + proposal + buttons ── */
          <motion.div
            key="main-card"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full bg-[#FFF1DE] rounded-3xl border-3 border-[#FED7AA] p-8 sm:p-10 shadow-[0_15px_35px_-5px_rgba(249,115,22,0.25)] flex flex-col items-center text-center overflow-visible max-w-lg mx-auto"
          >
            {/* Badge */}
            <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#F97316] text-white text-xs font-black tracking-wider uppercase mb-5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{story.finalPhase.badge}</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl font-black text-[#2A160B] mb-4">
              {story.finalPhase.title}
            </h2>

            {/* GIF */}
            <div className="w-52 h-52 rounded-3xl overflow-hidden border-3 border-[#FED7AA] shadow-md mb-6 bg-[#FFF7ED]">
              <img src={story.finalPhase.proposal.gif} alt="cat with flowers" className="w-full h-full object-cover" />
            </div>

            {/* Closing text */}
            <p className="text-base sm:text-lg font-bold text-[#C2410C] mb-6 max-w-sm leading-relaxed">
              {story.finalPhase.text}
            </p>

            {/* Dashed divider */}
            <div className="w-full max-w-xs border-t-2 border-dashed border-[#FED7AA] mb-6" />

            {/* Proposal question */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl font-black text-[#2A160B] mb-7"
            >
              {story.finalPhase.proposal.question}
            </motion.p>

            {/* YES + NO side by side */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-4 w-full"
            >
              {/* YES — stays put */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSuccessChime();
                  try {
                    confetti({ particleCount: 220, spread: 130, origin: { y: 0.5 }, colors: ["#F97316", "#FF8A3D", "#FED7AA", "#EF4444", "#fff"] });
                    setTimeout(() => confetti({ particleCount: 150, spread: 100, origin: { y: 0.35 }, colors: ["#F97316", "#FF8A3D", "#FED7AA"] }), 450);
                  } catch {}
                  setAccepted(true);
                }}
                className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] font-black text-lg shadow-[0_8px_24px_-4px_rgba(249,115,22,0.5)] cursor-pointer border border-[#FED7AA]/50"
              >
                {story.finalPhase.proposal.yesBtn}
              </motion.button>

              {/* NO — sits still until first click, then runs on hover */}
              <motion.button
                animate={{ x: noOffset.x, y: noOffset.y }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                onHoverStart={hasClickedNo ? escapeNo : undefined}
                onClick={handleNoClick}
                className="py-3.5 px-8 rounded-2xl bg-[#FED7AA] text-[#C2410C] font-black text-lg border-2 border-[#F97316]/30 shadow-md select-none cursor-pointer"
              >
                {story.finalPhase.proposal.noBtn}
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          /* ── ACCEPTED CARD ── */
          <motion.div
            key="accepted-card"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="w-full bg-[#FFF1DE] rounded-3xl border-3 border-[#FED7AA] p-8 sm:p-10 shadow-[0_15px_35px_-5px_rgba(249,115,22,0.25)] flex flex-col items-center text-center overflow-hidden max-w-lg mx-auto"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -6, 6, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-6xl mb-4"
            >
            
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#2A160B] mb-4">
              {story.finalPhase.proposal.acceptedTitle}
            </h2>
            <div className="w-52 h-52 rounded-3xl overflow-hidden border-3 border-[#FED7AA] shadow-md mb-6 bg-[#FFF7ED]">
              <img src={story.finalPhase.cat} alt="kissing cat" className="w-full h-full object-cover" />
            </div>
            <p className="text-base sm:text-lg font-bold text-[#C2410C] mb-8 max-w-sm leading-relaxed">
              {story.finalPhase.proposal.acceptedText}
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { playPopSound(); window.location.reload(); }}
              className="py-3 px-6 rounded-2xl bg-[#FED7AA] text-[#C2410C] font-bold text-sm cursor-pointer hover:bg-[#FDBA74] transition-all border border-[#F97316]/20 shadow-xs"
            >
              {story.finalPhase.replayBtn}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TARHA BADGE — slides in from bottom-right after YES, grows with every لأ ── */}
      <AnimatePresence>
        {accepted && !tarhaOk && (
          <motion.div
            key="tarha-badge"
            initial={{ y: "100%", x: "30%", opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.6 }}
            // scale grows with each "no" — 1 + noCount * 0.55, no cap
            style={{ scale: 1 + tarhaNoCount * 0.55 }}
            className="fixed bottom-6 right-6 z-[99999] bg-[#F97316] text-white rounded-3xl shadow-2xl flex flex-col items-center text-center p-6 min-w-[200px] origin-bottom-right"
          >
            {/* Escalating reaction text */}
            {tarhaNoCount > 0 && (
              <motion.p
                key={tarhaNoCount}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-black uppercase tracking-widest mb-2 text-white/80"
              >
                {story.finalPhase.proposal.tarha.noReactions[
                  Math.min(tarhaNoCount - 1, story.finalPhase.proposal.tarha.noReactions.length - 1)
                ]}
              </motion.p>
            )}

            {/* Main badge text */}
            <p className="font-black leading-tight mb-5" style={{ fontSize: `${1.4 + tarhaNoCount * 0.3}rem` }}>
              {story.finalPhase.proposal.tarha.badge}
            </p>

            {/* OK + لأ buttons */}
            <div className="flex gap-3 items-center justify-center flex-wrap">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  playSuccessChime();
                  setTarhaOk(true);
                }}
                className="py-2 px-5 rounded-2xl bg-white text-[#C2410C] font-black text-sm cursor-pointer shadow-md"
              >
                {story.finalPhase.proposal.tarha.ok}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  playBoingSound();
                  setTarhaNoCount((n) => n + 1);
                }}
                className="py-2 px-5 rounded-2xl bg-white/20 text-white font-black text-sm cursor-pointer border border-white/40"
              >
                {story.finalPhase.proposal.tarha.no}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}




export function CatCaptchaGame() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | "envelope" | "unlocked">(1);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isUnfoldingLetter, setIsUnfoldingLetter] = useState(false);
  const [showSecretImage, setShowSecretImage] = useState(false);
  const [isFinalStep, setIsFinalStep] = useState(false);
  const [apologyChoice, setApologyChoice] = useState<"laughed" | "dead" | null>(null);
  const [isSongPhase, setIsSongPhase] = useState(false);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [isThreeSectionPhase, setIsThreeSectionPhase] = useState(false);
  const [isUltimateFinalPhase, setIsUltimateFinalPhase] = useState(false);

  // Step 1 state (single choice only, must pick side eye cat)
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const [isWrong, setIsWrong] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [buttonText, setButtonText] = useState<string>(story.captchaGame.step1.verifyBtn);

  // Step 2 state
  const [checkedTerms, setCheckedTerms] = useState<boolean[]>([false, false]);

  // Step 3 state (Hold to unlock)
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  // Audio ref for song picker phase
  const songAudioRef = useRef<HTMLAudioElement | null>(null);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);
  };

  // Step 1 Choose (Single choice)
  const chooseCat = (id: number) => {
    playPopSound();
    setSelectedCatId(id);
    setIsWrong(false);
    setButtonText(story.captchaGame.step1.verifyBtn);
  };

  const handleStep1Verify = () => {
    if (selectedCatId === null) {
      playBoingSound();
      setIsWrong(true);
      setButtonText("متختاري هو ايه الكلاحة دي");
      triggerShake();
      return;
    }

    const chosenCat = story.captchaGame.step1.cats.find((c) => c.id === selectedCatId);
    const isSideEye =
      chosenCat &&
      (chosenCat.id === 3 ||
        chosenCat.label.toLowerCase().includes("side eye") ||
        chosenCat.src.includes("sideeyecat"));

    if (!isSideEye) {
      playBoingSound();
      setIsWrong(true);
      triggerShake();

      if (chosenCat?.id === 1) {
        setButtonText("yeah nigga you bearly eat try something else");
      } else if (chosenCat?.id === 2) {
        setButtonText("you're too close but nah i'm disappointed you should've got that from the first try");
      } else if (chosenCat?.id === 4) {
        setButtonText("no shit خخخخ that's been my life ever since i met your pretty ahh");
      } else {
        setButtonText("wrong answer smh... try again 😾");
      }
      return;
    }

    // Correct! Side eye cat chosen
    playSuccessChime();
    setIsWrong(false);
    setCurrentStep(2);
  };

  // Step 2 Toggle
  const toggleTerm = (idx: number) => {
    playPopSound();
    setCheckedTerms((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  const allTermsChecked = checkedTerms.every(Boolean);

  const handleStep2Proceed = () => {
    if (!allTermsChecked) {
      playBoingSound();
      return;
    }
    playSuccessChime();
    setCurrentStep(3);
  };

  // Step 3 Hold logic
  const startHold = () => {
    setIsHolding(true);
    playPopSound();
    holdIntervalRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current!);
          triggerUnlock();
          return 100;
        }
        return prev + 4;
      });
    }, 45);
  };

  const stopHold = () => {
    if (holdProgress < 100) {
      setIsHolding(false);
      setHoldProgress(0);
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
      }
    }
  };

  const triggerUnlock = () => {
    setIsHolding(false);
    playSuccessChime();
    setIsEnvelopeOpen(false);
    setIsUnfoldingLetter(false);
    setCurrentStep("envelope");
  };

  const handleOpenEnvelope = () => {
    if (isEnvelopeOpen) return;
    setIsEnvelopeOpen(true);
    playPopSound();

    setTimeout(() => {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#F97316", "#FF8A3D", "#FED7AA", "#EF4444"],
        });
      } catch {
        // ignore
      }
      playSuccessChime();
    }, 450);

    setTimeout(() => {
      setIsUnfoldingLetter(true);
    }, 1100);

    setTimeout(() => {
      setCurrentStep("unlocked");
    }, 1700);
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const config = story.captchaGame;
  const letterConfig = story.letter;

  return (
    <div
      className={`w-full mx-auto py-2 transition-all duration-500 ${
        isThreeSectionPhase && !isUltimateFinalPhase ? "w-full max-w-[1400px]" : "max-w-lg"
      }`}
    >
      <AnimatePresence mode="wait">
        {/* GAME CARDS: STEPS 1 TO 3 */}
        {currentStep !== "envelope" && currentStep !== "unlocked" && (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35 }}
            className="w-full bg-[#FFF1DE] rounded-3xl border-3 border-[#FED7AA] p-6 shadow-[0_12px_28px_-6px_rgba(249,115,22,0.2)] flex flex-col items-center"
          >
            {/* Header / Security Badge */}
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-[#F97316]" />
              <span className="text-[11px] font-black tracking-widest text-[#C2410C] uppercase bg-[#FED7AA]/60 px-3 py-1 rounded-full">
                {config.kicker}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#2A160B] mb-1">
              {config.heading}
            </h2>
            <p className="text-xs font-semibold text-[#A16207] mb-5 max-w-sm">
              {config.subtext}
            </p>

            {/* Stepper Progress Indicator */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step === currentStep
                      ? "w-8 bg-[#F97316]"
                      : step < (currentStep as number)
                      ? "w-4 bg-[#FF8A3D]"
                      : "w-4 bg-[#FED7AA]"
                  }`}
                />
              ))}
            </div>

            {/* STEP 1: Choose cat */}
            {currentStep === 1 && (
              <div className="w-full flex flex-col items-center">
                <p className="text-sm font-bold text-[#2A160B] mb-4">
                  {config.step1.instruction}
                </p>

                <div className="grid grid-cols-2 gap-3 w-full mb-5">
                  {config.step1.cats.map((item) => {
                    const isSelected = selectedCatId === item.id;
                    return (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => chooseCat(item.id)}
                        className={`group relative rounded-2xl overflow-hidden aspect-square cursor-pointer border-3 transition-all duration-200 shadow-sm ${
                          isSelected
                            ? "border-[#F97316] ring-4 ring-[#F97316]/30 shadow-md scale-[1.02]"
                            : "border-[#FED7AA] hover:border-[#FF8A3D]"
                        }`}
                      >
                        <img
                          src={item.src}
                          alt={item.label}
                          className={`w-full h-full object-cover transition-transform duration-300 ${
                            isSelected ? "scale-105" : "group-hover:scale-105"
                          }`}
                        />

                        {/* Gradient overlay at bottom for label */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-6 pb-2 px-2 flex items-center justify-center pointer-events-none">
                          <span className="text-xs font-black text-[#FFF7ED] tracking-wide drop-shadow-md">
                            {item.label}
                          </span>
                        </div>

                        {/* Selection Checkmark Badge */}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#F97316] text-white flex items-center justify-center shadow-md border-2 border-white"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <motion.button
                  animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleStep1Verify}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-base transition-all cursor-pointer shadow-[0_6px_18px_-3px_rgba(249,115,22,0.45)] ${
                    isWrong
                      ? "bg-gradient-to-r from-[#EA580C] to-[#DC2626] text-white border border-red-300"
                      : "bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED]"
                  }`}
                >
                  {buttonText || config.step1.verifyBtn}
                </motion.button>
              </div>
            )}

            {/* STEP 2: Legal Immunity Checkboxes */}
            {currentStep === 2 && (
              <div className="w-full flex flex-col items-center">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#FED7AA] shadow-sm mb-3 bg-[#FFF7ED]">
                  <img
                    src="/cats/sideeyecat.gif"
                    alt="witness cat judging"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm font-bold text-[#2A160B] mb-1">
                  {config.step2.instruction}
                </p>
                <p className="text-xs font-semibold text-[#A16207] mb-4">
                  (witness cat is watching you sign)
                </p>

                <div className="flex flex-col gap-3 w-full mb-6">
                  {config.step2.terms.map((term, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleTerm(idx)}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFF7ED] border-2 border-[#FED7AA] cursor-pointer hover:border-[#F97316]/60 transition-all text-left"
                    >
                      <div
                        className={`w-6 h-6 mt-0.5 rounded-lg flex items-center justify-center border-2 transition-all ${
                          checkedTerms[idx]
                            ? "bg-[#F97316] border-[#F97316] text-white"
                            : "border-[#FED7AA] bg-white"
                        }`}
                      >
                        {checkedTerms[idx] && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#2A160B] leading-snug">
                        {term}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={allTermsChecked ? { scale: 1.04 } : {}}
                  whileTap={allTermsChecked ? { scale: 0.95 } : {}}
                  onClick={handleStep2Proceed}
                  disabled={!allTermsChecked}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-base transition-all ${
                    allTermsChecked
                      ? "bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] shadow-[0_6px_18px_-3px_rgba(249,115,22,0.45)] cursor-pointer"
                      : "bg-[#FED7AA] text-[#C2410C]/40 cursor-not-allowed"
                  }`}
                >
                  {config.step2.continueBtn}
                </motion.button>
              </div>
            )}

            {/* STEP 3: Hold Paw to Unlock */}
            {currentStep === 3 && (
              <div className="w-full flex flex-col items-center">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#FED7AA] shadow-sm mb-3 bg-[#FFF7ED]">
                  <img
                    src={isHolding ? "/cats/chaoscat.gif" : "/cats/angrycat.gif"}
                    alt="security cat"
                    className={`w-full h-full object-cover transition-transform duration-200 ${
                      isHolding ? "scale-110" : ""
                    }`}
                  />
                </div>

                <p className="text-sm font-bold text-[#2A160B] mb-1">
                  {config.step3.instruction}
                </p>
                <p className="text-xs font-semibold text-[#A16207] mb-5">
                  {config.step3.hint}
                </p>

                {/* Hold Button with Progress Ring / Bar */}
                <div className="relative w-full max-w-xs mb-4">
                  <div
                    onMouseDown={startHold}
                    onMouseUp={stopHold}
                    onMouseLeave={stopHold}
                    onTouchStart={startHold}
                    onTouchEnd={stopHold}
                    className="relative w-full py-5 px-6 rounded-2xl bg-[#FFF7ED] border-3 border-[#FED7AA] shadow-md flex items-center justify-center cursor-pointer select-none overflow-hidden active:scale-95 transition-transform"
                  >
                    {/* Fill Progress Overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-[#F97316] to-[#FF8A3D] transition-all duration-75"
                      style={{ width: `${holdProgress}%` }}
                    />

                    <span
                      className={`relative z-10 font-black text-base tracking-wider transition-colors ${
                        holdProgress > 45 ? "text-white" : "text-[#C2410C]"
                      }`}
                    >
                      {isHolding ? `${holdProgress}% ...` : config.step3.holdBtn}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] font-bold text-[#A16207] opacity-80">
                  (don&apos;t let go until it hits 100%!)
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* ENVELOPE OPENING ANIMATION STAGE */}
        {currentStep === "envelope" && (
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full bg-[#FFF1DE] rounded-3xl border-3 border-[#FED7AA] p-6 sm:p-8 shadow-[0_15px_35px_-5px_rgba(249,115,22,0.22)] flex flex-col items-center text-center relative"
          >
            {/* Top clearance badge */}
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#F97316]" />
              <span className="text-[11px] font-black tracking-widest text-[#C2410C] uppercase bg-[#FED7AA]/60 px-3.5 py-1 rounded-full border border-[#FED7AA]">
                CONFIDENTIAL LETTER DELIVERED 💌
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#2A160B] mb-1">
              Your Secret Note is Ready
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#A16207] mb-8">
              {isEnvelopeOpen
                ? "Opening envelope... 🐾"
                : "Tap the wax seal to open your letter"}
            </p>

            {/* THE 3D ENVELOPE */}
            <div
              className="relative w-72 sm:w-84 h-48 sm:h-52 my-4 cursor-pointer select-none"
              style={{ perspective: 1000 }}
              onClick={handleOpenEnvelope}
            >
              {/* Envelope Back Base */}
              <div className="absolute inset-0 bg-[#FDBA74] rounded-2xl shadow-lg border border-[#FB923C]/40" />

              {/* The Letter Card inside, sliding up when envelope opens */}
              <motion.div
                initial={false}
                animate={
                  isEnvelopeOpen
                    ? { y: -125, scale: isUnfoldingLetter ? 1.08 : 1.02 }
                    : { y: 15, scale: 0.94 }
                }
                transition={{
                  duration: 0.85,
                  delay: isEnvelopeOpen ? 0.35 : 0,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="absolute inset-x-3 sm:inset-x-4 top-2 h-44 bg-[#FFF7ED] rounded-xl shadow-md border-2 border-[#FED7AA] p-4 text-center z-10 flex flex-col items-center justify-center overflow-hidden"
              >
                <Heart className="w-5 h-5 text-[#F97316] fill-current animate-pulse mb-1" />
                <span className="text-[10px] font-black tracking-widest text-[#C2410C] uppercase">
                  {letterConfig.sealLabel}
                </span>
                <span className="text-xs font-bold text-[#2A160B] mt-1 line-clamp-1">
                  {letterConfig.title}
                </span>
                <div className="w-16 h-0.5 bg-[#FED7AA] my-2" />
                <span className="text-[11px] font-semibold text-[#A16207]">
                  {isEnvelopeOpen ? "Extracting secret letter... ✨" : "Sealed with love 🐾"}
                </span>
              </motion.div>

              {/* Envelope Front Pocket (Left, Right, Bottom triangular folds) */}
              <svg
                className="absolute inset-0 w-full h-full z-20 pointer-events-none drop-shadow-sm"
                viewBox="0 0 320 200"
                preserveAspectRatio="none"
              >
                {/* Left fold */}
                <polygon points="0,0 160,110 0,200" fill="#FED7AA" />
                {/* Right fold */}
                <polygon points="320,0 160,110 320,200" fill="#FED7AA" />
                {/* Bottom fold */}
                <polygon points="0,200 160,105 320,200" fill="#FDBA74" />
              </svg>

              {/* Envelope Top Triangular Flap */}
              <motion.div
                className="absolute top-0 inset-x-0 h-28 origin-top"
                style={{
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  zIndex: isEnvelopeOpen ? 5 : 30,
                }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: isEnvelopeOpen ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <svg
                  className="w-full h-full drop-shadow-md"
                  viewBox="0 0 320 120"
                  preserveAspectRatio="none"
                >
                  <polygon points="0,0 320,0 160,118" fill="#FB923C" />
                </svg>
              </motion.div>

              {/* Wax Seal on Flap tip */}
              <AnimatePresence>
                {!isEnvelopeOpen && (
                  <motion.div
                    key="wax-seal"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.08, 1] }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      scale: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-[82px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-tr from-[#9A3412] via-[#C2410C] to-[#EA580C] border-2 border-[#FED7AA] shadow-[0_6px_20px_rgba(194,65,12,0.6)] flex items-center justify-center cursor-pointer text-white z-40"
                  >
                    <span className="text-2xl select-none">🐾</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleOpenEnvelope}
              disabled={isEnvelopeOpen}
              className={`mt-10 w-full max-w-xs py-3.5 px-6 rounded-2xl font-bold text-base transition-all cursor-pointer shadow-[0_6px_18px_-3px_rgba(249,115,22,0.4)] ${
                isEnvelopeOpen
                  ? "bg-[#FED7AA] text-[#A16207] cursor-default"
                  : "bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED]"
              }`}
            >
              {isEnvelopeOpen ? "Opening your note... 💌" : "Break Wax Seal & Open 💌"}
            </motion.button>
          </motion.div>
        )}

        {/* UNLOCKED: THE CONFIDENTIAL LOVE LETTER */}
        {currentStep === "unlocked" && !isFinalStep && (
          <motion.div
            key="unlocked-letter"
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full bg-[#FFF1DE] rounded-3xl border-3 border-[#FED7AA] p-6 sm:p-8 shadow-[0_15px_35px_-5px_rgba(249,115,22,0.25)] flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Top Wax Seal Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
              className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#F97316] text-white text-xs font-black tracking-wider uppercase mb-5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{letterConfig.sealLabel}</span>
            </motion.div>

            {/* Letter Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-[#2A160B] mb-4">
              {letterConfig.title}
            </h2>

            {/* Letter Body Paragraphs */}
            <div className="w-full max-w-md flex flex-col gap-3 text-left bg-[#FFF7ED] p-5 sm:p-6 rounded-2xl border-2 border-[#FED7AA] mb-4 shadow-inner">
              {letterConfig.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm sm:text-base font-semibold text-[#2A160B] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}

              {/* Button in place of signoff */}
              <div className="mt-4 pt-3 border-t border-[#FED7AA]/60 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playPopSound();
                    setShowSecretImage((prev) => !prev);
                  }}
                  className="py-2 px-5 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-[0_4px_12px_-2px_rgba(249,115,22,0.35)]"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>
                    {showSecretImage
                      ? (letterConfig.hideImageButtonText || "hide photo")
                      : (letterConfig.showImageButtonText || "psst... open this 📸")}
                  </span>
                </motion.button>
              </div>

              {/* Revealed Image under the text */}
              <AnimatePresence>
                {showSecretImage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="overflow-hidden mt-3 pt-1 flex flex-col items-center"
                  >
                    <div className="w-full rounded-2xl overflow-hidden border-2 border-[#FED7AA] shadow-md bg-[#FFF1DE]">
                      <img
                        src={letterConfig.secretImage || "/cats/chaseatlanticcover.jpg"}
                        alt="RIGHT HERE"
                        className="w-full h-auto max-h-80 object-cover"
                      />
                    </div>

                    {/* Large text under the photo that says RIGHT HERE */}
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 350 }}
                      className="my-3 text-center"
                    >
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#C2410C] tracking-widest uppercase drop-shadow-sm">
                        {letterConfig.underPhotoText || "RIGHT HERE"}
                      </h3>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Continue button ONLY after the image is shown */}
            {showSecretImage && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="w-full max-w-xs mt-2 mb-2"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playSuccessChime();
                    try {
                      confetti({
                        particleCount: 100,
                        spread: 80,
                        origin: { y: 0.6 },
                        colors: ["#F97316", "#FF8A3D", "#FED7AA", "#EF4444"],
                      });
                    } catch {}
                    setIsFinalStep(true);
                  }}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] font-bold text-base shadow-[0_6px_18px_-3px_rgba(249,115,22,0.45)] cursor-pointer"
                >
                  {letterConfig.continueBtn || "continue →"}
                </motion.button>
              </motion.div>
            )}

            {/* Replay Envelope Animation Button */}
            
          </motion.div>
        )}

        {/* APOLOGY PHASE */}
        {isFinalStep && !isSongPhase && !isThreeSectionPhase && !isUltimateFinalPhase && (
          <motion.div
            key="apology-stage"
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full bg-[#FFF1DE] rounded-3xl border-3 border-[#FED7AA] p-6 sm:p-8 shadow-[0_15px_35px_-5px_rgba(249,115,22,0.25)] flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#F97316] text-white text-xs font-black tracking-wider uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{story.apologyPhase.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#2A160B] mb-3">
              {story.apologyPhase.title}
            </h2>

            <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-[#FED7AA] shadow-sm mb-5 bg-[#FFF7ED]">
              <img
                src={story.apologyPhase.gif}
                alt="apology cat"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm sm:text-base font-bold text-[#2A160B] mb-6 max-w-sm leading-relaxed">
              {story.apologyPhase.text}
            </p>

            {/* 2 Buttons to answer -> now go to song phase */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSuccessChime();
                  try {
                    confetti({
                      particleCount: 110,
                      spread: 80,
                      origin: { y: 0.6 },
                      colors: ["#F97316", "#FF8A3D", "#FED7AA", "#EF4444"],
                    });
                  } catch {}
                  setApologyChoice("laughed");
                  setIsSongPhase(true);
                }}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] font-bold text-sm shadow-[0_6px_16px_-3px_rgba(249,115,22,0.4)] cursor-pointer"
              >
                {story.apologyPhase.buttonYes}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playBoingSound();
                  setApologyChoice("dead");
                  setIsSongPhase(true);
                }}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#FED7AA] text-[#C2410C] font-bold text-sm hover:bg-[#FDBA74] transition-all cursor-pointer border border-[#F97316]/20"
              >
                {story.apologyPhase.buttonNo}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* SONG PICKER PHASE */}
        {isFinalStep && isSongPhase && !isThreeSectionPhase && !isUltimateFinalPhase && apologyChoice && (() => {
          const branch = apologyChoice === "laughed"
            ? story.songPhase.laughBranch
            : story.songPhase.deadBranch;
          const isLaugh = apologyChoice === "laughed";
          return (
            <motion.div
              key="song-picker-stage"
              initial={{ opacity: 0, y: 25, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full bg-[#FFF1DE] rounded-3xl border-3 border-[#FED7AA] p-6 sm:p-8 shadow-[0_15px_35px_-5px_rgba(249,115,22,0.25)] flex flex-col items-center text-center relative overflow-hidden max-w-lg mx-auto"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
                className={`flex items-center gap-1.5 px-4 py-1 rounded-full text-white text-xs font-black tracking-wider uppercase mb-5 shadow-sm ${
                  isLaugh ? "bg-[#F97316]" : "bg-[#C2410C]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{branch.badge}</span>
              </motion.div>

              {/* Reaction text */}
              <motion.h2
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl sm:text-3xl font-black text-[#2A160B] mb-3 leading-tight"
              >
                {branch.reaction}
              </motion.h2>

              {/* GIF */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-44 h-44 rounded-2xl overflow-hidden border-2 border-[#FED7AA] shadow-md mb-4 bg-[#FFF7ED] flex-shrink-0"
              >
                <img
                  src={branch.gif}
                  alt="reaction gif"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className={`text-sm font-semibold mb-6 max-w-xs leading-relaxed ${
                  isLaugh ? "text-[#A16207]" : "text-[#C2410C]"
                }`}
              >
                {branch.subtext}
              </motion.p>

              {/* Song Cards */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-3 w-full max-w-sm mb-5"
              >
                {branch.songs.map((song, idx) => {
                  const isPicked = selectedSong === song.title;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        playPopSound();
                        setSelectedSong(song.title);
                        // Play the song if it has a src
                        if (song.src) {
                          if (songAudioRef.current) {
                            songAudioRef.current.pause();
                            songAudioRef.current.currentTime = 0;
                          }
                          const audio = new Audio(song.src);
                          audio.volume = 0.6;
                          audio.play().catch(() => {});
                          songAudioRef.current = audio;
                        }
                        try {
                          confetti({
                            particleCount: isLaugh ? 60 : 20,
                            spread: isLaugh ? 60 : 30,
                            origin: { y: 0.7 },
                            colors: isLaugh
                              ? ["#F97316", "#FF8A3D", "#FED7AA"]
                              : ["#C2410C", "#7f1d1d", "#FED7AA"],
                          });
                        } catch {}
                      }}
                      className={`w-full py-4 px-5 rounded-2xl font-bold text-sm transition-all cursor-pointer flex items-center gap-3 text-left border-2 ${
                        isPicked
                          ? isLaugh
                            ? "bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] border-[#FED7AA] shadow-[0_8px_20px_-4px_rgba(249,115,22,0.45)]"
                            : "bg-gradient-to-r from-[#C2410C] to-[#F97316] text-[#FFF7ED] border-[#FED7AA] shadow-[0_8px_20px_-4px_rgba(194,65,12,0.45)]"
                          : "bg-[#FFF1DE] text-[#2A160B] border-[#FED7AA] hover:bg-[#FED7AA]/50 shadow-sm"
                      }`}
                    >
                      <span className="text-2xl flex-shrink-0">{song.emoji}</span>
                      <div className="flex flex-col">
                        <span className="font-black text-base leading-tight">{song.title}</span>
                        <span className={`text-xs font-semibold mt-0.5 ${
                          isPicked ? "opacity-80" : "text-[#A16207]"
                        }`}>{song.artist}</span>
                      </div>
                      {isPicked && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-lg"
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>

              {/* Picked reaction + continue button */}
              <AnimatePresence>
                {selectedSong && (() => {
                  // Find the picked song object to get its comment
                  const pickedSongData = branch.songs.find((s) => s.title === selectedSong);
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="flex flex-col items-center gap-3 w-full max-w-sm"
                    >
                      {/* pickedText ("you chose that. the law chose for you") */}
                      <p className={`text-sm font-bold italic ${
                        isLaugh ? "text-[#C2410C]" : "text-[#7f1d1d]"
                      }`}>
                        {branch.pickedText}
                      </p>

                      {/* Per-song comment above the button */}
                      {pickedSongData?.comment && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className={`text-xs font-semibold px-4 py-2 rounded-2xl w-full text-center ${
                            isLaugh
                              ? "bg-[#FED7AA]/60 text-[#A16207]"
                              : "bg-[#C2410C]/10 text-[#C2410C] border border-[#C2410C]/20"
                          }`}
                        >
                          💬 {pickedSongData.comment}
                        </motion.p>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          // Song keeps playing into the three sections page intentionally
                          playSuccessChime();
                          if (selectedSong) {
                            saveResponse("song_pick", selectedSong, { artist: pickedSongData?.artist, branch: apologyChoice });
                          }
                          try {
                            confetti({
                              particleCount: 120,
                              spread: 85,
                              origin: { y: 0.6 },
                              colors: ["#F97316", "#FF8A3D", "#FED7AA", "#EF4444"],
                            });
                          } catch {}
                          setIsThreeSectionPhase(true);
                        }}
                        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] font-bold text-base shadow-[0_6px_18px_-3px_rgba(249,115,22,0.45)] cursor-pointer border border-[#FED7AA]/50"
                      >
                        {story.songPhase.continueBtn}
                      </motion.button>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </motion.div>
          );
        })()}

        {/* THREE SECTION STORY PHASE - FULL SCREEN WIDTH */}
        {isThreeSectionPhase && !isUltimateFinalPhase && (
          <motion.div
            key="three-section-phase"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[1400px] mx-auto py-2 sm:py-6 px-2 sm:px-4 md:px-8 flex flex-col items-center"
          >
            {/* THE 3 SECTIONS - BLOG STYLE */}
            <div className="flex flex-col gap-8 sm:gap-14 w-full">
              {story.threeSectionStory.sections.map((sec, idx) => {
                // Section 1 (idx 0): image on right
                // Section 2 (idx 1): image on left
                // Section 3 (idx 2): image on right
                const isImageOnLeft = idx === 1;

                return (
                  <motion.div
                    key={sec.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.45, delay: idx * 0.1 }}
                    className={`flex flex-col ${
                      isImageOnLeft ? "lg:flex-row-reverse" : "lg:flex-row"
                    } items-center justify-between gap-6 md:gap-10 lg:gap-12 w-full bg-[#FFF1DE] p-5 sm:p-8 md:p-10 lg:p-12 rounded-3xl border-3 border-[#FED7AA] shadow-[0_10px_28px_-6px_rgba(249,115,22,0.15)]`}
                  >
                    {/* Text Container - Blog Style Typography */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="text-[11px] font-bold tracking-widest text-[#C2410C] uppercase bg-[#FED7AA]/70 px-3 py-0.5 rounded-full border border-[#FED7AA]">
                          PART 0{sec.id}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2A160B] mb-3 leading-snug">
                        {sec.title}
                      </h3>
                      <p className="text-sm sm:text-base font-medium text-[#2A160B]/85 leading-relaxed sm:leading-loose whitespace-pre-line">
                        {sec.text}
                      </p>
                    </div>

                    {/* Image Container - fits naturally to image size */}
                    <div className="w-full lg:w-1/2 rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-3 border-[#FED7AA] shadow-md bg-[#FFF7ED] flex-shrink-0">
                      <img
                        src={sec.image}
                        alt={sec.alt || sec.title}
                        className="w-full h-auto block"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Button to send her to the final phase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-md mt-14 sm:mt-16 flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Stop any song still playing from the song picker phase
                  if (songAudioRef.current) {
                    songAudioRef.current.pause();
                    songAudioRef.current.currentTime = 0;
                    songAudioRef.current = null;
                  }
                  playSuccessChime();
                  try {
                    confetti({
                      particleCount: 140,
                      spread: 90,
                      origin: { y: 0.6 },
                      colors: ["#F97316", "#FF8A3D", "#FED7AA", "#EF4444"],
                    });
                  } catch {}
                  setIsUltimateFinalPhase(true);
                }}
                className="w-full py-4.5 px-8 rounded-2xl bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] font-black text-lg sm:text-xl shadow-[0_8px_24px_-4px_rgba(249,115,22,0.45)] cursor-pointer flex items-center justify-center gap-2 hover:shadow-[0_12px_28px_-4px_rgba(249,115,22,0.55)] transition-all"
              >
                <span>{story.threeSectionStory.finalPhaseBtn}</span>
                <Sparkles className="w-5 h-5 text-white" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* ULTIMATE FINAL PHASE */}
        {isUltimateFinalPhase && <ProposalPhase />}
      </AnimatePresence>
    </div>
  );
}
