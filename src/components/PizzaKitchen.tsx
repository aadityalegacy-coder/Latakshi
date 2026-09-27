import React, { useState, useEffect, useRef } from 'react';
import { Flame, ChefHat, RotateCcw, ArrowRight, Sparkles, Check, Award, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

type GameStage = 'ROLL_BASE' | 'ADD_TOPPINGS' | 'BAKE_OVEN' | 'VERDICT';

interface ToppingOption {
  id: string;
  name: string;
  emoji: string;
  desc: string;
}

export const PizzaKitchen: React.FC = () => {
  const [stage, setStage] = useState<GameStage>('ROLL_BASE');
  
  // Stage 1: Dough Rolling
  const [rollProgress, setRollProgress] = useState(0);
  const [rollClickCount, setRollClickCount] = useState(0);

  // Stage 2: Toppings
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['cheese', 'sauce']);

  // Stage 3: Oven Meter
  const [meterValue, setMeterValue] = useState(50);
  const [meterRunning, setMeterRunning] = useState(false);
  const meterDirection = useRef<number>(1);
  const meterInterval = useRef<any>(null);

  // Stage 4: Result
  const [finalScore, setFinalScore] = useState<number>(10);
  const [verdictTitle, setVerdictTitle] = useState('');
  const [verdictNote, setVerdictNote] = useState('');
  const [totalPizzasMade, setTotalPizzasMade] = useState(0);

  const availableToppings: ToppingOption[] = [
    { id: 'cheese', name: 'Amul Mozzarella Cheese', emoji: '🧀', desc: 'Double cheese burst layer' },
    { id: 'paneer', name: 'Tandoori Masala Paneer', emoji: '🧀', desc: 'Ghar ka fresh desi cubes' },
    { id: 'veggies', name: 'Pyaz & Shimla Mirch', emoji: '🧅', desc: 'Crunchy desi street style' },
    { id: 'mirch', name: 'Desi Hari Mirch & Jalapeño', emoji: '🌶️', desc: 'Teekha tadka swaad anusar' },
    { id: 'herbs', name: 'Oregano & Chilli Flakes', emoji: '🌿', desc: 'Chutki bhar Italian khushboo' },
    { id: 'papaji-tax', name: "Papa Ji Ka Special Hissa ❤️", emoji: '👑', desc: 'Papa Ji ke liye sabse pehli aur pyaar bhari slice' },
  ];

  // Dough rolling click handler
  const handleRollDough = () => {
    sound.playPop();
    const nextClicks = rollClickCount + 1;
    setRollClickCount(nextClicks);
    const nextProgress = Math.min(100, Math.round(nextClicks * 16.7));
    setRollProgress(nextProgress);

    if (nextProgress >= 100) {
      sound.playWishChime();
    }
  };

  // Topping toggle
  const handleToggleTopping = (id: string) => {
    sound.playPop();
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  // Start oven meter loop
  const startOvenBaking = () => {
    setStage('BAKE_OVEN');
    setMeterRunning(true);
    sound.playSizzle();

    meterInterval.current = setInterval(() => {
      setMeterValue((prev) => {
        let next = prev + meterDirection.current * 3;
        if (next >= 100) {
          meterDirection.current = -1;
          next = 100;
        } else if (next <= 0) {
          meterDirection.current = 1;
          next = 0;
        }
        return next;
      });
    }, 35);
  };

  // Stop oven meter and evaluate
  const handleStopOven = () => {
    if (!meterRunning) return;
    clearInterval(meterInterval.current);
    setMeterRunning(false);

    const hit = meterValue;
    let score = 10;
    let title = '';
    let note = '';

    if (hit >= 60 && hit <= 85) {
      // Perfect Gold Zone
      score = 10;
      title = '⭐⭐⭐⭐⭐ 10/10! Dominos Band Karwaogi Bitiya!';
      note = 'Kasam se, ekdum perfect golden brown crust aur cheese stretch! Papa Ji ne 2 slice instantly apne room ke liye claim kar li hain!';
      sound.playWishChime();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fbbf24', '#22c55e', '#ffffff'],
      });
    } else if ((hit >= 40 && hit < 60) || (hit > 85 && hit <= 93)) {
      // Good / Slightly early or slightly dark
      score = 8.5;
      title = '⭐⭐⭐⭐ 8.5/10! Kaafi Shaandaar!';
      note = hit < 60 
        ? 'Taste zabardast hai, bas 30 second aur bhatti mein rehti toh aur crispy ho jaata. Par Papa Ji ko pura pasand aaya!'
        : 'Thoda sa crispy zyada ho gaya, par Papa Ji ko crunch waise bhi pasand hai! Ekdum tandoori style!';
      sound.playClinicBeep();
    } else if (hit > 93) {
      // Burnt
      score = 6.5;
      title = '⭐⭐⭐ 6.5/10! Thoda Koyla Ban Gaya 😂';
      note = 'Kitchen mein dhuan dekh kar Papa Ji daude chale aaye: "Gas band ki thi na?!" Par koi baat nahi, pyaar se banaya hai toh Papa Ji yeh bhi kha lenge!';
    } else {
      // Under-baked
      score = 6.0;
      title = '⭐⭐⭐ 6/10! Kaccha Rah Gaya Bitiya!';
      note = 'Cheese pighla nahi tha aur pehle hi nikaal liya! Chal 2 minute microwave mein daal ke la, tab tak Papa Ji plate lekar intezar kar rahe hain.';
    }

    setFinalScore(score);
    setVerdictTitle(title);
    setVerdictNote(note);
    setTotalPizzasMade((prev) => prev + 1);
    setStage('VERDICT');
  };

  // Restart game
  const handleResetGame = () => {
    clearInterval(meterInterval.current);
    setRollProgress(0);
    setRollClickCount(0);
    setSelectedToppings(['cheese', 'sauce']);
    setMeterValue(50);
    setMeterRunning(false);
    setStage('ROLL_BASE');
  };

  useEffect(() => {
    return () => {
      if (meterInterval.current) clearInterval(meterInterval.current);
    };
  }, []);

  return (
    <section id="pizza-kitchen" className="py-20 bg-[#0d0a14] border-b border-rose-950/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold font-body flex items-center justify-center gap-1.5">
            <ChefHat className="w-4 h-4 text-rose-400" />
            <span>Chef Laashh Kati Ki Rasoi · Interactive Pizza Game</span>
          </div>
          <h2 className="font-rozha text-2xl sm:text-4xl text-rose-100">
            Latakshi Ka Wood-Fired Pizza Challenge 🍕
          </h2>
          <p className="text-sm sm:text-base text-rose-200/80 font-kalam">
            "Aata belne se lekar bhatti ke temperature tak... dekhte hain Papa Ji ke liye kaisa pizza banta hai!"
          </p>
        </div>

        {/* Step Indicator Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 text-xs font-medium">
          <span className={`px-3 py-1 rounded-full border transition-colors ${
            stage === 'ROLL_BASE' ? 'bg-rose-500/20 border-rose-400 text-rose-200' : 'border-rose-950 text-stone-500'
          }`}>
            1. Base Belo 🫓
          </span>
          <span className="text-stone-600">→</span>
          <span className={`px-3 py-1 rounded-full border transition-colors ${
            stage === 'ADD_TOPPINGS' ? 'bg-rose-500/20 border-rose-400 text-rose-200' : 'border-rose-950 text-stone-500'
          }`}>
            2. Toppings Sajao 🧀
          </span>
          <span className="text-stone-600">→</span>
          <span className={`px-3 py-1 rounded-full border transition-colors ${
            stage === 'BAKE_OVEN' ? 'bg-rose-500/20 border-rose-400 text-rose-200' : 'border-rose-950 text-stone-500'
          }`}>
            3. Bhatti Meter 🔥
          </span>
          <span className="text-stone-600">→</span>
          <span className={`px-3 py-1 rounded-full border transition-colors ${
            stage === 'VERDICT' ? 'bg-rose-500/20 border-rose-400 text-rose-200' : 'border-rose-950 text-stone-500'
          }`}>
            4. Papa Ji Ka Review 👨‍👧
          </span>
        </div>

        {/* Game Stage Container */}
        <div className="relative rounded-2xl overflow-hidden border border-rose-900/40 bg-gradient-to-b from-[#20121d] via-[#160c15] to-[#0f0810] shadow-2xl p-6 sm:p-8 min-h-[460px] flex flex-col justify-between">

          {/* STAGE 1: DOUGH ROLLING */}
          {stage === 'ROLL_BASE' && (
            <div className="flex flex-col items-center justify-center text-center space-y-6 my-auto animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">
                  Step 1: Chakla Belan Action
                </span>
                <h3 className="font-marcellus text-xl sm:text-2xl text-rose-100">
                  Aata Gol Belo Bitiya! 🫓
                </h3>
                <p className="text-xs sm:text-sm text-rose-200/70 font-kalam">
                  {rollProgress === 0 && "Chakle par aate ka peda rakha hai. 'Belan Chalao' button daba kar base phailao!"}
                  {rollProgress > 0 && rollProgress < 50 && "Arey thoda gol belo, yeh parathe jaisa shape kyun le raha hai?! 😂"}
                  {rollProgress >= 50 && rollProgress < 100 && "Wah! Shape ekdum badhiya ban rahi hai, bas do teen jhatke aur!"}
                  {rollProgress >= 100 && "Ekdum gol, patla aur crispy base tayar ho gaya! Ab toppings daalte hain."}
                </p>
              </div>

              {/* Wooden Rolling Board (Chakla) */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-[#854d0e] via-[#5e330a] to-[#3a1d06] p-4 shadow-2xl border-4 border-[#a16207]/40 flex items-center justify-center relative">
                {/* Visual Dough that expands on clicks */}
                <div 
                  style={{
                    transform: `scale(${0.35 + (rollProgress / 100) * 0.65})`,
                  }}
                  className="w-full h-full rounded-full bg-gradient-to-br from-[#fef08a] via-[#fde047] to-[#eab308] shadow-inner transition-transform duration-200 ease-out flex items-center justify-center border-2 border-amber-300/60"
                >
                  <span className="font-kalam text-amber-950 font-bold text-xs select-none">
                    {rollProgress < 100 ? `${rollProgress}% Bel Diya` : '✨ Ready!'}
                  </span>
                </div>
              </div>

              {/* Progress and Roll Button */}
              <div className="space-y-4 w-full max-w-xs">
                <div className="w-full bg-[#2a1727] rounded-full h-2.5 overflow-hidden border border-rose-900/50">
                  <div 
                    className="bg-gradient-to-r from-rose-500 to-amber-400 h-2.5 rounded-full transition-all duration-200" 
                    style={{ width: `${rollProgress}%` }}
                  />
                </div>

                {rollProgress < 100 ? (
                  <button
                    onClick={handleRollDough}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-sm shadow-lg shadow-rose-950 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Belan Chalao 🫓</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-md">Tap!</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sound.playWishChime();
                      setStage('ADD_TOPPINGS');
                    }}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-sm shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 animate-bounce"
                  >
                    <span>Toppings Sajao! (Next Step)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STAGE 2: ADDING TOPPINGS */}
          {stage === 'ADD_TOPPINGS' && (
            <div className="space-y-6 my-auto animate-in fade-in duration-300">
              <div className="text-center space-y-1">
                <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">
                  Step 2: Desi Masala & Toppings Bar
                </span>
                <h3 className="font-marcellus text-xl sm:text-2xl text-rose-100">
                  Pizza Par Toppings Daalo 🍕
                </h3>
                <p className="text-xs sm:text-sm text-rose-200/70 font-kalam">
                  "Jitna zyada paneer aur cheese, utna hi khush Papa Ji! Apni pasand ke toppings tap karo:"
                </p>
              </div>

              {/* Pizza Visual Preview + Toppings */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                
                {/* Pizza Plate */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-[#854d0e] via-[#5e330a] to-[#3a1d06] p-3 shadow-2xl border-4 border-[#a16207]/40 flex items-center justify-center relative">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#fde047] via-[#f59e0b] to-[#b45309] shadow-inner relative overflow-hidden flex items-center justify-center">
                    
                    {/* Sauce Swirl */}
                    <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-red-700 via-rose-600 to-amber-600 opacity-90" />

                    {/* Cheese Layer */}
                    <div className="absolute inset-5 rounded-full bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 opacity-90 blur-[0.5px]" />

                    {/* Render Selected Toppings Visually */}
                    {selectedToppings.includes('paneer') && (
                      <>
                        <div className="absolute top-12 left-16 w-5 h-5 bg-amber-50 rounded shadow border border-amber-300 transform rotate-12" />
                        <div className="absolute bottom-14 right-16 w-5 h-5 bg-amber-50 rounded shadow border border-amber-300 transform -rotate-12" />
                        <div className="absolute top-24 right-14 w-4 h-4 bg-amber-50 rounded shadow border border-amber-300 transform rotate-45" />
                      </>
                    )}

                    {selectedToppings.includes('mirch') && (
                      <>
                        <div className="absolute top-20 left-24 w-5 h-2 bg-emerald-600 rounded-full transform -rotate-45 shadow" />
                        <div className="absolute bottom-20 right-20 w-5 h-2 bg-emerald-600 rounded-full transform rotate-30 shadow" />
                        <div className="absolute top-12 right-28 w-5 h-2 bg-emerald-600 rounded-full transform rotate-12 shadow" />
                      </>
                    )}

                    {selectedToppings.includes('veggies') && (
                      <>
                        <div className="absolute top-16 right-20 w-4 h-4 rounded-full border-2 border-purple-900 bg-purple-300/40" />
                        <div className="absolute bottom-16 left-20 w-4 h-4 rounded-full border-2 border-purple-900 bg-purple-300/40" />
                      </>
                    )}

                    {selectedToppings.includes('herbs') && (
                      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#15803d_1.5px,transparent_1px)] [background-size:10px_10px]" />
                    )}

                    {selectedToppings.includes('papaji-tax') && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl bg-rose-950/80 px-2 py-0.5 rounded border border-rose-400 text-rose-200 font-kalam text-xs font-bold animate-pulse">
                          Papa Ji Ka Pyaar Bhara Hissa 🍕❤️
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Toppings Grid Controls */}
                <div className="grid grid-cols-2 gap-2 max-w-sm w-full">
                  {availableToppings.map((top) => {
                    const active = selectedToppings.includes(top.id);
                    return (
                      <button
                        key={top.id}
                        onClick={() => handleToggleTopping(top.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          active 
                            ? 'bg-rose-600/30 border-rose-400 text-rose-100 shadow-md scale-[1.02]' 
                            : 'bg-[#1b1122]/60 border-rose-950 text-stone-400 hover:bg-[#23152c] hover:text-rose-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base">{top.emoji}</span>
                          {active && <Check className="w-3.5 h-3.5 text-rose-400" />}
                        </div>
                        <div className="text-xs font-semibold text-rose-100 mt-1">{top.name}</div>
                        <div className="text-[10px] text-stone-400 font-sans leading-tight mt-0.5">{top.desc}</div>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Ready to Bake Button */}
              <div className="text-center pt-2">
                <button
                  onClick={startOvenBaking}
                  disabled={selectedToppings.length < 2}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-600 via-rose-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-medium text-sm shadow-xl transition-all active:scale-95 cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 text-yellow-200 animate-bounce" />
                  <span>Bhatti Mein Daalo (Start Oven Timer!) 🔥</span>
                </button>
              </div>
            </div>
          )}

          {/* STAGE 3: OVEN TEMPERATURE TIMING CHALLENGE */}
          {stage === 'BAKE_OVEN' && (
            <div className="flex flex-col items-center justify-center text-center space-y-8 my-auto animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-rose-400 font-bold flex items-center justify-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                  <span>Step 3: Wood-Fired Oven Heat Control</span>
                </span>
                <h3 className="font-marcellus text-2xl sm:text-3xl text-rose-100">
                  Meter Ko GREEN ZONE Mein Roko! 🎯
                </h3>
                <p className="text-xs sm:text-sm text-rose-200/70 font-kalam">
                  "Jaldi roka toh kaccha rahega... late roka toh koyla ban jayega! Right time pe 'ROKO' dabao!"
                </p>
              </div>

              {/* Arcade Heat Gauge Meter */}
              <div className="w-full max-w-md bg-[#180e1e] p-5 rounded-2xl border-2 border-rose-900/60 shadow-inner space-y-4">
                
                {/* Zones Visualization Bar */}
                <div className="relative h-10 rounded-xl overflow-hidden bg-stone-900 border border-stone-800">
                  {/* Blue Kaccha zone (0 - 40%) */}
                  <div className="absolute left-0 top-0 bottom-0 w-[40%] bg-blue-950/60 border-r border-blue-800 flex items-center justify-center text-[10px] text-blue-300 font-sans">
                    Kaccha Roti ❄️
                  </div>

                  {/* Yellow Pre-bake (40 - 60%) */}
                  <div className="absolute left-[40%] top-0 bottom-0 w-[20%] bg-amber-950/60 border-r border-amber-800 flex items-center justify-center text-[10px] text-amber-300 font-sans">
                    Warm 🟡
                  </div>

                  {/* GREEN GOLD ZONE (60 - 85%) */}
                  <div className="absolute left-[60%] top-0 bottom-0 w-[25%] bg-emerald-700/80 border-x-2 border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    ⭐ GOLDEN CRISPY (60-85%)
                  </div>

                  {/* Red Burnt zone (85 - 100%) */}
                  <div className="absolute left-[85%] top-0 bottom-0 w-[15%] bg-red-950/80 flex items-center justify-center text-[10px] text-red-300 font-sans">
                    Koyla 💀
                  </div>

                  {/* Moving Pointer Needle */}
                  <div 
                    style={{ left: `${meterValue}%` }}
                    className="absolute top-0 bottom-0 w-3 -ml-1.5 bg-yellow-200 border-2 border-white rounded-full shadow-[0_0_12px_#ffffff] z-20 pointer-events-none transition-none"
                  />
                </div>

                {/* Status reading */}
                <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>0°C</span>
                  <span className="text-amber-300 font-bold text-sm">Oven Heat: {meterValue}%</span>
                  <span>450°C</span>
                </div>
              </div>

              {/* Big Arcade Stop Button */}
              <div>
                <button
                  onClick={handleStopOven}
                  className="py-4 px-10 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-rozha text-lg tracking-wider shadow-2xl shadow-rose-950 transition-all hover:scale-105 active:scale-90 cursor-pointer border-2 border-rose-300"
                >
                  🛑 ROKO! (OVEN SE NIKAALO!)
                </button>
              </div>
            </div>
          )}

          {/* STAGE 4: PAPA JI'S VERDICT & PIZZA SLICES */}
          {stage === 'VERDICT' && (
            <div className="flex flex-col items-center justify-center text-center space-y-6 my-auto animate-in zoom-in-95 duration-300">
              
              {/* Verdict Header Badge */}
              <div className="p-4 rounded-2xl bg-[#221226] border-2 border-rose-500/40 shadow-xl max-w-lg w-full space-y-2">
                <span className="text-xs uppercase tracking-widest text-rose-300 font-bold flex items-center justify-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Papa Ji Ka Live Tasting Scorecard</span>
                </span>
                
                <h3 className="font-rozha text-xl sm:text-2xl text-rose-100">
                  {verdictTitle}
                </h3>

                <p className="text-sm text-rose-200/90 font-kalam leading-relaxed">
                  "{verdictNote}"
                </p>
              </div>

              {/* Visual Baked Pizza with 6 Slices Cut */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-[#854d0e] via-[#5e330a] to-[#3a1d06] p-3 shadow-2xl border-4 border-[#a16207]/40 flex items-center justify-center relative">
                <div 
                  className={`w-full h-full rounded-full relative overflow-hidden flex items-center justify-center shadow-inner ${
                    finalScore >= 8.5 
                      ? 'bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#b45309]' 
                      : finalScore <= 6.0 
                      ? 'bg-gradient-to-br from-[#fef08a] via-[#fde047] to-[#eab308]' 
                      : 'bg-gradient-to-br from-[#78350f] via-[#451a03] to-[#1c1917]'
                  }`}
                >
                  {/* Sauce & Melted Cheese */}
                  <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-red-700 via-rose-600 to-amber-600 opacity-90" />
                  <div className="absolute inset-5 rounded-full bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 opacity-90" />

                  {/* Slice cuts */}
                  <div className="absolute inset-0 pointer-events-none opacity-30">
                    <div className="w-full h-0.5 bg-stone-950 absolute top-1/2 -translate-y-1/2" />
                    <div className="h-full w-0.5 bg-stone-950 absolute left-1/2 -translate-x-1/2" />
                    <div className="w-full h-0.5 bg-stone-950 absolute top-1/2 -translate-y-1/2 transform rotate-45" />
                    <div className="w-full h-0.5 bg-stone-950 absolute top-1/2 -translate-y-1/2 transform -rotate-45" />
                  </div>

                  {/* Papa Ji's Tax Ribbon on the top-right slice */}
                  <div className="absolute top-4 right-4 bg-rose-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow rotate-12">
                    Papa Ji Ki Slice ✓
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleResetGame}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ek Aur Pizza Banao! (Play Again 🍕)</span>
                </button>
              </div>

            </div>
          )}

          {/* Footer Bar */}
          <div className="mt-6 pt-4 border-t border-rose-950/60 flex items-center justify-between text-xs text-rose-300/70 font-sans">
            <div>Total Pizzas Baked: <span className="font-bold text-rose-200">{totalPizzasMade}</span></div>
            <div className="font-kalam text-rose-300/80">Papa Ji Tax: 40% slices securely delivered 🍕</div>
          </div>

        </div>

      </div>
    </section>
  );
};
