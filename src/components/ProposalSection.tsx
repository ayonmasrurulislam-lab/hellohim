import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { proposalConfig } from '../config/proposalConfig';
import { calculateNextEvasion, EvasionState } from '../utils/evasionMath';

interface ProposalSectionProps {
  onAccept: () => void;
}

export const ProposalSection: React.FC<ProposalSectionProps> = ({ onAccept }) => {
  const [typedMessage, setTypedMessage] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Runaway button state
  const [evasionState, setEvasionState] = useState<EvasionState>({
    attemptCount: 0,
    x: 0,
    y: 0,
    scale: 1,
    label: 'Let me think…',
    isGone: false
  });

  const fullMessage = proposalConfig.proposalMessage;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullMessage.length) {
        setTypedMessage(fullMessage.slice(0, index + 1));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [fullMessage]);

  const handleEvasion = () => {
    if (evasionState.isGone) return;

    const bounds = containerRef.current
      ? {
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        }
      : { width: 340, height: 180 };

    const nextState = calculateNextEvasion(evasionState.attemptCount, bounds);
    setEvasionState(nextState);
  };

  return (
    <section
      id="proposal"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center text-center z-20"
    >
      {/* Spotlight Effect Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] rounded-full bg-gradient-to-tr from-amber-500/15 via-rose-500/20 to-purple-900/30 blur-[120px] pointer-events-none" />

      {/* Main Glass Proposal Card */}
      <div className="relative w-full max-w-3xl glass-card rounded-3xl p-6 sm:p-12 md:p-16 border border-[#E8B4B8]/40 shadow-[0_0_60px_rgba(232,180,184,0.25)]">
        {/* Animated Sparkling Solitaire Diamond Ring Graphic */}
        <div className="relative mx-auto mb-8 w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          {/* Rotating Ring Halo Light Rays */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/20 via-rose-400/20 to-transparent animate-spin blur-md" style={{ animationDuration: '12s' }} />

          {/* Glowing Ring SVG */}
          <svg
            viewBox="0 0 160 160"
            className="w-full h-full drop-shadow-[0_0_20px_rgba(253,230,138,0.7)] animate-pulse"
            style={{ animationDuration: '3s' }}
          >
            {/* Golden Ring Band */}
            <circle
              cx="80"
              cy="98"
              r="46"
              fill="none"
              stroke="url(#goldBandGradient)"
              strokeWidth="9"
              strokeLinecap="round"
            />
            {/* Ring Inner Shadow & Shading */}
            <circle
              cx="80"
              cy="98"
              r="40"
              fill="none"
              stroke="#D97706"
              strokeWidth="1.5"
              opacity="0.4"
            />

            {/* Ring Prongs holding Diamond */}
            <path
              d="M 68 56 L 74 46 M 92 56 L 86 46 M 75 56 L 78 45 M 85 56 L 82 45"
              stroke="#FDE68A"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Solitaire Diamond Gemstone */}
            <polygon
              points="80,24 102,44 80,66 58,44"
              fill="url(#diamondGradient)"
              stroke="#FFF"
              strokeWidth="1.5"
            />
            {/* Diamond Facets */}
            <line x1="80" y1="24" x2="80" y2="66" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
            <line x1="58" y1="44" x2="102" y2="44" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
            <line x1="68" y1="34" x2="92" y2="34" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
            <line x1="68" y1="54" x2="92" y2="54" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />

            {/* Diamond Sparkle Glint Star */}
            <g transform="translate(100, 24)" className="animate-spin" style={{ transformOrigin: '100px 24px', animationDuration: '6s' }}>
              <path
                d="M 0 -8 Q 0 0 8 0 Q 0 0 0 8 Q 0 0 -8 0 Q 0 0 0 -8 Z"
                fill="#FFFFFF"
                opacity="0.95"
              />
            </g>

            <defs>
              <linearGradient id="goldBandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="35%" stopColor="#D97706" />
                <stop offset="70%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
              <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#E0F2FE" />
                <stop offset="80%" stopColor="#BAE6FD" />
                <stop offset="100%" stopColor="#7DD3FC" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Slow Typewritten Personal Message */}
        <div className="mb-8 min-h-[90px] sm:min-h-[110px] text-center">
          <p className="font-serif-cormorant text-lg sm:text-2xl text-rose-100/90 italic font-light leading-relaxed">
            "{typedMessage}"
            {!isTypingDone && (
              <span className="inline-block w-1.5 h-5 ml-1 bg-[#FCD34D] animate-pulse" />
            )}
          </p>
        </div>

        {/* Big Glowing Climax Proposal Question */}
        <div className="my-8">
          <p className="font-sans text-xs tracking-widest text-[#E8B4B8] uppercase mb-2">
            My Question to You
          </p>
          <h2 className="font-serif-cormorant text-3xl sm:text-5xl md:text-6xl font-bold text-[#F9E8D2] tracking-wide leading-tight">
            <span className="block font-script text-5xl sm:text-7xl md:text-8xl gold-shimmer py-2">
              {proposalConfig.partnerName},
            </span>
            {proposalConfig.proposalQuestion}
          </h2>
        </div>

        {/* Interactive Buttons Container */}
        <div
          ref={containerRef}
          className="relative min-h-[140px] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-10 pt-4"
        >
          {/* THE YES BUTTON */}
          <button
            onClick={onAccept}
            data-testid="proposal-yes-btn"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 sm:px-14 sm:py-5 rounded-full bg-gradient-to-r from-[#E8B4B8] via-[#F3C5C5] to-[#FCD34D] text-slate-950 font-serif-cormorant text-xl sm:text-2xl font-bold tracking-wider shadow-[0_0_40px_rgba(232,180,184,0.6)] hover:shadow-[0_0_60px_rgba(253,230,138,0.9)] hover:scale-108 active:scale-95 transition-all duration-300 cursor-pointer z-30 animate-pulse"
          >
            <span>YES 💍</span>
            <Heart className="w-6 h-6 fill-rose-950 text-rose-950 group-hover:scale-125 transition-transform" />
          </button>

          {/* PLAYFUL RUNAWAY "Let me think…" BUTTON */}
          {!evasionState.isGone && (
            <div
              style={{
                transform: `translate(${evasionState.x}px, ${evasionState.y}px) scale(${evasionState.scale})`,
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease-out',
                opacity: evasionState.scale
              }}
              className="inline-block z-20"
            >
              <button
                type="button"
                onMouseEnter={handleEvasion}
                onTouchStart={handleEvasion}
                onClick={handleEvasion}
                data-testid="proposal-no-btn"
                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-rose-200/80 hover:text-white font-sans text-sm tracking-wide transition-colors whitespace-nowrap cursor-pointer select-none"
              >
                {evasionState.label}
              </button>
            </div>
          )}
        </div>

        {/* Gentle hint */}
        <p className="mt-8 text-xs font-sans text-rose-200/40 tracking-wider">
          {evasionState.isGone
            ? "There was only ever one answer in the stars ✨"
            : "Listen to what your heart whispers"}
        </p>
      </div>
    </section>
  );
};
