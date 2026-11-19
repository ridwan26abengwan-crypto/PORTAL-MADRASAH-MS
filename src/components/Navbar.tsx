import React from 'react';
import { User, ActivePage } from '../types';
import { LogOut, Sun, Moon, Shield, UserCheck, ArrowLeft } from 'lucide-react';
import { MADRASAH_LOGO } from '../services/storage';

interface NavbarProps {
  currentUser: User | null;
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onLogout: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activePage,
  onNavigate,
  onLogout,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-emerald-950/95 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-900 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div 
            onClick={() => onNavigate(currentUser ? 'dash' : 'landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <img 
                src={MADRASAH_LOGO} 
                alt="Logo MI Darussalam" 
                className="w-11 h-11 max-h-full max-w-full object-contain drop-shadow-xs"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-emerald-950 dark:text-emerald-50 text-base sm:text-lg tracking-tight">
                  MI Darussalam
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-emerald-400/80 hidden sm:block">
                Pinangsari, Ciasem, Subang · Kemenag RI
              </p>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button (Cerah / Malam) */}
            <button
              onClick={onToggleTheme}
              title={isDark ? "Klik untuk ganti ke Mode Cerah (Siang)" : "Klik untuk ganti ke Mode Malam (Gelap)"}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer shadow-xs bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 dark:bg-emerald-900/80 dark:hover:bg-emerald-800 dark:border-emerald-700 dark:text-emerald-100"
              aria-label="Ganti mode cerah dan malam"
            >
              <div className="relative flex items-center justify-center">
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                ) : (
                  <Moon className="w-4 h-4 text-emerald-800 group-hover:-rotate-12 transition-transform" />
                )}
              </div>
              <span className="hidden sm:inline font-semibold">
                {isDark ? "Mode Malam" : "Mode Cerah"}
              </span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/60 border border-emerald-200/60 dark:border-emerald-800">
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-amber-300 flex items-center justify-center text-xs font-bold">
                    {currentUser.role === 'admin' ? (
                      <Shield className="w-3.5 h-3.5" />
                    ) : (
                      <UserCheck className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-emerald-950 dark:text-emerald-100 leading-none">
                      {currentUser.nama}
                    </p>
                    <p className="text-[10px] text-emerald-700 dark:text-emerald-400 uppercase font-semibold">
                      {currentUser.role === 'admin' ? 'Administrator' : 'Guru Madrasah'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/40 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {activePage === 'login' ? (
                  <button
                    onClick={() => onNavigate('landing')}
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Beranda</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('login')}
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm shadow-emerald-700/30 transition-all hover:scale-[1.02]"
                  >
                    <span>Masuk Portal</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
