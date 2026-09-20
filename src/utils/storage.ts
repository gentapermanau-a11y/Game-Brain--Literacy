import { PlayerProfile, BattleHistoryRecord, Difficulty, Category } from '../types';

const STORAGE_KEY = 'quiz_battle_boss_rush_data_v1';

export const DEFAULT_PROFILE: PlayerProfile = {
  id: '',
  name: 'Player',
  level: 1,
  totalScore: 0,
  highScore: 0,
  totalWins: 0,
  totalLosses: 0,
  totalCorrectAnswers: 0,
  totalWrongAnswers: 0,
  totalBattles: 0,
  defeatedBosses: [],
  unlockedBosses: 1, // Boss Level 1 unlocked initially
  highestBossLevel: 1,
  battleHistory: [],
  soundEnabled: true,
  musicEnabled: true,
  useLevelScaling: true,
  selectedDifficulty: 'MEDIUM',
  selectedMaterial: 'ALL',
};

export function loadGameProfile(): PlayerProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed,
      defeatedBosses: Array.isArray(parsed.defeatedBosses) ? parsed.defeatedBosses : [],
      battleHistory: Array.isArray(parsed.battleHistory) ? parsed.battleHistory : [],
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveGameProfile(profile: PlayerProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Ignore storage quota errors
  }
}

export function resetGameProfile(): PlayerProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
  return { ...DEFAULT_PROFILE };
}
