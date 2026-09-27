import React, { useState } from 'react';
import { Flame, Sparkles, Bell } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export const DiyaAashirwad: React.FC = () => {
  const [isLit, setIsLit] = useState(false);

  const handleLightDiya = () => {
    sound.playDiyaLight();
    setTimeout(() => {
      sound.playTempleBell();
    }, 200);

    setIsLit(true);

    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#f59e0b', '#f97316', '#fbbf24', '#fde047'],
    });
  };

  return (
    <section 
      id="diya-aashirwad" 
      className="py-24 bg-[#0d0915] border-b border-rose-950/30 relative overflow-hidden transition-all duration-700"
      style={{
        boxShadow: isLit ? 'inset 0 0 160px rgba(244, 63, 94, 0.12)' : 'none',
      }}
    >
      {/* Dynamic warm glow behind the diya */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-1000 ${
          isLit 
            ? 'w-[650px] h-[450px] bg-gradient-to-t from-rose-500/20 via-orange-500/15 to-transparent blur-[110px]' 
            : 'w-60 h-60 bg-rose-950/15 blur-[90px]'
        }`} 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold font-body">
            🪷 Shubh Aashirwad & Divine Blessings
          </div>
          <h2 className="font-rozha text-2xl sm:text-4xl text-rose-100">
            Latakshi Ke 17th Saal & Daughter's Day Ka Diya 🪔
          </h2>
          <p className="text-sm sm:text-base text-rose-200/80 font-kalam">
            "Papa Ji ke dil se nikla shubh aashirwad aur Ishwar se bitiya ki lambi umar aur safalta ki prarthana."
          </p>
        </div>

        {/* Central Diya Altar Frame */}
        <div className="bg-gradient-to-b from-[#1e1126] to-[#120a18] border border-rose-800/40 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Rangoli / Mandala Geometry background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <div className="w-[420px] h-[420px] rounded-full border border-dashed border-rose-300" />
            <div className="w-[300px] h-[300px] rounded-full border border-rose-400" />
            <div className="w-[180px] h-[180px] rounded-full border border-dashed border-rose-200" />
          </div>

          <div className="flex flex-col items-center text-center space-y-8 relative z-10">

            {/* The Brass Diya (पीतल का दिया) Artwork */}
            <div className="relative py-4">
              
              {/* The Flame */}
              <div 
                className={`transition-all duration-700 flex flex-col items-center ${
                  isLit ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
              >
                {/* Flame Teardrop */}
                <div className="w-8 h-14 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 rounded-full flame-flicker relative">
                  <div className="absolute inset-0 bg-amber-300 blur-sm opacity-80" />
                </div>
              </div>

              {/* Brass Diya Vessel (Pure SVG with metallic brass gradient) */}
              <svg 
                width="160" 
                height="80" 
                viewBox="0 0 160 80" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="filter drop-shadow-lg -mt-3"
              >
                <defs>
                  <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="35%" stopColor="#fbbf24" />
                    <stop offset="70%" stopColor="#b45309" />
                    <stop offset="100%" stopColor="#78350f" />
                  </linearGradient>
                  <linearGradient id="oilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#92400e" />
                    <stop offset="100%" stopColor="#451a03" />
                  </linearGradient>
                </defs>

                {/* Diya Bowl */}
                <path 
                  d="M10 25 C30 55, 130 55, 150 25 C145 45, 125 65, 80 65 C35 65, 15 45, 10 25 Z" 
                  fill="url(#brassGrad)" 
                />
                
                {/* Diya Lip & Oil Rim */}
                <ellipse cx="80" cy="25" rx="70" ry="12" fill="url(#brassGrad)" />
                <ellipse cx="80" cy="25" rx="60" ry="9" fill="url(#oilGrad)" />

                {/* Diya Spout */}
                <path d="M80 18 C78 12, 82 12, 80 18 Z" fill="#451a03" />

                {/* Pedestal Stand */}
                <path d="M60 62 L100 62 L110 74 L50 74 Z" fill="url(#brassGrad)" />
              </svg>

              {/* Marigold Petals around base */}
              <div className="flex items-center justify-center gap-2 -mt-2">
                <span className="text-xl">🪷</span>
                <span className="text-sm">🌼</span>
                <span className="text-lg">🪔</span>
                <span className="text-sm">🌼</span>
                <span className="text-xl">🪷</span>
              </div>
            </div>

            {/* Interaction Button */}
            {!isLit ? (
              <button
                onClick={handleLightDiya}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 text-white font-medium text-sm shadow-lg hover:shadow-rose-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-yellow-200 group-hover:animate-bounce" />
                <span>Diya Prajwalit Karein (Click To Light)</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs text-rose-300 font-kalam">
                <Bell className="w-4 h-4 text-rose-400 animate-spin" />
                <span>Diya jal raha hai... Shubh aashirwad accept ho gaya!</span>
              </div>
            )}

            {/* The Shubh Shloka & Aashirwad Text */}
            <div className="max-w-xl mx-auto space-y-4">
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/40">
                <p className="font-rozha text-rose-200 text-sm sm:text-base tracking-wide leading-relaxed">
                  शुभं करोति कल्याणम् आरोग्यम् धनसंपदाम् । <br />
                  शत्रुबुद्धि-विनाशाय दीपज्योतिर्नमोऽस्तु ते ॥
                </p>
              </div>

              <div className="space-y-3 font-kalam text-rose-100/90 text-sm sm:text-base leading-relaxed">
                <p>
                  "Latakshi, Bhagwan kare tera yeh 17th saal aur aage aane wali poori zindagi khushiyon aur safalta se bhari ho. 
                  Doctor banne ka sapna ho ya Masterchef rasoi ke experiments, Ishwar tujhe har manzil par kamyab kare. 
                  Chehre par yeh pyari si shararati hansi hamesha bani rahe."
                </p>
                <p className="text-xs sm:text-sm text-amber-300/80">
                  "Daughter's Day toh bas ek bahana hai betaji... Papa Ji ke dil se har din, har pal tumhare liye bas aashirwad hi nikalta hai."
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
