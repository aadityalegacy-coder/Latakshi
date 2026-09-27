import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Moon, UtensilsCrossed, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const AmbientSoundToggle: React.FC = () => {
  const [ambientEnabled, setAmbientEnabled] = useState(false);
  const [currentAmbience, setCurrentAmbience] = useState<'none' | 'kitchen' | 'night'>('none');
  const [manualOverride, setManualOverride] = useState<'kitchen' | 'night' | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  // Monitor visible sections for dynamic ambience when enabled
  useEffect(() => {
    if (!ambientEnabled) {
      sound.setAmbientTrack('none');
      setCurrentAmbience('none');
      return;
    }

    if (manualOverride) {
      sound.setAmbientTrack(manualOverride);
      setCurrentAmbience(manualOverride);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'pizza-kitchen') {
              sound.setAmbientTrack('kitchen');
              setCurrentAmbience('kitchen');
            } else if (entry.target.id === 'night-sky') {
              sound.setAmbientTrack('night');
              setCurrentAmbience('night');
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    const kitchenEl = document.getElementById('pizza-kitchen');
    const nightEl = document.getElementById('night-sky');

    if (kitchenEl) observer.observe(kitchenEl);
    if (nightEl) observer.observe(nightEl);

    return () => {
      observer.disconnect();
    };
  }, [ambientEnabled, manualOverride]);

  const toggleAmbience = () => {
    sound.playWishChime();
    setAmbientEnabled((prev) => {
      const next = !prev;
      if (!next) {
        sound.setAmbientTrack('none');
        setCurrentAmbience('none');
        setManualOverride(null);
      } else {
        // default to kitchen or night depending on scroll position
        const kitchenEl = document.getElementById('pizza-kitchen');
        const rect = kitchenEl?.getBoundingClientRect();
        if (rect && rect.top <= window.innerHeight && rect.bottom >= 0) {
          sound.setAmbientTrack('kitchen');
          setCurrentAmbience('kitchen');
        } else {
          sound.setAmbientTrack('night');
          setCurrentAmbience('night');
        }
      }
      return next;
    });
  };

  const handleSelectAmbience = (type: 'kitchen' | 'night') => {
    sound.playWishChime();
    if (!ambientEnabled) {
      setAmbientEnabled(true);
    }
    setManualOverride(type);
    sound.setAmbientTrack(type);
    setCurrentAmbience(type);
  };

  const handleAutoScrollMode = () => {
    sound.playWishChime();
    setManualOverride(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 font-sans select-none">
      
      {/* Expanded Ambience Menu Popup */}
      {showMenu && (
        <div className="mb-2 p-3 rounded-2xl bg-[#191028]/95 backdrop-blur-md border border-rose-500/40 shadow-2xl text-xs text-rose-100 max-w-xs space-y-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-1.5 border-b border-rose-900/50">
            <span className="font-semibold text-rose-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Ambient Soundscape</span>
            </span>
            <span className="text-[10px] text-rose-400/80 font-mono">
              {ambientEnabled ? 'ON' : 'OFF'}
            </span>
          </div>

          <p className="text-[11px] text-rose-200/70 font-kalam">
            Pizza rasoi ke liye 'Cafe Simmer' aur night sky ke liye 'Night Crickets' dhun:
          </p>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              onClick={() => handleSelectAmbience('kitchen')}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                ambientEnabled && currentAmbience === 'kitchen'
                  ? 'bg-rose-600/40 border-rose-400 text-rose-100 shadow-sm'
                  : 'bg-[#221435]/60 border-rose-950 text-rose-300/70 hover:bg-[#2c1a44]'
              }`}
            >
              <div className="flex items-center gap-1 font-semibold">
                <UtensilsCrossed className="w-3.5 h-3.5 text-orange-400" />
                <span>Cafe Kitchen</span>
              </div>
              <span className="text-[9px] text-rose-300/60">Simmer & Sizzle</span>
            </button>

            <button
              onClick={() => handleSelectAmbience('night')}
              className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                ambientEnabled && currentAmbience === 'night'
                  ? 'bg-rose-600/40 border-rose-400 text-rose-100 shadow-sm'
                  : 'bg-[#221435]/60 border-rose-950 text-rose-300/70 hover:bg-[#2c1a44]'
              }`}
            >
              <div className="flex items-center gap-1 font-semibold">
                <Moon className="w-3.5 h-3.5 text-indigo-300" />
                <span>Night Cricket</span>
              </div>
              <span className="text-[9px] text-rose-300/60">Tranquil Chirps</span>
            </button>
          </div>

          <div className="pt-1 flex items-center justify-between text-[10px] text-rose-300/60">
            <button
              onClick={handleAutoScrollMode}
              className={`hover:text-rose-200 underline cursor-pointer ${!manualOverride ? 'font-bold text-rose-300' : ''}`}
            >
              Auto Section Detection
            </button>
            <button
              onClick={toggleAmbience}
              className="text-rose-400 font-bold hover:underline cursor-pointer"
            >
              {ambientEnabled ? 'Turn Off ✕' : 'Turn On ✓'}
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="flex items-center gap-2">
        {/* Quick pill indicator showing what's playing */}
        {ambientEnabled && currentAmbience !== 'none' && (
          <div 
            onClick={() => setShowMenu((prev) => !prev)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e1230]/90 backdrop-blur-md border border-rose-500/40 text-xs text-rose-200 shadow-lg cursor-pointer hover:border-rose-400 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span className="font-kalam text-xs">
              {currentAmbience === 'kitchen' ? '🍕 Cafe Kitchen Simmer' : '🌙 Night Crickets'}
            </span>
          </div>
        )}

        {/* Master Floating Toggle Button */}
        <button
          onClick={toggleAmbience}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowMenu((prev) => !prev);
          }}
          title={ambientEnabled ? "Ambient soundscape ON (Click to mute, double click for options)" : "Enable ambient kitchen/night soundscape"}
          className={`group flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl border transition-all duration-300 cursor-pointer active:scale-95 ${
            ambientEnabled 
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 border-rose-300 text-white shadow-rose-950/60 hover:shadow-rose-600/30' 
              : 'bg-[#1a1127]/90 backdrop-blur-md border-rose-900/60 text-rose-300/80 hover:bg-[#251739] hover:text-rose-100 hover:border-rose-600/40'
          }`}
        >
          {ambientEnabled ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse text-white" />
              <span className="text-xs font-semibold whitespace-nowrap">Ambience ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-semibold whitespace-nowrap">Ambience</span>
            </>
          )}

          {/* Quick options trigger icon */}
          <span 
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
            title="Ambience settings"
            className="text-[10px] bg-black/20 hover:bg-black/40 px-1.5 py-0.5 rounded ml-0.5 transition-colors"
          >
            ⚙️
          </span>
        </button>
      </div>

    </div>
  );
};
