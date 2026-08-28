import React from 'react';
import { Sparkles, Award, TrendingUp, Atom, Orbit, Pi, FlaskConical } from 'lucide-react';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-[540px] mx-auto min-h-[420px] sm:min-h-[460px] flex items-center justify-center p-4">
      {/* Background ambient glow & soft shapes */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#ffe8cc]/60 via-[#ffdad8]/40 to-[#ded7ff]/50 rounded-[42px] blur-xl opacity-80"></div>
      
      {/* Central 3D Aesthetic Canvas */}
      <div className="relative z-10 w-full h-full bg-gradient-to-b from-white/90 to-[#fff8f5]/90 border border-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#301c38]/10 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Floating Background Geometry Icons */}
        <div className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-[#ffeedb] text-[#f4a847] flex items-center justify-center shadow-xs animate-bounce" style={{ animationDuration: '4s' }}>
          <Pi className="w-5 h-5" />
        </div>
        <div className="absolute top-6 right-6 w-11 h-11 rounded-2xl bg-[#ede8ff] text-[#6847d7] flex items-center justify-center shadow-xs animate-pulse">
          <Atom className="w-6 h-6" />
        </div>
        <div className="absolute bottom-6 left-6 w-10 h-10 rounded-2xl bg-[#dff2f0] text-[#388e89] flex items-center justify-center shadow-xs">
          <FlaskConical className="w-5 h-5" />
        </div>
        <div className="absolute bottom-8 right-6 w-10 h-10 rounded-2xl bg-[#ffe4e4] text-[#c44241] flex items-center justify-center shadow-xs">
          <Orbit className="w-5 h-5" />
        </div>

        {/* Center Graphic Badge */}
        <div className="relative my-4 flex flex-col items-center">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-[#c44241] via-[#d85857] to-[#7358d4] p-1 shadow-xl shadow-[#c44241]/25 flex items-center justify-center relative group">
            <div className="w-full h-full bg-[#211c40] rounded-[22px] flex flex-col items-center justify-center text-white p-3 text-center">
              <span className="text-2xl sm:text-3xl font-serif font-black text-[#f4a847] tracking-tight">x² + y²</span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#d1cbe7] mt-1">
                Cleverly Engine
              </span>
            </div>
            <div className="absolute -top-3 -right-3 bg-[#f4a847] text-white p-1.5 rounded-xl shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Interactive Floating Card 1: Score Badge */}
        <div className="w-full max-w-[280px] bg-white border border-[#e5e0ef] rounded-2xl p-3.5 shadow-lg shadow-[#211c40]/5 flex items-center gap-3.5 mt-2 transform hover:-translate-y-1 transition-transform">
          <div className="w-11 h-11 rounded-xl bg-[#edfbf4] text-[#27875f] flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#6d6880] uppercase tracking-wider">Skor Tryout Rata-Rata</span>
              <span className="text-xs font-extrabold text-[#27875f] bg-[#edfbf4] px-1.5 py-0.5 rounded-md">+18%</span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-display font-extrabold text-2xl text-[#211c40]">94.8</span>
              <span className="text-xs font-semibold text-[#6d6880]">/ 100 Poin</span>
            </div>
          </div>
        </div>

        {/* Interactive Floating Card 2: Materi & Progres */}
        <div className="w-full max-w-[280px] bg-white border border-[#e5e0ef] rounded-2xl p-3.5 shadow-lg shadow-[#211c40]/5 flex items-center gap-3.5 mt-3 transform hover:-translate-y-1 transition-transform">
          <div className="w-11 h-11 rounded-xl bg-[#f1edff] text-[#6847d7] flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#211c40]">Matematika & IPA</span>
              <span className="text-[#6847d7]">85% Siap</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#f1edff] mt-1.5 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#6847d7] to-[#c44241] w-[85%] transition-all duration-1000"></div>
            </div>
          </div>
        </div>

        {/* Small Trust Badge under the card */}
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#6d6880]">
          <span className="w-2 h-2 rounded-full bg-[#27875f] animate-ping"></span>
          <span>1.450+ Soal & Pembahasan Terverifikasi</span>
        </div>
      </div>
    </div>
  );
};
