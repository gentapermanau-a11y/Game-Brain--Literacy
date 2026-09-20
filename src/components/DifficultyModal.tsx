import React from 'react';
import { ArrowLeft, Clock, ShieldAlert, Sparkles, CheckCircle2, Sliders } from 'lucide-react';
import { Difficulty, PlayerProfile } from '../types';
import { soundManager } from '../utils/audio';

interface DifficultyModalProps {
  profile: PlayerProfile;
  selectedDifficulty: Difficulty;
  useLevelScaling: boolean;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onToggleLevelScaling: (val: boolean) => void;
  onBack: () => void;
  onStartBattle: () => void;
}

export const DifficultyModal: React.FC<DifficultyModalProps> = ({
  profile,
  selectedDifficulty,
  useLevelScaling,
  onSelectDifficulty,
  onToggleLevelScaling,
  onBack,
  onStartBattle,
}) => {
  const difficulties: {
    id: Difficulty;
    name: string;
    title: string;
    timer: string;
    playerDmg: string;
    bossDmg: string;
    color: string;
    border: string;
    desc: string;
  }[] = [
    {
      id: 'EASY',
      name: 'EASY',
      title: 'Pemula / Casual',
      timer: '40 Detik (Relatif Santai)',
      playerDmg: 'Tinggi (28 - 36 DMG / Jawaban)',
      bossDmg: 'Rendah (8 - 12 DMG / Serangan)',
      color: 'from-emerald-950/60 to-slate-900',
      border: 'border-emerald-500/50',
      desc: 'Sangat cocok untuk belajar materi, waktu berpikir luas dan serangan pemain memberikan damage besar.',
    },
    {
      id: 'MEDIUM',
      name: 'MEDIUM',
      title: 'Standar / Seimbang',
      timer: '40 Detik (Standar)',
      playerDmg: 'Seimbang (20 - 26 DMG / Jawaban)',
      bossDmg: 'Moderat (14 - 18 DMG / Serangan)',
      color: 'from-amber-950/60 to-slate-900',
      border: 'border-amber-500/50',
      desc: 'Tantangan adil dan proporsional. Kesalahan akan dihukum dengan damage yang nyata.',
    },
    {
      id: 'HARD',
      name: 'HARD',
      title: 'Tantangan Ekstrem',
      timer: '30 Detik (Ketat)',
      playerDmg: 'Ketat (14 - 18 DMG / Jawaban)',
      bossDmg: 'Mematikan (20 - 28 DMG / Serangan)',
      color: 'from-rose-950/60 to-slate-900',
      border: 'border-rose-500/50',
      desc: 'Hanya untuk master! Waktu berpikir sangat sempit dan beberapa kesalahan saja bisa langsung kalah.',
    },
  ];

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-6 flex flex-col">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => {
            soundManager.playButtonClick();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all active:scale-95 text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold font-rpg tracking-wider text-white">
            PENGATURAN KESULITAN
          </h2>
          <p className="text-xs text-slate-400">
            Sesuaikan timer ronde kuis dan kalkulasi rasio damage pertarungan
          </p>
        </div>

        <div className="w-24 hidden sm:block" />
      </div>

      {/* Difficulty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {difficulties.map((diff) => {
          const isSelected = selectedDifficulty === diff.id;

          return (
            <button
              key={diff.id}
              onClick={() => {
                soundManager.playButtonClick();
                onSelectDifficulty(diff.id);
              }}
              className={`relative p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between overflow-hidden active:scale-[0.98] ${
                isSelected
                  ? `bg-gradient-to-b ${diff.color} ${diff.border} ring-2 ring-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)]`
                  : 'glass-panel border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-2xl font-black font-rpg tracking-wider text-white">
                    {diff.name}
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-400 text-slate-950 text-xs font-bold shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Aktif</span>
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-cyan-300 mb-2">{diff.title}</p>
                <p className="text-xs text-slate-300 mb-5 leading-relaxed">{diff.desc}</p>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Waktu Dasar</span>
                      <span className="font-semibold text-slate-200">{diff.timer}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Damage Pemain</span>
                      <span className="font-semibold text-emerald-300">{diff.playerDmg}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Serangan Balasan Boss</span>
                      <span className="font-semibold text-rose-300">{diff.bossDmg}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/80 text-center">
                <span className="text-xs font-bold text-slate-400">
                  {isSelected ? 'Opsi Dipilih' : 'Klik untuk Mengaktifkan'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Level Scaling Switcher Panel */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-rpg">
              Sistem Level Scaling Timer (Dynamic Time)
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
            Jika aktif, timer berkurang secara bertahap seiring tingginya Level Boss:
            Level 1 = 40s, Level 2 = 39s, Level 3 = 38s... (Batas minimum aman: 18 detik).
          </p>
        </div>

        <button
          onClick={() => {
            soundManager.playButtonClick();
            onToggleLevelScaling(!useLevelScaling);
          }}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition-all flex items-center gap-2 ${
            useLevelScaling
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <span>LEVEL SCALING:</span>
          <span className="uppercase">{useLevelScaling ? 'AKTIF (ON)' : 'MATI (OFF)'}</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => {
            soundManager.playButtonClick();
            onBack();
          }}
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
        >
          Simpan Pilihan
        </button>

        <button
          onClick={() => {
            soundManager.playButtonClick();
            onStartBattle();
          }}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-rpg font-bold text-base tracking-wider shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
        >
          MULAI BATTLE SEKARANG!
        </button>
      </div>
    </div>
  );
};
