"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CatIntro } from "@/components/CatIntro";
import { MissSlider } from "@/components/MissSlider";
import { SureSequence } from "@/components/SureSequence";
import { ArabicQuestion } from "@/components/ArabicQuestion";
import { JokeVideo } from "@/components/JokeVideo";
import { MyBad } from "@/components/MyBad";
import { MessageBox } from "@/components/MessageBox";
import { SoundToggle } from "@/components/SoundToggle";
import { PawBackground } from "@/components/PawBackground";
import { PawParticles, Particle, spawnPawParticles } from "@/components/PawParticles";
import { trackEvent } from "@/lib/tracking";

export type Step =
  | "intro"
  | "slider"
  | "sure"
  | "arabic"
  | "joke"
  | "myBad"
  | "message";

export function Experience() {
  const [currentStep, setCurrentStep] = useState<Step>("intro");
  const [missScore, setMissScore] = useState<number>(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Track initial page open
  useEffect(() => {
    trackEvent("opened", {
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
    });
  }, []);

  const triggerParticles = (e: React.MouseEvent<HTMLElement>) => {
    const newParticles = spawnPawParticles(e, 8);
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 1000);
  };

  const handleIntroComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerParticles(e);
    setCurrentStep("slider");
  };

  const handleSliderConfirm = (score: number) => {
    setMissScore(score);
    setCurrentStep("sure");
  };

  const handleSureProceed = () => {
    setCurrentStep("arabic");
  };

  const handleArabicAnswer = (answer: "yes" | "no") => {
    // If 'yes' (اه) or after 'no' reaction, proceed to inside joke video
    setCurrentStep("joke");
  };

  const handleJokeNext = () => {
    setCurrentStep("myBad");
  };

  const handleMyBadNext = () => {
    setCurrentStep("message");
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col overflow-x-hidden">
      {/* Background Ambience */}
      <PawBackground />

      {/* Floating Paw Particles */}
      <PawParticles particles={particles} />

      {/* Audio Toggle Top-Right */}
      <SoundToggle />

      {/* Main Experience Container */}
      <div
        className={`relative z-10 w-full flex items-center justify-center transition-all duration-500 ${
          currentStep === "message"
            ? "max-w-[1440px] mx-auto w-full py-8 sm:py-12 px-3 sm:px-6 lg:px-8 flex-1"
            : "flex-1 px-4 sm:px-6"
        }`}
      >
        <AnimatePresence mode="wait">
          {currentStep === "intro" && (
            <motion.div
              key="intro"
              className="w-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <CatIntro onNext={handleIntroComplete} />
            </motion.div>
          )}

          {currentStep === "slider" && (
            <motion.div
              key="slider"
              className="w-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <MissSlider initialScore={missScore} onConfirm={handleSliderConfirm} />
            </motion.div>
          )}

          {currentStep === "sure" && (
            <motion.div
              key="sure"
              className="w-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <SureSequence score={missScore} onProceed={handleSureProceed} />
            </motion.div>
          )}

          {currentStep === "arabic" && (
            <motion.div
              key="arabic"
              className="w-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <ArabicQuestion onAnswer={handleArabicAnswer} />
            </motion.div>
          )}

          {currentStep === "joke" && (
            <motion.div
              key="joke"
              className="w-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <JokeVideo onNext={handleJokeNext} />
            </motion.div>
          )}

          {currentStep === "myBad" && (
            <motion.div
              key="myBad"
              className="w-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <MyBad onNext={handleMyBadNext} />
            </motion.div>
          )}

          {currentStep === "message" && (
            <motion.div
              key="message"
              className="w-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <MessageBox />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
