import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile touch screens
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let count = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Add sparkle every 3rd move to avoid overhead
      count++;
      if (count % 3 === 0) {
        const newSparkle: Sparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          size: Math.random() * 4 + 2
        };
        setSparkles((prev) => [...prev.slice(-12), newSparkle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Clean up old sparkles
    const interval = setInterval(() => {
      setSparkles((prev) => prev.slice(1));
    }, 120);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  if (isTouchDevice || pos.x < 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Floating Sparkle Trail */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-[#E8B4B8] shadow-[0_0_8px_#FCD34D] transition-opacity duration-300"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            opacity: 0.65,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Main Heart Indicator Glow */}
      <div
        className="fixed transition-transform duration-75 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-4 h-4 text-[#E8B4B8]/80 drop-shadow-[0_0_10px_rgba(232,180,184,0.8)] animate-pulse">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
