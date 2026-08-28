export type EducationLevel = 'SD' | 'SMP' | 'SMA';

export type SubjectName = 'Matematika' | 'IPA' | 'Bahasa Indonesia' | 'Bahasa Inggris';

export interface Question {
  id: string | number;
  seedId?: string;
  level: EducationLevel;
  grade: string;
  subject: string;
  chapter: string;
  question: string;
  options: string[];
  answer: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation?: string;
  image?: string;
}

export interface LessonChapter {
  id: string;
  title: string;
  subject: string;
  level: EducationLevel;
  grade: string;
  intro: string;
  points: string[];
  example: string;
  formula?: string;
  tags?: string[];
}

export interface QuizAttemptResult {
  id: string;
  date: string;
  level: EducationLevel;
  grade: string;
  subject: string;
  chapter: string;
  mode: 'practice' | 'tryout';
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  score: number;
  timeSpentSeconds: number;
}
