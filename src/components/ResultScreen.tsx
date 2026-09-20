import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Skull,
  RotateCcw,
  Menu,
  ChevronRight,
  Sparkles,
  Flame,
  Clock,
  Swords,
  Shield,
  CheckCircle2,
  XCircle,
  Award,
} from 'lucide-react';
import { Boss, Difficulty } from '../types';
import { BossIllustration } from './BossIllustration';
import { soundManager } from '../utils/audio';

interface ResultScreenProps {
  boss: Boss;
  result: {
    victory: boolean;
    finalScore: number;
    correctCount: number;
    wrongCount: number;
    damageDealt: number;
    damageReceived: number;
    totalTimeSpent: number;
    maxCombo: number;
  };
  difficulty: Difficulty;
  isNewBossUnlocked: boolean;
  onPlayAgain: () => void;
  onBossSelect: () => void;
  onMainMenu: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  boss,
  result,
  difficulty,
  isNewBossUnlocked,
  onPlayAgain,
  onBossSelect,
  onMainMenu,
}) => {
  const accuracy = Math.round((result.correctCount / 10) * 100);

  useEffect(() => {
    if (result.victory) {
      soundManager.playVictory();
      // Confetti burst!
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#8b5cf6', '#ec4899', '#facc15'],
        });
      } catch {
        // Ignore if confetti fails
      }
    } else {
      soundManager.playDefeat();
    }
  }, [result.victory]);

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center select-none animate-fadeIn">
      {/* Result Status Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 shadow-lg border">
          {result.victory ? (
            <span className="text-emerald-400 bg-emerald-950/80 border-emerald-500/40 flex items-center gap-1.5 px-3 py-1 rounded-full border">
              <Sparkles className="w-3.5 h-3.5" />
              BOSS DEFEATED!
            </span>
          ) : (
            <span className="text-rose-400 bg-rose-950/80 border-rose-500/40 flex items-center gap-1.5 px-3 py-1 rounded-full border">
              <Skull className="w-3.5 h-3.5" />
              TRY AGAIN!
            </span>
          )}
        </div>

        <h1
          className={`text-5xl sm:text-7xl font-extrabold font-rpg tracking-tight leading-none drop-shadow-md ${
            result.victory
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-400 to-amber-500'
          }`}
        >
          {result.victory ? 'VICTORY!' : 'DEFEAT!'}
        </h1>

        <p className="mt-2 text-sm text-slate-300 font-medium">
          {result.victory
            ? `Selamat! Anda berhasil menaklukkan ${boss.name} (Level ${boss.level})`
            : `Pertahanan ${boss.name} terlalu kokoh. Evaluasi jawaban Anda dan coba lagi!`}
        </p>

        {isNewBossUnlocked && result.victory && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-900/80 to-purple-900/80 border border-purple-500/40 text-purple-300 text-xs font-bold animate-bounce shadow-md">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>BOSS BARU TERBUKA: Level {boss.level + 1}!</span>
          </div>
        )}
      </div>

      {/* Center Panel: Boss & Metrics Showcase */}
      <div className="w-full glass-panel-glow p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center gap-6 mb-8">
        
        {/* Boss Visual & Name */}
        <div className="flex flex-col items-center text-center flex-shrink-0 md:w-56">
          <div className="relative mb-2">
            <BossIllustration boss={boss} size="md" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
            {boss.title}
          </span>
          <h3 className="text-xl font-bold font-rpg text-white">{boss.name}</h3>
          <span className="text-xs text-slate-400">Level {boss.level} • {difficulty}</span>
        </div>

        {/* Divider on desktop */}
        <div className="hidden md:block w-px h-64 bg-slate-800" />

        {/* Metrics Grid */}
        <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {/* Final Score */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">FINAL BATTLE SCORE</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-rpg">
                +{result.finalScore.toLocaleString()}
              </span>
            </div>
            <Award className="w-8 h-8 text-amber-400 opacity-80" />
          </div>

          {/* Correct Answers */}
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-bold">Benar</span>
            </div>
            <span className="text-base font-bold text-white">
              {result.correctCount} / 10
            </span>
          </div>

          {/* Wrong Answers */}
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center gap-1.5 text-rose-400 mb-1">
              <XCircle className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-bold">Salah / Timeout</span>
            </div>
            <span className="text-base font-bold text-white">
              {result.wrongCount} / 10
            </span>
          </div>

          {/* Accuracy */}
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
              <Award className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-bold">Akurasi</span>
            </div>
            <span className="text-base font-bold text-cyan-300 font-rpg">
              {accuracy}%
            </span>
          </div>

          {/* Damage Dealt */}
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center gap-1.5 text-cyan-400 mb-1">
              <Swords className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-bold">Damage Dealt</span>
            </div>
            <span className="text-base font-bold text-cyan-300">
              {result.damageDealt} DMG
            </span>
          </div>

          {/* Damage Received */}
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center gap-1.5 text-rose-400 mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-bold">Damage Taken</span>
            </div>
            <span className="text-base font-bold text-rose-300">
              {result.damageReceived} DMG
            </span>
          </div>

          {/* Max Combo & Time */}
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="flex items-center gap-1.5 text-amber-400 mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase font-bold">Max Combo</span>
            </div>
            <span className="text-base font-bold text-amber-300">
              x{result.maxCombo}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 w-full max-w-lg">
        {/* PLAY AGAIN */}
        <button
          onClick={() => {
            soundManager.playButtonClick();
            onPlayAgain();
          }}
          className="flex-1 min-w-[140px] py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-rpg font-bold text-sm tracking-wider shadow-lg shadow-cyan-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>PLAY AGAIN</span>
        </button>

        {/* BOSS SELECT */}
        <button
          onClick={() => {
            soundManager.playButtonClick();
            onBossSelect();
          }}
          className="flex-1 min-w-[140px] py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-rpg font-bold text-sm tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Skull className="w-4 h-4 text-pink-400" />
          <span>BOSS SELECT</span>
        </button>

        {/* MAIN MENU */}
        <button
          onClick={() => {
            soundManager.playButtonClick();
            onMainMenu();
          }}
          className="flex-1 min-w-[140px] py-3.5 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-rpg font-bold text-sm tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Menu className="w-4 h-4" />
          <span>MAIN MENU</span>
        </button>
      </div>
    </div>
  );
};
