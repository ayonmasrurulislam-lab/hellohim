import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, ArrowRight, RotateCcw } from 'lucide-react';
import { proposalConfig } from '../config/proposalConfig';

export const LoveReasonsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const reasons = proposalConfig.thingsILove;

  const currentFullText = reasons[currentIndex];

  useEffect(() => {
    setIsTyping(true);
    setDisplayText('');
    let charIndex = 0;

    const timer = setInterval(() => {
      if (charIndex < currentFullText.length) {
        setDisplayText(currentFullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 38);

    return () => clearInterval(timer);
  }, [currentIndex, currentFullText]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reasons.length);
  };

  const handleSelectReason = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="love-reasons" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto z-20">
      {/* Background radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-rose-900/15 blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-14">
        <p className="font-sans text-xs tracking-widest text-[#E8B4B8] uppercase mb-2">
          From the depths of my heart
        </p>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-normal text-[#F9E8D2]">
          Things I Love About You
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E8B4B8] to-transparent mx-auto mt-4" />
      </div>

      {/* Interactive Typewriter Showcase Card */}
      <div className="relative glass-card rounded-3xl p-8 sm:p-12 text-center border border-[#E8B4B8]/30 shadow-2xl shadow-black/80 max-w-2xl mx-auto min-h-[300px] flex flex-col justify-between">
        {/* Subtle decorative sparkles in corner */}
        <div className="absolute top-4 left-5 text-[#FCD34D] opacity-60">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div className="absolute bottom-4 right-5 text-[#E8B4B8] opacity-60">
          <Heart className="w-5 h-5 fill-[#E8B4B8]/40 animate-pulse" />
        </div>

        {/* Counter Badge */}
        <div className="inline-flex items-center justify-center gap-2 mx-auto px-4 py-1.5 rounded-full bg-rose-950/40 border border-[#E8B4B8]/20 text-xs font-sans text-[#E8B4B8] mb-6">
          <span>Reason {currentIndex + 1} of {reasons.length}</span>
        </div>

        {/* Typewritten Quote */}
        <div className="my-auto py-4">
          <p className="font-serif-cormorant text-2xl sm:text-3xl md:text-4xl text-[#F9E8D2] font-normal italic leading-relaxed min-h-[100px] flex items-center justify-center">
            "{displayText}
            {isTyping && <span className="inline-block w-1.5 h-7 ml-1 bg-[#FCD34D] animate-pulse" />}
            "
          </p>
        </div>

        {/* Actions & Pagination Dots */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Progress dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Love reasons tabs">
            {reasons.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Jump to reason ${i + 1}`}
                onClick={() => handleSelectReason(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex
                    ? 'w-8 bg-gradient-to-r from-[#E8B4B8] to-[#FCD34D]'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#E8B4B8]/20 border border-[#E8B4B8]/30 hover:border-[#E8B4B8]/60 text-sm font-sans font-medium text-[#F9E8D2] hover:text-white transition-all cursor-pointer"
          >
            <span>{currentIndex === reasons.length - 1 ? 'Start from beginning' : 'Next reason'}</span>
            {currentIndex === reasons.length - 1 ? (
              <RotateCcw className="w-4 h-4 text-[#E8B4B8] group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <ArrowRight className="w-4 h-4 text-[#E8B4B8] group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
