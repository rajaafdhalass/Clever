import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  BookOpen, 
  HelpCircle, 
  RotateCcw,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface AITutorViewProps {
  initialPrompt?: string;
}

export const AITutorView: React.FC<AITutorViewProps> = ({ initialPrompt = '' }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Halo! Saya **Asisten Belajar Cleverly**. Ada soal PR, rumus matematika, atau konsep sains yang ingin kamu tanyakan hari ini? Tuliskan soalmu di bawah ya!',
      timestamp: 'Baru saja',
    },
  ]);

  const [input, setInput] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);

  // Quick preset chips
  const presets = [
    'Cara mencari KPK dan FPB dari 24 dan 36',
    'Rumus keliling & luas bangun gabungan',
    'Penjelasan Teorema Pythagoras segitiga',
    'Trik cepat menghitung persen (%)',
    'Contoh Hukum Newton 1, 2, dan 3',
  ];

  // Helper response generator with educational focus
  const generateEducationalAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('kpk') || q.includes('fpb')) {
      return `### 💡 Cara Menentukan FPB dan KPK\n\n1. **Buat Faktorisasi Prima (Pohon Faktor):**\n   - Bagi bilangan dengan bilangan prima terkecil (2, 3, 5, 7, ...).\n2. **Tentukan FPB (Faktor Persekutuan Terbesar):**\n   - Kalikan faktor prima yang **sama saja**, lalu pilih yang berpangkat **terkecil**.\n3. **Tentukan KPK (Kelipatan Persekutuan Terkecil):**\n   - Kalikan **semua faktor prima** yang ada, dan untuk yang sama pilih yang berpangkat **terbesar**.\n\n*Contoh untuk 24 dan 36:*\n- $24 = 2^3 \\times 3$\n- $36 = 2^2 \\times 3^2$\n- **FPB** = $2^2 \\times 3 = 4 \\times 3 = 12$\n- **KPK** = $2^3 \\times 3^2 = 8 \\times 9 = 72$`;
    }

    if (q.includes('keliling') || q.includes('luas') || q.includes('bangun')) {
      return `### 📐 Ringkasan Rumus Keliling & Luas Bangun Datar\n\n1. **Persegi:**\n   - Keliling = $4 \\times s$\n   - Luas = $s \\times s = s^2$\n2. **Persegi Panjang:**\n   - Keliling = $2 \\times (p + l)$\n   - Luas = $p \\times l$\n3. **Segitiga:**\n   - Keliling = $a + b + c$\n   - Luas = $\\frac{1}{2} \\times \\text{alas} \\times \\text{tinggi}$\n4. **Lingkaran:**\n   - Keliling = $2 \\times \\pi \\times r$\n   - Luas = $\\pi \\times r^2$ *(gunakan $\\pi = 22/7$ jika kelipatan 7)*\n\n💡 **Tips Bangun Gabungan:** Hanya jumlahkan panjang **sisi-sisi terluar** untuk mencari keliling!`;
    }

    if (q.includes('pythagoras') || q.includes('pitagoras') || q.includes('segitiga siku')) {
      return `### 🔺 Teorema Pythagoras (Khusus Segitiga Siku-siku)\n\n**Rumus Utama:**\n$$c^2 = a^2 + b^2$$\nDi mana **$c$** adalah sisi miring (terpanjang) yang berhadapan dengan sudut 90°.\n\n- Mencari sisi miring: $c = \\sqrt{a^2 + b^2}$\n- Mencari sisi tegak: $a = \\sqrt{c^2 - b^2}$\n\n✨ **Tripel Pythagoras Populer:**\n- 3, 4, 5\n- 5, 12, 13\n- 7, 24, 25\n- 8, 15, 17`;
    }

    if (q.includes('newton') || q.includes('gaya') || q.includes('gerak')) {
      return `### 🚀 3 Hukum Gerak Newton\n\n1. **Hukum I Newton (Kelembaman):** $\\sum F = 0$\n   - Benda diam akan tetap diam, dan benda bergerak akan tetap bergerak lurus beraturan jika tidak ada resultan gaya luar.\n   - *Contoh:* Tubuh terdorong ke depan saat mobil mendadak direm.\n2. **Hukum II Newton:** $F = m \\times a$\n   - Percepatan berbanding lurus dengan gaya dan berbanding terbalik dengan massa.\n3. **Hukum III Newton (Aksi-Reaksi):** $F_{\\text{aksi}} = -F_{\\text{reaksi}}$\n   - *Contoh:* Dorongan gas roket ke bawah menghasilkan gaya dorong ke atas.`;
    }

    return `### 📚 Penjelasan & Langkah Belajar Cleverly\n\nUntuk pertanyaan: **"${query}"**\n\n1. **Konsep Dasar:** Identifikasi apa yang diketahui dan apa yang ditanyakan pada soal.\n2. **Pilih Rumus / Prinsip:** Gunakan rumus atau aturan dasar yang relevan dengan topik ini.\n3. **Langkah Pengerjaan:** Masukkan angka yang diketahui, lalu lakukan operasi hitung dengan teliti secara bertahap.\n4. **Verifikasi:** Periksa kembali satuan ukuran (misal cm, m, detik, atau kg) dan pastikan tanda hitung sudah tepat.\n\n*Ingin contoh perhitungan angka yang lebih spesifik? Tuliskan angka soalmu secara lengkap ya!*`;
  };

  const handleSend = () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulate smart AI response latency
    setTimeout(() => {
      const aiReply = generateEducationalAnswer(userText);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-left">
      {/* Header */}
      <div className="border-b border-[#e5e0ef] pb-6 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1edff] text-[#6847d7] font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ASISTEN AI BELAJAR 24/7</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#211c40]">
            Tanya AI Cleverly
          </h1>
          <p className="text-[#6d6880] text-sm sm:text-base mt-1 font-medium">
            Tanyakan soal latihan, pembedahan rumus, atau konsep matematika dan sains yang belum kamu mengerti.
          </p>
        </div>
      </div>

      {/* Preset prompt chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#6d6880] flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-[#f4a847]" />
          <span>Topik Populer yang Sering Ditanyakan:</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(preset);
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-[#e5e0ef] hover:border-[#c44241] hover:bg-[#fff8f5] text-[#211c40] transition-all shadow-2xs"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white border border-[#e5e0ef] rounded-2xl p-4 sm:p-6 shadow-xs min-h-[420px] max-h-[550px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-[#211c40] text-white'
                  : 'bg-[#c44241] text-white shadow-xs'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#211c40] text-white font-medium rounded-tr-none'
                  : 'bg-[#fff8f5] text-[#211c40] border border-[#f1d7d5] rounded-tl-none font-sans'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <span
                className={`text-[10px] block mt-2 text-right ${
                  msg.sender === 'user' ? 'text-white/60' : 'text-[#6d6880]'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#c44241] text-white flex items-center justify-center text-xs font-bold shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#fff8f5] border border-[#f1d7d5] rounded-2xl p-3 text-xs font-bold text-[#c44241] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Asisten Cleverly sedang menganalisis soalmu...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="bg-white border border-[#e5e0ef] rounded-2xl p-2.5 shadow-xs flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tuliskan soal latihan atau materi yang ingin dijelaskan..."
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm text-[#211c40] font-medium outline-none bg-transparent"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
            input.trim() && !loading
              ? 'bg-[#c44241] text-white hover:bg-[#b03635] shadow-sm cursor-pointer'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Kirim</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
