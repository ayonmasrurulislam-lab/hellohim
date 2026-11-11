import React, { useState, useEffect } from 'react';
import { BackgroundParticles } from './components/BackgroundParticles';
import { CustomCursor } from './components/CustomCursor';
import { AudioPlayer } from './components/AudioPlayer';
import { IntroScreen } from './components/IntroScreen';
import { HeroSection } from './components/HeroSection';
import { TimelineSection } from './components/TimelineSection';
import { GallerySection } from './components/GallerySection';
import { LoveReasonsSection } from './components/LoveReasonsSection';
import { StarrySkySection } from './components/StarrySkySection';
import { ProposalSection } from './components/ProposalSection';
import { CelebrationModal } from './components/CelebrationModal';
import { SecretNoteModal } from './components/SecretNoteModal';
import { proposalConfig } from './config/proposalConfig';
import { Heart } from 'lucide-react';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isSecretNoteOpen, setIsSecretNoteOpen] = useState(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);

  // Check URL params for automated testing / autostart
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1' || params.get('skipIntro') === '1') {
      setHasStarted(true);
    }
    if (params.get('celebrate') === '1') {
      setHasStarted(true);
      setIsCelebrationOpen(true);
    }
  }, []);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    setIsCelebrationOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#090514] text-[#F9E8D2] font-sans overflow-x-hidden selection:bg-[#E8B4B8]/30 selection:text-white">
      {/* Film Grain & Dark Ambient Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,90,0.25),rgba(255,255,255,0))] film-grain opacity-80" />

      {/* Floating Canvas Particles (Petals, Bokeh, Hearts) */}
      <BackgroundParticles />

      {/* Custom Desktop Sparkling Heart Cursor */}
      <CustomCursor />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Intro Loading Screen */}
      {!hasStarted && <IntroScreen onStart={handleStart} />}

      {/* Secret Love Note Easter Egg Modal */}
      <SecretNoteModal
        isOpen={isSecretNoteOpen}
        onClose={() => setIsSecretNoteOpen(false)}
      />

      {/* Proposal Celebration Grand Climax Modal */}
      <CelebrationModal
        isOpen={isCelebrationOpen}
        onReplay={handleReplay}
      />

      {/* Top Navigation Bar adhering to the Top Bar Contract */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#090514]/70 border-b border-[#E8B4B8]/15 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection('hero');
            }}
            className="font-serif-cormorant text-xl sm:text-2xl font-semibold tracking-wide text-[#F9E8D2] hover:text-[#E8B4B8] transition-colors whitespace-nowrap shrink-0"
          >
            Him & Ayon
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-sans text-rose-100/70">
            <button
              onClick={() => handleScrollToSection('our-story')}
              className="hover:text-white hover:underline underline-offset-8 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Our Story
            </button>
            <button
              onClick={() => handleScrollToSection('gallery')}
              className="hover:text-white hover:underline underline-offset-8 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Moments
            </button>
            <button
              onClick={() => handleScrollToSection('love-reasons')}
              className="hover:text-white hover:underline underline-offset-8 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Why I Love You
            </button>
            <button
              onClick={() => handleScrollToSection('starry-sky')}
              className="hover:text-white hover:underline underline-offset-8 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              The Stars
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleScrollToSection('proposal')}
              className="px-4 py-2 text-xs font-sans font-semibold rounded-full bg-gradient-to-r from-[#E8B4B8] to-[#F3C5C5] text-slate-950 shadow-md shadow-rose-950/40 hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Marry Me 💍
            </button>
          </div>
        </div>
      </header>

      {/* Main Interactive Love Story Experience */}
      <main className="relative z-10">
        {/* Section 2: Hero */}
        <HeroSection
          onOpenSecretNote={() => setIsSecretNoteOpen(true)}
          onScrollToStory={() => handleScrollToSection('our-story')}
        />

        {/* Section 3: Our Story Timeline */}
        <TimelineSection />

        {/* Section 4: Photo Gallery */}
        <GallerySection />

        {/* Section 5: Things I Love About You */}
        <LoveReasonsSection />

        {/* Section 6: Starry Sky Moment */}
        <StarrySkySection />

        {/* Section 7: The Proposal Climax */}
        <ProposalSection onAccept={() => setIsCelebrationOpen(true)} />
      </main>

      {/* Romantic Footer */}
      <footer className="relative z-20 py-12 px-6 border-t border-[#E8B4B8]/15 text-center text-xs font-sans text-rose-200/50 space-y-2">
        <p className="flex items-center justify-center gap-1.5">
          Crafted with endless love for {proposalConfig.partnerName}{' '}
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 inline" />
        </p>
        <p className="text-[11px] text-rose-200/35">
          "From this day until our last, every beat of my heart belongs to you."
        </p>
      </footer>
    </div>
  );
}
