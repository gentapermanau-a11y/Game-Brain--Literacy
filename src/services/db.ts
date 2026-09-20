import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { PlayerProfile, BattleHistoryRecord, LeaderboardEntry, DatabaseStatus } from '../types';

const PLAYER_ID_STORAGE_KEY = 'quizBattlePlayerId';
const CACHE_STORAGE_KEY = 'quiz_battle_boss_rush_data_v1';
const PENDING_SYNC_KEY = 'quiz_battle_pending_sync';

/**
 * Gets or creates a unique persistent Player ID for this browser device.
 */
export function getOrCreatePlayerId(): string {
  if (typeof window === 'undefined') return 'temp_player_id';

  try {
    let playerId = localStorage.getItem(PLAYER_ID_STORAGE_KEY);
    if (!playerId || playerId.trim() === '') {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        playerId = crypto.randomUUID();
      } else {
        playerId = 'player_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      }
      localStorage.setItem(PLAYER_ID_STORAGE_KEY, playerId);
    }
    return playerId;
  } catch {
    return 'fallback_player_' + Date.now();
  }
}

/**
 * Default initial player profile.
 */
export function createDefaultProfile(playerId: string, name: string = ''): PlayerProfile {
  return {
    id: playerId,
    name: name,
    level: 1,
    totalScore: 0,
    highScore: 0,
    totalWins: 0,
    totalLosses: 0,
    totalCorrectAnswers: 0,
    totalWrongAnswers: 0,
    totalBattles: 0,
    defeatedBosses: [],
    unlockedBosses: 1,
    highestBossLevel: 1,
    battleHistory: [],
    soundEnabled: true,
    musicEnabled: true,
    useLevelScaling: true,
    selectedDifficulty: 'MEDIUM',
    selectedMaterial: 'ALL',
    selectedMajor: 'ALL',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Loads profile from local storage cache.
 */
export function getLocalCachedProfile(): PlayerProfile {
  const playerId = getOrCreatePlayerId();
  if (typeof window === 'undefined') return createDefaultProfile(playerId);

  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) return createDefaultProfile(playerId);
    const parsed = JSON.parse(raw);

    return {
      ...createDefaultProfile(playerId),
      ...parsed,
      id: playerId, // Ensure ID matches device key
      defeatedBosses: Array.isArray(parsed.defeatedBosses) ? parsed.defeatedBosses : [],
      battleHistory: Array.isArray(parsed.battleHistory) ? parsed.battleHistory : [],
    };
  } catch {
    return createDefaultProfile(playerId);
  }
}

/**
 * Saves profile to local storage cache.
 */
export function saveLocalCachedProfile(profile: PlayerProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Storage quota fallback
  }
}

/**
 * Transforms client PlayerProfile to Supabase DB record format.
 */
function mapProfileToDbPayload(profile: PlayerProfile) {
  return {
    player_id: profile.id,
    player_name: profile.name || 'Anonymous Fighter',
    score: profile.totalScore,
    high_score: profile.highScore,
    total_score: profile.totalScore,
    total_wins: profile.totalWins,
    total_losses: profile.totalLosses,
    highest_boss_level: profile.highestBossLevel,
    defeated_bosses: profile.defeatedBosses,
    unlocked_bosses: profile.unlockedBosses,
    total_correct_answers: profile.totalCorrectAnswers,
    total_wrong_answers: profile.totalWrongAnswers,
    total_battles: profile.totalBattles,
    sound_enabled: profile.soundEnabled,
    music_enabled: profile.musicEnabled,
    selected_difficulty: profile.selectedDifficulty,
    selected_material: profile.selectedMaterial,
    selected_major: profile.selectedMajor || 'ALL',
    updated_at: new Date().toISOString(),
  };
}

/**
 * Transforms Supabase DB record format to client PlayerProfile.
 */
function mapDbRecordToProfile(data: Record<string, any>, existingLocalHistory: BattleHistoryRecord[]): PlayerProfile {
  return {
    id: data.player_id,
    name: data.player_name || 'Player',
    level: Math.max(1, Math.floor((data.total_wins || 0) / 3) + 1),
    totalScore: Number(data.total_score || data.score || 0),
    highScore: Number(data.high_score || 0),
    totalWins: Number(data.total_wins || 0),
    totalLosses: Number(data.total_losses || 0),
    totalCorrectAnswers: Number(data.total_correct_answers || 0),
    totalWrongAnswers: Number(data.total_wrong_answers || 0),
    totalBattles: Number(data.total_battles || 0),
    defeatedBosses: Array.isArray(data.defeated_bosses) ? data.defeated_bosses : [],
    unlockedBosses: Number(data.unlocked_bosses || 1),
    highestBossLevel: Number(data.highest_boss_level || 1),
    battleHistory: existingLocalHistory,
    soundEnabled: typeof data.sound_enabled === 'boolean' ? data.sound_enabled : true,
    musicEnabled: typeof data.music_enabled === 'boolean' ? data.music_enabled : true,
    useLevelScaling: true,
    selectedDifficulty: data.selected_difficulty || 'MEDIUM',
    selectedMaterial: data.selected_material || 'ALL',
    selectedMajor: data.selected_major || 'ALL',
    createdAt: data.created_at || new Date().toISOString(),
    updatedAt: data.updated_at || new Date().toISOString(),
  };
}

/**
 * Loads player data from Supabase Cloud DB with offline fallback.
 */
export async function loadPlayerData(): Promise<{ profile: PlayerProfile; status: DatabaseStatus }> {
  const playerId = getOrCreatePlayerId();
  const cachedProfile = getLocalCachedProfile();

  if (!isSupabaseConfigured || !supabase) {
    return { profile: cachedProfile, status: 'NOT_CONFIGURED' };
  }

  try {
    // 1. Query Supabase players table
    const { data: dbPlayer, error: fetchError } = await supabase
      .from('players')
      .select('*')
      .eq('player_id', playerId)
      .maybeSingle();

    if (fetchError) {
      console.warn('Supabase fetch player error:', fetchError.message);
      return { profile: cachedProfile, status: 'OFFLINE' };
    }

    // 2. Fetch battle history records
    let remoteHistory: BattleHistoryRecord[] = cachedProfile.battleHistory;
    try {
      const { data: historyRows } = await supabase
        .from('battle_history')
        .select('*')
        .eq('player_id', playerId)
        .order('played_at', { ascending: false })
        .limit(30);

      if (historyRows && historyRows.length > 0) {
        remoteHistory = historyRows.map((row) => ({
          id: row.id,
          date: new Date(row.played_at).toLocaleDateString() + ' ' + new Date(row.played_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          bossId: row.boss_level,
          bossName: row.boss_name,
          bossLevel: row.boss_level,
          score: row.score,
          result: row.result === 'VICTORY' ? 'VICTORY' : 'DEFEAT',
          correctAnswers: row.correct_answers || 0,
          wrongAnswers: row.wrong_answers || 0,
          accuracy: row.accuracy || 0,
          damageDealt: row.damage_dealt || 0,
          damageReceived: row.damage_received || 0,
          timeSpentSeconds: 0,
          maxCombo: 0,
          difficulty: row.difficulty || 'MEDIUM',
          material: row.material || 'ALL',
        }));
      }
    } catch {
      // Continue with cached history
    }

    if (dbPlayer) {
      // Profile exists in cloud database
      const mergedProfile = mapDbRecordToProfile(dbPlayer, remoteHistory);

      // Save to local cache
      saveLocalCachedProfile(mergedProfile);

      return { profile: mergedProfile, status: 'ONLINE' };
    } else {
      // Player does not exist in cloud database yet
      if (cachedProfile.name && cachedProfile.name.trim() !== '') {
        // Upload initial local profile to cloud
        await createPlayerInCloud(cachedProfile);
      }
      return { profile: cachedProfile, status: 'ONLINE' };
    }
  } catch (error) {
    console.warn('Database connection failed, switching to offline mode:', error);
    return { profile: cachedProfile, status: 'OFFLINE' };
  }
}

/**
 * Creates player entry in Supabase Cloud DB.
 */
export async function createPlayerInCloud(profile: PlayerProfile): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const payload = mapProfileToDbPayload(profile);
    const { error } = await supabase.from('players').upsert(payload, { onConflict: 'player_id' });
    if (error) {
      console.warn('Failed to create player in cloud:', error.message);
      markPendingSync();
      return false;
    }
    clearPendingSync();
    return true;
  } catch (error) {
    console.warn('Error creating player in cloud:', error);
    markPendingSync();
    return false;
  }
}

/**
 * Updates player entry in Supabase Cloud DB.
 */
export async function updatePlayerData(profile: PlayerProfile): Promise<boolean> {
  // Always update local storage first (instant responsiveness)
  saveLocalCachedProfile(profile);

  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const payload = mapProfileToDbPayload(profile);
    const { error } = await supabase
      .from('players')
      .upsert(payload, { onConflict: 'player_id' });

    if (error) {
      console.warn('Failed to sync player profile to cloud:', error.message);
      markPendingSync();
      return false;
    }
    clearPendingSync();
    return true;
  } catch (error) {
    console.warn('Error updating player in cloud:', error);
    markPendingSync();
    return false;
  }
}

/**
 * Saves a battle result to both local cache and Cloud DB.
 */
export async function saveBattleHistory(
  record: BattleHistoryRecord,
  updatedProfile: PlayerProfile
): Promise<boolean> {
  // 1. Update local cache immediately
  saveLocalCachedProfile(updatedProfile);

  if (!isSupabaseConfigured || !supabase) return false;

  try {
    // 2. Update player profile in cloud
    await updatePlayerData(updatedProfile);

    // 3. Insert battle history record in cloud
    const historyPayload = {
      player_id: updatedProfile.id,
      boss_name: record.bossName,
      boss_level: record.bossLevel,
      material: record.material,
      difficulty: record.difficulty,
      score: record.score,
      correct_answers: record.correctAnswers,
      wrong_answers: record.wrongAnswers,
      accuracy: record.accuracy,
      damage_dealt: record.damageDealt,
      damage_received: record.damageReceived,
      result: record.result,
      played_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('battle_history').insert(historyPayload);
    if (error) {
      console.warn('Failed to insert battle history to cloud:', error.message);
      markPendingSync();
      return false;
    }
    return true;
  } catch (error) {
    console.warn('Error saving battle history to cloud:', error);
    markPendingSync();
    return false;
  }
}

/**
 * Fetches online global leaderboard from Supabase.
 */
export async function fetchOnlineLeaderboard(): Promise<{ entries: LeaderboardEntry[]; status: DatabaseStatus }> {
  if (!isSupabaseConfigured || !supabase) {
    return { entries: [], status: 'NOT_CONFIGURED' };
  }

  try {
    const { data, error } = await supabase
      .from('players')
      .select('player_id, player_name, score, high_score, total_score, total_wins, highest_boss_level, defeated_bosses, updated_at')
      .order('high_score', { ascending: false })
      .limit(50);

    if (error) {
      console.warn('Error fetching leaderboard:', error.message);
      return { entries: [], status: 'OFFLINE' };
    }

    const entries: LeaderboardEntry[] = (data || []).map((row) => ({
      playerId: row.player_id,
      playerName: row.player_name || 'Anonymous Fighter',
      highScore: Number(row.high_score || 0),
      totalScore: Number(row.total_score || row.score || 0),
      totalWins: Number(row.total_wins || 0),
      highestBossLevel: Number(row.highest_boss_level || 1),
      defeatedBossesCount: Array.isArray(row.defeated_bosses) ? row.defeated_bosses.length : 0,
      updatedAt: row.updated_at,
    }));

    return { entries, status: 'ONLINE' };
  } catch (error) {
    console.warn('Failed to connect to online leaderboard:', error);
    return { entries: [], status: 'OFFLINE' };
  }
}

/**
 * Resets/deletes player progress from Cloud DB and local cache.
 */
export async function resetPlayerData(playerId: string): Promise<boolean> {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(CACHE_STORAGE_KEY);
      localStorage.removeItem(PENDING_SYNC_KEY);
    } catch {
      // Ignore
    }
  }

  if (!isSupabaseConfigured || !supabase) return true;

  try {
    await supabase.from('battle_history').delete().eq('player_id', playerId);
    await supabase.from('players').delete().eq('player_id', playerId);
    return true;
  } catch (error) {
    console.warn('Error resetting player data in cloud:', error);
    return false;
  }
}

/**
 * Syncs any offline pending local changes to cloud when connection is restored.
 */
export async function syncLocalData(): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const cachedProfile = getLocalCachedProfile();
    if (cachedProfile && cachedProfile.name && cachedProfile.name.trim() !== '') {
      const success = await updatePlayerData(cachedProfile);
      if (success) {
        clearPendingSync();
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

function markPendingSync() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PENDING_SYNC_KEY, 'true');
  } catch {
    // Ignore
  }
}

function clearPendingSync() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PENDING_SYNC_KEY);
  } catch {
    // Ignore
  }
}
