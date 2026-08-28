import React, { useState } from 'react';
import { BookOpen, GraduationCap, PenTool, Database, Sparkles, Menu, X, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'materi' | 'latihan' | 'kelola' | 'tanya-ai';
  setActiveTab: (tab: 'home' | 'materi' | 'latihan' | 'kelola' | 'tanya-ai') => void;
  questionCount: number;
}

interface NavItem {
  id: 'home' | 'materi' | 'latihan' | 'kelola' | 'tanya-ai';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  highlight?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, questionCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Beranda', icon: GraduationCap },
    { id: 'materi', label: 'Ruang Belajar', icon: BookOpen },
    { id: 'latihan', label: 'Latihan & Tryout', icon: PenTool },
    { id: 'kelola', label: 'Bank Soal', icon: Database, badge: questionCount },
    { id: 'tanya-ai', label: 'Asisten AI', icon: Sparkles, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fffbf5]/90 backdrop-blur-md border-b border-[#e5e0ef]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-logo"
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-[#c44241] text-white flex items-center justify-center font-serif font-bold text-xl shadow-md shadow-[#c44241]/20 group-hover:scale-105 transition-transform">
            c
          </div>
          <div>
            <div className="font-display font-extrabold text-2xl tracking-tight text-[#211c40] leading-none flex items-center gap-1.5">
              cleverly
              <span className="w-1.5 h-1.5 rounded-full bg-[#c44241] animate-pulse"></span>
            </div>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-[#6d6880]">
              Bimbel SD · SMP · SMA
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 bg-white/70 p-1.5 rounded-2xl border border-[#e5e0ef] shadow-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#c44241] text-white shadow-sm shadow-[#c44241]/25'
                    : item.highlight
                    ? 'text-[#6847d7] hover:bg-[#6847d7]/10'
                    : 'text-[#555168] hover:text-[#211c40] hover:bg-[#f8e7e6]/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-[#6847d7]' : 'text-[#6d6880]'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/25 text-white' : 'bg-[#f1edff] text-[#6847d7]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Action Badge */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#edfbf4] border border-[#6ac39b]/30 text-[#176847] text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#27875f]" />
            <span>Kurikulum Merdeka Ready</span>
          </div>
          <button
            id="nav-quick-tryout"
            onClick={() => setActiveTab('latihan')}
            className="px-4 py-2 rounded-xl bg-[#211c40] text-white hover:bg-[#33236c] text-sm font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <span>Mulai Belajar</span>
            <span className="text-[#f4a847]">→</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white border border-[#e5e0ef] text-[#211c40] hover:bg-[#f8e7e6]/50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e5e0ef] bg-[#fffbf5] px-4 pt-2 pb-5 space-y-1.5 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#c44241] text-white'
                    : 'text-[#555168] bg-white border border-[#e5e0ef]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-100 text-gray-700'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
