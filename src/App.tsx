import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { RuangBelajarView } from './components/RuangBelajarView';
import { LatihanSoalView } from './components/LatihanSoalView';
import { KelolaSoalView } from './components/KelolaSoalView';
import { AITutorView } from './components/AITutorView';
import { Footer } from './components/Footer';
import { Question, EducationLevel } from './types';
import { 
  getStoredQuestions, 
  saveStoredQuestions, 
  resetToDefaultQuestions 
} from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'materi' | 'latihan' | 'kelola' | 'tanya-ai'>('home');
  const [questions, setQuestions] = useState<Question[]>([]);

  // Navigation context parameters
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel>('SD');
  const [selectedGrade, setSelectedGrade] = useState<string>('Kelas 5');
  const [selectedSubject, setSelectedSubject] = useState<string>('Matematika');
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [aiPrompt, setAiPrompt] = useState<string>('');

  // Load questions on initial mount
  useEffect(() => {
    const loaded = getStoredQuestions();
    setQuestions(loaded);
  }, []);

  // Handler to update questions bank
  const handleSaveQuestions = (updated: Question[]) => {
    setQuestions(updated);
    saveStoredQuestions(updated);
  };

  // Handler to reset questions bank
  const handleResetQuestions = () => {
    const defaultList = resetToDefaultQuestions();
    setQuestions(defaultList);
  };

  // Jump to Level in Ruang Belajar
  const handleSelectLevel = (level: EducationLevel, grade?: string) => {
    setSelectedLevel(level);
    if (grade) setSelectedGrade(grade);
    setActiveTab('materi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Jump to Quiz for specific subject & chapter
  const handleStartQuiz = (
    level: EducationLevel = 'SD',
    grade: string = 'Kelas 5',
    subject: string = 'Matematika',
    chapter: string = ''
  ) => {
    setSelectedLevel(level);
    setSelectedGrade(grade);
    setSelectedSubject(subject);
    setSelectedChapter(chapter);
    setActiveTab('latihan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Jump to AI Tutor
  const handleAskAI = (topic: string) => {
    setAiPrompt(`Tolong jelaskan secara ringkas konsep materi: ${topic}`);
    setActiveTab('tanya-ai');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf5] text-[#211c40]">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        questionCount={questions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onSelectLevel={handleSelectLevel}
            onStartQuiz={handleStartQuiz}
            onOpenAI={() => {
              setActiveTab('tanya-ai');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'materi' && (
          <RuangBelajarView
            initialLevel={selectedLevel}
            initialGrade={selectedGrade}
            onStartQuiz={handleStartQuiz}
            onAskAI={handleAskAI}
          />
        )}

        {activeTab === 'latihan' && (
          <LatihanSoalView
            questions={questions}
            initialLevel={selectedLevel}
            initialGrade={selectedGrade}
            initialSubject={selectedSubject}
            initialChapter={selectedChapter}
            onAskAI={handleAskAI}
          />
        )}

        {activeTab === 'kelola' && (
          <KelolaSoalView
            questions={questions}
            onSaveQuestions={handleSaveQuestions}
            onResetQuestions={handleResetQuestions}
          />
        )}

        {activeTab === 'tanya-ai' && (
          <AITutorView initialPrompt={aiPrompt} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
