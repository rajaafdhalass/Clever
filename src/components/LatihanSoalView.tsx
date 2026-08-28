import React, { useState, useEffect, useMemo } from 'react';
import { Question, EducationLevel, QuizAttemptResult } from '../types';
import { saveQuizHistory } from '../utils/storage';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Bookmark,
  Award,
  Filter,
  Check,
  ChevronRight,
  Send
} from 'lucide-react';

interface LatihanSoalViewProps {
  questions: Question[];
  initialLevel?: EducationLevel;
  initialGrade?: string;
  initialSubject?: string;
  initialChapter?: string;
  onAskAI: (questionText: string) => void;
}

export const LatihanSoalView: React.FC<LatihanSoalViewProps> = ({
  questions,
  initialLevel = 'SD',
  initialGrade = '',
  initialSubject = 'Matematika',
  initialChapter = '',
  onAskAI
}) => {
  // Screen state: 'select' | 'quiz' | 'result'
  const [screen, setScreen] = useState<'select' | 'quiz' | 'result'>('select');

  // Configuration state
  const [level, setLevel] = useState<EducationLevel>(initialLevel);
  const [grade, setGrade] = useState<string>(initialGrade);
  const [subject, setSubject] = useState<string>(initialSubject);
  const [chapter, setChapter] = useState<string>(initialChapter);
  const [mode, setMode] = useState<'practice' | 'tryout'>('practice');
  const [questionLimit, setQuestionLimit] = useState<number>(0); // 0 = all

  // Active quiz state
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  // Available unique subjects and chapters based on selection
  const availableSubjects = useMemo(() => {
    const subs = [...new Set(questions.filter((q) => q.level === level).map((q) => q.subject || 'Matematika'))];
    return subs.length ? subs : ['Matematika'];
  }, [questions, level]);

  const availableChapters = useMemo(() => {
    const list = questions.filter(
      (q) => q.level === level && (q.subject || 'Matematika') === subject && (!grade || q.grade === grade)
    );
    const chaps = [...new Set(list.map((q) => q.chapter || 'Semua Bab'))];
    return chaps.length ? chaps : ['Semua Bab'];
  }, [questions, level, grade, subject]);

  const availableGrades = useMemo(() => {
    if (level === 'SD') return ['Semua Kelas', 'Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'];
    if (level === 'SMP') return ['Semua Kelas', 'Kelas 7', 'Kelas 8', 'Kelas 9'];
    return ['Semua Kelas', 'Kelas 10', 'Kelas 11', 'Kelas 12'];
  }, [level]);

  // Sync initial props if passed from other views
  useEffect(() => {
    if (initialLevel) setLevel(initialLevel);
    if (initialGrade) setGrade(initialGrade);
    if (initialSubject) setSubject(initialSubject);
    if (initialChapter) setChapter(initialChapter);
  }, [initialLevel, initialGrade, initialSubject, initialChapter]);

  // Timer effect for quiz
  useEffect(() => {
    let timer: any = null;
    if (screen === 'quiz') {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [screen]);

  // Format seconds to mm:ss
  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Filtered pool count for start card
  const filteredPool = useMemo(() => {
    return questions.filter((q) => {
      if (q.level !== level) return false;
      if (grade && grade !== 'Semua Kelas' && q.grade !== grade) return false;
      if (subject && q.subject !== subject) return false;
      if (chapter && chapter !== 'Semua Bab' && q.chapter !== chapter) return false;
      return true;
    });
  }, [questions, level, grade, subject, chapter]);

  // Start Quiz Handler
  const handleStartQuiz = () => {
    let pool = [...filteredPool];
    if (pool.length === 0) return;

    if (questionLimit > 0 && questionLimit < pool.length) {
      pool = pool.slice(0, questionLimit);
    }

    setQuizQuestions(pool);
    setUserAnswers(new Array(pool.length).fill(null));
    setFlaggedQuestions(new Array(pool.length).fill(false));
    setCurrentIndex(0);
    setSeconds(0);
    setScreen('quiz');
  };

  // Handle Option Select
  const handleSelectOption = (optionIndex: number) => {
    const updated = [...userAnswers];
    updated[currentIndex] = optionIndex;
    setUserAnswers(updated);
  };

  // Toggle Flag
  const toggleFlag = (index: number) => {
    const updated = [...flaggedQuestions];
    updated[index] = !updated[index];
    setFlaggedQuestions(updated);
  };

  // Finish Quiz Handler
  const handleFinishQuiz = () => {
    setScreen('result');
    const correct = quizQuestions.filter((q, i) => userAnswers[i] === q.answer).length;
    const scoreVal = Math.round((correct / quizQuestions.length) * 100);

    // Save to history
    const result: QuizAttemptResult = {
      id: String(Date.now()),
      date: new Date().toISOString(),
      level,
      grade: grade || 'Semua Kelas',
      subject,
      chapter: chapter || 'Latihan',
      mode,
      totalQuestions: quizQuestions.length,
      correctCount: correct,
      wrongCount: quizQuestions.length - correct,
      unansweredCount: userAnswers.filter((a) => a === null).length,
      score: scoreVal,
      timeSpentSeconds: seconds,
    };
    saveQuizHistory(result);

    // Confetti effect if good score
    if (scoreVal >= 75) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c44241', '#f4a847', '#6847d7', '#27875f'],
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  // Retry only wrong questions
  const handleRetryWrong = () => {
    const wrongIndices: number[] = [];
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] !== q.answer) {
        wrongIndices.push(idx);
      }
    });

    if (wrongIndices.length === 0) return;

    const wrongPool = wrongIndices.map((i) => quizQuestions[i]);
    setQuizQuestions(wrongPool);
    setUserAnswers(new Array(wrongPool.length).fill(null));
    setFlaggedQuestions(new Array(wrongPool.length).fill(false));
    setCurrentIndex(0);
    setSeconds(0);
    setScreen('quiz');
  };

  // 1. SELECT SCREEN
  if (screen === 'select') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-left">
        <div className="border-b border-[#e5e0ef] pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8e7e6] text-[#c44241] font-bold text-xs uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>LATIHAN & TRYOUT INTERAKTIF</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#211c40]">
            Pilih Paket Latihan & Ujian
          </h1>
          <p className="text-[#6d6880] text-sm sm:text-base mt-1 font-medium">
            Uji pemahaman materi dengan paket latihan mandiri atau simulasi tryout lengkap berbatas waktu.
          </p>
        </div>

        <div className="bg-white border border-[#e5e0ef] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#6d6880] mb-2.5">
              Pilih Mode Belajar
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setMode('practice')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  mode === 'practice'
                    ? 'border-[#c44241] bg-[#fff8f5] shadow-xs'
                    : 'border-[#e5e0ef] bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-base text-[#211c40]">
                    Mode Latihan Mandiri
                  </span>
                  {mode === 'practice' && <CheckCircle2 className="w-5 h-5 text-[#c44241]" />}
                </div>
                <p className="text-xs text-[#6d6880] mt-1 font-medium">
                  Pembahasan instan langsung muncul setelah memilih jawaban. Cocok untuk mengasah konsep.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setMode('tryout')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  mode === 'tryout'
                    ? 'border-[#6847d7] bg-[#f8f5ff] shadow-xs'
                    : 'border-[#e5e0ef] bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-base text-[#211c40]">
                    Mode Simulasi Tryout
                  </span>
                  {mode === 'tryout' && <CheckCircle2 className="w-5 h-5 text-[#6847d7]" />}
                </div>
                <p className="text-xs text-[#6d6880] mt-1 font-medium">
                  Suasana ujian nyata tanpa kunci jawaban saat pengerjaan. Nilai & pembahasan tampil di akhir.
                </p>
              </button>
            </div>
          </div>

          {/* Grid Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#211c40] mb-1.5">Jenjang Pendidikan</label>
              <select
                value={level}
                onChange={(e) => {
                  const newLvl = e.target.value as EducationLevel;
                  setLevel(newLvl);
                  setGrade('Semua Kelas');
                  setChapter('');
                }}
                className="w-full bg-white border border-[#dcd6e9] rounded-xl p-3 text-sm font-semibold text-[#211c40]"
              >
                <option value="SD">Sekolah Dasar (SD)</option>
                <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
                <option value="SMA">SMA (Sekolah Menengah Atas)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#211c40] mb-1.5">Kelas</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-white border border-[#dcd6e9] rounded-xl p-3 text-sm font-semibold text-[#211c40]"
              >
                {availableGrades.map((g) => (
                  <option key={g} value={g === 'Semua Kelas' ? '' : g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#211c40] mb-1.5">Mata Pelajaran</label>
              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setChapter('');
                }}
                className="w-full bg-white border border-[#dcd6e9] rounded-xl p-3 text-sm font-semibold text-[#211c40]"
              >
                {availableSubjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#211c40] mb-1.5">Bab Pembahasan</label>
              <select
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="w-full bg-white border border-[#dcd6e9] rounded-xl p-3 text-sm font-semibold text-[#211c40]"
              >
                <option value="">Semua Bab Tersedia</option>
                {availableChapters.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Question Limit Selection */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-[#211c40] mb-1.5">Jumlah Soal</label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Semua Soal', val: 0 },
                { label: '5 Soal Cepat', val: 5 },
                { label: '10 Soal Standar', val: 10 },
                { label: '20 Soal Tryout', val: 20 },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setQuestionLimit(opt.val)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    questionLimit === opt.val
                      ? 'bg-[#211c40] text-white'
                      : 'bg-white border border-[#e5e0ef] text-[#6d6880] hover:text-[#211c40]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary & Start Button */}
          <div className="pt-6 border-t border-[#f1edff] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#6d6880] font-medium">
              Tersedia <strong className="text-[#211c40] font-bold">{filteredPool.length} butir soal</strong> yang cocok dengan filter yang kamu pilih.
            </div>

            <button
              id="btn-start-quiz-now"
              disabled={filteredPool.length === 0}
              onClick={handleStartQuiz}
              className={`px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 ${
                filteredPool.length > 0
                  ? 'bg-[#c44241] text-white hover:bg-[#b03635] shadow-[#c44241]/20 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Mulai {mode === 'tryout' ? 'Simulasi Tryout' : 'Latihan'} Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. ACTIVE QUIZ SCREEN
  if (screen === 'quiz') {
    const currentQ = quizQuestions[currentIndex];
    const currentAnswer = userAnswers[currentIndex];
    const isAnswered = currentAnswer !== null && currentAnswer !== undefined;
    const isFlagged = flaggedQuestions[currentIndex];
    const progressPercent = ((currentIndex + 1) / quizQuestions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-left">
        {/* Top bar: Level/Subject Tag + Timer */}
        <div className="bg-white border border-[#e5e0ef] rounded-2xl p-4 sm:p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold tracking-wider text-[#6847d7] uppercase">
              {currentQ.level} · {currentQ.grade} · {currentQ.subject}
            </span>
            <h3 className="font-display font-bold text-base text-[#211c40] mt-0.5">
              Bab: {currentQ.chapter}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f2efff] text-[#5b43bc] font-mono text-sm font-extrabold border border-[#ded6f8]">
              <Clock className="w-4 h-4" />
              <span>{formatTimer(seconds)}</span>
            </div>

            <button
              onClick={() => toggleFlag(currentIndex)}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all ${
                isFlagged
                  ? 'bg-[#fff0d4] text-[#f5ae3d] border-[#f5ae3d]'
                  : 'bg-white text-[#6d6880] border-[#e5e0ef] hover:bg-gray-50'
              }`}
              title="Tandai ragu-ragu"
            >
              <Bookmark className={`w-4 h-4 ${isFlagged ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">Ragu-ragu</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#ebe7f5] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#c44241] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Question & Options Card */}
        <div className="bg-white border border-[#e5e0ef] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-[#6d6880] border-b border-[#f1edff] pb-3">
            <span>
              Nomor <strong className="text-[#211c40] text-sm">{currentIndex + 1}</strong> dari {quizQuestions.length} Soal
            </span>
            <span className="text-[11px] bg-gray-100 px-2 py-0.5 rounded-md">
              {mode === 'practice' ? 'Mode Latihan Mandiri' : 'Simulasi Ujian'}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#211c40] leading-snug">
              {currentQ.question}
            </h2>

            {/* Optional Image */}
            {currentQ.image && (
              <div className="p-2 border border-[#e5e0ef] rounded-xl bg-[#faf9fd] max-w-md">
                <img
                  src={currentQ.image}
                  alt="Ilustrasi soal"
                  className="max-h-64 object-contain rounded-lg mx-auto"
                />
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((optText, optIdx) => {
              const letter = 'ABCD'[optIdx];
              const isSelected = currentAnswer === optIdx;
              const isCorrect = currentQ.answer === optIdx;

              let buttonStyle = 'border-[#e4dff0] bg-white hover:border-[#a794e8] text-[#211c40]';

              if (mode === 'practice' && isAnswered) {
                if (isCorrect) {
                  buttonStyle = 'border-[#27875f] bg-[#edfbf4] text-[#176847] font-bold';
                } else if (isSelected) {
                  buttonStyle = 'border-[#c44241] bg-[#fff0f3] text-[#a83352] font-bold';
                } else {
                  buttonStyle = 'border-[#e5e0ef] bg-white text-gray-400 opacity-60';
                }
              } else if (isSelected) {
                buttonStyle = 'border-[#c44241] bg-[#fff8f5] text-[#c44241] font-bold ring-2 ring-[#c44241]/20';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-3.5 rounded-xl border text-sm flex items-center justify-between text-left transition-all ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected
                          ? 'bg-[#c44241] text-white shadow-xs'
                          : 'bg-[#f0edf7] text-[#6957b1]'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="font-medium">{optText}</span>
                  </div>

                  {mode === 'practice' && isAnswered && isCorrect && (
                    <span className="text-xs font-bold text-[#27875f] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Benar
                    </span>
                  )}
                  {mode === 'practice' && isAnswered && isSelected && !isCorrect && (
                    <span className="text-xs font-bold text-[#c44241] flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Salah
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Practice Mode Instant Explanation Box */}
          {mode === 'practice' && isAnswered && (
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                currentAnswer === currentQ.answer
                  ? 'bg-[#edfbf4] border border-[#6ac39b]/40 text-[#176847]'
                  : 'bg-[#fff0f3] border border-[#e58ca2]/40 text-[#a83352]'
              }`}
            >
              <div className="font-bold flex items-center justify-between mb-1">
                <span>
                  {currentAnswer === currentQ.answer
                    ? '✓ Jawabanmu Tepat!'
                    : `✕ Belum tepat. Kunci jawaban: ${'ABCD'[currentQ.answer]}. ${currentQ.options[currentQ.answer]}`}
                </span>
                <button
                  onClick={() => onAskAI(`Jelaskan langkah soal: ${currentQ.question}`)}
                  className="text-xs underline hover:opacity-80 ml-2"
                >
                  Tanya AI →
                </button>
              </div>
              {currentQ.explanation && <p className="mt-1 font-medium">{currentQ.explanation}</p>}
            </div>
          )}

          {/* Action Footer Buttons */}
          <div className="pt-4 border-t border-[#f1edff] flex items-center justify-between gap-4">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className={`px-4 py-2.5 rounded-xl border border-[#e5e0ef] text-sm font-bold flex items-center gap-2 ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-gray-400 bg-gray-50'
                  : 'text-[#211c40] bg-white hover:bg-gray-50'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {currentIndex < quizQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="px-6 py-2.5 rounded-xl bg-[#211c40] text-white hover:bg-[#33236c] text-sm font-bold flex items-center gap-2 transition-all"
              >
                <span>Selanjutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishQuiz}
                className="px-6 py-2.5 rounded-xl bg-[#c44241] text-white hover:bg-[#b03635] text-sm font-bold shadow-md shadow-[#c44241]/20 flex items-center gap-2 transition-all"
              >
                <span>Selesai & Kumpulkan</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Question Grid Navigator */}
        <div className="bg-white border border-[#e5e0ef] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-[#6d6880] mb-3">
            <span>Navigasi Nomor Soal</span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c44241]"></span> Terjawab
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f5ae3d]"></span> Ragu-ragu
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-200"></span> Belum
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {quizQuestions.map((_, idx) => {
              const isCurrent = idx === currentIndex;
              const answered = userAnswers[idx] !== null;
              const flagged = flaggedQuestions[idx];

              let bg = 'bg-white border-[#e5e0ef] text-[#211c40]';
              if (isCurrent) {
                bg = 'ring-2 ring-[#211c40] bg-[#f8e7e6] font-extrabold text-[#c44241] border-[#c44241]';
              } else if (flagged) {
                bg = 'bg-[#fff0d4] text-[#f5ae3d] border-[#f5ae3d] font-bold';
              } else if (answered) {
                bg = 'bg-[#c44241] text-white border-[#c44241] font-bold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-lg border text-xs flex items-center justify-center transition-all ${bg}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. RESULT & REVIEW SCREEN
  const correctTotal = quizQuestions.filter((q, i) => userAnswers[i] === q.answer).length;
  const unansweredTotal = userAnswers.filter((a) => a === null).length;
  const wrongTotal = quizQuestions.length - correctTotal - unansweredTotal;
  const scorePercent = Math.round((correctTotal / quizQuestions.length) * 100);

  const filteredReviewIndices = quizQuestions
    .map((_, i) => i)
    .filter((idx) => {
      const isCorrect = userAnswers[idx] === quizQuestions[idx].answer;
      if (reviewFilter === 'wrong') return !isCorrect;
      if (reviewFilter === 'correct') return isCorrect;
      return true;
    });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="border-b border-[#e5e0ef] pb-6 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edfbf4] text-[#176847] font-bold text-xs uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>LATIHAN TELAH SELESAI</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#211c40]">
            Hasil & Pembahasan Lengkap
          </h1>
          <p className="text-[#6d6880] text-sm sm:text-base mt-1 font-medium">
            Evaluasi pemahamanmu melalui ringkasan skor dan pembahasan detail setiap butir pertanyaan.
          </p>
        </div>
      </div>

      {/* Score Summary Card */}
      <div className="bg-white border border-[#e5e0ef] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Big Score Box */}
          <div className="md:col-span-4 bg-[#fff8f5] border border-[#f1d7d5] rounded-2xl p-6 text-center space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#6d6880]">
              Skor Perolehan
            </span>
            <div className="font-display text-5xl sm:text-6xl font-black text-[#c44241]">
              {scorePercent}
              <span className="text-xl sm:text-2xl text-[#6d6880] font-bold">/100</span>
            </div>
            <p className="text-xs font-bold text-[#27875f] pt-1">
              {scorePercent >= 80 ? '🎉 Luar Biasa! Sangat Memuaskan' : scorePercent >= 60 ? '👍 Bagus! Terus Tingkatkan' : '📚 Perlu Pengulangan Materi'}
            </p>
          </div>

          {/* Stats Breakdown */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#edfbf4] border border-[#6ac39b]/30 p-3.5 rounded-xl text-center">
              <span className="text-xs font-bold text-[#176847]">Jawaban Benar</span>
              <div className="text-2xl font-black text-[#27875f] mt-0.5">{correctTotal}</div>
            </div>

            <div className="bg-[#fff0f3] border border-[#e58ca2]/30 p-3.5 rounded-xl text-center">
              <span className="text-xs font-bold text-[#a83352]">Jawaban Salah</span>
              <div className="text-2xl font-black text-[#c44241] mt-0.5">{wrongTotal}</div>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-3.5 rounded-xl text-center">
              <span className="text-xs font-bold text-[#6d6880]">Dilewati</span>
              <div className="text-2xl font-black text-[#211c40] mt-0.5">{unansweredTotal}</div>
            </div>

            <div className="bg-[#f2efff] border border-[#ded6f8] p-3.5 rounded-xl text-center">
              <span className="text-xs font-bold text-[#6847d7]">Total Waktu</span>
              <div className="text-xl font-black text-[#5b43bc] mt-1 font-mono">{formatTimer(seconds)}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 mt-6 border-t border-[#f1edff] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setScreen('select')}
            className="px-5 py-2.5 rounded-xl bg-white border border-[#e5e0ef] text-[#211c40] hover:bg-gray-50 font-bold text-xs flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Pilih Paket Latihan Lain</span>
          </button>

          {wrongTotal > 0 && (
            <button
              onClick={handleRetryWrong}
              className="px-5 py-2.5 rounded-xl bg-[#c44241] text-white hover:bg-[#b03635] font-bold text-xs shadow-md shadow-[#c44241]/20 flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi {wrongTotal} Soal yang Salah Saja</span>
            </button>
          )}
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white border border-[#e5e0ef] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f1edff] pb-4">
          <h3 className="font-display font-extrabold text-xl text-[#211c40]">
            Review & Pembahasan Soal
          </h3>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#6d6880]" />
            {(['all', 'wrong', 'correct'] as const).map((filt) => (
              <button
                key={filt}
                onClick={() => setReviewFilter(filt)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  reviewFilter === filt
                    ? 'bg-[#211c40] text-white'
                    : 'bg-white border border-[#e5e0ef] text-[#6d6880] hover:text-[#211c40]'
                }`}
              >
                {filt === 'all' ? 'Semua' : filt === 'wrong' ? 'Salah Saja' : 'Benar Saja'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredReviewIndices.map((idx) => {
            const q = quizQuestions[idx];
            const userAns = userAnswers[idx];
            const isCorrect = userAns === q.answer;
            const isUnanswered = userAns === null;

            return (
              <article
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'bg-[#edfbf4]/40 border-[#6ac39b]/40'
                    : 'bg-[#fff0f3]/40 border-[#e58ca2]/40'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-black/5 text-xs font-bold">
                  <span className="text-[#6d6880]">Soal Nomor {idx + 1}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full ${
                      isCorrect
                        ? 'bg-[#edfbf4] text-[#176847]'
                        : 'bg-[#fff0f3] text-[#a83352]'
                    }`}
                  >
                    {isCorrect ? '✓ Benar' : isUnanswered ? '○ Belum dijawab' : '✕ Salah'}
                  </span>
                </div>

                <h4 className="font-display text-base font-bold text-[#211c40] mt-3">
                  {q.question}
                </h4>

                {q.image && (
                  <img
                    src={q.image}
                    alt="Gambar soal"
                    className="max-h-48 object-contain rounded-lg border border-[#e5e0ef] my-3 bg-white p-1"
                  />
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-[#e5e0ef]">
                    <span className="font-bold text-[#6d6880] block mb-0.5">Jawabanmu:</span>
                    <span className={`font-extrabold ${isCorrect ? 'text-[#27875f]' : 'text-[#c44241]'}`}>
                      {isUnanswered
                        ? 'Belum dipilih'
                        : `${'ABCD'[userAns]}. ${q.options[userAns]}`}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#edfbf4] border border-[#6ac39b]/30">
                    <span className="font-bold text-[#176847] block mb-0.5">Kunci Jawaban:</span>
                    <span className="font-extrabold text-[#176847]">
                      {'ABCD'[q.answer]}. {q.options[q.answer]}
                    </span>
                  </div>
                </div>

                {q.explanation && (
                  <div className="mt-3 p-3 rounded-xl bg-white/90 border border-[#e5e0ef] text-xs text-[#514c65] leading-relaxed">
                    <strong className="text-[#c44241] block mb-0.5">💡 Pembahasan:</strong>
                    {q.explanation}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
