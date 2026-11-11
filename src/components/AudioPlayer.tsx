import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    return soundEngine.subscribe((playing, muted) => {
      setIsPlaying(playing);
      setIsMuted(muted);
    });
  }, []);

  const handleToggle = () => {
    if (!isPlaying) {
      soundEngine.play();
    } else {
      soundEngine.toggleMute();
    }
  };

  return (
    <div className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 sm:py-2 rounded-full glass-card border border-[#E8B4B8]/30 hover:border-[#E8B4B8]/60 transition-all duration-300 text-xs text-[#F9E8D2] hover:text-white shadow-xl shadow-black/60 backdrop-blur-md cursor-pointer"
        aria-label={isMuted || !isPlaying ? "Unmute romantic background music" : "Mute romantic background music"}
      >
        {isPlaying && !isMuted ? (
          <>
            <span className="flex items-center gap-0.5 h-3.5 w-3.5" aria-hidden="true">
              <span className="w-0.5 h-full bg-[#E8B4B8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-3/4 bg-[#FCD34D] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-full bg-[#E8B4B8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
            <Volume2 className="w-4 h-4 text-[#E8B4B8] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-sans text-[11px] tracking-wide text-[#E8B4B8]">Our Song Playing</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-rose-300/80 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-sans text-[11px] tracking-wide text-rose-200/80">Music Muted</span>
          </>
        )}
      </button>
    </div>
  );
};
