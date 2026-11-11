import React from 'react';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import { proposalConfig } from '../config/proposalConfig';

interface HeroSectionProps {
  onOpenSecretNote: () => void;
  onScrollToStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSecretNote,
  onScrollToStory
}) => {

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 pb-12 text-center"
    >
      {/* Soft Center Ambient Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] rounded-full bg-gradient-to-tr from-rose-950/30 via-purple-900/20 to-amber-500/10 blur-[100px] pointer-events-none" />

      {/* Secret Easter Egg Heart */}
      <div className="relative mb-6 z-20">
        <button
          onClick={onOpenSecretNote}
          data-testid="secret-heart-btn"
          className="group relative p-3 sm:p-4 rounded-full glass-card border border-[#E8B4B8]/30 hover:border-[#E8B4B8]/70 hover:scale-115 active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(232,180,184,0.3)] cursor-pointer"
          title="Click me for a secret note ✨"
          aria-label="Secret Love Note (Click the heart)"
        >
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#E8B4B8] fill-[#E8B4B8]/30 group-hover:fill-[#E8B4B8] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_#FCD34D]" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FCD34D] opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#FCD34D]" />
          </span>
        </button>
        <p className="mt-2 text-[11px] font-sans tracking-widest text-[#E8B4B8]/70 uppercase">
          Touch the heart for a secret note
        </p>
      </div>

      {/* Letter-by-letter revealed handwritten name */}
      <div className="z-20 max-w-3xl mx-auto">
        <h1
          className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-normal text-[#FDE68A] gold-shimmer py-2 leading-tight drop-shadow-[0_0_35px_rgba(253,230,138,0.7)] animate-in fade-in zoom-in-95 duration-1000"
          aria-label={proposalConfig.partnerName}
        >
          {proposalConfig.partnerName}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 font-serif-cormorant text-xl sm:text-2xl md:text-3xl text-[#F9E8D2]/90 font-light max-w-xl mx-auto leading-relaxed">
          {proposalConfig.heroSubtitle}
        </p>

        {/* Romantic quote ornament */}
        <div className="flex items-center justify-center gap-3 mt-6 text-[#E8B4B8]/60">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#E8B4B8]/40" />
          <Sparkles className="w-4 h-4 text-[#FDE68A]" />
          <span className="text-xs font-sans tracking-widest uppercase text-rose-200/60">
            A Journey of Love
          </span>
          <Sparkles className="w-4 h-4 text-[#FDE68A]" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#E8B4B8]/40" />
        </div>
      </div>

      {/* Bouncing Scroll Down Prompt */}
      <div className="mt-14 sm:mt-20 z-20">
        <button
          onClick={onScrollToStory}
          className="group flex flex-col items-center gap-2 text-rose-200/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll down to begin our story"
        >
          <span className="text-xs font-sans tracking-wider uppercase text-rose-200/60 group-hover:text-rose-100 transition-colors">
            Our Story Begins
          </span>
          <div className="w-8 h-8 rounded-full border border-rose-300/30 flex items-center justify-center group-hover:border-rose-300/80 group-hover:bg-rose-500/10 transition-all animate-bounce">
            <ChevronDown className="w-4 h-4 text-[#E8B4B8]" />
          </div>
        </button>
      </div>

      <style>{`
        @keyframes fadeInLetter {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
};
