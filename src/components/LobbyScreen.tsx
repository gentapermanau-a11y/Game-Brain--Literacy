import React, { useState } from 'react';
import {
  Play,
  Skull,
  BookOpen,
  Sliders,
  Trophy,
  Settings,
  Swords,
  ChevronRight,
  Edit2,
  Check,
  ShieldCheck,
  Zap,
  Sparkles,
  Activity,
  Flame,
} from 'lucide-react';
import { PlayerProfile, ScreenState, Boss, Category, Major, Difficulty } from '../types';
import { BossIllustration } from './BossIllustration';
import { soundManager } from '../utils/audio';
import { CATEGORIES_META, MAJORS_META } from '../data/questions';

interface LobbyScreenProps {
  profile: PlayerProfile;
  selectedBoss: Boss;
  selectedCategory: Category;
  selectedMajor?: Major;
  selectedDifficulty: Difficulty;
  onNavigate: (screen: ScreenState) => void;
  onStartBattle: () => void;
  onUpdateName: (newName: string) => void;
}

export const LobbyScreen: React.FC<LobbyScreenProps> = ({
  profile,
  selectedBoss,
  selectedCategory,
  selectedMajor = 'ALL',
  selectedDifficulty,
  onNavigate,
  onStartBattle,
  onUpdateName,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);

  const categoryMeta = CATEGORIES_META.find((c) => c.id === selectedCategory) || CATEGORIES_META[0];
  const majorMeta = MAJORS_META.find((m) => m.id === selectedMajor) || MAJORS_META[0];

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
      setIsEditingName(false);
      soundManager.playButtonClick();
    }
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-4 sm:py-6 md:py-8 flex flex-col items-center select-none">
      
      {/* ========================================================================= */}
      {/* 2. HERO SECTION (Center Focus with Silhouette, Glowing Aura & Title) */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-3xl text-center mb-8 md:mb-10 flex flex-col items-center">
        
        {/* Animated Background Glowing Orbs behind Hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-gradient-to-r from-blue-600/20 via-sky-500/15 to-emerald-500/10 blur-3xl rounded-full pointer-events-none animate-glow" />

        {/* 5. BOSS SILHOUETTE (Faint, atmospheric backdrop behind typography) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-15 filter blur-[1px] transform scale-125 md:scale-150 animate-float-gentle">
          <BossIllustration boss={selectedBoss} size="lg" />
        </div>

        {/* Futuristic Status Pill */}
        <div className="intro-seq-1 relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1220]/90 border border-blue-500/40 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#22c55e]" />
          <span className="font-rpg tracking-wider text-slate-200">TACTICAL RPG QUIZ ARENA</span>
          <span className="text-yellow-400 font-bold">•</span>
          <span className="text-yellow-300 font-bold font-rpg">SEASON 1</span>
        </div>

        {/* Main Hero Title with Gradient & Glow */}
        <div className="intro-seq-1 relative z-10 animate-float-gentle">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-rpg tracking-tight leading-none text-[#F8FAFC] drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-sky-200 drop-shadow-[0_0_35px_rgba(56,189,248,0.5)]">
              QUIZ
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] via-sky-100 to-blue-300">
              BATTLE
            </span>
          </h1>

          <div className="mt-1 sm:mt-2">
            <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-rpg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-yellow-300 drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]">
              BRAIN LITERACY CHALLENGE
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="intro-seq-2 relative z-10 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300/90 font-medium tracking-wide max-w-xl px-2">
          &ldquo;Test Your Knowledge. Defeat The Boss.&rdquo;
        </p>

        {/* 6. PROMINENT PLAY BATTLE BUTTON (Center Hero CTA) */}
        <div className="intro-seq-3 relative z-10 mt-6 w-full max-w-md px-4">
          <button
            onClick={() => {
              soundManager.playButtonClick();
              onStartBattle();
            }}
            className="btn-shine-sweep group relative w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 hover:from-blue-500 hover:via-sky-400 hover:to-emerald-400 text-[#F8FAFC] font-rpg font-extrabold text-xl sm:text-2xl tracking-wider shadow-[0_0_35px_rgba(37,99,235,0.45)] hover:shadow-[0_0_50px_rgba(56,189,248,0.7)] hover:translate-y-[-3px] hover:scale-[1.03] active:translate-y-[1px] active:scale-[0.98] transition-all duration-300 flex items-center justify-between border border-sky-300/40"
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-slate-950/40 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white text-white translate-x-0.5 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </div>
              <div className="text-left">
                <span className="block text-xl sm:text-2xl leading-none text-white drop-shadow-md">
                  PLAY BATTLE
                </span>
                <span className="text-[11px] sm:text-xs font-sans font-semibold text-sky-100 opacity-95 block mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-300" />
                  <span>10 Rounds • Target: {selectedBoss.name}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white opacity-90 group-hover:translate-x-1.5 transition-transform">
              <ChevronRight className="w-7 h-7" />
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3-COLUMN RESPONSIVE LAYOUT (HUD Player Profile + Boss Preview + Menu) */}
      {/* ========================================================================= */}
      <div className="intro-seq-4 w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        
        {/* ======================================================================= */}
        {/* LEFT COLUMN: 9. PLAYER PROFILE HUD CARD (4 cols) */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="glass-panel-hud p-5 rounded-2xl border border-blue-500/30 relative overflow-hidden shadow-2xl">
            {/* Top Accent Strip (Blue -> Green with Yellow highlight) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-yellow-400" />

            {/* Header: Title & Green Online Status Indicator */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400 font-rpg">
                  FIGHTER HUD
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE • READY
                </span>
              </div>

              {/* 12. Yellow Level Indicator */}
              <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-amber-400/20 text-yellow-300 border border-amber-400/50 font-rpg shadow-[0_0_8px_rgba(250,204,21,0.2)]">
                LV. {profile.level < 10 ? `0${profile.level}` : profile.level}
              </span>
            </div>

            {/* Player Avatar & Name with Edit */}
            <div className="flex items-center gap-3 mb-5 p-2.5 rounded-xl bg-[#05070D]/80 border border-blue-900/40">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-emerald-500 p-0.5 shadow-md flex-shrink-0">
                <div className="w-full h-full bg-[#05070D] rounded-[10px] flex items-center justify-center text-sky-300 font-extrabold text-lg font-rpg">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 font-rpg">
                  PLAYER NAME
                </span>
                {isEditingName ? (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <input
                      type="text"
                      value={tempName}
                      maxLength={18}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                      className="w-full px-2 py-0.5 text-sm rounded bg-slate-900 border border-sky-400 text-white focus:outline-none font-semibold"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold"
                      title="Simpan Nama"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-[#F8FAFC] truncate">
                      {profile.name}
                    </h2>
                    <button
                      onClick={() => {
                        soundManager.playButtonClick();
                        setIsEditingName(true);
                      }}
                      className="p-1 rounded text-slate-400 hover:text-sky-400 transition-colors"
                      title="Ubah Nama Pemain"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Player Stats Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Score Highlight with Yellow Accent */}
              <div className="p-2.5 rounded-xl bg-[#05070D]/80 border border-blue-900/40">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">TOTAL SCORE</span>
                <span className="text-sm font-extrabold text-sky-300 font-rpg">
                  {profile.totalScore.toLocaleString()}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#05070D]/80 border border-blue-900/40">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">HIGHEST SCORE</span>
                <span className="text-sm font-extrabold text-yellow-400 font-rpg">
                  {profile.highScore.toLocaleString()}
                </span>
              </div>

              {/* Wins with Green Energy Accent */}
              <div className="p-2.5 rounded-xl bg-[#05070D]/80 border border-blue-900/40">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">TOTAL WINS</span>
                <span className="text-sm font-extrabold text-emerald-400 font-rpg">
                  {profile.totalWins} Wins
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#05070D]/80 border border-blue-900/40">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">LOSSES</span>
                <span className="text-sm font-bold text-slate-300 font-rpg">
                  {profile.totalLosses} Losses
                </span>
              </div>

              {/* Boss Defeated Progress Bar */}
              <div className="p-2.5 rounded-xl bg-[#05070D]/80 border border-blue-900/40 col-span-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">BOSS DEFEATED</span>
                  <span className="text-xs font-extrabold text-[#F8FAFC] font-rpg">
                    {profile.defeatedBosses.length} / 25 BOSS
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 shadow-[0_0_8px_#38bdf8] transition-all duration-500"
                    style={{ width: `${Math.max(4, (profile.defeatedBosses.length / 25) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Setup Status Badge Card */}
          <div className="glass-panel p-4 rounded-2xl border border-blue-900/40 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5 font-rpg flex items-center justify-between">
              <span>ACTIVE SETUP</span>
              <span className="text-sky-400">READY</span>
            </span>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#05070D]/70 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1">
                  <Skull className="w-3 h-3 text-sky-400" />
                  Boss:
                </span>
                <span className="font-bold text-[#F8FAFC]">
                  Lv.{selectedBoss.level} {selectedBoss.name}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#05070D]/70 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-emerald-400" />
                  Materi:
                </span>
                <span className="font-bold text-sky-300">
                  {categoryMeta.name}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#05070D]/70 border border-slate-800">
                <span className="text-slate-400 flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-yellow-400" />
                  Difficulty:
                </span>
                <span className={`font-bold ${
                  selectedDifficulty === 'EASY' ? 'text-emerald-400' :
                  selectedDifficulty === 'MEDIUM' ? 'text-yellow-400' : 'text-rose-400'
                }`}>
                  {selectedDifficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* CENTER COLUMN: TARGET BOSS SHOWCASE HUD (4 cols) */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="relative w-full rounded-2xl p-6 glass-panel-glow border border-sky-400/30 text-center flex flex-col items-center overflow-hidden shadow-2xl">
            {/* Ambient Aura Orb behind Boss */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: selectedBoss.auraColor }}
            />

            {/* Boss Level Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#05070D]/90 border border-blue-500/40 text-xs font-bold text-[#F8FAFC] mb-2 shadow-sm">
              <Skull className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-rpg">TARGET BOSS • LEVEL {selectedBoss.level}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-bold">{selectedBoss.difficulty}</span>
            </div>

            {/* Boss Illustration with floating animation */}
            <div className="my-3 animate-float">
              <BossIllustration boss={selectedBoss} size="lg" />
            </div>

            {/* Boss Info */}
            <h3 className="text-2xl font-bold font-rpg text-[#F8FAFC] tracking-wide">
              {selectedBoss.name}
            </h3>
            <p className="text-xs text-sky-300 font-semibold mb-2">{selectedBoss.title}</p>
            <p className="text-xs text-slate-300 line-clamp-2 px-2 mb-4 leading-relaxed">
              {selectedBoss.description}
            </p>

            {/* Boss Combat Metrics */}
            <div className="w-full grid grid-cols-2 gap-2 text-xs py-2.5 px-3 rounded-xl bg-[#05070D]/80 border border-blue-900/40">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">BOSS HEALTH</span>
                <span className="font-extrabold text-sky-400 text-sm font-rpg">{selectedBoss.hp} HP</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">BASE ATTACK</span>
                <span className="font-extrabold text-yellow-400 text-sm font-rpg">
                  {selectedBoss.attackDamage} DMG
                </span>
              </div>
            </div>

            {/* Quick change boss button */}
            <button
              onClick={() => {
                soundManager.playButtonClick();
                onNavigate('BOSS_SELECT');
              }}
              className="mt-4 text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 transition-colors py-1 px-3 rounded-lg hover:bg-blue-950/40 border border-transparent hover:border-blue-500/30"
            >
              <span>Pilih Lawan Boss (25 Tersedia)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: 7. MENU BUTTONS (Dark Glass with Blue/Green Glow) (4 cols) */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 flex flex-col gap-3 w-full">
          
          {/* BOSS SELECT BUTTON */}
          <button
            onClick={() => {
              soundManager.playButtonClick();
              onNavigate('BOSS_SELECT');
            }}
            className="group w-full p-3.5 sm:p-4 rounded-xl glass-panel border border-blue-900/40 hover:border-sky-400 hover:bg-[#0F172A]/90 text-left transition-all duration-300 active:scale-[0.99] flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all">
                <Skull className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-rpg font-bold text-[#F8FAFC] text-sm sm:text-base tracking-wide group-hover:text-sky-300 transition-colors">
                  BOSS SELECT
                </span>
                <span className="text-xs text-slate-400">Pilih dari 25 variasi Boss unik</span>
              </div>
            </div>
            <span className="text-xs font-extrabold px-2 py-1 rounded bg-[#05070D] text-yellow-300 border border-amber-400/40 font-rpg">
              Lv.1-25
            </span>
          </button>

          {/* MATERIAL SELECT BUTTON */}
          <button
            onClick={() => {
              soundManager.playButtonClick();
              onNavigate('MATERIAL_SELECT');
            }}
            className="group w-full p-3.5 sm:p-4 rounded-xl glass-panel border border-blue-900/40 hover:border-emerald-400 hover:bg-[#0F172A]/90 text-left transition-all duration-300 active:scale-[0.99] flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-rpg font-bold text-[#F8FAFC] text-sm sm:text-base tracking-wide group-hover:text-emerald-300 transition-colors">
                  MATERIAL
                </span>
                <span className="text-xs text-slate-400">
                  {majorMeta.badge}: <span className="text-emerald-400 font-semibold">{categoryMeta.name}</span>
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </button>

          {/* DIFFICULTY SELECT BUTTON */}
          <button
            onClick={() => {
              soundManager.playButtonClick();
              onNavigate('DIFFICULTY_SELECT');
            }}
            className="group w-full p-3.5 sm:p-4 rounded-xl glass-panel border border-blue-900/40 hover:border-yellow-400 hover:bg-[#0F172A]/90 text-left transition-all duration-300 active:scale-[0.99] flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-yellow-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-rpg font-bold text-[#F8FAFC] text-sm sm:text-base tracking-wide group-hover:text-yellow-300 transition-colors">
                  DIFFICULTY
                </span>
                <span className="text-xs text-slate-400">
                  Mode: {selectedDifficulty} • Level Scaling {profile.useLevelScaling ? 'ON' : 'OFF'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
          </button>

          {/* SCOREBOARD BUTTON */}
          <button
            onClick={() => {
              soundManager.playButtonClick();
              onNavigate('SCOREBOARD');
            }}
            className="group w-full p-3.5 sm:p-4 rounded-xl glass-panel border border-blue-900/40 hover:border-sky-400 hover:bg-[#0F172A]/90 text-left transition-all duration-300 active:scale-[0.99] flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all">
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <span className="block font-rpg font-bold text-[#F8FAFC] text-sm sm:text-base tracking-wide group-hover:text-sky-300 transition-colors">
                  SCORE & STATS
                </span>
                <span className="text-xs text-slate-400">Riwayat pertarungan & Hall of Fame</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
          </button>

          {/* SETTINGS BUTTON */}
          <button
            onClick={() => {
              soundManager.playButtonClick();
              onNavigate('SETTINGS');
            }}
            className="group w-full p-3.5 sm:p-4 rounded-xl glass-panel border border-blue-900/40 hover:border-blue-400 hover:bg-[#0F172A]/90 text-left transition-all duration-300 active:scale-[0.99] flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:scale-110 transition-all">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-rpg font-bold text-[#F8FAFC] text-sm sm:text-base tracking-wide group-hover:text-white transition-colors">
                  SETTINGS
                </span>
                <span className="text-xs text-slate-400">Audio, Nama Pemain, Reset Data</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
