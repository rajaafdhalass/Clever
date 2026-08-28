import React, { useState, useMemo } from 'react';
import { LESSONS_DATA } from '../data/lessonsData';
import { EducationLevel, LessonChapter } from '../types';
import { 
  BookOpen, 
  ChevronRight, 
  ArrowRight, 
  Calculator, 
  Lightbulb, 
  Sparkles, 
  Tag, 
  HelpCircle,
  GraduationCap
} from 'lucide-react';

interface RuangBelajarViewProps {
  initialLevel?: EducationLevel;
  initialGrade?: string;
  onStartQuiz: (level: EducationLevel, grade: string, subject: string, chapter: string) => void;
  onAskAI: (topic: string) => void;
}

export const RuangBelajarView: React.FC<RuangBelajarViewProps> = ({
  initialLevel = 'SD',
  initialGrade = 'Kelas 5',
  onStartQuiz,
  onAskAI
}) => {
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel>(initialLevel);
  const [selectedGrade, setSelectedGrade] = useState<string>(initialGrade);
  const [selectedSubject, setSelectedSubject] = useState<string>('Matematika');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('');

  const gradeOptions = useMemo(() => {
    switch (selectedLevel) {
      case 'SD':
        return ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'];
      case 'SMP':
        return ['Kelas 7', 'Kelas 8', 'Kelas 9'];
      case 'SMA':
        return ['Kelas 10', 'Kelas 11', 'Kelas 12'];
    }
  }, [selectedLevel]);

  // Filter lessons based on level and grade
  const availableLessons = useMemo(() => {
    return LESSONS_DATA.filter(
      (l) => l.level === selectedLevel && (l.grade === selectedGrade || !selectedGrade)
    );
  }, [selectedLevel, selectedGrade]);

  // Current active chapter
  const currentLesson = useMemo(() => {
    if (selectedChapterId) {
      const found = LESSONS_DATA.find((l) => l.id === selectedChapterId);
      if (found) return found;
    }
    return availableLessons[0] || null;
  }, [selectedChapterId, availableLessons]);

  const handleLevelChange = (level: EducationLevel) => {
    setSelectedLevel(level);
    const defaultGrade = level === 'SD' ? 'Kelas 5' : level === 'SMP' ? 'Kelas 8' : 'Kelas 10';
    setSelectedGrade(defaultGrade);
    setSelectedChapterId('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="border-b border-[#e5e0ef] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8e7e6] text-[#c44241] font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>RUANG BELAJAR CLEVERLY</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#211c40]">
          Materi Pembelajaran Terstruktur
        </h1>
        <p className="text-[#6d6880] text-sm sm:text-base mt-1 font-medium">
          Pelajari konsep penting, rangkuman rumus, dan contoh pembahasan sebelum menguji kemampuanmu di latihan soal.
        </p>

        {/* Level Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 mt-6">
          {(['SD', 'SMP', 'SMA'] as EducationLevel[]).map((lvl) => {
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => handleLevelChange(lvl)}
                className={`px-5 py-2.5 rounded-xl font-display font-extrabold text-sm transition-all ${
                  isSelected
                    ? 'bg-[#c44241] text-white shadow-md shadow-[#c44241]/20'
                    : 'bg-white border border-[#e5e0ef] text-[#555168] hover:bg-[#f8e7e6]/40'
                }`}
              >
                {lvl === 'SD' ? 'Sekolah Dasar (SD)' : lvl === 'SMP' ? 'SMP (Kelas 7-9)' : 'SMA (Kelas 10-12)'}
              </button>
            );
          })}
        </div>

        {/* Grade Selector & Subject Filters */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6d6880]">Pilih Kelas:</span>
            <select
              value={selectedGrade}
              onChange={(e) => {
                setSelectedGrade(e.target.value);
                setSelectedChapterId('');
              }}
              className="bg-white border border-[#dcd6e9] rounded-xl px-3.5 py-1.5 text-xs font-bold text-[#211c40] focus:ring-2 focus:ring-[#c44241]"
            >
              {gradeOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {['Matematika', 'IPA', 'Bahasa Indonesia'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedSubject === sub
                    ? 'bg-[#211c40] text-white'
                    : 'bg-white border border-[#e5e0ef] text-[#6d6880] hover:text-[#211c40]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Chapter Sidebar */}
        <div className="lg:col-span-4 bg-white border border-[#e5e0ef] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#f1edff]">
            <h3 className="font-display font-extrabold text-base text-[#211c40]">
              Daftar Bab & Topik
            </h3>
            <span className="text-xs font-bold text-[#6847d7] bg-[#f1edff] px-2 py-0.5 rounded-full">
              {availableLessons.length} Bab
            </span>
          </div>

          {availableLessons.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#6d6880] space-y-2">
              <p>Materi untuk {selectedGrade} ({selectedSubject}) sedang dalam proses penyusunan modul kurikulum.</p>
              <button
                onClick={() => handleLevelChange('SD')}
                className="text-[#c44241] font-bold underline"
              >
                Lihat Materi SD Kelas 5 & 6 →
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {availableLessons.map((item) => {
                const isActive = (currentLesson?.id === item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedChapterId(item.id)}
                    className={`w-full p-3.5 rounded-xl text-left text-sm font-bold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-[#f8e7e6] text-[#c44241] border border-[#c44241]/30 shadow-xs'
                        : 'bg-white hover:bg-[#f8e7e6]/30 text-[#211c40] border border-transparent'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-extrabold text-[#6d6880] uppercase">
                        {item.subject} · {item.grade}
                      </div>
                      <div className="mt-0.5">{item.title}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#c44241]' : 'text-[#6d6880]'}`} />
                  </button>
                );
              })}
            </div>
          )}

          {/* Quick AI Help Banner in Sidebar */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#f1edff] to-[#fff6f5] border border-[#e5e0ef] space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#6847d7]">
              <Sparkles className="w-4 h-4" />
              <span>Butuh Bantuan Topik Lain?</span>
            </div>
            <p className="text-[11px] text-[#6d6880] font-medium leading-relaxed">
              Tanyakan materi atau rumus apa pun kepada Asisten Belajar AI Cleverly.
            </p>
            <button
              onClick={() => onAskAI(currentLesson ? currentLesson.title : 'Matematika')}
              className="w-full py-2 bg-[#6847d7] hover:bg-[#5837c7] text-white rounded-lg text-xs font-bold transition-all shadow-xs"
            >
              Tanya AI tentang materi ini →
            </button>
          </div>
        </div>

        {/* Right: Lesson Details Content Pane */}
        <div className="lg:col-span-8 bg-white border border-[#e5e0ef] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {currentLesson ? (
            <>
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#f1edff]">
                <div>
                  <span className="text-[11px] font-extrabold tracking-wider text-[#c44241] uppercase">
                    RINGKASAN MATERI · {currentLesson.level} {currentLesson.grade}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#211c40] mt-1">
                    {currentLesson.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-[#edfbf4] border border-[#6ac39b]/30 text-[#176847] text-xs font-bold">
                    {currentLesson.subject}
                  </span>
                </div>
              </div>

              {/* Intro */}
              <div className="bg-[#fffbf5] border border-[#f5ead7] rounded-xl p-4 text-sm sm:text-base text-[#4a3a52] leading-relaxed font-medium">
                {currentLesson.intro}
              </div>

              {/* Key Concept Points */}
              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-[#211c40] flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#f4a847]" />
                  <span>Konsep & Poin Utama</span>
                </h3>
                <ul className="space-y-2.5">
                  {currentLesson.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#514c65] font-medium leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-[#f8e7e6] text-[#c44241] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Formula Cheat-sheet */}
              {currentLesson.formula && (
                <div className="bg-[#f1edff]/70 border border-[#ded6f8] rounded-xl p-4 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#6847d7] uppercase">
                    <Calculator className="w-4 h-4" />
                    <span>Rumus Penting</span>
                  </div>
                  <p className="font-mono text-sm sm:text-base font-bold text-[#211c40] bg-white/80 p-2.5 rounded-lg border border-[#e4dff0]">
                    {currentLesson.formula}
                  </p>
                </div>
              )}

              {/* Example & Discussion Box */}
              <div className="bg-[#fff6f5] border border-[#f1d7d5] rounded-xl p-5 space-y-2">
                <div className="text-xs font-extrabold text-[#c44241] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Contoh Soal & Cara Pengerjaan</span>
                </div>
                <pre className="font-sans text-sm text-[#211c40] whitespace-pre-wrap leading-relaxed font-medium bg-white/90 p-4 rounded-lg border border-[#f8e7e6]">
                  {currentLesson.example}
                </pre>
              </div>

              {/* Action Toolbar */}
              <div className="pt-4 border-t border-[#f1edff] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {currentLesson.tags?.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6d6880] bg-gray-100 px-2.5 py-1 rounded-md">
                      <Tag className="w-3 h-3" />
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() =>
                    onStartQuiz(
                      currentLesson.level,
                      currentLesson.grade,
                      currentLesson.subject,
                      currentLesson.title
                    )
                  }
                  className="px-6 py-3 rounded-xl bg-[#c44241] text-white hover:bg-[#b03635] text-sm font-bold shadow-md shadow-[#c44241]/20 flex items-center gap-2 transition-all"
                >
                  <span>Latihan Soal Bab Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16 space-y-3">
              <p className="text-base text-[#6d6880] font-medium">Pilih bab dari daftar di sebelah kiri untuk membaca materi pembelajaran.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
