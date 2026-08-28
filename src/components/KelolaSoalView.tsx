import React, { useState, useMemo, useRef } from 'react';
import { Question, EducationLevel } from '../types';
import { 
  Database, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Download, 
  Upload, 
  RotateCcw, 
  Image as ImageIcon, 
  X, 
  Check, 
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface KelolaSoalViewProps {
  questions: Question[];
  onSaveQuestions: (updated: Question[]) => void;
  onResetQuestions: () => void;
}

export const KelolaSoalView: React.FC<KelolaSoalViewProps> = ({
  questions,
  onSaveQuestions,
  onResetQuestions,
}) => {
  // Form State
  const [level, setLevel] = useState<EducationLevel>('SD');
  const [grade, setGrade] = useState<string>('Kelas 5');
  const [subject, setSubject] = useState<string>('Matematika');
  const [chapter, setChapter] = useState<string>('FPB dan KPK');
  const [questionText, setQuestionText] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [answer, setAnswer] = useState<number>(0);
  const [explanation, setExplanation] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [notice, setNotice] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // List Filters
  const [filterLevel, setFilterLevel] = useState<EducationLevel>('SD');
  const [filterGrade, setFilterGrade] = useState<string>('Kelas 5');
  const [filterSubject, setFilterSubject] = useState<string>('Matematika');
  const [filterChapter, setFilterChapter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  // Helper for grade options
  const gradeOptionsFor = (lvl: EducationLevel) => {
    if (lvl === 'SD') return ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'];
    if (lvl === 'SMP') return ['Kelas 7', 'Kelas 8', 'Kelas 9'];
    return ['Kelas 10', 'Kelas 11', 'Kelas 12'];
  };

  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setNotice({ text, type });
    setTimeout(() => setNotice(null), 3500);
  };

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1500000) {
      showNotification('Ukuran gambar maksimal 1,5 MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) {
      showNotification('Teks pertanyaan wajib diisi!', 'error');
      return;
    }
    if (options.some((opt) => !opt.trim())) {
      showNotification('Semua 4 pilihan jawaban wajib diisi!', 'error');
      return;
    }

    const updatedQuestions = [...questions];

    if (editingId !== null) {
      // Update existing
      const index = updatedQuestions.findIndex((q) => String(q.id) === String(editingId));
      if (index >= 0) {
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          level,
          grade,
          subject: subject.trim(),
          chapter: chapter.trim(),
          question: questionText.trim(),
          options: options.map((o) => o.trim()),
          answer,
          explanation: explanation.trim(),
          image: selectedImage || undefined,
        };
        onSaveQuestions(updatedQuestions);
        showNotification('Perubahan soal berhasil disimpan!');
      }
    } else {
      // Add new
      const newQ: Question = {
        id: `q-custom-${Date.now()}`,
        level,
        grade,
        subject: subject.trim(),
        chapter: chapter.trim(),
        question: questionText.trim(),
        options: options.map((o) => o.trim()),
        answer,
        explanation: explanation.trim(),
        image: selectedImage || undefined,
      };
      updatedQuestions.push(newQ);
      onSaveQuestions(updatedQuestions);
      showNotification('Soal baru berhasil ditambahkan ke bank soal!');
    }

    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setEditingId(null);
    setQuestionText('');
    setOptions(['', '', '', '']);
    setAnswer(0);
    setExplanation('');
    setSelectedImage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Start Edit Question
  const handleStartEdit = (q: Question) => {
    setEditingId(q.id);
    setLevel(q.level);
    setGrade(q.grade);
    setSubject(q.subject);
    setChapter(q.chapter);
    setQuestionText(q.question);
    setOptions([...q.options]);
    setAnswer(q.answer);
    setExplanation(q.explanation || '');
    setSelectedImage(q.image || '');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Delete Question
  const handleDelete = (id: string | number) => {
    if (window.confirm('Apakah kamu yakin ingin menghapus soal ini?')) {
      const filtered = questions.filter((q) => String(q.id) !== String(id));
      onSaveQuestions(filtered);
      if (editingId === id) resetForm();
      showNotification('Soal telah dihapus.');
    }
  };

  // Move Question Up/Down
  const handleMove = (id: string | number, direction: 'up' | 'down') => {
    const list = [...questions];
    const index = list.findIndex((q) => String(q.id) === String(id));
    if (index < 0) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    onSaveQuestions(list);
  };

  // Download Bank Soal JSON
  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bank-soal-cleverly-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          onSaveQuestions([...imported]);
          showNotification(`Berhasil mengimpor ${imported.length} butir soal!`);
        } else {
          showNotification('Format berkas JSON tidak valid.', 'error');
        }
      } catch (err) {
        showNotification('Gagal membaca berkas JSON.', 'error');
      }
    };
    reader.readAsText(file);
    if (jsonInputRef.current) jsonInputRef.current.value = '';
  };

  // Filtered List for aside
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (filterLevel && q.level !== filterLevel) return false;
      if (filterGrade && filterGrade !== 'Semua Kelas' && q.grade !== filterGrade) return false;
      if (filterSubject && q.subject !== filterSubject) return false;
      if (filterChapter && q.chapter !== filterChapter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          q.question.toLowerCase().includes(query) ||
          q.chapter.toLowerCase().includes(query) ||
          q.options.some((o) => o.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [questions, filterLevel, filterGrade, filterSubject, filterChapter, searchQuery]);

  // Unique chapters for filter
  const filterChaptersList = useMemo(() => {
    const matching = questions.filter(
      (q) => q.level === filterLevel && (filterGrade === 'Semua Kelas' || q.grade === filterGrade) && q.subject === filterSubject
    );
    return [...new Set(matching.map((q) => q.chapter))].sort();
  }, [questions, filterLevel, filterGrade, filterSubject]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="border-b border-[#e5e0ef] pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8e7e6] text-[#c44241] font-bold text-xs uppercase tracking-wider mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>PANEL PENGELOLA SOAL</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#211c40]">
            Bank Soal & Manajemen Latihan
          </h1>
          <p className="text-[#6d6880] text-sm sm:text-base mt-1 font-medium">
            Tambah, edit, sesuaikan urutan, serta kelola paket soal untuk seluruh jenjang pendidikan.
          </p>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadJSON}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#e5e0ef] hover:bg-gray-50 text-xs font-bold text-[#211c40] flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Cadangan JSON</span>
          </button>

          <label className="px-3.5 py-2 rounded-xl bg-white border border-[#e5e0ef] hover:bg-gray-50 text-xs font-bold text-[#211c40] flex items-center gap-1.5 cursor-pointer shadow-xs">
            <Upload className="w-3.5 h-3.5" />
            <span>Impor JSON</span>
            <input
              ref={jsonInputRef}
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Notification Banner */}
      {notice && (
        <div
          className={`p-4 rounded-xl text-sm font-bold flex items-center gap-2.5 transition-all ${
            notice.type === 'success'
              ? 'bg-[#edfbf4] border border-[#6ac39b]/40 text-[#176847]'
              : 'bg-[#fff0f3] border border-[#e58ca2]/40 text-[#a83352]'
          }`}
        >
          {notice.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-[#27875f]" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-[#c44241]" />
          )}
          <span>{notice.text}</span>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Add / Edit Question */}
        <div className="lg:col-span-5 bg-white border border-[#e5e0ef] rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#f1edff]">
            <h3 className="font-display font-extrabold text-lg text-[#211c40] flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#c44241]" />
              <span>{editingId !== null ? 'Edit Soal' : 'Tambah Soal Baru'}</span>
            </h3>
            {editingId !== null && (
              <span className="text-xs font-bold text-[#c44241] bg-[#f8e7e6] px-2.5 py-0.5 rounded-full">
                Mode Edit
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#211c40] mb-1">Jenjang</label>
                <select
                  value={level}
                  onChange={(e) => {
                    const newLvl = e.target.value as EducationLevel;
                    setLevel(newLvl);
                    setGrade(gradeOptionsFor(newLvl)[0]);
                  }}
                  className="w-full bg-white border border-[#dcd6e9] rounded-xl p-2.5 text-xs font-bold text-[#211c40]"
                >
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#211c40] mb-1">Kelas</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-white border border-[#dcd6e9] rounded-xl p-2.5 text-xs font-bold text-[#211c40]"
                >
                  {gradeOptionsFor(level).map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#211c40] mb-1">Mata Pelajaran</label>
                <input
                  required
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Contoh: Matematika"
                  className="w-full bg-white border border-[#dcd6e9] rounded-xl p-2.5 text-xs font-bold text-[#211c40]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#211c40] mb-1">Bab</label>
                <input
                  required
                  type="text"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  placeholder="Contoh: FPB dan KPK"
                  className="w-full bg-white border border-[#dcd6e9] rounded-xl p-2.5 text-xs font-bold text-[#211c40]"
                />
              </div>
            </div>

            {/* Question textarea */}
            <div>
              <label className="block text-xs font-bold text-[#211c40] mb-1">Pertanyaan</label>
              <textarea
                required
                rows={3}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Tulis butir pertanyaan soal di sini..."
                className="w-full bg-white border border-[#dcd6e9] rounded-xl p-3 text-xs font-medium text-[#211c40] focus:ring-2 focus:ring-[#c44241]"
              />
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-xs font-bold text-[#211c40] mb-1">
                Gambar Soal <span className="text-gray-400 font-normal">(opsional)</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-xs text-[#6d6880] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#f8e7e6] file:text-[#c44241] hover:file:bg-[#f3d3d1] cursor-pointer"
              />

              {selectedImage && (
                <div className="relative mt-2 p-2 border border-[#e5e0ef] rounded-xl bg-[#faf9fd] inline-block">
                  <img
                    src={selectedImage}
                    alt="Pratinjau"
                    className="max-h-32 rounded-lg object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-[#211c40] text-white rounded-full flex items-center justify-center text-xs shadow-md"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* 4 Choices */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-[#211c40]">Pilihan Jawaban (A, B, C, D)</label>
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#f1edff] text-[#6847d7] font-bold text-xs flex items-center justify-center shrink-0">
                    {'ABCD'[i]}
                  </span>
                  <input
                    required
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const updated = [...options];
                      updated[i] = e.target.value;
                      setOptions(updated);
                    }}
                    placeholder={`Pilihan jawaban ${'ABCD'[i]}`}
                    className="flex-1 bg-white border border-[#dcd6e9] rounded-xl p-2 text-xs font-medium text-[#211c40]"
                  />
                </div>
              ))}
            </div>

            {/* Correct answer & explanation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-[#211c40] mb-1">Kunci Jawaban Benar</label>
                <select
                  value={answer}
                  onChange={(e) => setAnswer(Number(e.target.value))}
                  className="w-full bg-[#edfbf4] border border-[#6ac39b]/50 text-[#176847] rounded-xl p-2.5 text-xs font-bold"
                >
                  <option value={0}>A - {options[0] || 'Opsi A'}</option>
                  <option value={1}>B - {options[1] || 'Opsi B'}</option>
                  <option value={2}>C - {options[2] || 'Opsi C'}</option>
                  <option value={3}>D - {options[3] || 'Opsi D'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#211c40] mb-1">
                  Pembahasan <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <input
                  type="text"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Cara pengerjaan / rumus..."
                  className="w-full bg-white border border-[#dcd6e9] rounded-xl p-2.5 text-xs font-medium text-[#211c40]"
                />
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="pt-3 flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-[#c44241] text-white hover:bg-[#b03635] text-xs font-bold shadow-md shadow-[#c44241]/20 flex items-center justify-center gap-1.5 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>{editingId !== null ? 'Simpan Perubahan' : 'Simpan Soal'}</span>
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-3 rounded-xl bg-white border border-[#e5e0ef] hover:bg-gray-50 text-xs font-bold text-[#6d6880]"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Aside: Bank Soal Explorer */}
        <div className="lg:col-span-7 bg-white border border-[#e5e0ef] rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#f1edff]">
            <div>
              <h3 className="font-display font-extrabold text-lg text-[#211c40]">
                Daftar Soal Tersimpan
              </h3>
              <span className="text-xs text-[#6d6880] font-medium">
                Menampilkan <strong className="text-[#211c40]">{filteredQuestions.length}</strong> dari {questions.length} total butir soal
              </span>
            </div>

            <button
              onClick={() => {
                if (window.confirm('Kembalikan bank soal ke paket standar Cleverly?')) {
                  onResetQuestions();
                  showNotification('Bank soal telah direset ke kondisi awal.');
                }
              }}
              className="text-xs text-[#6847d7] font-bold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Standar</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div>
              <select
                value={filterLevel}
                onChange={(e) => {
                  const lvl = e.target.value as EducationLevel;
                  setFilterLevel(lvl);
                  setFilterGrade(gradeOptionsFor(lvl)[0]);
                }}
                className="w-full bg-[#fffbf5] border border-[#dcd6e9] rounded-lg p-2 text-xs font-bold text-[#211c40]"
              >
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
              </select>
            </div>

            <div>
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="w-full bg-[#fffbf5] border border-[#dcd6e9] rounded-lg p-2 text-xs font-bold text-[#211c40]"
              >
                <option value="Semua Kelas">Semua Kelas</option>
                {gradeOptionsFor(filterLevel).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full bg-[#fffbf5] border border-[#dcd6e9] rounded-lg p-2 text-xs font-bold text-[#211c40]"
              >
                <option value="Matematika">Matematika</option>
                <option value="IPA">IPA</option>
                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              </select>
            </div>

            <div>
              <select
                value={filterChapter}
                onChange={(e) => setFilterChapter(e.target.value)}
                className="w-full bg-[#fffbf5] border border-[#dcd6e9] rounded-lg p-2 text-xs font-bold text-[#211c40]"
              >
                <option value="">Semua Bab</option>
                {filterChaptersList.map((ch) => (
                  <option key={ch} value={ch}>
                    {ch}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#6d6880]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari teks soal atau kata kunci..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#e5e0ef] rounded-xl text-xs text-[#211c40] font-medium"
            />
          </div>

          {/* Questions List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredQuestions.length === 0 ? (
              <div className="p-10 text-center text-xs text-[#6d6880] space-y-1">
                <p className="font-bold">Belum ada butir soal pada filter ini.</p>
                <p>Gunakan form di sebelah kiri untuk menambahkan soal baru.</p>
              </div>
            ) : (
              filteredQuestions.map((item, idx) => (
                <article
                  key={item.id}
                  className="p-4 rounded-xl border border-[#e5e0ef] bg-white hover:border-[#cfc7e8] transition-all space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#6847d7]">
                      {item.level} · {item.grade} · {item.subject}
                    </span>

                    {/* Actions: Move, Edit, Delete */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMove(item.id, 'up')}
                        title="Naikkan urutan"
                        className="p-1 rounded hover:bg-gray-100 text-gray-500"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMove(item.id, 'down')}
                        title="Turunkan urutan"
                        className="p-1 rounded hover:bg-gray-100 text-gray-500"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="px-2 py-1 rounded bg-[#f1edff] text-[#6847d7] hover:bg-[#e4dff0] text-[11px] font-bold ml-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-2 py-1 rounded bg-[#fff0f3] text-[#c44241] hover:bg-[#ffe2e6] text-[11px] font-bold"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>

                  <p className="font-bold text-xs sm:text-sm text-[#211c40] leading-snug">
                    {idx + 1}. {item.question}
                  </p>

                  {item.image && (
                    <img
                      src={item.image}
                      alt="Gambar soal"
                      className="max-h-28 object-contain rounded-lg border border-[#e5e0ef] my-1"
                    />
                  )}

                  <div className="text-[11px] text-[#6d6880] flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-100">
                    <span>Bab: <strong className="text-[#211c40]">{item.chapter}</strong></span>
                    <span className="text-[#27875f] font-bold">
                      Kunci: {'ABCD'[item.answer]} ({item.options[item.answer]})
                    </span>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
