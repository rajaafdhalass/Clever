import React, { useState } from 'react';
import { HeroIllustration } from './HeroIllustration';
import { EducationLevel } from '../types';
import { 
  ArrowRight, 
  Play, 
  BookOpen, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  BarChart3, 
  ShieldCheck, 
  Clock, 
  Award, 
  ChevronRight,
  Lightbulb,
  GraduationCap
} from 'lucide-react';

interface HomeViewProps {
  onSelectLevel: (level: EducationLevel, grade?: string) => void;
  onStartQuiz: (level?: EducationLevel, grade?: string, subject?: string, chapter?: string) => void;
  onOpenAI: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectLevel, onStartQuiz, onOpenAI }) => {
  // Interactive mini tryout widget state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const miniQuiz = {
    tag: 'MATEMATIKA · SMP KELAS 9 · PERSAMAAN KUADRAT',
    question: 'Hasil penyelesaian dari persamaan 3x² − 12x + 9 = 0 adalah ...',
    options: [
      { letter: 'A', text: 'x = 1 atau x = 3', correct: true },
      { letter: 'B', text: 'x = 1 atau x = −3', correct: false },
      { letter: 'C', text: 'x = −1 atau x = 3', correct: false },
      { letter: 'D', text: 'x = 2 atau x = 4', correct: false },
    ],
    explanation: 'Bagi kedua ruas dengan 3: x² − 4x + 3 = 0 ➔ (x − 1)(x − 3) = 0 ➔ didapat x = 1 atau x = 3.'
  };

  const handleOptionClick = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f8e7e6] text-[#c44241] font-bold text-xs tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Teman Belajar untuk Masa Depanmu</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-[#211c40] leading-[1.08]">
              <span className="font-serif italic font-normal text-[#c44241]">Be</span> Smart
              <br />
              <span className="inline-block ml-6 sm:ml-12">
                <span className="font-serif italic font-normal text-[#c44241]">Be</span> Clever
              </span>
            </h1>

            <p className="text-[#6d6880] text-base sm:text-lg max-w-xl leading-relaxed font-medium">
              Materi yang jelas, latihan yang seru, dan tryout interaktif yang membantumu lebih percaya diri menghadapi setiap ujian sekolah dan asesmen nasional.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-btn-learn"
                onClick={() => onSelectLevel('SD')}
                className="px-6 py-3.5 rounded-xl bg-[#c44241] text-white hover:bg-[#b03635] text-base font-bold shadow-lg shadow-[#c44241]/25 transition-all flex items-center gap-2.5 group"
              >
                <span>Mulai Belajar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-btn-tryout"
                onClick={() => onStartQuiz('SMP', 'Kelas 9')}
                className="px-6 py-3.5 rounded-xl bg-white border border-[#e5e0ef] text-[#211c40] hover:bg-[#f8e7e6]/40 text-base font-bold transition-all flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full border border-[#cfc7e8] flex items-center justify-center text-[#c44241]">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Coba Tryout Sekarang</span>
              </button>
            </div>

            {/* Trust badge */}
            <div className="pt-6 border-t border-[#e5e0ef]/70 flex items-center gap-4">
              <div className="flex -space-x-2">
                {['R', 'S', 'N', 'F', 'A'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#fffbf5] flex items-center justify-center text-xs font-bold text-white shadow-xs"
                    style={{
                      backgroundColor: ['#c44241', '#6847d7', '#f4a847', '#388e89', '#4a3a52'][i % 5]
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#6d6880] font-medium leading-tight">
                Dipercaya oleh <strong className="text-[#211c40] font-bold">12.000+ pelajar</strong> dari SD, SMP, hingga SMA di seluruh Indonesia
              </p>
            </div>
          </div>

          {/* Right Hero Art / Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* 2. JENJANG PENDIDIKAN (PILIH JENJANGMU) */}
      <section id="jenjang-section" className="bg-[#f8e7e6]/50 py-16 border-y border-[#e5e0ef]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left mb-10">
            <span className="text-xs font-extrabold tracking-widest text-[#c44241] uppercase">
              PILIH JENJANGMU
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#211c40] mt-1.5">
              Belajar sesuai langkah & fasemu.
            </h2>
            <p className="text-[#6d6880] text-sm sm:text-base mt-2 font-medium">
              Materi dan bank soal tersusun rapi sesuai kurikulum resmi agar kamu bisa fokus memahami konsep dengan mudah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SD Card */}
            <div
              onClick={() => onSelectLevel('SD')}
              className="bg-[#ffe8cc] hover:bg-[#ffe2bf] border border-[#f5d4af] rounded-2xl p-6 text-left cursor-pointer transition-all hover:-translate-y-1.5 shadow-sm hover:shadow-xl relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-white/80 text-[#e79742] flex items-center justify-center font-bold text-lg shadow-xs">
                  ☁
                </span>
                <span className="text-sm font-bold text-[#e79742] bg-white/70 px-2.5 py-1 rounded-lg flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Pilih <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-[11px] font-extrabold tracking-wider text-[#91581e] mt-6">
                SEKOLAH DASAR
              </p>
              <h3 className="font-display text-4xl font-black text-[#211c40] tracking-tight mt-1">
                SD
              </h3>
              <p className="text-xs font-semibold text-[#605b70] mt-1">
                Kelas 1 — Kelas 6
              </p>
              <div className="mt-6 pt-4 border-t border-[#f2cf9f] flex items-center justify-between text-xs font-bold text-[#7a4f21]">
                <span>120+ Soal & Rangkuman</span>
                <span className="underline">Buka SD →</span>
              </div>
            </div>

            {/* SMP Card */}
            <div
              onClick={() => onSelectLevel('SMP')}
              className="bg-[#d9f0ee] hover:bg-[#c9eae7] border border-[#bce0dd] rounded-2xl p-6 text-left cursor-pointer transition-all hover:-translate-y-1.5 shadow-sm hover:shadow-xl relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-white/80 text-[#388e89] flex items-center justify-center font-bold text-lg shadow-xs">
                  △
                </span>
                <span className="text-sm font-bold text-[#388e89] bg-white/70 px-2.5 py-1 rounded-lg flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Pilih <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-[11px] font-extrabold tracking-wider text-[#1e615e] mt-6">
                SEKOLAH MENENGAH PERTAMA
              </p>
              <h3 className="font-display text-4xl font-black text-[#211c40] tracking-tight mt-1">
                SMP
              </h3>
              <p className="text-xs font-semibold text-[#605b70] mt-1">
                Kelas 7 — Kelas 9
              </p>
              <div className="mt-6 pt-4 border-t border-[#a7d8d4] flex items-center justify-between text-xs font-bold text-[#236864]">
                <span>Matematika, IPA, dll</span>
                <span className="underline">Buka SMP →</span>
              </div>
            </div>

            {/* SMA Card */}
            <div
              onClick={() => onSelectLevel('SMA')}
              className="bg-[#ded7ff] hover:bg-[#d4caff] border border-[#c7bdff] rounded-2xl p-6 text-left cursor-pointer transition-all hover:-translate-y-1.5 shadow-sm hover:shadow-xl relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-white/80 text-[#7358d4] flex items-center justify-center font-bold text-lg shadow-xs">
                  ◒
                </span>
                <span className="text-sm font-bold text-[#7358d4] bg-white/70 px-2.5 py-1 rounded-lg flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Pilih <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-[11px] font-extrabold tracking-wider text-[#432d94] mt-6">
                SEKOLAH MENENGAH ATAS
              </p>
              <h3 className="font-display text-4xl font-black text-[#211c40] tracking-tight mt-1">
                SMA
              </h3>
              <p className="text-xs font-semibold text-[#605b70] mt-1">
                Kelas 10 — Kelas 12
              </p>
              <div className="mt-6 pt-4 border-t border-[#b8abf8] flex items-center justify-between text-xs font-bold text-[#48378d]">
                <span>Persiapan Ujian & UTBK</span>
                <span className="underline">Buka SMA →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIMULASI TRYOUT INTERAKTIF LIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#d87877] rounded-3xl p-6 sm:p-12 text-white shadow-xl shadow-[#c44241]/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="text-xs font-extrabold tracking-widest text-white/90 uppercase">
                SIAP UJI KEMAMPUAN?
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Latihan sekarang, <br />
                <span className="font-serif italic font-normal text-[#fff2f2]">percaya diri nanti.</span>
              </h2>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed font-medium">
                Rasakan simulasi ujian dengan penghitung waktu nyata, pembahasan instan setiap nomor, dan laporan skor analitik yang akurat.
              </p>
              <div className="pt-2">
                <button
                  id="start-full-tryout-btn"
                  onClick={() => onStartQuiz('SD', 'Kelas 5', 'Matematika', 'FPB dan KPK')}
                  className="px-6 py-3.5 rounded-xl bg-white text-[#c44241] hover:bg-[#fff6f6] font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  <span>Mulai Tryout Lengkap Gratis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Live Simulation Card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 text-[#211c40] shadow-2xl text-left border border-white/50">
                <div className="flex items-center justify-between border-b border-[#faeeee] pb-3 text-xs font-bold text-[#6d6880]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c44241] animate-ping"></span>
                    <span className="text-[#c44241] font-extrabold">Simulasi Live Tryout</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#f8e7e6] text-[#c44241] px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Waktu: 12:45</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-[10px] font-extrabold tracking-wider text-[#6847d7] uppercase">
                    {miniQuiz.tag}
                  </span>
                  <h4 className="font-display text-lg font-bold text-[#211c40] mt-1">
                    {miniQuiz.question}
                  </h4>

                  {/* Answers */}
                  <div className="space-y-2 mt-4">
                    {miniQuiz.options.map((opt, index) => {
                      const isSelected = selectedAnswer === index;
                      let btnStyle = 'border-[#e4dff0] bg-white hover:bg-[#f8e7e6]/30 text-[#211c40]';
                      if (isSelected) {
                        btnStyle = opt.correct 
                          ? 'border-[#27875f] bg-[#edfbf4] text-[#176847]' 
                          : 'border-[#c44241] bg-[#fff1f0] text-[#c44241]';
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(index)}
                          className={`w-full p-3 rounded-xl border text-sm font-semibold flex items-center justify-between transition-all ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                              isSelected ? 'bg-white shadow-xs' : 'bg-[#f1edff] text-[#6847d7]'
                            }`}>
                              {opt.letter}
                            </span>
                            <span>{opt.text}</span>
                          </div>
                          {isSelected && (
                            <span className="text-xs font-bold">
                              {opt.correct ? '✓ Benar' : '✕ Belum tepat'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Instant Explanation Feedback */}
                  {showExplanation && (
                    <div className="mt-4 p-3.5 rounded-xl bg-[#fff8f5] border border-[#f1d7d5] text-xs leading-relaxed text-[#514c65]">
                      <strong className="text-[#c44241] block mb-1">💡 Pembahasan:</strong>
                      {miniQuiz.explanation}
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between pt-3 border-t border-[#f1edff]">
                    <span className="text-xs text-[#6d6880]">Soal 4 dari 20 Soal</span>
                    <button
                      onClick={() => onStartQuiz('SMP', 'Kelas 9', 'Matematika', 'Persamaan Kuadrat')}
                      className="px-4 py-2 rounded-lg bg-[#c44241] text-white hover:bg-[#b03635] text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <span>Lanjut Paket Soal</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KENAPA CLEVERLY? (FEATURES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-[#c44241] uppercase">
            KENAPA CLEVERLY?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#211c40] mt-1.5">
            Semua yang kamu butuhkan untuk terus berkembang.
          </h2>
          <p className="text-[#6d6880] text-sm sm:text-base mt-2 font-medium">
            Dirancang khusus untuk membantu siswa memahami konsep belajar secara mandiri, terstruktur, dan menyenangkan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#e5e0ef] rounded-2xl p-7 text-left shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#ebe5ff] text-[#7658dc] flex items-center justify-center font-bold text-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#211c40] mt-5">
              Materi Terstruktur
            </h3>
            <p className="text-[#6d6880] text-sm leading-relaxed mt-2 font-medium">
              Rangkuman konsep esensial, rumus ringkas, dan contoh pembahasan nyata dari tingkat SD, SMP, hingga SMA.
            </p>
          </div>

          <div className="bg-white border border-[#e5e0ef] rounded-2xl p-7 text-left shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#fff0d4] text-[#f5ae3d] flex items-center justify-center font-bold text-xl">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#211c40] mt-5">
              Tryout & Latihan Interaktif
            </h3>
            <p className="text-[#6d6880] text-sm leading-relaxed mt-2 font-medium">
              Simulasi ujian dengan batas waktu nyata, sistem scoring instan, dan review jawaban benar-salah secara detail.
            </p>
          </div>

          <div className="bg-white border border-[#e5e0ef] rounded-2xl p-7 text-left shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#dceff0] text-[#4b989b] flex items-center justify-center font-bold text-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#211c40] mt-5">
              Asisten AI Belajar 24/7
            </h3>
            <p className="text-[#6d6880] text-sm leading-relaxed mt-2 font-medium">
              Tanyakan soal PR atau materi matematika dan sains yang sulit kapan saja untuk mendapat penjelasan langkah demi langkah.
            </p>
          </div>
        </div>
      </section>

      {/* 5. QUICK BANNER TO AI ASISTEN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#211c40] via-[#33236c] to-[#4a3a52] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-left space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#f4a847] text-xs font-bold">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Ada Soal yang Bikin Bingung?</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold">
              Tanya Asisten AI Cleverly sekarang!
            </h3>
            <p className="text-[#d1cbe7] text-sm font-medium">
              Dapatkan bantuan pengerjaan soal hitungan, rumus, atau konsep sains dalam bahasa Indonesia yang ramah siswa.
            </p>
          </div>
          <button
            onClick={onOpenAI}
            className="px-6 py-3.5 rounded-xl bg-[#c44241] text-white hover:bg-[#b03635] font-bold text-sm shadow-lg whitespace-nowrap flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Buka Tanya AI</span>
          </button>
        </div>
      </section>
    </div>
  );
};
