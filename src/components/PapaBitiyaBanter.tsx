import React, { useState } from 'react';
import { Heart, Sparkles, MessageCircle, Music, Lightbulb, ChefHat, Smile } from 'lucide-react';
import { sound } from '../utils/audio';

export const PapaBitiyaBanter: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const jokes = [
    {
      title: "Ghar Ki Asli Dhadkan ❤️",
      subtitle: "Bitiya Rani & Sugar Son",
      icon: "❤️",
      papaji: "Papa Ji: 'Chahe pura din kitna bhi thak kar aao... ghar mein tumhari aawaz aur hasi sunte hi saari thakan door ho jaati hai.'",
      bitiya: "Bitiya: 'Aur Papa Ji, chahe main kitna bhi pretend karun ki main badi ho gayi hoon... hamesha aapki wahi choti si ladli Sugar Son hi rahungi!'",
    },
    {
      title: "Papa Ji Ka Muft Gyaan 🧠",
      subtitle: "Zindagi Ki Seekh",
      icon: "🧠",
      papaji: "Papa Ji: 'Zindagi mein 3 cheezein yaad rakhna: Time par sona, fal-sabzi khana, aur exam se pehle dhang se revision karna.'",
      bitiya: "Bitiya: 'Sahi baat hai Papa Ji! Aur chauthi cheez: Raat ke 2 baje phone dekh kar dimaag fresh karna taaki subah revision badhiya ho! 😂'",
    },
    {
      title: "Puraane Zamaane Ka Swaad 💌",
      subtitle: "Retro Songs & Chitthi",
      icon: "💌",
      papaji: "Papa Ji: 'Aaj kal ke shor-sharabe wale gaano mein kya rakha hai... asli mithaas toh Kishore Kumar aur Jagjit Singh ki aawaz mein hai.'",
      bitiya: "Bitiya: 'Yeh baat toh bilkul 100% sach hai Papa Ji! Vintage romantic gaane aur handwritten chitthi wali aesthetic ka koi tod nahi hai.'",
    },
    {
      title: "Kitchen Ka Blast Alert 🍳",
      subtitle: "Gas Stove Check",
      icon: "🍳",
      papaji: "Papa Ji: 'Kitchen se aisi aawaz kyun aa rahi hai jaise diwali ka rocket chhoota ho? Arey gas band ki thi ya nahi?!'",
      bitiya: "Bitiya: 'Papa Ji chill karo! Masterchef Laashh Kati fusion pizza bana rahi hai! Bas thoda cheese pighla hai, kitchen safe hai!'",
    },
  ];

  const handleCardClick = (idx: number) => {
    sound.playWishChime();
    setFlippedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <section id="papa-bitiya-banter" className="py-24 bg-[#0d0a16] border-b border-rose-950/30 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold font-body flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Papa Ji ↔ Bitiya / Sugar Son Banter</span>
          </div>
          <h2 className="font-rozha text-2xl sm:text-4xl text-rose-100">
            “Ghar Ka Asli Drama & Pyar” 😂
          </h2>
          <p className="text-sm sm:text-base text-rose-200/80 font-kalam">
            "50% taang khichayi, 50% gyaan, aur 100% unconditional pyaar."
          </p>
        </div>

        {/* Comparative Perspective Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Left: Papa Ji's Perspective */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#22132b] to-[#160c1d] border border-rose-500/25 relative shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest font-bold text-rose-300">
                Papa Ji's Mindset (The Guardian)
              </span>
              <span className="text-xs text-rose-300/60 font-kalam">100% Protective</span>
            </div>

            <h3 className="font-marcellus text-xl text-rose-100 mb-3">
              "Chahe 17 saal ki ho jao ya 70 ki... meri bitiya hi rahogi"
            </h3>

            <p className="text-sm text-rose-100/80 font-body leading-relaxed space-y-2">
              Bahar chahe kitni bhi duniya matlabi ho, ghar aakar jab tumhari hasi aur nautanki shuru hoti hai, 
              saari thakan gayab ho jaati hai. Chahe kitchen mein pizza ke naam par kitchen ka naksha badal do, 
              ya aadhi raat ko overthinking karke humara dimaag khao... tumhari har baat mein ek alag hi raunak hai.
            </p>

            <div className="mt-6 pt-4 border-t border-rose-950/60 text-xs text-rose-400/80 font-kalam">
              ~ Rule #1: Bitiya ki safety aur khushi se badhkar kuch nahi.
            </div>
          </div>

          {/* Right: Bitiya / Sugar Son's Reality */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#1b1124] to-[#120a1a] border border-rose-950/60 relative shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest font-bold text-rose-300">
                Bitiya / Sugar Son (The Troublemaker)
              </span>
              <span className="text-xs text-rose-300/60 font-kalam">Full Time Drama</span>
            </div>

            <h3 className="font-marcellus text-xl text-rose-100 mb-3">
              "Duniya mein sabko mana sakti hoon, par Papa Ji ko sabse pehle pighlaungi"
            </h3>

            <p className="text-sm text-rose-200/80 font-body leading-relaxed space-y-2">
              Papa Ji chahe kitna bhi gyaan de lein ya strict banne ki koshish karein, 
              unhe bhi pata hai ki 2 minute ki puppy eyes aur 'Papa Ji ek baat suno na...' bolte hi saare rules melt ho jaate hain. 
              Chahe cooking experiments hon, doctor dreams hon, ya raat ke 2 baje ke deep talks... Papa Ji is the ultimate safe space.
            </p>

            <div className="mt-6 pt-4 border-t border-rose-950/60 text-xs text-rose-300/70 font-kalam">
              ~ Official Title: Sugar Son with infinite emotional cashback.
            </div>
          </div>

        </div>

        {/* 3D Flip Cards Grid */}
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-xs font-kalam text-rose-300/90 inline-flex items-center gap-1.5 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-800/40">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Cards par tap karo — 3D flip hokar Papa Ji aur Bitiya ka secret banter dikhega! 🔄</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {jokes.map((item, idx) => {
              const isFlipped = !!flippedCards[idx];

              return (
                <div
                  key={idx}
                  onClick={() => handleCardClick(idx)}
                  className="cursor-pointer group h-[290px] [perspective:1000px] select-none"
                  title="Click to flip card in 3D"
                >
                  {/* Flipper Inner with preserve-3d */}
                  <div
                    className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ease-out rounded-2xl ${
                      isFlipped ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    {/* FRONT FACE (Papa Ji's Dialogue) */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl p-5 border border-rose-900/40 bg-gradient-to-b from-[#1c1228] to-[#120b1c] shadow-xl hover:border-rose-500/60 hover:shadow-rose-950/60 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[10px] uppercase tracking-wider text-rose-400 font-semibold px-2 py-0.5 rounded-full bg-rose-950/70 border border-rose-800/40">
                            Papa Ji's View 👴
                          </span>
                          <span className="text-[10px] text-rose-300/70 font-mono flex items-center gap-1 group-hover:text-rose-200">
                            <span>Tap to Flip</span>
                            <span className="text-xs">↻</span>
                          </span>
                        </div>

                        <h4 className="font-marcellus text-base text-rose-100 font-semibold mb-2 flex items-center gap-1.5">
                          <span>{item.icon}</span>
                          <span>{item.title}</span>
                        </h4>

                        <div className="p-3 bg-[#150d20] border border-rose-950 rounded-xl text-rose-200/90 text-xs font-kalam leading-relaxed">
                          <span className="text-rose-400 font-bold block mb-1 font-sans text-[10px] tracking-wide uppercase">
                            Papa Ji:
                          </span>
                          {item.papaji.replace(/^Papa Ji:\s*['"]?/, '').replace(/['"]?$/, '')}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-rose-950/70 text-[10px] text-rose-400/80 flex items-center justify-between font-sans">
                        <span className="font-medium">Side A · Papa Ji</span>
                        <span className="text-rose-300/90 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Bitiya Reply Dekho →</span>
                        </span>
                      </div>
                    </div>

                    {/* BACK FACE (Bitiya's Comeback) */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl p-5 border border-rose-500/60 bg-gradient-to-b from-[#2a1435] to-[#1a0c24] shadow-2xl shadow-rose-950/80 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2.5">
                          <span className="text-[10px] uppercase tracking-wider text-pink-300 font-semibold px-2 py-0.5 rounded-full bg-pink-950/70 border border-pink-700/50">
                            Bitiya / Sugar Son 🎭
                          </span>
                          <span className="text-[10px] text-pink-300/80 font-mono flex items-center gap-1">
                            <span>Flip Back</span>
                            <span className="text-xs">↺</span>
                          </span>
                        </div>

                        <h4 className="font-marcellus text-base text-rose-100 font-semibold mb-2 flex items-center gap-1.5">
                          <span>✨</span>
                          <span>Bitiya Ka Comeback</span>
                        </h4>

                        <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-rose-100 text-xs font-kalam leading-relaxed">
                          <span className="text-pink-300 font-bold block mb-1 font-sans text-[10px] tracking-wide uppercase">
                            Bitiya:
                          </span>
                          {item.bitiya.replace(/^Bitiya:\s*['"]?/, '').replace(/['"]?$/, '')}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-rose-900/60 text-[10px] text-pink-300/90 flex items-center justify-between font-sans">
                        <span className="font-medium">Side B · Sugar Son</span>
                        <span className="text-rose-200 flex items-center gap-1">
                          <span>← Wapas Flip Karein</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
