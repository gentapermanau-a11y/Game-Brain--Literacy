import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Sparkles,
  CodeXml,
  Cpu,
  Database,
  Layout,
  Zap,
  HardDrive,
  Network,
  Bot,
  GraduationCap,
  Globe,
  CheckCircle2,
  Server,
  GitBranch,
  Binary,
  Layers,
  ShieldAlert,
  Palette,
  Clapperboard,
  Film,
  Gamepad2,
  Calculator,
  Briefcase,
  Variable,
  Languages,
  BookOpen,
  ShieldCheck,
  Landmark,
  Search,
  Filter,
} from 'lucide-react';
import { Category, Major } from '../types';
import { CATEGORIES_META, MAJORS_META, QUESTION_BANK } from '../data/questions';
import { soundManager } from '../utils/audio';

interface MaterialSelectModalProps {
  selectedCategory: Category;
  selectedMajor?: Major;
  onSelectCategory: (category: Category) => void;
  onSelectMajor?: (major: Major) => void;
  onBack: () => void;
  onStartBattle: () => void;
}

export const MaterialSelectModal: React.FC<MaterialSelectModalProps> = ({
  selectedCategory,
  selectedMajor = 'ALL',
  onSelectCategory,
  onSelectMajor,
  onBack,
  onStartBattle,
}) => {
  const [activeMajor, setActiveMajor] = useState<Major>(selectedMajor);
  const [searchQuery, setSearchQuery] = useState('');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-pink-400" />;
      case 'CodeXml': return <CodeXml className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-amber-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-blue-400" />;
      case 'Network': return <Network className="w-5 h-5 text-teal-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-indigo-400" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-rose-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-sky-400" />;
      case 'Server': return <Server className="w-5 h-5 text-indigo-400" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-rose-400" />;
      case 'Binary': return <Binary className="w-5 h-5 text-purple-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-pink-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-fuchsia-400" />;
      case 'Clapperboard': return <Clapperboard className="w-5 h-5 text-orange-400" />;
      case 'Film': return <Film className="w-5 h-5 text-amber-400" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-lime-400" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-emerald-400" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-sky-400" />;
      case 'Variable': return <Variable className="w-5 h-5 text-yellow-400" />;
      case 'Languages': return <Languages className="w-5 h-5 text-indigo-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-rose-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-teal-400" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getQuestionCount = (catId: Category) => {
    if (catId === 'ALL') return QUESTION_BANK.length;
    return QUESTION_BANK.filter((q) => q.category === catId).length;
  };

  const filteredCategories = useMemo(() => {
    return CATEGORIES_META.filter((cat) => {
      // 1. Filter by major tab
      const matchMajor =
        activeMajor === 'ALL' ||
        cat.id === 'ALL' ||
        cat.major === activeMajor ||
        (activeMajor === 'UMUM' && cat.major === 'UMUM');

      // 2. Filter by search query
      const matchQuery =
        searchQuery.trim() === '' ||
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.desc.toLowerCase().includes(searchQuery.toLowerCase());

      return matchMajor && matchQuery;
    });
  }, [activeMajor, searchQuery]);

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-4 sm:py-6 flex flex-col">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <button
          onClick={() => {
            soundManager.playButtonClick();
            onBack();
          }}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all active:scale-95 text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold uppercase tracking-wider mb-1">
            <Filter className="w-3 h-3" />
            <span>KURIKULUM & MATERI PEMBELAJARAN SMK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-rpg tracking-wider text-white">
            PILIH JURUSAN & MATERI SOAL
          </h2>
          <p className="text-xs text-slate-400">
            Pilih jurusan atau topik materi spesifik untuk 10 ronde pertanyaan pertempuran
          </p>
        </div>

        <div className="w-24 hidden sm:block" />
      </div>

      {/* 1. JURUSAN FILTER TABS */}
      <div className="mb-5 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {MAJORS_META.map((maj) => {
            const isActive = activeMajor === maj.id;
            return (
              <button
                key={maj.id}
                onClick={() => {
                  soundManager.playButtonClick();
                  setActiveMajor(maj.id);
                  if (onSelectMajor) onSelectMajor(maj.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-rpg font-bold text-xs transition-all duration-200 border cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{maj.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SEARCH & TOPIC SUMMARY BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari materi (cth: Database, Git, IP)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span>Menampilkan: <strong className="text-cyan-400 font-rpg">{filteredCategories.length}</strong> Kategori Materi</span>
        </div>
      </div>

      {/* 3. CATEGORIES CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
        {filteredCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = getQuestionCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playButtonClick();
                onSelectCategory(cat.id);
              }}
              className={`group relative p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between overflow-hidden active:scale-[0.98] cursor-pointer ${
                isSelected
                  ? 'glass-panel-glow border-cyan-400 ring-2 ring-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.25)] bg-slate-900/95'
                  : 'glass-panel border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              {/* Background gradient hint */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/5 blur-2xl rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                  {getIcon(cat.icon)}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-bold font-rpg text-slate-400">
                    {cat.major}
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold shadow-md">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Dipilih</span>
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white font-rpg tracking-wide group-hover:text-cyan-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                  {cat.desc}
                </p>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Bank Soal:</span>
                <span className="font-semibold text-slate-200">{count} Pertanyaan</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. BOTTOM ACTION BUTTONS */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => {
            soundManager.playButtonClick();
            onBack();
          }}
          className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
        >
          Simpan & Kembali
        </button>

        <button
          onClick={() => {
            soundManager.playButtonClick();
            onStartBattle();
          }}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-rpg font-bold text-base tracking-wider shadow-lg shadow-cyan-500/25 transition-all active:scale-95 cursor-pointer"
        >
          MULAI BATTLE SEKARANG!
        </button>
      </div>
    </div>
  );
};
