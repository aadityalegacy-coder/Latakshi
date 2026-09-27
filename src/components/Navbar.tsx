import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface NavbarProps {
  onTogglePetals: () => void;
  petalsActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onTogglePetals, petalsActive }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleSound = () => {
    const playing = sound.toggleBgm();
    setIsPlaying(playing);
  };

  const triggerConfettiCelebration = () => {
    sound.playWishChime();
    confetti({
      particleCount: 55,
      spread: 70,
      origin: { y: 0.15 },
      colors: ['#f59e0b', '#f97316', '#fbbf24', '#f43f5e', '#ffffff'],
    });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#110e1a]/85 border-b border-rose-950/40 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#top" 
          className="font-rozha text-lg sm:text-xl text-rose-200 tracking-wide hover:text-rose-100 transition-colors whitespace-nowrap"
        >
          Latakshi (Laashh Kati) · 17
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-5 text-xs lg:text-sm font-medium text-rose-100/70">
          <a href="#daughters-day" className="hover:text-rose-300 transition-colors">
            Daughter's Day
          </a>
          <a href="#pizza-kitchen" className="hover:text-rose-300 transition-colors">
            Pizza Rasoi 🍕
          </a>
          <a href="#doctor-clinic" className="hover:text-rose-300 transition-colors">
            Dr. Laashh 🩺
          </a>
          <a href="#papa-bitiya-banter" className="hover:text-rose-300 transition-colors">
            Papa Ji ↔ Bitiya 😂
          </a>
          <a href="#diya-aashirwad" className="hover:text-rose-300 transition-colors">
            Shubh Diya 🪔
          </a>
          <a href="#night-sky" className="hover:text-rose-300 transition-colors">
            Sitara Dua 🌙
          </a>
          <a href="#personal-letter" className="hover:text-rose-300 transition-colors">
            Chitthi 💌
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleToggleSound}
            title={isPlaying ? 'Music Pause Karein' : 'Dheemi Dhun Chalao'}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-200 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span className="hidden sm:inline">Dhun On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-300/60" />
                <span className="hidden sm:inline">Dheemi Dhun</span>
              </>
            )}
          </button>

          <button
            onClick={triggerConfettiCelebration}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Papa Ji Ka Pyar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
