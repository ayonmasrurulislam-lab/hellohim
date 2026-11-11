import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { proposalConfig } from '../config/proposalConfig';
import { soundEngine } from '../utils/soundEngine';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleBegin = () => {
    setIsFadingOut(true);
    // Start romantic background music
    soundEngine.play();
    setTimeout(() => {
      onStart();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06030c] px-6 text-center transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Soft Ambient Background Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-rose-900/15 blur-3xl pointer-events-none" />

      {/* Pulsing Heart Animation */}
      <div className="relative mb-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-900/40 via-rose-500/20 to-amber-500/20 flex items-center justify-center p-4 border border-[#E8B4B8]/30 shadow-[0_0_50px_rgba(232,180,184,0.35)] animate-pulse">
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#E8B4B8] fill-[#E8B4B8] drop-shadow-[0_0_15px_rgba(232,180,184,0.8)]" />
        </div>
        <div className="absolute -top-1 -right-1 text-amber-200/80 animate-spin" style={{ animationDuration: '8s' }}>
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      {/* Main Text Fade In */}
      <div className="space-y-4 max-w-md">
        <h1 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-normal text-[#F9E8D2] tracking-wide leading-tight">
          <span className="font-script text-4xl sm:text-5xl md:text-6xl text-[#FDE68A] block mb-2 gold-shimmer">
            {proposalConfig.partnerName}
          </span>
          this is for you.
        </h1>
        <p className="font-sans text-xs sm:text-sm text-rose-200/60 tracking-wider uppercase">
          A true love story · Turn your sound on
        </p>
      </div>

      {/* Tap To Begin Button */}
      <button
        onClick={handleBegin}
        data-testid="tap-to-begin-btn"
        className="mt-12 group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E8B4B8] via-[#F3C5C5] to-[#EED9B3] text-slate-950 font-sans font-medium text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(232,180,184,0.4)] hover:shadow-[0_0_45px_rgba(232,180,184,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Tap to begin our love story"
      >
        <span>Tap to begin</span>
        <Heart className="w-4 h-4 fill-slate-950 text-slate-950 group-hover:scale-125 transition-transform" />
      </button>

      <span className="mt-4 text-[11px] text-rose-200/40 tracking-wider">
        Best experienced with sound
      </span>
    </div>
  );
};
