import React from 'react';
import { Database, Wifi, WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { DatabaseStatus } from '../types';

interface DbStatusBadgeProps {
  status: DatabaseStatus;
  isSyncing?: boolean;
  onSyncClick?: () => void;
}

export const DbStatusBadge: React.FC<DbStatusBadgeProps> = ({
  status,
  isSyncing = false,
  onSyncClick,
}) => {
  if (status === 'NOT_CONFIGURED') {
    return (
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-400 text-[11px] font-mono"
        title="Supabase URL/Key belum dikonfigurasi. Menggunakan penyimpanan Lokal."
      >
        <Database className="w-3.5 h-3.5 text-cyan-400" />
        <span>LOCAL CACHE</span>
      </div>
    );
  }

  if (status === 'ONLINE') {
    return (
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono shadow-[0_0_10px_rgba(16,185,129,0.2)]"
        title="Terhubung ke Supabase Cloud Database secara real-time"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <Wifi className="w-3.5 h-3.5 text-emerald-400" />
        <span>CLOUD ONLINE</span>
      </div>
    );
  }

  if (status === 'SYNCING' || isSyncing) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono animate-pulse">
        <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
        <span>SYNCING DATA...</span>
      </div>
    );
  }

  return (
    <button
      onClick={onSyncClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60 transition-all text-[11px] font-mono cursor-pointer active:scale-95"
      title="Sedang Offline. Klik untuk mencoba menyinkronkan data lokal ke Cloud Database."
    >
      <WifiOff className="w-3.5 h-3.5 text-amber-400" />
      <span>OFFLINE MODE</span>
      <RefreshCw className="w-3 h-3 text-amber-400 ml-0.5" />
    </button>
  );
};
