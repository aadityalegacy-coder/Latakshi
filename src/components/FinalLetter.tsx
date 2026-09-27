import React, { useState } from 'react';
import { Mail, MailOpen, Copy, Check, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export const FinalLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOpenLetter = () => {
    if (!isOpen) {
      sound.playWishChime();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ec4899', '#fbbf24', '#ffffff'],
      });
    }
    setIsOpen(true);
  };

  const handleCopyPing = () => {
    const text = "Papa Ji website dekhi... rula bhi diya aur hasa bhi diya! 🥹❤️ Pizza order kar do ab jaldi!";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="personal-letter" className="py-24 bg-[#0a0812] relative overflow-hidden">
      
      {/* Background radial warmth */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-rose-600/15 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs uppercase tracking-widest text-rose-400 font-semibold font-body">
            💌 Papa Ji Ka Dil Se Likha Hua Sandesh
          </div>
          <h2 className="font-rozha text-2xl sm:text-4xl text-rose-100">
            Ek Chitthi Meri Bitiya Ke Naam ✉️
          </h2>
          <p className="text-sm sm:text-base text-rose-200/80 font-kalam">
            "Kuch baatein WhatsApp ke text forwards mein bayaan nahi hoti..."
          </p>
        </div>

        {/* Envelope & Letter Container */}
        <div className="max-w-2xl mx-auto">
          
          {!isOpen ? (
            /* Closed Wax Sealed Envelope */
            <div 
              onClick={handleOpenLetter}
              className="group cursor-pointer bg-gradient-to-b from-[#241322] via-[#1a0e19] to-[#120812] border-2 border-rose-700/50 rounded-2xl p-8 sm:p-12 shadow-2xl text-center space-y-6 hover:border-rose-400 transition-all hover:scale-[1.02] relative"
            >
              {/* Envelope flap aesthetic with 'ल' wax seal */}
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-rose-700 to-pink-900 border-2 border-rose-300 shadow-xl flex items-center justify-center relative">
                <span className="font-rozha text-rose-100 text-lg font-bold">ल</span>
                <div className="absolute inset-0 rounded-full animate-ping opacity-25 bg-rose-500" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-rose-400/90 font-bold block">
                  To: Latakshi (Laashh Kati) · Papa Ji's Bitiya & Sugar Son
                </span>
                <h3 className="font-marcellus text-xl sm:text-2xl text-rose-100">
                  Yeh lifafa sirf tumhare liye khulega
                </h3>
                <p className="text-xs sm:text-sm text-rose-200/80 font-kalam">
                  (Click karo wax seal todne aur Daughter's Day chitthi padhne ke liye)
                </p>
              </div>

              <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 group-hover:from-rose-500 group-hover:to-pink-500 text-white text-xs font-semibold shadow-lg transition-colors inline-flex items-center gap-2 cursor-pointer">
                <Mail className="w-4 h-4" />
                <span>Chitthi Kholo ✉️</span>
              </button>
            </div>
          ) : (
            /* Unfolded Handwritten Letter */
            <div className="notebook-ruled rounded-2xl p-6 sm:p-12 shadow-2xl text-stone-900 border border-rose-300/80 relative animate-in fade-in zoom-in-95 duration-500">
              
              {/* Letter Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-red-200 pb-3 mb-6 font-kalam text-xs sm:text-sm text-stone-600">
                <span className="font-bold text-red-600">DAUGHTER'S DAY SPECIAL · 27 SEPTEMBER 2026</span>
                <span>TO: LATAKSHI (LAASHH KATI)</span>
              </div>

              {/* Letter Prose */}
              <div className="font-kalam text-base sm:text-lg leading-relaxed text-stone-800 space-y-4">
                <p className="font-bold text-amber-950 text-xl font-rozha">
                  Meri Pyaari Bitiya (aur ghar ki Sugar Son) Latakshi,
                </p>

                <p>
                  Happy Daughter’s Day! Sach kahun toh WhatsApp par koi forwarded message ya dry wish bhejna mujhe bilkul theek nahi laga. 
                  Tumhare liye toh kuch aisa banna chahiye tha jismein tumhari shararatein, tumhara pizza rasoi ka shauq aur Papa Ji se nok-jhok sab shamil ho.
                </p>

                <p>
                  17 saal ki ho gayi ho tum... pata hi nahi chala kab itni jaldi badi ho gayi. Ghar mein jab tumhari aawaz aati rehti hai — 
                  kabhi kitchen mein naye-naye experiments karna, kabhi kisi baat par thoda sa roothna, ya achanak <em>'Papa Ji ek baat suno na...'</em> 
                  bolkar apni baat manwa lena — tab lagta hai ki tumhare bina yeh ghar kitna khamosh aur adhoora hota.
                </p>

                <p>
                  Mujhe tumhara yeh bholapan, puraane zamaane ke Kishore Kumar ke gaano se lagav, aur Papa Ji par pure haq se hukum chalana sabse pyara lagta hai. 
                  Tum chahe aage chalkar medical college jao ya badhi doctor bano... Papa Ji ke liye tum hamesha wahi choti si ladli bitiya rahogi.
                </p>

                <p>
                  Zindagi mein kabhi bhi thak jao, ya padhai aur future ko lekar midnight overthinking ho... toh bas itna yaad rakhna ki 
                  <strong> Papa Ji hamesha tumhare sath khade hain.</strong> Kisi cheez ki tension lene ki zaroorat nahi hai. 
                  Tum jitni mehanti ho, utni hi samajhdaar bhi ho, aur tumhari muskaan humari sabse badi taakat hai.
                </p>

                <p>
                  Apne sapno ko bina kisi jhijhak ke poora karna. Ishwar se bas yahi prarthana hai ki tumhara yeh 17th saal aur aane wali zindagi 
                  sukoon aur safalta se bhari rahe. Aur haan, jab bhi pizza bake karo, Papa Ji ke liye pehli crispy aur pyaar bhari slice plate mein zaroor aani chahiye! ❤️
                </p>

                <div className="pt-4 text-right space-y-1">
                  <p className="font-bold text-stone-900 text-lg">Happy Daughter's Day, Bitiya Rani. 💖</p>
                  <p className="text-stone-600 text-sm italic font-sans">
                    — Tumhare Papa Ji (Always in your corner)
                  </p>
                </div>
              </div>

              {/* Postscript / Quick Reply helper */}
              <div className="mt-8 pt-6 border-t border-red-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
                <span className="text-xs text-stone-600 text-center sm:text-left">
                  Padh kar thoda emotional ya hasi aayi ho, toh Papa Ji ko WhatsApp pe ping kar sakti ho:
                </span>

                <button
                  onClick={handleCopyPing}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium shadow transition-all active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-300" />
                      <span>Copy Papa Ji Ping 💬</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer quiet signoff */}
        <div className="mt-20 text-center space-y-2 border-t border-rose-950/40 pt-8">
          <p className="font-rozha text-sm sm:text-base text-rose-200/80">
            Latakshi (Laashh Kati) · 17th Year · 27 September 2026 · Happy Daughter's Day
          </p>
          <p className="text-xs text-rose-400/60 font-kalam">
            "Papa Ji, yeh sach mein mere liye banaya hai?" — Haan Bitiya, sirf aur sirf tumhare liye. ❤️
          </p>
        </div>

      </div>
    </section>
  );
};
