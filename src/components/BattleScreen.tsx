import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Clock,
  Flame,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  ArrowRight,
  Swords,
  BookOpen,
  Code,
  Sparkles,
} from 'lucide-react';
import { Boss, Question, Difficulty, PlayerProfile } from '../types';
import { PixelBattleArena } from './PixelBattleArena';
import { soundManager } from '../utils/audio';

interface BattleScreenProps {
  boss: Boss;
  questions: Question[];
  difficulty: Difficulty;
  useLevelScaling: boolean;
  profile: PlayerProfile;
  onBattleEnd: (result: {
    victory: boolean;
    finalScore: number;
    correctCount: number;
    wrongCount: number;
    damageDealt: number;
    damageReceived: number;
    totalTimeSpent: number;
    maxCombo: number;
  }) => void;
  onExitBattle: () => void;
}

export const BattleScreen: React.FC<BattleScreenProps> = ({
  boss,
  questions,
  difficulty,
  useLevelScaling,
  profile,
  onBattleEnd,
}) => {
  // Battle state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerHp, setPlayerHp] = useState(100);
  const maxPlayerHp = 100;
  const [bossHp, setBossHp] = useState(boss.hp);
  const maxBossHp = boss.hp;

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [maxCombo, setMaxCombo] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [damageDealt, setDamageDealt] = useState(0);
  const [damageReceived, setDamageReceived] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  // Calculate Base Timer based on difficulty & level scaling
  const calculateQuestionTimer = useCallback(() => {
    let baseTime = 40;
    if (difficulty === 'EASY') baseTime = 45;
    if (difficulty === 'HARD') baseTime = 30;

    if (useLevelScaling) {
      const reduction = Math.min(15, boss.level - 1);
      baseTime = Math.max(18, baseTime - reduction);
    }
    return baseTime;
  }, [boss.level, difficulty, useLevelScaling]);

  const maxTimer = calculateQuestionTimer();
  const [timer, setTimer] = useState(maxTimer);

  // Combat status animation flags
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [isBossAttacking, setIsBossAttacking] = useState(false);
  const [isBossHit, setIsBossHit] = useState(false);
  const [isPlayerHit, setIsPlayerHit] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [damageNumber, setDamageNumber] = useState<{
    target: 'boss' | 'player';
    amount: number;
    text: string;
    isCrit?: boolean;
  } | null>(null);

  // Round resolution state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answeredState, setAnsweredState] = useState<'idle' | 'correct' | 'wrong' | 'timeout'>('idle');
  const [bannerText, setBannerText] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showSurrenderModal, setShowSurrenderModal] = useState(false);

  // Timer interval ref
  const timerRef = useRef<number | null>(null);
  const isAnsweringDisabled = answeredState !== 'idle';

  const currentQuestion: Question = questions[currentQuestionIndex] || questions[0];
  const correctOptionIndex = currentQuestion.answer ?? currentQuestion.correctIndex ?? 0;
  const correctOptionText = currentQuestion.options[correctOptionIndex] || '';

  // Stop timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Calculate damage numbers based on difficulty and boss
  const calculatePlayerDamage = useCallback(() => {
    let base = 25;
    if (difficulty === 'EASY') base = 32;
    if (difficulty === 'HARD') base = 20;

    // Bonus based on question difficulty
    if (currentQuestion.difficulty === 'hard') base += 8;
    else if (currentQuestion.difficulty === 'medium') base += 4;

    // Fast answer bonus
    const speedBonus = timer > maxTimer * 0.6 ? 5 : 0;
    // Combo scaling
    const comboBonus = Math.floor((combo - 1) * 3);

    return base + speedBonus + comboBonus;
  }, [currentQuestion.difficulty, difficulty, timer, maxTimer, combo]);

  const calculateBossDamage = useCallback(() => {
    let base = boss.attackDamage;
    if (difficulty === 'EASY') base = Math.max(8, Math.floor(base * 0.75));
    if (difficulty === 'HARD') base = Math.floor(base * 1.25);
    return base;
  }, [boss.attackDamage, difficulty]);

  // Execute Player Attack Animation & Damage
  const executePlayerAttack = useCallback(() => {
    setIsPlayerAttacking(true);
    soundManager.playPlayerAttack();

    setTimeout(() => {
      // Hit lands on boss
      setIsBossHit(true);
      soundManager.playHit();
      const dmg = calculatePlayerDamage();

      setDamageDealt((prev) => prev + dmg);
      setBossHp((prev) => Math.max(0, prev - dmg));
      setDamageNumber({
        target: 'boss',
        amount: dmg,
        text: `-${dmg} DMG!`,
        isCrit: combo >= 3,
      });

      // Score calculation according to SMK criteria:
      // Base: Easy=100, Medium=150, Hard=200
      let baseScore = 100;
      if (currentQuestion.difficulty === 'medium') baseScore = 150;
      if (currentQuestion.difficulty === 'hard') baseScore = 200;

      const speedScoreBonus = Math.floor((timer / maxTimer) * 50);
      const comboBonus = (combo - 1) * 25;
      const bossBonus = boss.level * 15;
      const points = baseScore + speedScoreBonus + comboBonus + bossBonus;

      setScore((prev) => prev + points);

      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo((prev) => Math.max(prev, newCombo));
      setCorrectCount((prev) => prev + 1);

      setTimeout(() => {
        setIsPlayerAttacking(false);
        setIsBossHit(false);
        setShowExplanation(true);
      }, 700);
    }, 450);
  }, [calculatePlayerDamage, combo, currentQuestion.difficulty, maxTimer, timer, boss.level]);

  // Execute Boss Attack Animation & Damage
  const executeBossAttack = useCallback((isTimeOut = false) => {
    setWrongCount((prev) => prev + 1);
    setCombo(1); // combo reset

    setTimeout(() => {
      setIsBossAttacking(true);
      soundManager.playBossAttack();
      setBannerText(isTimeOut ? "TIME'S UP! BOSS ATTACK!" : 'BOSS ATTACK!');

      setTimeout(() => {
        // Hit lands on player
        setIsPlayerHit(true);
        setScreenShake(true);
        soundManager.playHit();

        const bossDmg = calculateBossDamage();
        setDamageReceived((prev) => prev + bossDmg);
        setPlayerHp((prev) => Math.max(0, prev - bossDmg));
        setDamageNumber({
          target: 'player',
          amount: bossDmg,
          text: `-${bossDmg} DMG`,
        });

        setTimeout(() => {
          setIsBossAttacking(false);
          setIsPlayerHit(false);
          setScreenShake(false);
          setShowExplanation(true);
        }, 700);
      }, 450);
    }, 300);
  }, [calculateBossDamage]);

  // Handle Timeout
  const handleTimeout = useCallback(() => {
    stopTimer();
    setAnsweredState('timeout');
    setBannerText("TIME'S UP!");
    soundManager.playTimerWarning();

    executeBossAttack(true);
  }, [stopTimer, executeBossAttack]);

  // Start / Reset Timer for current question
  useEffect(() => {
    setTimer(maxTimer);
    setSelectedOption(null);
    setAnsweredState('idle');
    setBannerText(null);
    setShowExplanation(false);
    setDamageNumber(null);

    timerRef.current = window.setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        if (prev <= 6) {
          soundManager.playTimerWarning();
        }
        setTotalTimeSpent((t) => t + 1);
        return prev - 1;
      });
    }, 1000);

    return () => stopTimer();
  }, [currentQuestionIndex, maxTimer, handleTimeout, stopTimer]);

  // Answer selection handler
  const handleSelectAnswer = (index: number) => {
    if (isAnsweringDisabled) return;
    stopTimer();
    setSelectedOption(index);

    const isCorrect = index === correctOptionIndex;

    if (isCorrect) {
      setAnsweredState('correct');
      setBannerText('CORRECT!');
      soundManager.playCorrectAnswer();
      setTimeout(() => {
        setBannerText('PLAYER ATTACK!');
        executePlayerAttack();
      }, 400);
    } else {
      setAnsweredState('wrong');
      setBannerText('WRONG!');
      soundManager.playWrongAnswer();
      executeBossAttack(false);
    }
  };

  const finishBattle = useCallback(() => {
    stopTimer();
    const isVictory = bossHp <= 0 || (playerHp > 0 && bossHp < 25);
    onBattleEnd({
      victory: isVictory,
      finalScore: score + (isVictory ? boss.level * 250 : 0),
      correctCount,
      wrongCount,
      damageDealt,
      damageReceived,
      totalTimeSpent,
      maxCombo,
    });
  }, [bossHp, playerHp, score, boss.level, correctCount, wrongCount, damageDealt, damageReceived, totalTimeSpent, maxCombo, onBattleEnd, stopTimer]);

  // Proceed to next question or end battle
  const handleNextQuestion = () => {
    if (bossHp <= 0 || playerHp <= 0 || currentQuestionIndex >= 9) {
      finishBattle();
      return;
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  // Check if player or boss reached 0 HP during explanation phase
  useEffect(() => {
    if (showExplanation) {
      if (playerHp <= 0 || bossHp <= 0) {
        const timerOut = setTimeout(() => {
          finishBattle();
        }, 1500);
        return () => clearTimeout(timerOut);
      }
    }
  }, [showExplanation, playerHp, bossHp, finishBattle]);

  // Timer color indicator
  const timerPercentage = Math.round((timer / maxTimer) * 100);
  const isTimerWarning = timer <= 10 && timer > 5;
  const isTimerDanger = timer <= 5;

  return (
    <div
      className={`relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-col items-center select-none transition-transform ${
        screenShake ? 'animate-shake' : ''
      }`}
    >
      {/* Red flash effect when player is hit */}
      {isPlayerHit && (
        <div className="fixed inset-0 bg-rose-600/30 z-40 pointer-events-none transition-opacity" />
      )}

      {/* 1. TOP ARENA HUD: Material Info, Boss HP Bar & Surrender Button */}
      <div className="w-full glass-panel-hud p-3 sm:p-4 rounded-2xl border border-rose-500/30 mb-3 shadow-xl flex flex-col gap-2.5">
        {/* Topic & Boss Header */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Boss Level & Name */}
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-rose-950 border border-rose-500 text-rose-300 font-rpg font-extrabold text-xs sm:text-sm shadow-md">
              LV.{boss.level}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-rpg font-extrabold text-white text-sm sm:text-base block leading-none tracking-wide">
                  {boss.name.toUpperCase()}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-pink-950/80 border border-pink-500/40 text-[10px] text-pink-300 font-bold">
                  {boss.difficulty}
                </span>
              </div>
              <span className="text-[11px] text-pink-400 font-semibold">{boss.title}</span>
            </div>
          </div>

          {/* MATERIAL & QUESTION INFO HUD (As Requested in Section 16) */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Material Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-cyan-500/40 text-xs font-semibold text-cyan-300 shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>MATERI: <strong className="text-white font-rpg">{currentQuestion.categoryName}</strong></span>
              {currentQuestion.major && (
                <span className="px-1.5 py-0.2 rounded bg-cyan-950 text-[10px] text-cyan-400 border border-cyan-800">
                  {currentQuestion.major}
                </span>
              )}
            </div>

            {/* Difficulty Badge */}
            <div className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
              LEVEL: <strong className="text-amber-300 uppercase">{currentQuestion.difficulty}</strong>
            </div>

            {/* Surrender Button */}
            <button
              onClick={() => {
                soundManager.playButtonClick();
                setShowSurrenderModal(true);
              }}
              className="px-2.5 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-rose-100 border border-rose-800/80 text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Menyerah</span>
            </button>
          </div>
        </div>

        {/* Boss HP Gauge */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-bold font-rpg">
            <span className="text-rose-400 flex items-center gap-1">
              <Swords className="w-3.5 h-3.5" />
              <span>BOSS HP</span>
            </span>
            <span className={bossHp <= maxBossHp * 0.25 ? 'text-amber-300 animate-pulse' : 'text-rose-300'}>
              {bossHp} / {maxBossHp} ({Math.round((bossHp / maxBossHp) * 100)}%)
            </span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-rose-900/80 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 rounded-full transition-all duration-500 shadow-[0_0_12px_#f43f5e]"
              style={{ width: `${Math.max(0, (bossHp / maxBossHp) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. CENTER VIEW: 2D PIXEL ART SIDE-VIEW BATTLE ARENA */}
      <div className="w-full mb-3">
        <PixelBattleArena
          boss={boss}
          profile={profile}
          isPlayerAttacking={isPlayerAttacking}
          isBossAttacking={isBossAttacking}
          isBossHit={isBossHit}
          isPlayerHit={isPlayerHit}
          isPlayerDefeated={playerHp <= 0}
          isBossDefeated={bossHp <= 0}
          damageNumber={damageNumber}
          bannerText={bannerText}
        />
      </div>

      {/* 3. BOTTOM HUD: Player Status Bar + Question Box */}
      <div className="w-full max-w-5xl flex flex-col gap-3">
        {/* Player Status & Timer Ring Bar */}
        <div className="glass-panel p-3 rounded-2xl border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3">
          {/* Player Name & Health */}
          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center font-rpg font-extrabold text-white text-base shadow-md">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white font-bold">{profile.name} <span className="text-cyan-400 text-[10px]">Lv.{profile.level}</span></span>
                <span className={playerHp <= 25 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}>
                  {playerHp} / {maxPlayerHp}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    playerHp <= 25 ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'
                  }`}
                  style={{ width: `${Math.max(0, (playerHp / maxPlayerHp) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Combo & Score Stats */}
          <div className="flex items-center gap-3">
            {combo > 1 && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold animate-bounce">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>COMBO x{combo}</span>
              </div>
            )}
            <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
              SCORE: <span className="text-amber-300 font-rpg">{score.toLocaleString()}</span>
            </div>
          </div>

          {/* Question Counter & Timer */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-400 font-rpg">
              SOAL {currentQuestionIndex + 1} / 10
            </div>
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border font-bold text-xs transition-all ${
                isTimerDanger
                  ? 'bg-rose-950/90 border-rose-500 text-rose-300 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                  : isTimerWarning
                  ? 'bg-amber-950/90 border-amber-500 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  : 'bg-slate-900/90 border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
              }`}
            >
              <Clock className="w-3.5 h-3.5 animate-spin-slow" />
              <span className="font-rpg tracking-wider text-sm">{timer}s</span>
            </div>
          </div>
        </div>

        {/* Timer Progress Bar */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
          <div
            className={`h-full transition-all duration-1000 ease-linear rounded-full ${
              isTimerDanger ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : isTimerWarning ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' : 'bg-cyan-400 shadow-[0_0_8px_#38bdf8]'
            }`}
            style={{ width: `${timerPercentage}%` }}
          />
        </div>

        {/* 4. QUIZ TERMINAL: Question Box + Code Snippet + 4 Options */}
        <div className="w-full flex flex-col gap-3.5">
          {/* Question Card */}
          <div className="glass-panel-glow p-4 sm:p-5 rounded-2xl border border-cyan-500/40 relative flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center justify-between text-[11px] text-cyan-400 font-semibold gap-2 border-b border-cyan-500/20 pb-2">
              <span className="uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kategori: {currentQuestion.categoryName}</span>
                {currentQuestion.major && (
                  <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] text-cyan-300 font-bold">
                    {currentQuestion.major}
                  </span>
                )}
              </span>
              <span className="text-slate-300">Ronde Pertanyaan {currentQuestionIndex + 1} of 10</span>
            </div>

            {/* Question Text */}
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Optional Code Snippet Terminal Box */}
            {currentQuestion.codeSnippet && (
              <div className="my-1 p-3 rounded-xl bg-slate-950/90 border border-cyan-500/30 font-mono text-xs text-cyan-300 shadow-inner overflow-x-auto">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1.5 border-b border-slate-800 pb-1">
                  <Code className="w-3 h-3 text-cyan-400" />
                  <span>Code Snippet / Program:</span>
                </div>
                <pre className="text-slate-200 leading-relaxed whitespace-pre-wrap font-mono">
                  {currentQuestion.codeSnippet}
                </pre>
              </div>
            )}
          </div>

          {/* 4 Answers Grid (A, B, C, D) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const isSelected = selectedOption === idx;
              const isCorrect = idx === correctOptionIndex;

              // Option styling depending on answeredState
              let btnStyle = 'glass-panel border-slate-800 hover:border-cyan-500/60 hover:bg-slate-900/90 text-white';
              if (isAnsweringDisabled) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/90 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.35)]';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200 ring-2 ring-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.35)]';
                } else {
                  btnStyle = 'glass-panel border-slate-900 opacity-45 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnsweringDisabled}
                  onClick={() => {
                    soundManager.playButtonClick();
                    handleSelectAnswer(idx);
                  }}
                  className={`group p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3.5 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed ${btnStyle}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-rpg font-bold text-sm flex-shrink-0 transition-colors ${
                      isAnsweringDisabled && isCorrect
                        ? 'bg-emerald-500 text-slate-950'
                        : isAnsweringDisabled && isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-800 border border-slate-700 text-cyan-300 group-hover:border-cyan-400 group-hover:bg-cyan-950'
                    }`}
                  >
                    {letter}
                  </div>

                  <span className="text-xs sm:text-sm font-semibold flex-1 leading-snug">
                    {option}
                  </span>

                  {isAnsweringDisabled && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 animate-bounce" />
                  )}
                  {isAnsweringDisabled && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 5. EXPLANATION BANNER (Section 9: Detailed Pedagogical Feedback) */}
          {showExplanation && (
            <div className="glass-panel p-4 sm:p-5 rounded-xl border border-cyan-500/40 bg-slate-950/95 animate-fadeIn flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div className="flex-1 text-xs sm:text-sm text-slate-200 leading-relaxed text-left">
                {answeredState === 'correct' ? (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1 font-rpg tracking-wide">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>✓ JAWABAN BENAR!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-rose-400 font-bold mb-1 font-rpg tracking-wide">
                    <XCircle className="w-4 h-4" />
                    <span>✕ JAWABAN SALAH! (Jawaban yang benar: {['A', 'B', 'C', 'D'][correctOptionIndex]} - {correctOptionText})</span>
                  </div>
                )}
                <div className="text-slate-300 mt-1">
                  <strong className="text-cyan-300 font-semibold">Penjelasan: </strong>
                  {currentQuestion.explanation}
                </div>
              </div>

              <button
                onClick={() => {
                  soundManager.playButtonClick();
                  handleNextQuestion();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-rpg font-bold text-xs sm:text-sm tracking-wider shadow-md shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 flex-shrink-0 active:scale-95 cursor-pointer"
              >
                <span>{currentQuestionIndex >= 9 || playerHp <= 0 || bossHp <= 0 ? 'LIHAT HASIL BATTLE' : 'SOAL BERIKUTNYA'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Surrender Confirmation Modal */}
      {showSurrenderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md glass-panel p-6 rounded-2xl border border-rose-500/40 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-950/80 border border-rose-500/50 flex items-center justify-center text-rose-400 mx-auto mb-3 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-rpg text-white mb-2">MENYERAH DARI PERTARUNGAN?</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Apakah Anda yakin ingin menyerah melawan <span className="text-cyan-400 font-bold">{boss.name}</span>? Pertempuran ini akan dicatat sebagai kekalahan.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundManager.playButtonClick();
                  setShowSurrenderModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-rpg font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
              >
                LANJUTKAN
              </button>
              <button
                onClick={() => {
                  soundManager.playDefeat();
                  setShowSurrenderModal(false);
                  stopTimer();
                  onBattleEnd({
                    victory: false,
                    finalScore: score,
                    correctCount,
                    wrongCount,
                    damageDealt,
                    damageReceived: boss.hp - bossHp,
                    totalTimeSpent,
                    maxCombo,
                  });
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-rpg font-bold text-xs shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
              >
                YA, MENYERAH
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
