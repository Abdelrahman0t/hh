"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getSoundEnabled, setSoundEnabled, playPopSound } from "@/lib/sound";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(getSoundEnabled());
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    setSoundEnabled(next);
    if (next) {
      playPopSound();
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle playful sounds"
      className="fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF1DE]/90 border border-[#FED7AA] text-[#C2410C] hover:bg-[#FED7AA]/60 text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
    >
      {enabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#F97316] animate-pulse" />
          <span>sound on</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 opacity-60" />
          <span className="opacity-75">sound off</span>
        </>
      )}
    </button>
  );
}
