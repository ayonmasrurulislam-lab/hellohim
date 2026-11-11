import React from 'react';
import { X, Heart } from 'lucide-react';
import { proposalConfig } from '../config/proposalConfig';

interface SecretNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretNoteModal: React.FC<SecretNoteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Secret Love Note"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300"
    >
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl glass-card border border-[#E8B4B8]/40 shadow-2xl shadow-rose-950/80 text-center animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-rose-300/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          aria-label="Close secret love note"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto w-12 h-12 mb-4 rounded-full bg-[#E8B4B8]/10 border border-[#E8B4B8]/30 flex items-center justify-center text-[#E8B4B8]">
          <Heart className="w-6 h-6 fill-[#E8B4B8] animate-pulse" />
        </div>

        <p className="font-sans text-xs tracking-widest text-[#E8B4B8] uppercase mb-1">
          A Secret Whisper
        </p>
        
        <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-semibold text-[#F9E8D2] mb-4">
          For You, My Love
        </h3>

        <div className="relative my-4 p-5 rounded-xl bg-black/40 border border-[#E8B4B8]/15 text-left">
          <p className="font-serif-cormorant text-lg sm:text-xl italic text-rose-100/90 leading-relaxed">
            "{proposalConfig.secretLoveNote}"
          </p>
          <p className="font-script text-2xl sm:text-3xl text-right text-[#FDE68A] mt-4">
            Forever yours, {proposalConfig.proposerName}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E8B4B8] to-[#F3C5C5] text-slate-950 font-medium text-sm hover:brightness-110 active:scale-95 transition-all shadow-md shadow-rose-950/40 cursor-pointer"
        >
          Keep this in my heart
        </button>
      </div>
    </div>
  );
};
