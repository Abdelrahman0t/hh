"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { story } from "@/data/story";
import { playPopSound } from "@/lib/sound";
import { trackEvent } from "@/lib/tracking";

interface JokeVideoProps {
  onNext: () => void;
}

export function JokeVideo({ onNext }: JokeVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    trackEvent("video_played", { timestamp: new Date().toISOString() });
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay was prevented by browser policy
          setIsPlaying(false);
        });
    }
  }, []);

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (hasEnded) {
        videoRef.current.currentTime = 0;
        setHasEnded(false);
      }
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleNextClick = () => {
    playPopSound();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center px-4 w-full max-w-md mx-auto"
    >
      {/* Short Text Above Video */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2A160B] mb-1">
        {story.privateJoke.text}
      </h2>
      <p className="text-xs font-semibold text-[#A16207] tracking-wider mb-6">
        {story.privateJoke.subtext}
      </p>

      {/* Video Container with Subtle Orange Glow */}
      <div className="relative w-full aspect-square max-w-[320px] rounded-3xl overflow-hidden bg-[#FFF1DE] border-3 border-[#FED7AA] shadow-[0_0_35px_rgba(249,115,22,0.25)] flex items-center justify-center mb-8 group">
        {!hasError ? (
          <video
            ref={videoRef}
            src={story.privateJoke.video}
            muted
            playsInline
            autoPlay
            loop={true}
            controls={false}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover rounded-2xl cursor-pointer"
            onClick={handlePlayToggle}
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-20 h-20 rounded-full bg-[#FED7AA]/60 flex items-center justify-center text-3xl mb-3 shadow-inner"
            >
              🎬
            </motion.div>
            <p className="text-sm font-bold text-[#C2410C]">
              1-Second Joke Video
            </p>
            <p className="text-[11px] text-[#A16207] mt-1 font-mono">
              (add {story.privateJoke.video})
            </p>
          </div>
        )}

        {/* Play button overlay if autoplay was restricted by browser */}
        {!hasError && !isPlaying && (
          <button
            onClick={handlePlayToggle}
            aria-label="Play video"
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#F97316]/90 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer"
          >
            <Play className="w-7 h-7 fill-current ml-1" />
          </button>
        )}
      </div>

      {/* Button Under Video: "okay next →" */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleNextClick}
        className="w-full max-w-xs py-3.5 px-6 bg-gradient-to-r from-[#F97316] to-[#FF8A3D] text-[#FFF7ED] font-bold rounded-2xl shadow-[0_8px_20px_-4px_rgba(249,115,22,0.45)] hover:shadow-[0_12px_24px_-4px_rgba(249,115,22,0.55)] border border-[#FED7AA]/50 cursor-pointer text-base"
      >
        {story.privateJoke.button}
      </motion.button>
    </motion.div>
  );
}
