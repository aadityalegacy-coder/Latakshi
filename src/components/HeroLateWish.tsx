import React, { useState } from 'react';
import { Sparkles, Calendar, Heart, Smile, Flame, ShieldAlert, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export const HeroLateWish: React.FC = () => {
  const [selectedRule, setSelectedRule] = useState<number | null>(null);
  const [candleBlown, setCandleBlown] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const decrees = [
    {
      title: "Pehli Slice Papa Ji Ke Naam 🍕",
      tagline: "Bitiya Ke Haath Ka Swaad",
      desc: "Ghar mein jab bhi fresh pizza bake hoga, sabse crispy aur cheesy pehli slice Papa Ji ke plate mein aayegi — beti ke haath ka pyaar sabse meetha hota hai."
    },
    {
      title: "The 'Sugar Son' Ka Jaadu 🧸💖",
      tagline: "Dil Pighlaane Ki Kala",
      desc: "Chahe tum kitni bhi badmaashi karo, jaise hi pyaar se kehti ho 'Papa Ji, ek baat suno na...' — Papa Ji ka sara thakan aur chinta ek pal mein gayab ho jaati hai."
    },
    {
      title: "Padhai vs Doctor Logic 🩺",
      tagline: "Desi Medical Excuses",
      desc: "Padhai ke beech mein 45 minute break lekar bolna ki 'dimaag ka glucose level drop ho gaya tha'... kisi medical book mein aisa excuse nahi likha betaji! 😂"
    },
    {
      title: "Papa Ji Ka Sach (Dil Ki Baat) 💖",
      tagline: "Ghar Ki Asli Raunak",
      desc: "Chahe kitni bhi taang khichayi karein, par jab tum hasti ho aur pura din ghar mein bakbak karti ho, tabhi ghar mein asli ronaq aati hai. Hamesha aisi hi khush rehna."
    }
  ];

  const handleBlowCandle = () => {
    if (!candleBlown) {
      setCandleBlown(true);
      sound.playWishChime();
      confetti({
        particleCount: 75,
        spread: 95,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#f97316', '#ec4899', '#ffffff'],
      });
    } else {
      setCandleBlown(false);
      sound.playDiyaLight();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section 
      id="daughters-day" 
      className="relative pt-12 pb-20 md:py-24 overflow-hidden border-b border-rose-950/30"
      onMouseMove={handleMouseMove}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-rose-600/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Subtle metadata note */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-rose-300/90 mb-6 font-kalam">
          <span>Daughter's Day Special</span>
          <span aria-hidden="true">·</span>
          <span>27 September 2026</span>
          <span aria-hidden="true">·</span>
          <span className="text-rose-400 font-semibold">Papa Ji ↔ Bitiya / Sugar Son Dynamic 🌸</span>
        </div>

        {/* Primary Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-rozha text-3xl sm:text-5xl lg:text-6xl text-rose-50 tracking-tight leading-tight">
            Happy Daughter’s Day, Bitiya! <br className="hidden sm:inline" />
            <span className="text-rose-400 font-kalam text-3xl sm:text-5xl block sm:inline mt-1 sm:mt-0">
              haan, Papa Ji & Sugar Son dono idhar hain 😂
            </span>
          </h1>

          <p className="font-body text-base sm:text-lg text-rose-100/80 leading-relaxed max-w-2xl mx-auto pt-2">
            17 saal ki ho gayi ho, par drama wahi 5 saal wala hai... Ek dry WhatsApp message 
            <span className="font-mono text-sm px-2 py-0.5 mx-1 bg-rose-950/60 text-rose-200 rounded border border-rose-800/40">
              “Happy Daughter's Day betaji 💐”
            </span> 
            bhejna Papa Ji ko bohot boring laga. Toh tumhari pizza kitchen, doctor vibes aur chahe-jaisi baaton ke sath yeh space bana diya!
          </p>
        </div>

        {/* 3D Interactive Card Showcase */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive 3D Daughter's Day Frame */}
          <div className="lg:col-span-6 flex justify-center">
            <div 
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="w-full max-w-md bg-gradient-to-b from-[#221429] via-[#190f1f] to-[#120a17] border border-rose-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative"
            >
              {/* Decorative corner accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-rose-400/60" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-rose-400/60" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-rose-400/60" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-rose-400/60" />

              {/* Floating, Stylized 'Sugar Son' Sticker Overlay with chaotic wobble rotation */}
              <div 
                onClick={() => {
                  sound.playPop();
                  confetti({
                    particleCount: 30,
                    spread: 50,
                    origin: { y: 0.35 },
                    colors: ['#f43f5e', '#ec4899', '#fbbf24', '#ffffff'],
                  });
                }}
                className="absolute -top-6 -right-4 sm:-right-7 z-30 sticker-wobble cursor-pointer group select-none"
                title="Papa Ji's Official Sugar Son (Click me!)"
              >
                {/* Washi tape topper */}
                <div className="w-12 h-3 bg-white/40 border border-white/60 -rotate-3 mx-auto -mb-1.5 rounded-[2px] shadow-sm backdrop-blur-xs relative z-10" />
                
                {/* Die-cut sticker body */}
                <div className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 border-2 border-white text-white shadow-[0_10px_25px_rgba(244,63,94,0.5)] group-hover:scale-110 group-active:scale-95 transition-transform flex flex-col items-center">
                  <div className="flex items-center gap-1 font-kalam font-bold text-sm sm:text-base tracking-wide drop-shadow-sm whitespace-nowrap">
                    <span>✨</span>
                    <span>Sugar Son</span>
                    <span>🍬</span>
                  </div>
                  <span className="text-[9px] font-sans font-semibold tracking-wider uppercase text-amber-100/90 -mt-0.5">
                    Certified Drama
                  </span>
                </div>
              </div>

              <div className="text-center space-y-4">
                <span className="text-xs uppercase tracking-widest text-rose-400/80 font-semibold">
                  17 Saal Ki Nautanki · Papa Ji Ki Ladli Bitiya
                </span>
                
                <h2 className="font-marcellus text-2xl sm:text-3xl text-rose-100">
                  Latakshi उर्फ Laashh Kati
                </h2>

                <p className="text-xs sm:text-sm text-rose-200/80 font-kalam">
                  "Thodi Masterchef, thodi doctor sahiba, aur 100% full-time ghar ki Sugar Son."
                </p>

                {/* Candle / Flame interaction (17th Year) */}
                <div className="py-6 flex flex-col items-center justify-center">
                  <div 
                    onClick={handleBlowCandle}
                    className="cursor-pointer group flex flex-col items-center select-none"
                    title="Click to blow candle or relight"
                  >
                    {/* Flame */}
                    <div className={`relative transition-all duration-300 ${candleBlown ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                      <div className="w-5 h-8 bg-gradient-to-t from-rose-500 via-amber-300 to-yellow-100 rounded-full flame-flicker" />
                      <div className="absolute inset-0 bg-rose-400 blur-md opacity-70 -z-10" />
                    </div>

                    {/* Wick & Candle Body */}
                    <div className="w-1 h-3 bg-neutral-600 -mt-0.5" />
                    <div className="w-10 h-16 bg-gradient-to-r from-rose-200 via-amber-100 to-rose-300 rounded-t-sm shadow-md border-t border-rose-200 flex items-center justify-center">
                      <span className="font-rozha text-rose-950 text-sm font-bold">17</span>
                    </div>

                    {/* Cake stand */}
                    <div className="w-24 h-3 bg-rose-950/60 rounded-full border border-rose-800/50 mt-1" />

                    <span className="text-xs text-rose-300/90 mt-3 font-kalam group-hover:text-rose-200 transition-colors">
                      {candleBlown ? '✨ Mombatti bujh gayi (Click to relight)' : '🎂 Click karke 17th mombatti bujhao & Papa Ji ka aashirwad lo!'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-rose-900/40 flex items-center justify-between text-xs text-rose-300/70">
                  <span>Umar: 17 Saal</span>
                  <span>Alias: Sugar Son</span>
                  <span>Status: Papa Ji Ki Jaan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Papa Ji & Bitiya Decrees Selector */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-300 text-sm font-medium">
              <Award className="w-4 h-4 text-rose-400" />
              <span>Papa Ji Ke 4 Pakke Niyam (Click Karke Padho):</span>
            </div>

            <div className="space-y-3">
              {decrees.map((dec, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedRule(idx)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedRule === idx
                      ? 'bg-rose-950/60 border-rose-400 shadow-md translate-x-1 shadow-rose-950/50'
                      : 'bg-[#181122]/70 border-rose-900/30 hover:border-rose-700/50 hover:bg-[#20152e]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-rose-100">
                      {idx + 1}. {dec.title}
                    </span>
                    <span className="text-xs text-rose-400/80 font-kalam">
                      {dec.tagline}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-200/70 mt-2 font-body leading-relaxed">
                    {dec.desc}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-rose-300/60 italic font-kalam pt-1">
              *Rules are subject to change as soon as Bitiya gives that puppy-face smile.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
