import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Heart, Maximize2 } from 'lucide-react';
import { proposalConfig, GalleryPhoto } from '../config/proposalConfig';

export const GallerySection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = proposalConfig.galleryPhotos;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="font-sans text-xs tracking-widest text-[#E8B4B8] uppercase mb-2">
          Frozen In Time
        </p>
        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-normal text-[#F9E8D2]">
          Our Favorite Moments
        </h2>
        <p className="font-serif-cormorant text-lg text-rose-200/70 italic mt-2">
          Every snapshot holds a beat of my heart
        </p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E8B4B8] to-transparent mx-auto mt-4" />
      </div>

      {/* Desktop & Tablet Floating Polaroid Grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-8 pt-4">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative cursor-pointer transition-all duration-500 ease-out hover:z-30 hover:scale-105"
            style={{
              transform: `rotate(${photo.rotation}deg)`
            }}
          >
            {/* White/Ivory Polaroid Frame */}
            <div className="bg-[#FAF7F2] p-4 pb-6 rounded-lg shadow-xl shadow-black/60 border border-amber-900/10 group-hover:shadow-[0_20px_40px_rgba(232,180,184,0.3)] transition-all duration-300">
              {/* Photo Area */}
              <div className="relative aspect-square w-full rounded overflow-hidden bg-stone-900">
                <img
                  src={photo.image}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95 group-hover:brightness-100"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.classList.add('flex', 'items-center', 'justify-center', 'bg-rose-950/40');
                      parent.innerHTML = `<span class="text-2xl">📸</span>`;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-rose-950/10 group-hover:opacity-0 transition-opacity" />
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Handwritten style caption */}
              <p className="mt-4 text-center font-serif-cormorant text-base sm:text-lg text-stone-800 font-medium italic truncate">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Swipeable Carousel Card */}
      <div className="sm:hidden flex flex-col items-center">
        <div
          onClick={() => setActivePhoto(photos[currentIndex])}
          className="relative w-full max-w-xs cursor-pointer transition-transform duration-300 active:scale-98"
          style={{ transform: `rotate(${photos[currentIndex].rotation}deg)` }}
        >
          <div className="bg-[#FAF7F2] p-4 pb-6 rounded-lg shadow-2xl shadow-black/80 border border-amber-900/10">
            <div className="relative aspect-square w-full rounded overflow-hidden bg-stone-900">
              <img
                src={photos[currentIndex].image}
                alt={photos[currentIndex].caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-center font-serif-cormorant text-lg text-stone-800 font-medium italic">
              {photos[currentIndex].caption}
            </p>
          </div>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full glass-card border border-[#E8B4B8]/30 text-rose-200 active:scale-90 transition-transform cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-sans text-xs text-rose-200/80 tracking-widest">
            {currentIndex + 1} / {photos.length}
          </span>
          <button
            onClick={handleNext}
            className="p-3 rounded-full glass-card border border-[#E8B4B8]/30 text-rose-200 active:scale-90 transition-transform cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="View photo in high resolution"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-300"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full p-4 sm:p-6 bg-[#FAF7F2] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="rounded-xl overflow-hidden aspect-[4/3] bg-stone-900">
              <img
                src={activePhoto.image}
                alt={activePhoto.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 flex items-center justify-between px-2">
              <p className="font-serif-cormorant text-2xl font-semibold text-stone-800 italic">
                {activePhoto.caption}
              </p>
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
