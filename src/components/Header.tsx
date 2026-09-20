import React from 'react';
import { Volume2, VolumeX, Music, Swords, Trophy, Shield, Settings, User } from 'lucide-react';
import { PlayerProfile, ScreenState, DatabaseStatus } from '../types';
import { soundManager } from '../utils/audio';
import { DbStatusBadge } from './DbStatusBadge';

interface HeaderProps {
  profile: PlayerProfile;
  currentScreen: ScreenState;
  dbStatus?: DatabaseStatus;
  onNavigate: (screen: ScreenState) => void;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onSyncClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  currentScreen,
  dbStatus = 'OFFLINE',
  onNavigate,
  onToggleSound,
  onToggleMusic,
  onSyncClick,
}) => {
  return (
    <header className="relative z-20 w-full max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-blue-900/40 bg-[#05070D]/80 backdrop-blur-md">
      {/* Brand / Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            soundManager.playButtonClick();
            if (currentScreen !== 'BATTLE') {
              onNavigate('LOBBY');
            }
          }}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-sky-400 to-emerald-500 p-0.5 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
            <div className="w-full h-full bg-[#05070D] rounded-[10px] flex items-center justify-center text-sky-400">
              <Swords className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="block text-base sm:text-lg font-bold font-rpg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-200 to-white">
              QUIZ BATTLE
            </span>
            <span className="block text-[10px] font-bold tracking-wider text-emerald-400 uppercase -mt-0.5 flex items-center gap-1">
              <span>BRAIN LITERACY CHALLENGE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            </span>
          </div>
        </button>

        {/* Cloud Database Status Badge */}
        <div className="hidden lg:block">
          <DbStatusBadge status={dbStatus} onSyncClick={onSyncClick} />
        </div>
      </div>

      {/* Quick Player Stats Bar */}
      <div className="flex items-center gap-2 sm:gap-3 text-xs">
        <div className="block lg:hidden">
          <DbStatusBadge status={dbStatus} onSyncClick={onSyncClick} />
        </div>
        <button
          onClick={() => {
            soundManager.playButtonClick();
            onNavigate('SETTINGS');
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B1220]/90 border border-blue-500/30 hover:border-sky-400 hover:bg-[#0F172A] transition-all text-[#F8FAFC] shadow-sm"
          title="Klik untuk ubah profil pemain"
        >
          <div className="relative">
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <span className="font-bold max-w-[90px] sm:max-w-[120px] truncate text-slate-100">{profile.name}</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/40">
            Lv.{profile.level}
          </span>
        </button>

        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-[#0B1220]/70 border border-blue-900/40 text-slate-300">
          <div className="flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] text-slate-400">High:</span>
            <span className="font-semibold text-amber-300">{profile.highScore.toLocaleString()}</span>
          </div>
          <div className="w-px h-3 bg-slate-800" />
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] text-slate-400">Defeated:</span>
            <span className="font-semibold text-emerald-300">{profile.defeatedBosses.length}/25</span>
          </div>
        </div>

        {/* Music (BGM) Toggle */}
        <button
          onClick={() => {
            soundManager.playButtonClick();
            onToggleMusic();
          }}
          className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 ${
            profile.musicEnabled
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400 hover:bg-emerald-900/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
              : 'bg-[#0B1220] border-slate-800 text-slate-500 hover:text-slate-300'
          }`}
          title={profile.musicEnabled ? 'Musik Santai Aktif (Klik untuk Matikan)' : 'Musik Santai Mati (Klik untuk Nyalakan)'}
          aria-label="Toggle Relaxing Background Music"
        >
          <Music className={`w-4 h-4 ${profile.musicEnabled ? 'animate-bounce' : ''}`} />
          <span className="hidden md:inline text-[11px] font-semibold">BGM</span>
        </button>

        {/* SFX Sound Toggle */}
        <button
          onClick={() => {
            soundManager.playButtonClick();
            onToggleSound();
          }}
          className={`p-2 rounded-xl border transition-all ${
            profile.soundEnabled
              ? 'bg-blue-950/40 border-blue-500/50 text-sky-400 hover:bg-blue-900/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
              : 'bg-[#0B1220] border-slate-800 text-slate-500 hover:text-slate-300'
          }`}
          title={profile.soundEnabled ? 'Efek Suara SFX Aktif (Mute)' : 'Efek Suara SFX Mati (Unmute)'}
          aria-label="Toggle Sound Effects"
        >
          {profile.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Settings Button */}
        {currentScreen !== 'BATTLE' && (
          <button
            onClick={() => {
              soundManager.playButtonClick();
              onNavigate('SETTINGS');
            }}
            className={`p-2 rounded-xl border transition-all ${
              currentScreen === 'SETTINGS'
                ? 'bg-blue-900/60 border-blue-400 text-sky-300'
                : 'bg-[#0B1220] border-blue-900/40 text-slate-400 hover:text-slate-200 hover:border-blue-500/40'
            }`}
            title="Pengaturan"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
