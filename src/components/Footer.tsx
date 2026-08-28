import React from 'react';
import { Heart, GraduationCap } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'materi' | 'latihan' | 'kelola' | 'tanya-ai') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#e5e0ef] bg-white/70 py-12 text-left transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Slogan */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#c44241] text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm">
                c
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-[#211c40]">
                cleverly
              </span>
            </div>
            <p className="text-[#6d6880] text-sm font-medium max-w-sm leading-relaxed">
              Materi yang jelas, latihan yang seru, dan tryout yang membantumu siap menghadapi setiap ujian. Belajar pelan-pelan, tumbuh bersama.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-[#211c40]">
              Menu Utama
            </h4>
            <ul className="space-y-1.5 text-xs font-semibold text-[#6d6880]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#c44241] transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('materi')}
                  className="hover:text-[#c44241] transition-colors"
                >
                  Ruang Belajar & Rangkuman
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('latihan')}
                  className="hover:text-[#c44241] transition-colors"
                >
                  Simulasi Tryout & Latihan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kelola')}
                  className="hover:text-[#c44241] transition-colors"
                >
                  Kelola Bank Soal
                </button>
              </li>
            </ul>
          </div>

          {/* Jenjang Belajar */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-[#211c40]">
              Jenjang Kurikulum
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-[#ffe8cc] text-[#91581e] font-bold text-xs">
                SD (Kelas 1 - 6)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#d9f0ee] text-[#1e615e] font-bold text-xs">
                SMP (Kelas 7 - 9)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#ded7ff] text-[#432d94] font-bold text-xs">
                SMA (Kelas 10 - 12)
              </span>
            </div>
            <p className="text-[11px] text-[#6d6880] font-medium pt-2">
              Sesuai Capaian Pembelajaran Kurikulum Merdeka & Standar Asesmen Nasional.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-[#e5e0ef] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#6d6880]">
          <span>© 2026 Bimbel Cleverly · Semua hak dilindungi undang-undang.</span>
          <div className="flex items-center gap-1 text-[#6d6880]">
            <span>Dibuat dengan dedikasi untuk pendidikan Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
