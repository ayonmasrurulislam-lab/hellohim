import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RotateCcw, Share2, Check } from 'lucide-react';
import { proposalConfig } from '../config/proposalConfig';

interface CelebrationModalProps {
  isOpen: boolean;
  onReplay: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({ isOpen, onReplay }) => {
  const [copied, setCopied] = React.useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Trigger multiple bursts of golden and rose-gold fireworks & confetti
    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;

    const colors = ['#FDE68A', '#FCD34D', '#E8B4B8', '#F43F5E', '#FFFFFF'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Grand center burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors
    });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleShare = async () => {
    const text = `Khandaker Him said YES! 💍✨ Forever starts now!`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'She Said YES!',
          text,
          url: window.location.href
        });
      } catch {
        // Fallback to clipboard
      }
    } else {
      await navigator.clipboard.writeText(text + ' ' + window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Proposal Celebration"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-700 overflow-y-auto"
    >
      {/* Upward Floating Hearts Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[#E8B4B8]/60 animate-bounce"
            style={{
              left: `${(i * 5.8) % 100}%`,
              bottom: '-20px',
              animation: `riseUp ${4 + (i % 4)}s linear infinite`,
              animationDelay: `${(i * 0.4)}s`,
              fontSize: `${18 + (i % 16)}px`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main Keepsake Certificate Card */}
      <div
        ref={containerRef}
        className="relative w-full max-w-xl p-8 sm:p-12 rounded-3xl glass-card border border-[#FCD34D]/50 shadow-[0_0_80px_rgba(253,230,138,0.35)] text-center my-8 z-10 animate-in zoom-in-95 duration-500"
      >
        {/* Glowing Top Ring Badge */}
        <div className="mx-auto w-20 h-20 mb-6 rounded-full bg-gradient-to-tr from-amber-400/20 via-rose-500/20 to-amber-200/30 border border-[#FCD34D]/60 flex items-center justify-center shadow-[0_0_30px_rgba(253,230,138,0.5)]">
          <span className="text-4xl animate-pulse">💍</span>
        </div>

        {/* Celebration Title */}
        <div className="space-y-2 mb-6">
          <p className="font-sans text-xs tracking-widest text-[#FCD34D] uppercase font-semibold">
            Together Forever
          </p>
          <h2 className="font-serif-cormorant text-4xl sm:text-5xl font-bold text-[#F9E8D2] tracking-wide">
            {proposalConfig.celebrationTitle}
          </h2>
          <h3 className="font-script text-3xl sm:text-4xl text-[#FDE68A] gold-shimmer">
            {proposalConfig.celebrationSubtitle}
          </h3>
        </div>

        {/* Keepsake Memory Box */}
        <div className="p-6 rounded-2xl bg-black/40 border border-[#E8B4B8]/20 my-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-[#E8B4B8]">
            <Sparkles className="w-4 h-4 text-[#FCD34D]" />
            <span className="font-sans text-xs uppercase tracking-widest text-rose-200/80">
              Promise of a Lifetime
            </span>
            <Sparkles className="w-4 h-4 text-[#FCD34D]" />
          </div>

          <p className="font-serif-cormorant text-xl sm:text-2xl italic text-rose-100/90 leading-relaxed">
            "Two souls, one destiny, and a lifetime of adventures ahead."
          </p>

          <p className="font-serif-cormorant text-base sm:text-lg text-[#F9E8D2]/80 pt-2 border-t border-white/10">
            {proposalConfig.celebrationFinalNote}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-2">
          {/* Share/Save Keepsake */}
          <button
            onClick={handleShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-sans font-medium text-[#F9E8D2] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#E8B4B8]" />
                <span>Share Our Moment</span>
              </>
            )}
          </button>

          {/* Replay Our Story */}
          <button
            onClick={onReplay}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#E8B4B8] to-[#FCD34D] text-slate-950 text-sm font-sans font-bold shadow-lg shadow-rose-950/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Our Story</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes riseUp {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-110vh) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
