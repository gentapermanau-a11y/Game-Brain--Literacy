import React, { useState } from 'react';
import {
  ArrowLeft,
  Lock,
  Unlock,
  Skull,
  Swords,
  Shield,
  Zap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Boss, PlayerProfile } from '../types';
import { BOSS_LIST } from '../data/bosses';
import { BossIllustration } from './BossIllustration';
import { soundManager } from '../utils/audio';

interface BossSelectModalProps {
  profile: PlayerProfile;
  selectedBoss: Boss;
  onSelectBoss: (boss: Boss) => void;
  onBack: () => void;
  onStartBattle: () => void;
}

export const BossSelectModal: React.FC<BossSelectModalProps> = ({
  profile,
  selectedBoss,
  onSelectBoss,
  onBack,
  onStartBattle,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'cute'>('all');
  const [previewBoss, setPreviewBoss] = useState<Boss>(selectedBoss);

  const isBossUnlocked = (boss: Boss): boolean => {
    // Boss Level 1 is always unlocked
    if (boss.level === 1) return true;
    // An unlocked boss is <= unlockedBosses count or present in defeatedBosses + 1
    return boss.level <= profile.unlockedBosses;
  };

  const isBossDefeated = (boss: Boss): boolean => {
    return profile.defeatedBosses.includes(boss.id);
  };

  const filteredBosses = BOSS_LIST.filter((b) => {
    if (activeTab === 'unlocked') return isBossUnlocked(b);
    if (activeTab === 'cute') return b.isCute;
    return true;
  });

  const isCurrentPreviewUnlocked = isBossUnlocked(previewBoss);

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-6 flex flex-col">
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
          <span>Kembali ke Lobby</span>
        </button>

        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold font-rpg tracking-wider text-white">
            BOSS SELECT SYSTEM
          </h2>
          <p className="text-xs text-slate-400">
            Terbuka: {Math.min(profile.unlockedBosses, 25)} / 25 Boss • Kalahkan tiap level untuk membuka level berikutnya
          </p>
        </div>

        {/* Filter Pills */}
        <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          <button
            onClick={() => {
              soundManager.playButtonClick();
              setActiveTab('all');
            }}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Semua (25)
          </button>
          <button
            onClick={() => {
              soundManager.playButtonClick();
              setActiveTab('unlocked');
            }}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeTab === 'unlocked'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Terbuka ({Math.min(profile.unlockedBosses, 25)})
          </button>
          <button
            onClick={() => {
              soundManager.playButtonClick();
              setActiveTab('cute');
            }}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeTab === 'cute'
                ? 'bg-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cute Boss (4)
          </button>
        </div>
      </div>

      {/* Main Grid: Boss List (8 cols) + Selected Boss Detail Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: 25 Bosses Grid */}
        <div className="lg:col-span-8 glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredBosses.map((boss) => {
              const unlocked = isBossUnlocked(boss);
              const defeated = isBossDefeated(boss);
              const isSelected = selectedBoss.id === boss.id;
              const isPreviewed = previewBoss.id === boss.id;

              return (
                <button
                  key={boss.id}
                  onClick={() => {
                    soundManager.playButtonClick();
                    setPreviewBoss(boss);
                    if (unlocked) {
                      onSelectBoss(boss);
                    }
                  }}
                  className={`relative p-3 rounded-xl border text-left transition-all duration-200 flex flex-col items-center group ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                      : isPreviewed
                      ? 'bg-slate-800/90 border-slate-500'
                      : unlocked
                      ? 'bg-slate-900/80 border-slate-800 hover:border-slate-600 hover:bg-slate-800/60'
                      : 'bg-slate-950/80 border-slate-900 opacity-60'
                  }`}
                >
                  {/* Status Badges */}
                  <div className="w-full flex items-center justify-between text-[10px] mb-1.5 font-bold">
                    <span className="px-1.5 py-0.5 rounded bg-slate-950/90 text-slate-300 border border-slate-800 font-rpg">
                      Lv.{boss.level}
                    </span>
                    {unlocked ? (
                      defeated ? (
                        <span className="text-emerald-400 flex items-center gap-0.5" title="Telah Dikalahkan">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Clear</span>
                        </span>
                      ) : (
                        <span className="text-cyan-400 flex items-center gap-0.5">
                          <Unlock className="w-3 h-3" />
                        </span>
                      )
                    ) : (
                      <span className="text-slate-500 flex items-center gap-0.5">
                        <Lock className="w-3 h-3" />
                        <span>Lock</span>
                      </span>
                    )}
                  </div>

                  {/* Boss Miniature Icon / Illustration */}
                  <div className={`my-1 ${!unlocked ? 'brightness-25 grayscale contrast-125' : ''}`}>
                    <BossIllustration boss={boss} size="sm" />
                  </div>

                  {/* Name and Title */}
                  <span className="text-xs font-bold text-white text-center truncate w-full mt-1">
                    {boss.name}
                  </span>
                  <span className="text-[10px] text-slate-400 text-center truncate w-full">
                    {unlocked ? boss.title : 'Terkunci'}
                  </span>

                  {/* Cute marker */}
                  {boss.isCute && (
                    <span className="absolute bottom-1 right-1 px-1 py-0.2 text-[8px] font-bold rounded bg-pink-500/80 text-white">
                      Cute
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Boss Inspection & Battle Action */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col items-center text-center">
            {/* Ambient Boss Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: previewBoss.auraColor }}
            />

            {/* Boss Level Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-cyan-300 font-rpg">
                BOSS #{previewBoss.level} • LEVEL {previewBoss.level}
              </span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                previewBoss.difficulty === 'Easy' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                previewBoss.difficulty === 'Normal' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                previewBoss.difficulty === 'Hard' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                previewBoss.difficulty === 'Extreme' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                'bg-rose-950 text-rose-300 border border-rose-800'
              }`}>
                {previewBoss.difficulty}
              </span>
            </div>

            {/* Visual Illustration */}
            <div className={`my-4 ${!isCurrentPreviewUnlocked ? 'brightness-20 grayscale' : 'animate-float'}`}>
              <BossIllustration boss={previewBoss} size="lg" />
            </div>

            {/* Name & Lore */}
            <h3 className="text-2xl font-bold font-rpg text-white tracking-wide">
              {previewBoss.name}
            </h3>
            <p className="text-xs text-pink-400 font-semibold mb-2">{previewBoss.title}</p>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed px-2">
              {previewBoss.description}
            </p>

            {/* Stats Metrics */}
            <div className="w-full grid grid-cols-2 gap-2 text-xs py-2.5 px-3 rounded-xl bg-slate-950/80 border border-slate-800 mb-4">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 uppercase">HP Target</span>
                <span className="font-extrabold text-rose-400 text-base">{previewBoss.hp} HP</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 uppercase">Serangan Boss</span>
                <span className="font-extrabold text-amber-400 text-base">{previewBoss.attackDamage} DMG</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
                <span className="text-slate-400">Special Move:</span>
                <span className="font-semibold text-purple-300">{previewBoss.specialEffect}</span>
              </div>
            </div>

            {/* Locked Warning or Selection Action */}
            {!isCurrentPreviewUnlocked ? (
              <div className="w-full p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2 text-left">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400" />
                <div>
                  <span className="font-bold block">Boss Masih Terkunci</span>
                  <span>Kalahkan Boss Level {previewBoss.level - 1} untuk membuka tantangan ini.</span>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-2">
                <button
                  onClick={() => {
                    soundManager.playButtonClick();
                    onSelectBoss(previewBoss);
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all ${
                    selectedBoss.id === previewBoss.id
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  {selectedBoss.id === previewBoss.id ? '✓ Boss Terpilih' : 'Pilih Boss Ini'}
                </button>

                <button
                  onClick={() => {
                    soundManager.playButtonClick();
                    onSelectBoss(previewBoss);
                    onStartBattle();
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-rpg font-bold text-base tracking-wider shadow-lg shadow-rose-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Swords className="w-4 h-4" />
                  <span>SERANG BOSS SEKARANG!</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
