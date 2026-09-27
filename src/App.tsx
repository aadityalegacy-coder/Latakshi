import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PetalCanvas } from './components/PetalCanvas';
import { HeroLateWish } from './components/HeroLateWish';
import { PizzaKitchen } from './components/PizzaKitchen';
import { DoctorClinic } from './components/DoctorClinic';
import { PapaBitiyaBanter } from './components/PapaBitiyaBanter';
import { DiyaAashirwad } from './components/DiyaAashirwad';
import { MannatNightSky } from './components/MannatNightSky';
import { FinalLetter } from './components/FinalLetter';
import { AmbientSoundToggle } from './components/AmbientSoundToggle';

export default function App() {
  const [petalsActive, setPetalsActive] = useState(true);

  return (
    <div id="top" className="min-h-screen bg-[#0e0c15] text-[#fbf7f5] relative overflow-x-hidden font-body selection:bg-rose-500/30 selection:text-rose-200">
      
      {/* Falling Rose / Genda Petals Canvas */}
      <PetalCanvas active={petalsActive} />

      {/* Top Bar Navigation */}
      <Navbar 
        onTogglePetals={() => setPetalsActive((prev) => !prev)} 
        petalsActive={petalsActive} 
      />

      {/* Floating Section-Aware Ambient Soundscape Toggle */}
      <AmbientSoundToggle />

      <main>
        {/* Section 1: Hero - Daughter's Day 2026 & Papa Ji ↔ Bitiya / Sugar Son Pass & 17th Candle */}
        <HeroLateWish />

        {/* Section 2: 🍕 Chef Laashh Kati's Wood-Fired Pizza Kitchen & Cooking Chaos */}
        <PizzaKitchen />

        {/* Section 3: 🩺 Dr. Laashh Kati Fictional Clinic (OPD Patient Treatment & Prescription) */}
        <DoctorClinic />

        {/* Section 4: 😂 Papa Ji ↔ Bitiya Banter, 🧠 Practical Advice, 💌 Old-School Vibe & 🍳 Cooking Lore */}
        <PapaBitiyaBanter />

        {/* Section 5: 🪔 Shubh Diya & Papa Ji's 17th Year Aashirwad */}
        <DiyaAashirwad />

        {/* Section 6: 🌙 Latakshi Night Sky - Constellation Duas & Floating Lanterns */}
        <MannatNightSky />

        {/* Section 7: 💌 Wax Sealed Lifafa & Handwritten Daughter's Day Letter */}
        <FinalLetter />
      </main>

    </div>
  );
}
