import React, { useState } from 'react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Music,
  User,
  Trash2,
  AlertTriangle,
  Check,
  Save,
  ShieldAlert,
} from 'lucide-react';
import { PlayerProfile } from '../types';
import { soundManager } from '../utils/audio';

interface SettingsModalProps {
  profile: PlayerProfile;
  onUpdateName: (name: string) => void;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onResetData: () => void;
  onBack: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  profile,
  onUpdateName,
  onToggleSound,
  onToggleMusic,
  onResetData,
  onBack,
}) => {
  const [nameInput, setNameInput] = useState(profile.name);
  const [nameSaved, setNameSaved] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
      setNameSaved(true);
      soundManager.playButtonClick();
      setTimeout(() => setNameSaved(false), 2000);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-6 flex flex-col">
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
            PENGATURAN GAME
          </h2>
          <p className="text-xs text-slate-400">
            Kelola profil petarung, musik santai latar, efek audio, dan data tersimpan
          </p>
        </div>

        <div className="w-20 hidden sm:block" />
      </div>

      <div className="space-y-6">
        {/* Profile Name Settings */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white font-rpg">Ubah Nama Pemain</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Nama ini akan tersimpan di profil lokal dan ditampilkan pada Hall of Fame.
          </p>

          <form onSubmit={handleSaveName} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={nameInput}
              maxLength={18}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Masukkan nama pemain..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-semibold"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-cyan-600/30"
            >
              {nameSaved ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Tersimpan!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Nama</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Relaxing Background Music (BGM) Settings */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Music className={`w-5 h-5 ${profile.musicEnabled ? 'text-emerald-400' : 'text-slate-500'}`} />
              <h3 className="text-lg font-bold text-white font-rpg">Musik Santai (Lofi BGM)</h3>
            </div>
            <p className="text-xs text-slate-400">
              Musik instrumen santai sintetis (Lofi Oasis di Lobby & Focus Beat saat Battle) untuk meningkatkan fokus belajar.
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playButtonClick();
              onToggleMusic();
            }}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 ${
              profile.musicEnabled
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <span>BGM:</span>
            <span>{profile.musicEnabled ? 'ON (MENYALA)' : 'OFF (MATI)'}</span>
          </button>
        </div>

        {/* Sound Effects (SFX) Settings */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {profile.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-cyan-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-500" />
              )}
              <h3 className="text-lg font-bold text-white font-rpg">Efek Suara (Sound FX)</h3>
            </div>
            <p className="text-xs text-slate-400">
              Menghasilkan sound effect sintetis untuk klik, serangan catur, kombo, timer, dan kemenangan.
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playButtonClick();
              onToggleSound();
            }}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 ${
              profile.soundEnabled
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <span>SFX:</span>
            <span>{profile.soundEnabled ? 'ON (AKTIF)' : 'OFF (MUTED)'}</span>
          </button>
        </div>

        {/* Local Storage & Reset Section */}
        <div className="glass-panel p-6 rounded-2xl border border-rose-900/40 bg-slate-950/70">
          <div className="flex items-center gap-2 mb-2 text-rose-400">
            <Trash2 className="w-5 h-5" />
            <h3 className="text-lg font-bold font-rpg">Reset Seluruh Data Progress</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Menghapus data tersimpan di browser (localStorage) termasuk skor tertinggi, level boss yang terbuka, dan riwayat pertarungan.
          </p>

          <button
            onClick={() => {
              soundManager.playButtonClick();
              setShowConfirmReset(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/80 text-rose-300 font-semibold text-xs tracking-wider transition-all active:scale-95 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>RESET DATA PROGRESS</span>
          </button>
        </div>
      </div>

      {/* Confirmation Dialog Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md p-6 rounded-2xl glass-panel border border-rose-500/60 shadow-2xl shadow-rose-950 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-950/80 border border-rose-500/40 mx-auto flex items-center justify-center text-rose-400 mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h4 className="text-xl font-bold font-rpg text-white mb-2">
              Konfirmasi Reset Data
            </h4>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              &ldquo;Are you sure you want to reset all progress?&rdquo;
              <br />
              <span className="text-xs text-rose-400 block mt-1">
                Semua boss yang terbuka dan riwayat pertarungan akan dikembalikan ke kondisi awal.
              </span>
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  soundManager.playButtonClick();
                  setShowConfirmReset(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  soundManager.playButtonClick();
                  onResetData();
                  setShowConfirmReset(false);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-rose-600/30"
              >
                Ya, Reset Semuanya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
