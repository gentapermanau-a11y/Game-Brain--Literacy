import React, { useEffect, useRef } from 'react';
import { Boss, PlayerProfile } from '../types';
import { PixelPlayerSprite } from './PixelPlayerSprite';
import { BossPixelSprite } from './BossPixelSprite';

interface PixelBattleArenaProps {
  boss: Boss;
  profile: PlayerProfile;
  isPlayerAttacking: boolean;
  isBossAttacking: boolean;
  isBossHit: boolean;
  isPlayerHit: boolean;
  isPlayerDefeated?: boolean;
  isBossDefeated?: boolean;
  damageNumber: {
    target: 'boss' | 'player';
    amount: number;
    text: string;
    isCrit?: boolean;
  } | null;
  bannerText: string | null;
}

export const PixelBattleArena: React.FC<PixelBattleArenaProps> = ({
  boss,
  profile,
  isPlayerAttacking,
  isBossAttacking,
  isBossHit,
  isPlayerHit,
  isPlayerDefeated = false,
  isBossDefeated = false,
  damageNumber,
  bannerText,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derive arena theme style based on boss theme & ID
  const getArenaBackgroundStyle = () => {
    const theme = boss.visualTheme;
    if (theme.includes('infernal') || theme.includes('crimson') || theme.includes('magma')) {
      return {
        bg: 'bg-gradient-to-b from-stone-950 via-rose-950/80 to-amber-950',
        floor: 'bg-gradient-to-r from-stone-900 via-rose-900 to-stone-900 border-t-2 border-amber-500/60',
        decor: 'lava',
      };
    }
    if (theme.includes('arctic') || theme.includes('crystal')) {
      return {
        bg: 'bg-gradient-to-b from-slate-950 via-sky-950/80 to-indigo-950',
        floor: 'bg-gradient-to-r from-slate-900 via-sky-900 to-slate-900 border-t-2 border-sky-400/60',
        decor: 'ice',
      };
    }
    if (theme.includes('neon') || theme.includes('stealth') || theme.includes('mech')) {
      return {
        bg: 'bg-gradient-to-b from-slate-950 via-cyan-950/80 to-slate-900',
        floor: 'bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-t-2 border-cyan-400/60',
        decor: 'cyber',
      };
    }
    if (theme.includes('electric') || theme.includes('storm')) {
      return {
        bg: 'bg-gradient-to-b from-stone-950 via-amber-950/70 to-slate-950',
        floor: 'bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border-t-2 border-yellow-400/60',
        decor: 'storm',
      };
    }
    if (boss.isCute) {
      return {
        bg: 'bg-gradient-to-b from-slate-950 via-pink-950/70 to-purple-950',
        floor: 'bg-gradient-to-r from-slate-900 via-pink-900/80 to-slate-900 border-t-2 border-pink-400/60',
        decor: 'cute',
      };
    }
    // Default Void / Dark Castle
    return {
      bg: 'bg-gradient-to-b from-slate-950 via-purple-950/80 to-slate-900',
      floor: 'bg-gradient-to-r from-slate-900 via-purple-900/80 to-slate-900 border-t-2 border-purple-500/60',
      decor: 'void',
    };
  };

  const arenaStyle = getArenaBackgroundStyle();

  // Determine current Player & Boss animation states
  const playerState = isPlayerDefeated
    ? 'defeat'
    : isPlayerAttacking
    ? 'attack'
    : isPlayerHit
    ? 'hit'
    : isBossDefeated
    ? 'victory'
    : 'idle';

  const bossState = isBossDefeated
    ? 'defeat'
    : isBossAttacking
    ? 'attack'
    : isBossHit
    ? 'hit'
    : 'idle';

  // Canvas particle effect generator (embers, snow, cyber pixels)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 260);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      color: string;
      alpha: number;
    }> = [];

    const numParticles = 35;
    const colors =
      arenaStyle.decor === 'lava'
        ? ['#ef4444', '#f97316', '#facc15']
        : arenaStyle.decor === 'ice'
        ? ['#38bdf8', '#7dd3fc', '#ffffff']
        : arenaStyle.decor === 'cyber'
        ? ['#22d3ee', '#10b981', '#38bdf8']
        : arenaStyle.decor === 'cute'
        ? ['#f472b6', '#c084fc', '#fde047']
        : ['#a855f7', '#6366f1', '#c084fc'];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedY: (Math.random() - 0.5) * 0.8 - (arenaStyle.decor === 'lava' ? 0.8 : 0.2),
        speedX: (Math.random() - 0.5) * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw pixel grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size); // pixel block
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [arenaStyle.decor]);

  return (
    <div
      className={`relative w-full h-56 sm:h-64 md:h-72 rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl flex flex-col justify-between select-none ${arenaStyle.bg}`}
    >
      {/* Canvas Particle Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Arena Banner Alert Overlay (CORRECT!, WRONG!, PLAYER ATTACK!) */}
      {bannerText && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 px-5 py-1.5 rounded-full bg-slate-950/90 border border-cyan-400/60 shadow-[0_0_20px_rgba(38,189,248,0.4)] animate-bounce text-center">
          <span className="font-rpg font-extrabold text-sm sm:text-base tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-yellow-300 to-emerald-300 drop-shadow-md">
            {bannerText}
          </span>
        </div>
      )}

      {/* Main 2D Battle Stage (Side View) */}
      <div className="relative z-10 flex-1 w-full px-6 md:px-12 flex items-end justify-between pb-3">
        {/* LEFT: Player 2D Pixel Sprite */}
        <div className="relative z-10 flex flex-col items-center">
          <PixelPlayerSprite state={playerState} name={profile.name} />
        </div>

        {/* CENTER: Projectile Effects Layer */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {/* Player Projectile Attack (Ayanokoji Chess Mastermind Energy) */}
          {isPlayerAttacking && (
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 animate-projectile-player flex items-center gap-1">
              <div className="relative w-10 h-10 flex items-center justify-center bg-slate-900/90 rounded-full border border-rose-500 shadow-[0_0_20px_#f43f5e] animate-spin">
                {/* Chess King Icon SVG */}
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-300 fill-amber-300 drop-shadow">
                  <path d="M19 22H5v-2h14v2zm-2-3H7l1-6.5h8L17 19zM12 2l1.5 3h3L14.5 7l1 3.5-3.5-2-3.5 2 1-3.5L7.5 5h3L12 2z" />
                </svg>
              </div>
              <div className="w-14 h-4 bg-gradient-to-r from-rose-500 via-purple-500 to-amber-300 rounded-full shadow-[0_0_20px_#f43f5e] border border-white/60 animate-pulse" />
            </div>
          )}

          {/* Boss Projectile Attack */}
          {isBossAttacking && (
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 animate-projectile-boss flex items-center">
              <div
                className="w-14 h-7 rounded-full shadow-lg border border-white"
                style={{
                  background: `linear-gradient(to left, ${boss.auraColor}, #ef4444)`,
                  boxShadow: `0 0 25px ${boss.auraColor}`,
                }}
              />
            </div>
          )}

          {/* Floating Damage Text */}
          {damageNumber && (
            <div
              className={`absolute top-1/3 ${
                damageNumber.target === 'boss' ? 'right-1/4' : 'left-1/4'
              } animate-damage-number font-rpg font-black text-xl sm:text-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]`}
              style={{
                color: damageNumber.target === 'boss' ? '#facc15' : '#ef4444',
              }}
            >
              {damageNumber.text}
              {damageNumber.isCrit && (
                <span className="block text-xs font-extrabold text-amber-300 animate-pulse">
                  CRITICAL!
                </span>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: Boss 2D Pixel Sprite */}
        <div className="relative z-10 flex flex-col items-center">
          <BossPixelSprite boss={boss} state={bossState} size="lg" />
        </div>
      </div>

      {/* Stage Floor / Ground Platform */}
      <div className={`w-full h-8 relative z-10 shadow-inner flex items-center justify-around px-4 ${arenaStyle.floor}`}>
        <div className="w-24 h-1 bg-white/20 rounded-full" />
        <div className="w-32 h-1 bg-white/20 rounded-full" />
        <div className="w-24 h-1 bg-white/20 rounded-full" />
      </div>
    </div>
  );
};
