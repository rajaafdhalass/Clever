import { Question, QuizAttemptResult } from '../types';
import { INITIAL_QUESTIONS } from '../data/questionsData';

const QUESTIONS_KEY = 'cleverly-bank-soal';
const DELETED_SEEDS_KEY = 'cleverly-bank-soal-dihapus';
const QUIZ_HISTORY_KEY = 'cleverly-quiz-history';

export function getStoredQuestions(): Question[] {
  try {
    const rawSaved = localStorage.getItem(QUESTIONS_KEY);
    const deletedSeeds = new Set<string>(JSON.parse(localStorage.getItem(DELETED_SEEDS_KEY) || '[]'));
    
    let userQuestions: Question[] = [];
    if (rawSaved) {
      userQuestions = JSON.parse(rawSaved);
    } else {
      userQuestions = [...INITIAL_QUESTIONS];
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(userQuestions));
      return userQuestions;
    }

    // Merge any missing initial seed questions if not explicitly deleted
    const existingIds = new Set(userQuestions.map(q => String(q.id)));
    const missingSeeds = INITIAL_QUESTIONS.filter(seed => !existingIds.has(String(seed.id)) && !deletedSeeds.has(String(seed.id)));
    
    if (missingSeeds.length > 0) {
      const merged = [...userQuestions, ...missingSeeds];
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(merged));
      return merged;
    }

    return userQuestions;
  } catch (error) {
    console.error('Error reading questions from localStorage:', error);
    return INITIAL_QUESTIONS;
  }
}

export function saveStoredQuestions(questions: Question[]): void {
  try {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
  } catch (error) {
    console.error('Error saving questions to localStorage:', error);
  }
}

export function deleteStoredQuestion(id: string | number): Question[] {
  try {
    const questions = getStoredQuestions();
    const target = questions.find(q => String(q.id) === String(id));
    if (target) {
      const deletedSeeds: string[] = JSON.parse(localStorage.getItem(DELETED_SEEDS_KEY) || '[]');
      if (!deletedSeeds.includes(String(id))) {
        deletedSeeds.push(String(id));
        localStorage.setItem(DELETED_SEEDS_KEY, JSON.stringify(deletedSeeds));
      }
    }
    const filtered = questions.filter(q => String(q.id) !== String(id));
    saveStoredQuestions(filtered);
    return filtered;
  } catch (error) {
    console.error('Error deleting question:', error);
    return getStoredQuestions();
  }
}

export function resetToDefaultQuestions(): Question[] {
  try {
    localStorage.removeItem(DELETED_SEEDS_KEY);
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(INITIAL_QUESTIONS));
    return INITIAL_QUESTIONS;
  } catch (error) {
    console.error('Error resetting questions:', error);
    return INITIAL_QUESTIONS;
  }
}

export function getQuizHistory(): QuizAttemptResult[] {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveQuizHistory(result: QuizAttemptResult): void {
  try {
    const existing = getQuizHistory();
    const updated = [result, ...existing].slice(0, 50); // Keep last 50
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving quiz result:', error);
  }
}
