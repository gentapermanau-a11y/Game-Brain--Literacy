import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Trophy,
  Award,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  Skull,
  TrendingUp,
  Globe,
  RefreshCw,
  Crown,
  User,
} from 'lucide-react';
import { PlayerProfile, LeaderboardEntry, DatabaseStatus } from '../types';
import { soundManager } from '../utils/audio';
import { fetchOnlineLeaderboard } from '../services/db';
import { DbStatusBadge } from './DbStatusBadge';

interface ScoreboardModalProps {
  profile: PlayerProfile;
  onBack: () => void;
}

export const ScoreboardModal: React.FC<ScoreboardModalProps> = ({
  profile,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'LEADERBOARD' | 'HISTORY'>('LEADERBOARD');
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [lbStatus, setLbStatus] = useState<DatabaseStatus>('SYNCING');
  const [isLoadingLb, setIsLoadingLb] = useState(false);

  const totalBattles = profile.totalWins + profile.totalLosses;
  const winRate = totalBattles > 0 ? Math.round((profile.totalWins / totalBattles) * 100) : 0;

  const loadLeaderboardData = async () => {
    setIsLoadingLb(true);
    const { entries, status } = await fetchOnlineLeaderboard();
    setLeaderboardEntries(entries);
    setLbStatus(status);
    setIsLoadingLb(false);
  };

  useEffect(() => {
    loadLeaderboardData();
  }, []);

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-6 flex flex-col">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
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
          <h2 className="text-xl sm:text-2xl font-bold font-rpg tracking-wider text-white flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span>HALL OF FAME & LEADERBOARD</span>
          </h2>
          <p className="text-xs text-slate-400">
            Papan peringkat online global dan rekam jejak statistik pertempuran
          </p>
        </div>

        <DbStatusBadge status={lbStatus} onSyncClick={loadLeaderboardData} />
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs mb-1 font-semibold">
            <Trophy className="w-4 h-4" />
            <span>Highest Score</span>
          </div>
          <span className="text-xl font-extrabold text-white font-rpg">
            {profile.highScore.toLocaleString()}
          </span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col">
          <div className="flex items-center gap-1.5 text-cyan-400 text-xs mb-1 font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>Total Score</span>
          </div>
          <span className="text-xl font-extrabold text-cyan-300 font-rpg">
            {profile.totalScore.toLocaleString()}
          </span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs mb-1 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Total Wins</span>
          </div>
          <span className="text-xl font-extrabold text-emerald-400 font-rpg">
            {profile.totalWins}
          </span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col">
          <div className="flex items-center gap-1.5 text-rose-400 text-xs mb-1 font-semibold">
            <XCircle className="w-4 h-4" />
            <span>Total Losses</span>
          </div>
          <span className="text-xl font-extrabold text-rose-400 font-rpg">
            {profile.totalLosses}
          </span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col">
          <div className="flex items-center gap-1.5 text-purple-400 text-xs mb-1 font-semibold">
            <Skull className="w-4 h-4" />
            <span>Boss Defeated</span>
          </div>
          <span className="text-xl font-extrabold text-purple-300 font-rpg">
            {profile.defeatedBosses.length} / 25
          </span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col">
          <div className="flex items-center gap-1.5 text-sky-400 text-xs mb-1 font-semibold">
            <Award className="w-4 h-4" />
            <span>Win Rate</span>
          </div>
          <span className="text-xl font-extrabold text-sky-300 font-rpg">
            {winRate}%
          </span>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            soundManager.playButtonClick();
            setActiveTab('LEADERBOARD');
          }}
          className={`px-5 py-2.5 rounded-xl font-rpg font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'LEADERBOARD'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>LEADERBOARD ONLINE</span>
        </button>

        <button
          onClick={() => {
            soundManager.playButtonClick();
            setActiveTab('HISTORY');
          }}
          className={`px-5 py-2.5 rounded-xl font-rpg font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center gap-2 ${
            activeTab === 'HISTORY'
              ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
              : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>RIWAYAT PERTURANG SAYA</span>
        </button>

        {activeTab === 'LEADERBOARD' && (
          <button
            onClick={loadLeaderboardData}
            disabled={isLoadingLb}
            className="ml-auto px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLb ? 'animate-spin text-amber-400' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        )}
      </div>

      {/* Tab 1: ONLINE LEADERBOARD */}
      {activeTab === 'LEADERBOARD' && (
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          {isLoadingLb ? (
            <div className="py-16 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 mx-auto mb-3 text-amber-400 animate-spin" />
              <p className="font-rpg font-bold text-sm text-white">LOADING LEADERBOARD DATA...</p>
              <p className="text-xs text-slate-500 mt-1">Mengambil data pemain dari Cloud Database Supabase...</p>
            </div>
          ) : leaderboardEntries.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Globe className="w-10 h-10 mx-auto mb-3 text-slate-600 animate-pulse" />
              <p className="font-bold text-white text-base">Belum Ada Data Leaderboard Online</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                {lbStatus === 'NOT_CONFIGURED'
                  ? 'Konfigurasi VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY di lingkungan Vercel/env untuk mengaktifkan leaderboard global.'
                  : 'Jadilah petarung pertama yang mencatatkan skor ke Cloud Database!'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3 text-center">RANK</th>
                    <th className="py-3 px-3">PETARUNG / PLAYER</th>
                    <th className="py-3 px-3 text-right">HIGH SCORE</th>
                    <th className="py-3 px-3 text-right">TOTAL SCORE</th>
                    <th className="py-3 px-3 text-center">BOSS DEFEATED</th>
                    <th className="py-3 px-3 text-center">HIGHEST BOSS</th>
                    <th className="py-3 px-3 text-center">TOTAL WINS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {leaderboardEntries.map((entry, idx) => {
                    const isCurrentPlayer = entry.playerId === profile.id;
                    const rank = idx + 1;

                    return (
                      <tr
                        key={entry.playerId}
                        className={`transition-colors ${
                          isCurrentPlayer
                            ? 'bg-cyan-950/60 border-l-4 border-l-cyan-400 text-cyan-200'
                            : 'hover:bg-slate-900/60 text-slate-300'
                        }`}
                      >
                        <td className="py-3.5 px-3 text-center font-rpg font-extrabold text-sm">
                          {rank === 1 && <Crown className="w-5 h-5 text-yellow-400 inline-block mr-1" />}
                          {rank === 2 && <Crown className="w-4 h-4 text-slate-300 inline-block mr-1" />}
                          {rank === 3 && <Crown className="w-4 h-4 text-amber-600 inline-block mr-1" />}
                          <span
                            className={
                              rank === 1
                                ? 'text-yellow-400 text-base'
                                : rank === 2
                                ? 'text-slate-200'
                                : rank === 3
                                ? 'text-amber-500'
                                : 'text-slate-400'
                            }
                          >
                            #{rank}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <User className={`w-4 h-4 ${isCurrentPlayer ? 'text-cyan-400' : 'text-slate-500'}`} />
                            <span className={isCurrentPlayer ? 'text-cyan-300 font-bold' : ''}>
                              {entry.playerName}
                            </span>
                            {isCurrentPlayer && (
                              <span className="px-2 py-0.5 rounded text-[9px] bg-cyan-900 text-cyan-300 font-mono font-bold">
                                YOU
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-right font-rpg font-extrabold text-yellow-300 text-sm">
                          {entry.highScore.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-3 text-right font-bold text-cyan-300">
                          {entry.totalScore.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-3 text-center font-bold text-purple-300">
                          {entry.defeatedBossesCount} / 25
                        </td>
                        <td className="py-3.5 px-3 text-center font-rpg font-bold text-slate-200">
                          Lv.{entry.highestBossLevel}
                        </td>
                        <td className="py-3.5 px-3 text-center font-bold text-emerald-400">
                          {entry.totalWins}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: RIWAYAT PERTARUNGAN SAYA */}
      {activeTab === 'HISTORY' && (
        <div className="glass-panel p-5 rounded-2xl border border-slate-800">
          <h3 className="text-base font-bold text-white font-rpg mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Riwayat Pertarungan Terakhir</span>
          </h3>

          {profile.battleHistory.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              <Skull className="w-10 h-10 mx-auto mb-2 text-slate-600 animate-pulse" />
              <p>Belum ada riwayat pertempuran pribadi.</p>
              <p className="text-xs text-slate-500 mt-1">Mulai pertarungan kuis pertama Anda sekarang!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">HASIL</th>
                    <th className="py-3 px-3">BOSS LAWAN</th>
                    <th className="py-3 px-3">LEVEL</th>
                    <th className="py-3 px-3">SCORE</th>
                    <th className="py-3 px-3">BENAR</th>
                    <th className="py-3 px-3">AKURASI</th>
                    <th className="py-3 px-3">DAMAGE DEALT</th>
                    <th className="py-3 px-3">DIFFICULTY</th>
                    <th className="py-3 px-3">TANGGAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {profile.battleHistory.slice(0, 25).map((record) => {
                    const isWin = record.result === 'VICTORY';
                    return (
                      <tr key={record.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-extrabold text-[10px] ${
                              isWin
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-rose-950 text-rose-300 border border-rose-800'
                            }`}
                          >
                            {isWin ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            {record.result}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-white">
                          {record.bossName}
                        </td>
                        <td className="py-3 px-3 text-slate-300 font-rpg font-bold">
                          Lv.{record.bossLevel}
                        </td>
                        <td className="py-3 px-3 font-bold text-amber-300">
                          +{record.score.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-slate-200 font-medium">
                          {record.correctAnswers} / 10
                        </td>
                        <td className="py-3 px-3 font-semibold text-cyan-300">
                          {record.accuracy}%
                        </td>
                        <td className="py-3 px-3 text-rose-400 font-bold">
                          {record.damageDealt} DMG
                        </td>
                        <td className="py-3 px-3 text-slate-400">
                          {record.difficulty}
                        </td>
                        <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                          {record.date}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
