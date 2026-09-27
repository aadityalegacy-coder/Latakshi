import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Thermometer, 
  Syringe, 
  Flashlight, 
  HeartPulse, 
  Sparkles, 
  Check, 
  ClipboardCheck, 
  RotateCcw,
  Activity,
  Award,
  ShieldCheck,
  UserCheck,
  FileText,
  Gauge
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

type DoctorTool = 'stethoscope' | 'thermometer' | 'torch' | 'syringe' | 'bpcuff';
type PatientId = 'papaji' | 'sugar-son' | 'future-doctor';

interface ToolDiagnosticResult {
  tool: DoctorTool;
  title: string;
  reading: string;
  finding: string;
  detail: string;
}

export const DoctorClinic: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<PatientId>('papaji');
  const [activeTool, setActiveTool] = useState<DoctorTool>('stethoscope');
  const [diagnostics, setDiagnostics] = useState<Record<string, ToolDiagnosticResult>>({});
  const [isExamining, setIsExamining] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<DoctorTool | null>(null);
  const [isPrescriptionStamped, setIsPrescriptionStamped] = useState(false);
  const [wearDoctorApron, setWearDoctorApron] = useState(true);
  const [bpPumpCount, setBpPumpCount] = useState(0);
  const [stethoscopeListening, setStethoscopeListening] = useState(false);

  // Patient profiles designed with affection, humor, and future doctor pride
  const patientProfiles = {
    'papaji': {
      name: "Papa Ji",
      subtitle: "Ghar Ka Bada Sahara & Bitiya Ka Pehla Dost 🌟",
      age: "Legendary Age",
      status: "Papa-Beti Nok-Jhok Mode",
      avatarEmoji: "👴",
      bpm: 72,
      bp: "120/80 mmHg (Bilkul Swasth)",
      temp: "98.6°F",
      vitals: {
        stethoscope: {
          title: "Stethoscope Heartbeat (दिल की धड़कन)",
          reading: "72 BPM (Steady & Strong)",
          finding: "Dil ki dhadkan mein 100% beti ke liye garv (pride) aur beshumaar pyaar paya gaya!",
          detail: "Lubb-Dubb rhythm mein 100% sukoon hai. Bitiya jab bhi pyaar se muskura kar dekhti hai, dil garv aur khushi se bhar jata hai.",
          fast: false,
        },
        thermometer: {
          title: "Forehead Temperature (तापमान जांच)",
          reading: "98.6°F (Normal Body Temp)",
          finding: "Sharir ka taapman bilkul normal hai. Bitiya ke future ki thodi si fikr rehti hai, par vishwaas usse bhi 100 guna atoot hai!",
          detail: "Taapman ekdum perfect hai. Subah ki adrak wali chai se BP aur dimaag dono shaant rehte hain.",
        },
        torch: {
          title: "Pupil Reflex & Vision (आँखों की जांच)",
          reading: "Reflex: 6/6 Clear Focus",
          finding: "Aankhon mein beti ko Doctor bante dekhne ka sapna aur tarakki ki chamak saaf dikh rahi hai.",
          detail: "Chashme ke peeche chinta thodi si hai, par bitiya par vishwaas 1000% atoot hai.",
        },
        syringe: {
          title: "Anti-Stress Tonic (टॉनिक बूस्टर)",
          reading: "Dose: 100ml Adrak Chai Formula",
          finding: "Beti ki ek muskaan se saara office aur family stress 2 second mein gayab!",
          detail: "Immunity boost 100%! Papa Ji ka energy level ab shaam tak pizza khane ke liye tayyar hai.",
        },
        bpcuff: {
          title: "Blood Pressure (रक्तचाप जांच)",
          reading: "120/80 mmHg (Normal Range)",
          finding: "Systolic/Diastolic ekdum fit! Sugar Son ke nakhre jhelne ki high resistance capability detected.",
          detail: "Papa Ji ka dil aur blood pressure dono bilkul mast hain, bas shaam ko bitiya ke haath ki fresh banayi pehli slice chahiye!",
        },
      },
      finalAdvice: "Bitiya se ladai band, shaam ko fresh pizza khana hai aur bitiya ke doctor banne ke safar mein poora cheerleading karna hai!",
    },
    'sugar-son': {
      name: "Latakshi (Laashh Kati)",
      subtitle: "17 Saal Ki Nautanki & Sugar Son",
      age: "17 Saal",
      status: "Midnight Pizza Hunger & Drama",
      avatarEmoji: "🎭",
      bpm: 108,
      bp: "115/75 mmHg (Hyper Active)",
      temp: "99.1°F",
      vitals: {
        stethoscope: {
          title: "Stethoscope Heartbeat (दिल की धड़कन)",
          reading: "108 BPM (Excited & Hyper)",
          finding: "Dhadkan tez chal rahi hai — clinical evidence ki aadhi raat ko pizza aur cold drink ka plan chal raha hai!",
          detail: "Rhythm mein thoda sa 'Sugar Son Drama' hai, par dil bohot saaf aur nek hai.",
          fast: true,
        },
        thermometer: {
          title: "Forehead Temperature (तापमान जांच)",
          reading: "99.1°F (Slightly Warm Drama)",
          finding: "Thoda sa warm temperature hai, par asal mein yeh 'subah jaldi uthne ka aalas' wala bukhar hai!",
          detail: "Clinical test confirm karta hai: Yeh choti si thakan sirf Papa Ji ki adrak wali chai, thoda sa dulaar aur fresh pizza se theek hogi!",
        },
        torch: {
          title: "Pupil Reflex & Vision (आँखों की जांच)",
          reading: "Reflex: Phone Screen Glare Detected",
          finding: "Reels dekhne ka thoda sa thakan hai, par future medical entrance phodne ka vision laser sharp hai!",
          detail: "Pupils react normally to bright light. Ambition level: 10/10.",
        },
        syringe: {
          title: "Anti-Stress Tonic (टॉनिक बूस्टर)",
          reading: "Dose: Papa Ji Approved Ice Cream Tonic",
          finding: "Instant mood boost! Sugar Son ka drama status 'Chill Mode' mein convert ho gaya.",
          detail: "Glucose level balanced. Now ready to study biology and chemistry peacefully!",
        },
        bpcuff: {
          title: "Blood Pressure (रक्तचाप जांच)",
          reading: "115/75 mmHg (Youth Energy)",
          finding: "Bilkul swasth teenager vitals! Unlimited stamina to argue with Papa Ji and bake crispy pizzas.",
          detail: "Pulse rate dynamic hai, laughing reflex high hai.",
        },
      },
      finalAdvice: "Raat ko 11 baje phone side mein rakhna, time par sona, aur Papa Ji se bina lade adhi slice pizza share karna!",
    },
    'future-doctor': {
      name: "Future Dr. Latakshi",
      subtitle: "White Coat, Stethoscope & MBBS Vision",
      age: "Target: AIIMS / Top Medical College",
      status: "Focused & Brilliant Aspirant",
      avatarEmoji: "🩺",
      bpm: 78,
      bp: "118/78 mmHg (Zen Focus)",
      temp: "98.4°F",
      vitals: {
        stethoscope: {
          title: "Stethoscope Heartbeat (दिल की धड़कन)",
          reading: "78 BPM (Determined Rhythm)",
          finding: "Kasam se, yeh dil ek din hazaron mareezon ka ilaj karega aur unhe nayi zindagi dega. Dr. Latakshi ka jazba solid hai!",
          detail: "Cardiovascular rhythm shows unwavering dedication, empathy, and natural healing instinct.",
          fast: false,
        },
        thermometer: {
          title: "Forehead Temperature (तापमान जांच)",
          reading: "98.4°F (Cool & Composed)",
          finding: "Dimaag thanda rakh kar padhai karna hi topper banne ka raaz hai. Tension lene ki zero zaroorat hai.",
          detail: "Mental clarity high. Exam pressure successfully converted into confident drive.",
        },
        torch: {
          title: "Pupil Reflex & Vision (आँखों की जांच)",
          reading: "Reflex: Laser Sharp Focus",
          finding: "Medical books aur syllabus ko phod dene wala focus! Safalta ki chamak saaf jhalak rahi hai.",
          detail: "Eyes focused on the stethoscope and white apron. Future looking remarkably bright.",
        },
        syringe: {
          title: "Anti-Stress Tonic (टॉनिक बूस्टर)",
          reading: "Dose: Papa Ji's Unconditional Blessings",
          finding: "Papa Ji ka aashirwad aur Ishwar ki kripa — duniya ki sabse powerful immunity dose lag chuki hai!",
          detail: "Efficacy: Infinite. Protective shield against all self-doubt and negativity.",
        },
        bpcuff: {
          title: "Blood Pressure (रक्तचाप जांच)",
          reading: "118/78 mmHg (Doctor Precision)",
          finding: "Doctor Sahiba ka BP calm aur steady hai. Surgery aur clinic handling ke liye perfect composure.",
          detail: "Readout signed by Papa Ji with pride and tears of happiness.",
        },
      },
      finalAdvice: "Apni mehnat par atoot vishwaas rakho. Papa Ji har kadam par tumhare peeche chattan ki tarah khade hain. Gold medal tumhara hi hai!",
    },
  };

  const patient = patientProfiles[selectedPatient];

  const tools = [
    {
      id: 'stethoscope' as DoctorTool,
      name: 'Stethoscope 🩺',
      tagline: 'Dil Ki Dhadkan Suno',
      icon: Stethoscope,
      hotspotLabel: 'Chest / Heart',
      color: 'from-rose-500 to-pink-600',
      actionPrompt: 'Place on chest to listen to heartbeats',
    },
    {
      id: 'thermometer' as DoctorTool,
      name: 'Thermometer 🌡️',
      tagline: 'Bukhar & Taapman Check',
      icon: Thermometer,
      hotspotLabel: 'Forehead / Head',
      color: 'from-amber-500 to-orange-600',
      actionPrompt: 'Touch forehead to scan temperature',
    },
    {
      id: 'torch' as DoctorTool,
      name: 'Pupil Torch 🔦',
      tagline: 'Aankhon Ki Reflex Probe',
      icon: Flashlight,
      hotspotLabel: 'Eyes / Vision',
      color: 'from-yellow-400 to-amber-500',
      actionPrompt: 'Shine penlight to test pupil reflex',
    },
    {
      id: 'syringe' as DoctorTool,
      name: 'Tonic Dose 💉',
      tagline: 'Immunity & Mood Booster',
      icon: Syringe,
      hotspotLabel: 'Arm / Booster',
      color: 'from-emerald-500 to-teal-600',
      actionPrompt: 'Inject stress-busting wellness tonic',
    },
    {
      id: 'bpcuff' as DoctorTool,
      name: 'BP Cuff 🩹',
      tagline: 'Sphygmomanometer Pump',
      icon: Gauge,
      hotspotLabel: 'Upper Arm / BP Cuff',
      color: 'from-blue-500 to-indigo-600',
      actionPrompt: 'Pump cuff bulb to measure blood pressure',
    },
  ];

  // Execute tool on patient hotspot with multi-sensory feedback
  const handleUseTool = (toolId: DoctorTool) => {
    if (!toolId || isExamining) return;
    setIsExamining(true);
    setActiveHotspot(toolId);

    const vital = patient.vitals[toolId];

    if (toolId === 'stethoscope') {
      setStethoscopeListening(true);
      const isFast = 'fast' in vital ? !!(vital as any).fast : false;
      sound.playHeartbeat(isFast, 3);
      setTimeout(() => setStethoscopeListening(false), 2400);
    } else if (toolId === 'thermometer') {
      sound.playThermometerBeep();
    } else if (toolId === 'syringe') {
      sound.playSyringe();
    } else if (toolId === 'torch') {
      sound.playTorchClick();
    } else if (toolId === 'bpcuff') {
      setBpPumpCount((prev) => prev + 1);
      sound.playBpPump();
      setTimeout(() => {
        sound.playHeartbeat(false, 1);
      }, 500);
    }

    setTimeout(() => {
      setDiagnostics((prev) => ({
        ...prev,
        [`${selectedPatient}-${toolId}`]: {
          tool: toolId,
          title: vital.title,
          reading: vital.reading,
          finding: vital.finding,
          detail: vital.detail,
        },
      }));
      setIsExamining(false);
      setActiveHotspot(null);
    }, 850);
  };

  const handlePatientChange = (id: PatientId) => {
    sound.playWishChime();
    setSelectedPatient(id);
    setIsPrescriptionStamped(false);
  };

  const handleStampPrescription = () => {
    sound.playClinicBeep();
    setIsPrescriptionStamped(true);
    confetti({
      particleCount: 70,
      spread: 85,
      origin: { y: 0.65 },
      colors: ['#f43f5e', '#10b981', '#fbbf24', '#ffffff', '#38bdf8'],
    });
  };

  const handleResetCheckup = () => {
    sound.playWishChime();
    setDiagnostics({});
    setIsPrescriptionStamped(false);
    setBpPumpCount(0);
  };

  const toggleDoctorApron = () => {
    sound.playWishChime();
    setWearDoctorApron((prev) => {
      const next = !prev;
      if (next) {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.4 },
          colors: ['#ffffff', '#f43f5e', '#fbbf24'],
        });
      }
      return next;
    });
  };

  const currentPatientChecks = Object.keys(diagnostics).filter((k) =>
    k.startsWith(`${selectedPatient}-`)
  ).length;

  return (
    <section id="doctor-clinic" className="py-20 bg-[#0e0a17] border-b border-rose-950/30 relative">
      {/* Subtle ambient medical glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold font-body flex items-center justify-center gap-1.5">
            <Stethoscope className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Dr. Latakshi Medical Chamber · Functional Doctor Suite</span>
          </div>
          <h2 className="font-rozha text-2xl sm:text-4xl text-rose-100">
            Dr. Laashh Kati Ka Functional Clinic 🩺
          </h2>
          <p className="text-sm sm:text-base text-rose-200/80 font-kalam">
            "Stethoscope uthao, dil ki dhadkan suno, BP aur taapman naapo... Latakshi ke doctor banne ke sapne ki live jhalak!"
          </p>

          {/* Future Doctor White Apron & Stethoscope Toggle Badge */}
          <div className="pt-3 flex items-center justify-center">
            <button
              onClick={toggleDoctorApron}
              className={`px-4 py-2 rounded-full border text-xs font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-lg ${
                wearDoctorApron
                  ? 'bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border-emerald-400 text-emerald-200 shadow-emerald-950/50 scale-105'
                  : 'bg-[#1e132e] border-rose-900/60 text-stone-300 hover:text-rose-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {wearDoctorApron 
                  ? "🥼 Dr. Latakshi White Coat & Stethoscope Mode (ACTIVE)" 
                  : "Wear White Apron & Stethoscope"}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                {wearDoctorApron ? 'AIIMS / NEET Vibe' : 'Click to Wear'}
              </span>
            </button>
          </div>
        </div>

        {/* Patient Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {[
            { id: 'papaji' as PatientId, label: 'Patient 1: Papa Ji (Head of Family) 👴', icon: '👴' },
            { id: 'sugar-son' as PatientId, label: 'Patient 2: Sugar Son (Latakshi 17 Saal) 🎭', icon: '🎭' },
            { id: 'future-doctor' as PatientId, label: 'Patient 3: Future Dr. Latakshi (Self-Scan) 🩺', icon: '🩺' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handlePatientChange(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
                selectedPatient === tab.id
                  ? 'bg-rose-600/30 border-rose-400 text-rose-100 shadow-md scale-102'
                  : 'bg-[#181124] border-rose-950 text-stone-400 hover:bg-[#221535] hover:text-rose-200'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Main Playable Clinic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Doctor Toolkit & Interactive Patient Body (7 Cols) */}
          <div className="lg:col-span-7 bg-[#160f22] p-5 sm:p-7 rounded-2xl border border-rose-900/40 shadow-2xl space-y-6">
            
            {/* Toolkit Selector Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-rose-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-rose-400" />
                  <span>Dr. Latakshi Ka Medical Tray (Pick Instrument):</span>
                </span>
                <span className="text-[11px] text-stone-400 font-mono">
                  Tests Done: {currentPatientChecks} / {tools.length}
                </span>
              </div>

              {/* 5 Playable Tool Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {tools.map((t) => {
                  const isSelected = activeTool === t.id;
                  const isChecked = !!diagnostics[`${selectedPatient}-${t.id}`];
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        sound.playPop();
                        setActiveTool(t.id);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[82px] ${
                        isSelected
                          ? 'bg-gradient-to-br from-rose-600/30 to-pink-600/30 border-rose-400 text-rose-100 shadow-md scale-102 ring-1 ring-rose-400/50'
                          : 'bg-[#1e132e]/70 border-rose-950 text-stone-400 hover:bg-[#28183e] hover:text-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-rose-300 animate-bounce' : 'text-stone-400'}`} />
                        {isChecked ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500/40" />
                        )}
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-rose-100 leading-tight">{t.name}</div>
                        <div className="text-[9px] text-rose-300/70 font-sans truncate">{t.tagline}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Patient Examination Canvas & Live ECG Monitor */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#1b1228] to-[#110a1b] border-2 border-rose-950/80 p-5 min-h-[350px] flex flex-col items-center justify-between overflow-hidden">
              
              {/* Top Banner: Patient Info & Live Vital Stats */}
              <div className="w-full flex items-center justify-between border-b border-rose-950/60 pb-3 z-10">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl select-none">{patient.avatarEmoji}</span>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-rose-100 font-rozha flex items-center gap-1.5">
                      <span>{patient.name}</span>
                      {wearDoctorApron && (
                        <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-1.5 py-0.2 rounded font-sans">
                          Attending: Dr. Latakshi 🩺
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-stone-400 font-sans">{patient.subtitle}</div>
                  </div>
                </div>

                {/* Vitals Quick Readout */}
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="px-2 py-1 rounded bg-[#271536] border border-rose-900/60 text-rose-300 flex items-center gap-1">
                    <HeartPulse className="w-3 h-3 text-rose-400 animate-pulse" />
                    <span>{patient.bpm} BPM</span>
                  </span>
                  <span className="hidden sm:inline-block px-2 py-1 rounded bg-[#271536] border border-rose-900/60 text-amber-300">
                    🌡️ {patient.temp}
                  </span>
                </div>
              </div>

              {/* Real-time Oscilloscope ECG Waveform Display */}
              <div className="w-full my-2 px-3 py-1.5 rounded-xl bg-black/60 border border-emerald-950 flex items-center justify-between text-[10px] font-mono text-emerald-400 overflow-hidden relative">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>CARDIAC ECG TRACE:</span>
                </div>
                {/* Animated ECG line */}
                <div className="flex-1 mx-3 h-5 flex items-center overflow-hidden">
                  <svg className="w-full h-full text-emerald-400/90" preserveAspectRatio="none" viewBox="0 0 300 30">
                    <path
                      d="M0,15 L40,15 L45,10 L50,20 L55,15 L90,15 L95,4 L100,26 L105,15 L140,15 L145,10 L150,20 L155,15 L190,15 L195,4 L200,26 L205,15 L240,15 L245,10 L250,20 L255,15 L300,15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeDasharray="300"
                      strokeDashoffset={stethoscopeListening ? "0" : "150"}
                      className={`transition-all duration-700 ${stethoscopeListening ? 'animate-pulse text-rose-400 stroke-[2.2]' : ''}`}
                    />
                  </svg>
                </div>
                <span className="text-[9px] text-emerald-300">
                  {stethoscopeListening ? 'LISTENING (LUB-DUB)...' : 'READY'}
                </span>
              </div>

              {/* Patient Silhouette Avatar with Interactive Hotspots */}
              <div className="relative w-52 h-56 flex flex-col items-center justify-center my-1 select-none">
                
                {/* Doctor Apron Overlay if active */}
                {wearDoctorApron && (
                  <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white text-[9px] font-semibold tracking-wider uppercase border border-emerald-300 shadow-md z-30 flex items-center gap-1">
                    <Award className="w-2.5 h-2.5 text-yellow-300" />
                    <span>Future Chief Doctor Latakshi, MBBS</span>
                  </div>
                )}

                {/* Illustrated Head / Face Frame */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-950/70 to-purple-950/70 border-2 border-rose-500/40 flex items-center justify-center shadow-lg relative">
                  <span className="text-3xl select-none">{patient.avatarEmoji}</span>
                  
                  {/* Forehead Hotspot (Thermometer) */}
                  <button
                    onClick={() => handleUseTool('thermometer')}
                    title="Click karein thermometer lagane ke liye (Forehead Scan)"
                    className={`absolute -top-2 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${
                      activeHotspot === 'thermometer' 
                        ? 'bg-amber-400 scale-125 shadow-[0_0_15px_#f59e0b]' 
                        : 'bg-amber-500/40 hover:bg-amber-500 border border-amber-300 animate-pulse'
                    }`}
                  >
                    <Thermometer className="w-4 h-4 text-yellow-100" />
                  </button>

                  {/* Eyes Hotspot (Torch / Penlight) */}
                  <button
                    onClick={() => handleUseTool('torch')}
                    title="Click karein doctor penlight se pupil reflex check karne ke liye"
                    className={`absolute bottom-0 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${
                      activeHotspot === 'torch' 
                        ? 'bg-yellow-300 scale-125 shadow-[0_0_18px_#fde047]' 
                        : 'bg-yellow-400/40 hover:bg-yellow-400 border border-yellow-200'
                    }`}
                  >
                    <Flashlight className="w-4 h-4 text-yellow-100" />
                  </button>
                </div>

                {/* Torso / Body Frame */}
                <div className={`w-32 h-28 -mt-2 rounded-t-3xl shadow-inner flex flex-col items-center justify-center relative border-x-2 border-t-2 ${
                  wearDoctorApron 
                    ? 'bg-gradient-to-b from-[#f0f4f8] to-[#cbd5e1] border-emerald-400/60 text-slate-800' 
                    : 'bg-gradient-to-b from-[#2a1738] to-[#1a0e24] border-rose-500/30'
                }`}>
                  
                  {/* Chest / Heart Hotspot (Stethoscope) */}
                  <button
                    onClick={() => handleUseTool('stethoscope')}
                    title="Click karein stethoscope se dil ki dhadkan sunne ke liye"
                    className={`absolute top-3 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${
                      activeHotspot === 'stethoscope' || stethoscopeListening
                        ? 'bg-rose-500 scale-125 shadow-[0_0_22px_#f43f5e] animate-ping'
                        : 'bg-rose-600/60 hover:bg-rose-500 border-2 border-rose-200 animate-bounce'
                    }`}
                  >
                    <HeartPulse className="w-5 h-5 text-white" />
                  </button>

                  {/* Left Arm / Syringe Booster Hotspot */}
                  <button
                    onClick={() => handleUseTool('syringe')}
                    title="Click karein tonic booster lagane ke liye"
                    className={`absolute top-6 -right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${
                      activeHotspot === 'syringe'
                        ? 'bg-emerald-400 scale-125 shadow-[0_0_15px_#10b981]'
                        : 'bg-emerald-500/40 hover:bg-emerald-500 border border-emerald-300'
                    }`}
                  >
                    <Syringe className="w-4 h-4 text-emerald-100" />
                  </button>

                  {/* Right Arm / BP Cuff Hotspot */}
                  <button
                    onClick={() => handleUseTool('bpcuff')}
                    title="Click karein blood pressure cuff se BP naapne ke liye"
                    className={`absolute top-6 -left-3 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 ${
                      activeHotspot === 'bpcuff'
                        ? 'bg-blue-400 scale-125 shadow-[0_0_15px_#38bdf8]'
                        : 'bg-blue-500/40 hover:bg-blue-500 border border-blue-300'
                    }`}
                  >
                    <Gauge className="w-4 h-4 text-blue-100" />
                  </button>

                  {/* Apron stethoscope representation */}
                  {wearDoctorApron && (
                    <div className="absolute top-1 text-[10px] font-bold text-slate-700 tracking-wider flex items-center gap-1 font-mono">
                      <span>🩺 STETHOSCOPE</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Action Button for Selected Tool */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-rose-950/60">
                <span className="text-[11px] text-rose-300/80 font-kalam text-center sm:text-left">
                  👉 Body ke glowing icons par click karein ya yeh button dabayein:
                </span>
                
                <button
                  onClick={() => handleUseTool(activeTool)}
                  disabled={isExamining}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-xs shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>
                    {isExamining 
                      ? "Doctor Sahiba Janch Kar Rahi Hain..." 
                      : `Apply ${activeTool.toUpperCase()} on ${patient.name}`}
                  </span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Live Medical Board Report & Stamped Prescription (5 Cols) */}
          <div className="lg:col-span-5 bg-[#181024] p-5 sm:p-6 rounded-2xl border border-rose-900/40 shadow-2xl space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-rose-950/60 pb-3">
              <div>
                <h3 className="font-bold text-rose-200 text-sm sm:text-base font-rozha flex items-center gap-1.5">
                  <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                  <span>Dr. Latakshi Ki Live Parchi (Rx)</span>
                </h3>
                <p className="text-[10px] text-stone-400 font-sans">
                  Reg: #FUTURE-MBBS-AIIMS-2026 · Date: 27 Sept 2026
                </p>
              </div>
              <button
                onClick={handleResetCheckup}
                title="Reset this checkup"
                className="p-1.5 rounded-lg bg-rose-950/40 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Diagnostic Findings List */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {tools.map((t) => {
                const toolKey = t.id;
                const result = diagnostics[`${selectedPatient}-${toolKey}`];
                if (!result) {
                  return (
                    <div 
                      key={toolKey} 
                      onClick={() => handleUseTool(toolKey as DoctorTool)}
                      className="p-2.5 rounded-xl border border-dashed border-rose-950/80 bg-[#120a1c]/60 text-stone-500 text-xs flex items-center justify-between cursor-pointer hover:border-rose-800 hover:text-stone-400 transition-colors"
                    >
                      <span className="capitalize font-mono text-[11px] flex items-center gap-1.5">
                        <span>{t.name}:</span>
                        <span className="text-stone-600">Pending Test</span>
                      </span>
                      <span className="text-[10px] text-rose-400/80">Tap to test →</span>
                    </div>
                  );
                }

                return (
                  <div key={toolKey} className="p-3 rounded-xl bg-gradient-to-r from-[#221330] to-[#190d24] border border-rose-800/40 space-y-1 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-rose-200">{result.title}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                        {result.reading}
                      </span>
                    </div>
                    <p className="text-[11px] text-rose-100 font-kalam leading-tight">
                      "{result.finding}"
                    </p>
                    <p className="text-[9.5px] text-rose-300/70 font-sans italic">
                      {result.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Final Clinical Advice */}
            <div className="p-3 rounded-xl bg-[#241433]/70 border border-rose-800/40 text-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 font-sans block flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-rose-400" />
                <span>Doctor Sahiba Ki Hidayat (Clinical Advice):</span>
              </span>
              <p className="text-rose-100 font-kalam leading-relaxed">
                "{patient.finalAdvice}"
              </p>
            </div>

            {/* Stamped Seal Section */}
            <div className="pt-2 border-t border-rose-950/60 flex flex-col items-center justify-center space-y-2">
              {isPrescriptionStamped ? (
                <div className="w-full p-3 rounded-xl border-2 border-dashed border-emerald-500/60 bg-emerald-950/30 text-emerald-300 text-xs text-center space-y-1 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-center gap-1.5 font-bold font-sans">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>DR. LAASHH KATI KI SARKARI MOHAR (OFFICIALLY VERIFIED)</span>
                  </div>
                  <p className="text-[10px] text-emerald-400/90 font-kalam">
                    "Future Doctor Sahiba Approved! White coat aur Stethoscope tumhara bright future hai bitiya!"
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleStampPrescription}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  <span>Sarkari Mohar Lagao (Stamp Rx Parchi 🔏)</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
