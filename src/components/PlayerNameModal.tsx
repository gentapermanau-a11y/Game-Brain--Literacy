import React, { useState } from 'react';
import { User, Sparkles, Shield, Trophy } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface PlayerNameModalProps {
  onSaveName: (name: string) => void;
}

export const PlayerNameModal: React.FC<PlayerNameModalProps> = ({ onSaveName }) => {
  const [nameInput, setNameInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setErrorMsg('Masukkan nama petarung Anda terlebih dahulu.');
      return;
    }
    if (trimmed.length < 2) {
      setErrorMsg('Nama minimal terdiri dari 2 karakter.');
      return;
    }
    soundManager.playButtonClick();
    onSaveName(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md p-6 sm:p-8 glass-panel rounded-3xl border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-cyan-600 to-emerald-400 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <User className="w-8 h-8 text-cyan-400" />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-rpg tracking-wider mb-1">
            ENTER YOUR PLAYER NAME
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Selamat datang di Quiz Battle: Brain Literacy Challenge. Masukkan nama Anda untuk mulai menyimpan progress secara online!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Contoh: Ayanokoji"
                maxLength={20}
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-white font-semibold placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 text-center text-lg tracking-wide transition-all"
              />
              {errorMsg && (
                <p className="mt-2 text-xs text-rose-400 font-semibold">{errorMsg}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-rpg font-extrabold text-sm sm:text-base tracking-widest shadow-[0_0_25px_rgba(6,182,212,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 fill-slate-950" />
              <span>MULAI PERMAINAN</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Cloud Database
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" /> Online Leaderboard
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
