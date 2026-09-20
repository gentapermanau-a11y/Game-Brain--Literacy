export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type Major =
  | 'ALL'
  | 'RPL'
  | 'TKJ'
  | 'DKV'
  | 'ANIMASI'
  | 'AKL'
  | 'MPLB'
  | 'UMUM';

export type Category =
  | 'ALL'
  | 'RPL'
  | 'PROGRAMMING'
  | 'WEB_DEV'
  | 'DATABASE'
  | 'NETWORK'
  | 'COMPUTER_SYSTEM'
  | 'ALGORITHM'
  | 'HTML_CSS'
  | 'JAVASCRIPT'
  | 'PHP'
  | 'GIT_GITHUB'
  | 'UI_UX'
  | 'MULTIMEDIA'
  | 'GRAPHIC_DESIGN'
  | 'BLENDER_3D'
  | 'GAME_DEV'
  | 'AI'
  | 'CYBER_SECURITY'
  | 'MATH_SMK'
  | 'ENGLISH'
  | 'INDONESIAN'
  | 'PPKN'
  | 'HISTORY'
  | 'ACCOUNTING_AKL'
  | 'OFFICE_MPLB'
  | 'GENERAL_KNOWLEDGE'
  | 'TECHNOLOGY'
  | 'SCHOOL'
  | 'GENERAL'
  | 'COMPUTER';

export interface Question {
  id: string | number;
  category: Category;
  categoryName: string;
  major?: Major;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  codeSnippet?: string;
  options: string[];
  answer: number; // 0, 1, 2, 3
  correctIndex?: number; // legacy alias
  explanation: string;
}

export interface Boss {
  id: number;
  level: number;
  name: string;
  title: string;
  description: string;
  hp: number;
  attackDamage: number;
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Extreme' | 'Overlord';
  visualTheme: string;
  auraColor: string;
  specialEffect: string;
  isCute?: boolean;
}

export interface BattleHistoryRecord {
  id: string;
  date: string;
  bossId: number;
  bossName: string;
  bossLevel: number;
  score: number;
  result: 'VICTORY' | 'DEFEAT';
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
  damageDealt: number;
  damageReceived: number;
  timeSpentSeconds: number;
  maxCombo: number;
  difficulty: Difficulty;
  material: string;
  major?: Major;
}

export interface PlayerProfile {
  id: string; // unique playerId stored in localStorage
  name: string;
  level: number;
  totalScore: number;
  highScore: number;
  totalWins: number;
  totalLosses: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  totalBattles: number;
  defeatedBosses: number[];
  unlockedBosses: number; // e.g. 1 to 25
  highestBossLevel: number;
  battleHistory: BattleHistoryRecord[];
  soundEnabled: boolean;
  musicEnabled: boolean;
  useLevelScaling: boolean;
  selectedDifficulty: Difficulty;
  selectedMaterial: Category;
  selectedMajor?: Major;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeaderboardEntry {
  playerId: string;
  playerName: string;
  highScore: number;
  totalScore: number;
  totalWins: number;
  highestBossLevel: number;
  defeatedBossesCount: number;
  updatedAt?: string;
}

export type DatabaseStatus = 'ONLINE' | 'OFFLINE' | 'SYNCING' | 'NOT_CONFIGURED';

export type ScreenState = 
  | 'LOBBY'
  | 'BOSS_SELECT'
  | 'MATERIAL_SELECT'
  | 'DIFFICULTY_SELECT'
  | 'SCOREBOARD'
  | 'SETTINGS'
  | 'BATTLE'
  | 'RESULT';
