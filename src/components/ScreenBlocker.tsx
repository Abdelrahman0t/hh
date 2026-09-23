"use client";

import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// 📝 EDIT YOUR MESSAGE HERE:
// Change the text below to whatever message you want to display on small screens.
// ─────────────────────────────────────────────────────────────────────────────
export const SMALL_SCREEN_MESSAGE = {
  emoji: "",
  title: "you fucking asshole خخخخخخخخخخخخخخخ",
  subtitle: "i coded this shit for more than 4 hours straight get your pretty lazy ass up and open it on your computer for better experiance",
  hint: "i hope you have fun tho cupcake (and turn the volumn up)",
};

// Screens narrower than this width (in pixels) will be locked
const MIN_SCREEN_WIDTH = 768;
// ─────────────────────────────────────────────────────────────────────────────

export function ScreenBlocker({ children }: { children: React.ReactNode }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsSmallScreen(window.innerWidth < MIN_SCREEN_WIDTH);
      setChecked(true);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Avoid flash before first measurement
  if (!checked) return null;

  if (isSmallScreen) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#FFF7ED] px-6 py-12">
        <div className="flex flex-col items-center text-center gap-5 max-w-sm bg-[#FFF1DE] border-3 border-[#FED7AA] rounded-3xl p-8 shadow-[0_15px_35px_-5px_rgba(249,115,22,0.2)]">
          {/* Animated emoji */}
          <div
            className="text-6xl mb-1 select-none"
            style={{ animation: "gentleBounce 2s ease-in-out infinite" }}
          >
            {SMALL_SCREEN_MESSAGE.emoji}
          </div>

          <h1 className="text-2xl font-black text-[#2A160B] leading-snug">
            {SMALL_SCREEN_MESSAGE.title}
          </h1>

          <p className="text-base font-bold text-[#C2410C] leading-relaxed">
            {SMALL_SCREEN_MESSAGE.subtitle}
          </p>

          {SMALL_SCREEN_MESSAGE.hint && (
            <p className="text-xs text-[#A16207] font-semibold opacity-75">
              {SMALL_SCREEN_MESSAGE.hint}
            </p>
          )}

          {/* Decorative paw prints */}
          <div className="flex gap-2 mt-1 opacity-40 text-xl select-none">
            🐾 🐾 🐾
          </div>
        </div>

        <style>{`
          @keyframes gentleBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}
