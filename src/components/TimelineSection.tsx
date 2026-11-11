import React, { useEffect, useState, useRef } from 'react';
import { Calendar, Heart, MapPin, Sparkles } from 'lucide-react';
import { proposalConfig, TimelineEvent } from '../config/proposalConfig';

export const TimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = rect.height;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="our-story"
      ref={containerRef}
      className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto z-20"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <p className="font-sans text-xs tracking-widest text-[#E8B4B8] uppercase mb-2">
          Milestones of Our Hearts
        </p>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-normal text-[#F9E8D2]">
          Our Love Story
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E8B4B8] to-transparent mx-auto mt-4" />
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative">
        {/* Background track line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-white/10" />

        {/* Dynamic Glowing Progress Line */}
        <div
          className="absolute left-4 md:left-1/2 top-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#E8B4B8] via-[#FCD34D] to-rose-400 shadow-[0_0_12px_#E8B4B8] transition-all duration-150 ease-out"
          style={{ height: `${scrollProgress * 98}%` }}
        />

        {/* Milestone Cards */}
        <div className="space-y-16 sm:space-y-24">
          {proposalConfig.timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={event.id}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Glowing Heart Node on Timeline Line */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#160B24] border-2 border-[#E8B4B8] shadow-[0_0_15px_rgba(232,180,184,0.6)] flex items-center justify-center z-10">
                  <Heart className="w-3.5 h-3.5 fill-[#E8B4B8] text-[#E8B4B8]" />
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                    isEven ? 'md:text-left' : 'md:text-right'
                  }`}
                >
                  <div className="group glass-card glass-card-hover rounded-2xl p-6 sm:p-7 relative overflow-hidden transition-all duration-500">
                    {/* Top ambient highlight glow */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8B4B8]/40 via-[#FCD34D]/40 to-transparent" />

                    {/* Clean unboxed date kicker */}
                    <div
                      className={`flex items-center gap-2 text-xs font-sans text-[#E8B4B8] tracking-wide mb-2 ${
                        isEven ? 'justify-start' : 'md:justify-end justify-start'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#FCD34D]" />
                      <span>{event.date}</span>
                    </div>

                    <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-[#F9E8D2] mb-3 leading-snug">
                      {event.title}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-rose-100/75 leading-relaxed font-light mb-5">
                      {event.description}
                    </p>

                    {/* Photo with Parallax / Soft Hover Tilt */}
                    <div className="relative rounded-xl overflow-hidden shadow-lg border border-white/10 group-hover:border-[#E8B4B8]/40 transition-colors duration-500 aspect-[4/3] bg-purple-950/40">
                      <img
                        src={event.image}
                        alt={event.altText}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          // Resilient fallback container if image fails
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.classList.add('flex', 'items-center', 'justify-center', 'bg-rose-950/40');
                            parent.innerHTML = `<div class="text-center p-4"><span class="text-3xl">✨</span><p class="font-serif-cormorant text-sm text-[#F9E8D2] mt-2">${event.title}</p></div>`;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                    </div>
                  </div>
                </div>

                {/* Empty opposite column for balanced spacing on desktop */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
