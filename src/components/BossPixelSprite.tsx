import React from 'react';
import { Boss } from '../types';
import { BossIllustration } from './BossIllustration';

interface BossPixelSpriteProps {
  boss: Boss;
  state: 'idle' | 'attack' | 'hit' | 'defeat';
  size?: 'sm' | 'md' | 'lg';
}

export const BossPixelSprite: React.FC<BossPixelSpriteProps> = ({
  boss,
  state,
  size = 'lg',
}) => {
  // Determine boss specific idle animation class
  const getBossIdleAnimation = () => {
    if (boss.isCute) {
      if (boss.id === 22) return 'animate-bounce'; // Slime King
      if (boss.id === 23) return 'animate-float'; // Ghost
      return 'animate-float-gentle';
    }
    if (boss.id === 9 || boss.id === 18) return 'animate-pulse'; // Dragons
    if (boss.id === 2 || boss.id === 12 || boss.id === 19) return 'animate-float-gentle'; // Mechs/Reaper
    if (boss.id === 16 || boss.id === 20 || boss.id === 25) return 'animate-float'; // Cosmic/Overlord
    return 'animate-float-gentle';
  };

  const idleAnim = getBossIdleAnimation();

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Boss Title & Level Tag */}
      <div className="mb-1 flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-900/95 border border-rose-500/50 text-[10px] font-rpg font-bold text-rose-300 shadow-md backdrop-blur-sm tracking-wider">
        <span className="text-amber-400">LV.{boss.level}</span>
        <span className="text-white">{boss.name}</span>
      </div>

      {/* Main Boss Sprite Container */}
      <div
        className={`relative transition-all duration-300 ${
          state === 'idle'
            ? idleAnim
            : state === 'attack'
            ? '-translate-x-12 scale-110 shadow-rose-500/50'
            : state === 'hit'
            ? 'animate-wiggle brightness-200'
            : 'scale-90 opacity-0 transition-opacity duration-1000'
        }`}
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Pixel Aura Ring */}
        <div
          className="absolute -inset-4 rounded-full opacity-35 blur-md animate-pulse pointer-events-none"
          style={{ backgroundColor: boss.auraColor }}
        />

        {/* Boss Illustration with pixel rendering */}
        <div style={{ imageRendering: 'pixelated' }}>
          <BossIllustration
            boss={boss}
            isAttacking={state === 'attack'}
            isHit={state === 'hit'}
            size={size}
          />
        </div>

        {/* Pixel Sparks on Hit */}
        {state === 'hit' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 bg-white/80 rounded-full animate-ping opacity-75" />
            <div className="absolute w-24 h-24 border-2 border-amber-300 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};
