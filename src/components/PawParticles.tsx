"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export function PawParticles({ particles }: { particles: Particle[] }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-40">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: p.scale * 0.5, x: p.x, y: p.y }}
            animate={{
              opacity: 0,
              scale: p.scale * 1.3,
              y: p.y - 70 - Math.random() * 50,
              x: p.x + (Math.random() - 0.5) * 80,
              rotate: p.rotation + (Math.random() - 0.5) * 60,
            }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#F97316"
              className="drop-shadow-sm opacity-85"
            >
              {/* Cute cat paw */}
              <circle cx="8" cy="7" r="2.2" />
              <circle cx="12" cy="5" r="2.2" />
              <circle cx="16" cy="7" r="2.2" />
              <circle cx="6" cy="11" r="1.8" />
              <path d="M12 10.5 C8 10.5 6 13.5 7.5 17.5 C9 20 15 20 16.5 17.5 C18 13.5 16 10.5 12 10.5 Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function spawnPawParticles(
  e: React.MouseEvent<HTMLElement> | { clientX: number; clientY: number },
  count = 6
): Particle[] {
  const x = "clientX" in e ? e.clientX : window.innerWidth / 2;
  const y = "clientY" in e ? e.clientY : window.innerHeight / 2;

  return Array.from({ length: count }, (_, i) => ({
    id: Date.now() + i + Math.random(),
    x: x + (Math.random() - 0.5) * 30,
    y: y + (Math.random() - 0.5) * 20,
    rotation: Math.random() * 360,
    scale: 0.8 + Math.random() * 0.5,
  }));
}
