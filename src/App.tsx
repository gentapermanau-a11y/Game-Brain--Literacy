/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ScreenState, Boss, Category, Major, Difficulty, PlayerProfile, Question, BattleHistoryRecord, DatabaseStatus } from './types';
import { BOSS_LIST } from './data/bosses';
import { getRandomQuestions } from './data/questions';
import { soundManager } from './utils/audio';
import {
  getOrCreatePlayerId,
  createDefaultProfile,
  getLocalCachedProfile,
  saveLocalCachedProfile,
  loadPlayerData,
  updatePlayerData,
  saveBattleHistory,
  resetPlayerData,
  syncLocalData,
} from './services/db';

import { ParticleBackground } from './components/ParticleBackground';
import { Header } from './components/Header';
import { LobbyScreen } from './components/LobbyScreen';
import { BossSelectModal } from './components/BossSelectModal';
import { MaterialSelectModal } from './components/MaterialSelectModal';
import { DifficultyModal } from './components/DifficultyModal';
import { ScoreboardModal } from './components/ScoreboardModal';
import { SettingsModal } from './components/SettingsModal';
import { BattleScreen } from './components/BattleScreen';
import { ResultScreen } from './components/ResultScreen';
import { PlayerNameModal } from './components/PlayerNameModal';
import { Database, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function App() {
  const playerId = getOrCreatePlayerId();

  // Player state & db status
  const [profile, setProfile] = useState<PlayerProfile>(() => getLocalCachedProfile());
  const [dbStatus, setDbStatus] = useState<DatabaseStatus>('SYNCING');
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  const [showSyncToast, setShowSyncToast] = useState<boolean>(false);

  const [currentScreen, setCurrentScreen] = useState<ScreenState>('LOBBY');

  // Battle configuration
  const [selectedBoss, setSelectedBoss] = useState<Boss>(BOSS_LIST[0]);
  const [selectedMajor, setSelectedMajor] = useState<Major>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('MEDIUM');
  const [useLevelScaling, setUseLevelScaling] = useState<boolean>(true);

  // Active battle questions & results
  const [battleQuestions, setBattleQuestions] = useState<Question[]>([]);
  const [lastBattleResult, setLastBattleResult] = useState<{
    victory: boolean;
    finalScore: number;
    correctCount: number;
    wrongCount: number;
    damageDealt: number;
    damageReceived: number;
    totalTimeSpent: number;
    maxCombo: number;
  } | null>(null);

  const [isNewBossUnlocked, setIsNewBossUnlocked] = useState(false);

  // Load player data from Cloud Database on mount
  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const { profile: loadedProfile, status } = await loadPlayerData();
        if (isMounted) {
          setProfile(loadedProfile);
          setDbStatus(status);
          setIsLoadingData(false);

          // Prompt name modal if player has default or no name
          if (!loadedProfile.name || loadedProfile.name === 'Player' || loadedProfile.name.trim() === '') {
            setShowNameModal(true);
          }
        }
      } catch {
        if (isMounted) {
          setDbStatus('OFFLINE');
          setIsLoadingData(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize sound and background music preferences
  useEffect(() => {
    soundManager.setSoundEnabled(profile.soundEnabled);
    soundManager.setMusicEnabled(profile.musicEnabled);
  }, [profile.soundEnabled, profile.musicEnabled]);

  // Handle BGM transitions based on current screen
  useEffect(() => {
    if (!profile.musicEnabled) {
      soundManager.pauseBgm();
      return;
    }

    if (currentScreen === 'BATTLE') {
      soundManager.playBgm('battle');
    } else if (currentScreen === 'RESULT') {
      soundManager.pauseBgm();
    } else {
      soundManager.playBgm('lobby');
    }
  }, [currentScreen, profile.musicEnabled]);

  // Persist local cache on every profile state update
  useEffect(() => {
    saveLocalCachedProfile(profile);
  }, [profile]);

  // Handle first user interaction for Web Audio Context
  useEffect(() => {
    const handleFirstInteraction = () => {
      soundManager.init();
      if (profile.musicEnabled) {
        if (currentScreen === 'BATTLE') {
          soundManager.playBgm('battle');
        } else if (currentScreen !== 'RESULT') {
          soundManager.playBgm('lobby');
        }
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [profile.musicEnabled, currentScreen]);

  // Initial Player Name save handler
  const handleSaveInitialName = async (name: string) => {
    const updated = {
      ...profile,
      name,
    };
    setProfile(updated);
    setShowNameModal(false);
    await updatePlayerData(updated);
  };

  // Update Player Profile Name
  const handleUpdateName = async (newName: string) => {
    const updated = {
      ...profile,
      name: newName,
    };
    setProfile(updated);
    await updatePlayerData(updated);
  };

  // Toggle Sound FX
  const handleToggleSound = async () => {
    const nextState = !profile.soundEnabled;
    soundManager.setSoundEnabled(nextState);
    const updated = {
      ...profile,
      soundEnabled: nextState,
    };
    setProfile(updated);
    await updatePlayerData(updated);
  };

  // Toggle Background Music
  const handleToggleMusic = async () => {
    const nextState = !profile.musicEnabled;
    soundManager.setMusicEnabled(nextState);
    const updated = {
      ...profile,
      musicEnabled: nextState,
    };
    setProfile(updated);
    await updatePlayerData(updated);
  };

  // Sync data manually handler
  const handleSyncData = async () => {
    setDbStatus('SYNCING');
    const synced = await syncLocalData();
    const { profile: refreshed, status } = await loadPlayerData();
    setProfile(refreshed);
    setDbStatus(status);

    if (synced || status === 'ONLINE') {
      setShowSyncToast(true);
      setTimeout(() => setShowSyncToast(false), 3000);
    }
  };

  // Reset Data Progress
  const handleResetData = async () => {
    await resetPlayerData(profile.id);
    const fresh = createDefaultProfile(playerId, '');
    setProfile(fresh);
    setSelectedBoss(BOSS_LIST[0]);
    setSelectedMajor('ALL');
    setSelectedCategory('ALL');
    setSelectedDifficulty('MEDIUM');
    setUseLevelScaling(true);
    setCurrentScreen('LOBBY');
    setShowNameModal(true);
  };

  // Start Battle Handler
  const handleStartBattle = () => {
    const questions = getRandomQuestions(
      selectedCategory,
      10,
      selectedBoss.level,
      selectedDifficulty,
      selectedMajor
    );
    setBattleQuestions(questions);
    setIsNewBossUnlocked(false);
    setCurrentScreen('BATTLE');
  };

  // Battle End Handler
  const handleBattleEnd = useCallback(
    async (result: {
      victory: boolean;
      finalScore: number;
      correctCount: number;
      wrongCount: number;
      damageDealt: number;
      damageReceived: number;
      totalTimeSpent: number;
      maxCombo: number;
    }) => {
      setLastBattleResult(result);

      const now = new Date();
      const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      const newRecord: BattleHistoryRecord = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        bossId: selectedBoss.id,
        bossName: selectedBoss.name,
        bossLevel: selectedBoss.level,
        score: result.finalScore,
        result: result.victory ? 'VICTORY' : 'DEFEAT',
        correctAnswers: result.correctCount,
        wrongAnswers: result.wrongCount,
        accuracy: Math.round((result.correctCount / 10) * 100),
        damageDealt: result.damageDealt,
        damageReceived: result.damageReceived,
        timeSpentSeconds: result.totalTimeSpent,
        maxCombo: result.maxCombo,
        difficulty: selectedDifficulty,
        material: selectedCategory,
        date: formattedDate,
      };

      let newlyUnlocked = false;

      // Calculate updated profile state
      const updatedTotalScore = profile.totalScore + result.finalScore;
      const updatedHighScore = Math.max(profile.highScore, result.finalScore);
      const updatedWins = result.victory ? profile.totalWins + 1 : profile.totalWins;
      const updatedLosses = !result.victory ? profile.totalLosses + 1 : profile.totalLosses;
      const updatedCorrect = (profile.totalCorrectAnswers || 0) + result.correctCount;
      const updatedWrong = (profile.totalWrongAnswers || 0) + result.wrongCount;
      const updatedBattles = (profile.totalBattles || 0) + 1;

      const updatedDefeated = [...profile.defeatedBosses];
      if (result.victory && !updatedDefeated.includes(selectedBoss.id)) {
        updatedDefeated.push(selectedBoss.id);
      }

      let nextUnlocked = profile.unlockedBosses;
      if (result.victory && selectedBoss.level >= profile.unlockedBosses && profile.unlockedBosses < 25) {
        nextUnlocked = Math.min(25, selectedBoss.level + 1);
        newlyUnlocked = true;
      }

      const updatedLevel = Math.max(profile.level, Math.floor(updatedWins / 2) + 1);
      const highestLvl = Math.max(profile.highestBossLevel, result.victory ? selectedBoss.level : profile.highestBossLevel);

      const updatedProfile: PlayerProfile = {
        ...profile,
        level: updatedLevel,
        totalScore: updatedTotalScore,
        highScore: updatedHighScore,
        totalWins: updatedWins,
        totalLosses: updatedLosses,
        totalCorrectAnswers: updatedCorrect,
        totalWrongAnswers: updatedWrong,
        totalBattles: updatedBattles,
        defeatedBosses: updatedDefeated,
        unlockedBosses: nextUnlocked,
        highestBossLevel: highestLvl,
        battleHistory: [newRecord, ...profile.battleHistory],
      };

      setProfile(updatedProfile);
      setIsNewBossUnlocked(newlyUnlocked);
      setCurrentScreen('RESULT');

      // Async save to cloud database
      await saveBattleHistory(newRecord, updatedProfile);
    },
    [selectedBoss, selectedDifficulty, selectedCategory, profile]
  );

  // Initial Data Loading Screen
  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <ParticleBackground />
        <div className="relative z-10 glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 text-center max-w-md w-full shadow-[0_0_50px_rgba(6,182,212,0.2)]">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
            <RefreshCw className="w-8 h-8 animate-spin" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-rpg tracking-wider text-white mb-2">
            LOADING PLAYER DATA...
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Menghubungkan ke Cloud Storage & Memuat Profil Pemain...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden flex flex-col">
      {/* Dynamic Animated Ambient Background */}
      <ParticleBackground />

      {/* Sync Notification Toast */}
      {showSyncToast && (
        <div className="fixed top-16 right-4 z-50 px-4 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-xs font-mono font-bold shadow-2xl flex items-center gap-2.5 animate-slide-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>DATA SYNCED TO CLOUD DATABASE</span>
        </div>
      )}

      {/* First-time Player Registration Name Modal */}
      {showNameModal && (
        <PlayerNameModal onSaveName={handleSaveInitialName} />
      )}

      {/* Top Bar Header */}
      <Header
        profile={profile}
        currentScreen={currentScreen}
        dbStatus={dbStatus}
        onNavigate={setCurrentScreen}
        onToggleSound={handleToggleSound}
        onToggleMusic={handleToggleMusic}
        onSyncClick={handleSyncData}
      />

      {/* Main Screen Router */}
      <main className="flex-1 w-full relative z-10 flex flex-col justify-center py-2 sm:py-6">
        {currentScreen === 'LOBBY' && (
          <LobbyScreen
            profile={profile}
            selectedBoss={selectedBoss}
            selectedCategory={selectedCategory}
            selectedMajor={selectedMajor}
            selectedDifficulty={selectedDifficulty}
            onNavigate={setCurrentScreen}
            onStartBattle={handleStartBattle}
            onUpdateName={handleUpdateName}
          />
        )}

        {currentScreen === 'BOSS_SELECT' && (
          <BossSelectModal
            profile={profile}
            selectedBoss={selectedBoss}
            onSelectBoss={setSelectedBoss}
            onBack={() => setCurrentScreen('LOBBY')}
            onStartBattle={handleStartBattle}
          />
        )}

        {currentScreen === 'MATERIAL_SELECT' && (
          <MaterialSelectModal
            selectedCategory={selectedCategory}
            selectedMajor={selectedMajor}
            onSelectCategory={setSelectedCategory}
            onSelectMajor={setSelectedMajor}
            onBack={() => setCurrentScreen('LOBBY')}
            onStartBattle={handleStartBattle}
          />
        )}

        {currentScreen === 'DIFFICULTY_SELECT' && (
          <DifficultyModal
            profile={profile}
            selectedDifficulty={selectedDifficulty}
            useLevelScaling={useLevelScaling}
            onSelectDifficulty={setSelectedDifficulty}
            onToggleLevelScaling={setUseLevelScaling}
            onBack={() => setCurrentScreen('LOBBY')}
            onStartBattle={handleStartBattle}
          />
        )}

        {currentScreen === 'SCOREBOARD' && (
          <ScoreboardModal
            profile={profile}
            onBack={() => setCurrentScreen('LOBBY')}
          />
        )}

        {currentScreen === 'SETTINGS' && (
          <SettingsModal
            profile={profile}
            onUpdateName={handleUpdateName}
            onToggleSound={handleToggleSound}
            onToggleMusic={handleToggleMusic}
            onResetData={handleResetData}
            onBack={() => setCurrentScreen('LOBBY')}
          />
        )}

        {currentScreen === 'BATTLE' && (
          <BattleScreen
            boss={selectedBoss}
            questions={battleQuestions}
            difficulty={selectedDifficulty}
            useLevelScaling={useLevelScaling}
            profile={profile}
            onBattleEnd={handleBattleEnd}
            onExitBattle={() => setCurrentScreen('LOBBY')}
          />
        )}

        {currentScreen === 'RESULT' && lastBattleResult && (
          <ResultScreen
            boss={selectedBoss}
            result={lastBattleResult}
            difficulty={selectedDifficulty}
            isNewBossUnlocked={isNewBossUnlocked}
            onPlayAgain={handleStartBattle}
            onBossSelect={() => setCurrentScreen('BOSS_SELECT')}
            onMainMenu={() => setCurrentScreen('LOBBY')}
          />
        )}
      </main>
    </div>
  );
}
