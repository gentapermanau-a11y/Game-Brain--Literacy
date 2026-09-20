import React from 'react';
import { Boss } from '../types';

interface BossIllustrationProps {
  boss: Boss;
  isAttacking?: boolean;
  isHit?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const BossIllustration: React.FC<BossIllustrationProps> = ({
  boss,
  isAttacking = false,
  isHit = false,
  size = 'lg',
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-48 h-48 md:w-60 md:h-60',
  }[size];

  const renderBossSvg = (id: number) => {
    switch (id) {
      case 1: // Shadow Knight
        return (
          <g>
            <defs>
              <linearGradient id="sk-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="85" fill="#1e1b4b" opacity="0.3" />
            {/* Horns */}
            <path d="M60,65 Q40,25 25,35 Q50,55 65,75 Z" fill="#6d28d9" />
            <path d="M140,65 Q160,25 175,35 Q150,55 135,75 Z" fill="#6d28d9" />
            {/* Pauldrons */}
            <path d="M30,120 L70,95 L65,150 L20,140 Z" fill="#312e81" stroke="#a78bfa" strokeWidth="2" />
            <path d="M170,120 L130,95 L135,150 L180,140 Z" fill="#312e81" stroke="#a78bfa" strokeWidth="2" />
            {/* Helmet */}
            <path d="M65,70 L135,70 L145,115 L100,155 L55,115 Z" fill="url(#sk-grad)" stroke="#c4b5fd" strokeWidth="3" />
            {/* Visor slit glow */}
            <path d="M75,100 Q100,108 125,100 Q100,114 75,100 Z" fill="#c084fc" filter="drop-shadow(0 0 8px #a855f7)" />
            {/* Obsidian Sword */}
            <path d="M100,135 L95,185 L105,185 Z" fill="#e9d5ff" />
            <rect x="85" y="145" width="30" height="4" rx="2" fill="#7c3aed" />
          </g>
        );

      case 2: // Cyber Reaper
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#083344" opacity="0.3" />
            {/* Hood */}
            <path d="M50,80 Q100,20 150,80 L160,160 L40,160 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            {/* Skull Face */}
            <path d="M70,85 Q100,75 130,85 L125,125 Q100,145 75,125 Z" fill="#082f49" stroke="#22d3ee" strokeWidth="2" />
            {/* Glowing Optics */}
            <circle cx="85" cy="100" r="7" fill="#22d3ee" filter="drop-shadow(0 0 8px #06b6d4)" />
            <circle cx="115" cy="100" r="7" fill="#22d3ee" filter="drop-shadow(0 0 8px #06b6d4)" />
            <rect x="90" y="120" width="20" height="4" fill="#06b6d4" />
            {/* Cyber Scythe */}
            <path d="M30,40 Q80,10 160,30 Q110,60 70,55 L35,170" fill="none" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" filter="drop-shadow(0 0 10px #06b6d4)" />
          </g>
        );

      case 3: // Flame Tyrant
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#431407" opacity="0.4" />
            {/* Flame Aura */}
            <path d="M40,140 Q30,70 70,40 Q85,15 100,30 Q115,10 135,40 Q170,70 160,140 Z" fill="#ea580c" opacity="0.7" filter="drop-shadow(0 0 12px #f97316)" />
            <path d="M55,140 Q50,85 80,60 Q100,35 120,60 Q150,85 145,140 Z" fill="#facc15" />
            {/* Demon Mask */}
            <path d="M65,85 L135,85 L125,135 L100,155 L75,135 Z" fill="#7c2d12" stroke="#fdba74" strokeWidth="2" />
            {/* Fiery Eyes & Mouth */}
            <polygon points="75,100 90,95 85,108" fill="#fef08a" />
            <polygon points="125,100 110,95 115,108" fill="#fef08a" />
            <polygon points="85,128 100,140 115,128 100,122" fill="#ffedd5" />
          </g>
        );

      case 4: // Frost Queen
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#0c4a6e" opacity="0.3" />
            {/* Crown of Ice Spikes */}
            <polygon points="50,65 65,30 75,60" fill="#38bdf8" />
            <polygon points="75,55 100,15 125,55" fill="#7dd3fc" filter="drop-shadow(0 0 6px #38bdf8)" />
            <polygon points="125,60 135,30 150,65" fill="#38bdf8" />
            {/* Robe/Body */}
            <path d="M65,75 Q100,65 135,75 L155,165 L45,165 Z" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
            {/* Ice Face & Eyes */}
            <ellipse cx="100" cy="100" rx="30" ry="25" fill="#0369a1" />
            <ellipse cx="90" cy="100" rx="5" ry="8" fill="#e0f2fe" filter="drop-shadow(0 0 4px #bae6fd)" />
            <ellipse cx="110" cy="100" rx="5" ry="8" fill="#e0f2fe" filter="drop-shadow(0 0 4px #bae6fd)" />
            {/* Floating Ice Crystals */}
            <polygon points="30,85 40,70 35,95" fill="#bae6fd" />
            <polygon points="170,85 160,70 165,95" fill="#bae6fd" />
          </g>
        );

      case 5: // Thunder Beast
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#422006" opacity="0.3" />
            {/* Lightning Horns */}
            <polyline points="45,80 30,50 50,45 40,20 70,55" fill="#fde047" stroke="#eab308" strokeWidth="2" filter="drop-shadow(0 0 8px #facc15)" />
            <polyline points="155,80 170,50 150,45 160,20 130,55" fill="#fde047" stroke="#eab308" strokeWidth="2" filter="drop-shadow(0 0 8px #facc15)" />
            {/* Beast Head */}
            <path d="M55,75 Q100,60 145,75 L150,120 L100,160 L50,120 Z" fill="#1c1917" stroke="#eab308" strokeWidth="3" />
            {/* Glowing Fangs */}
            <polygon points="75,120 85,145 95,120" fill="#fef08a" />
            <polygon points="125,120 115,145 105,120" fill="#fef08a" />
            {/* Eyes */}
            <rect x="70" y="88" width="18" height="6" rx="2" fill="#fef08a" transform="rotate(10 79 91)" />
            <rect x="112" y="88" width="18" height="6" rx="2" fill="#fef08a" transform="rotate(-10 121 91)" />
          </g>
        );

      case 6: // Void Samurai
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#3b0764" opacity="0.3" />
            {/* Kabuto Crest (Crescent Moon) */}
            <path d="M60,45 Q100,20 140,45 Q100,32 60,45 Z" fill="#d8b4fe" filter="drop-shadow(0 0 8px #c084fc)" />
            <circle cx="100" cy="40" r="8" fill="#a855f7" />
            {/* Kabuto Helmet & Mask */}
            <path d="M55,60 L145,60 L140,110 L100,145 L60,110 Z" fill="#2e1065" stroke="#a855f7" strokeWidth="2" />
            {/* Menpo (Faceplate) */}
            <path d="M70,95 L130,95 L120,135 L100,145 L80,135 Z" fill="#09090b" stroke="#d8b4fe" strokeWidth="1.5" />
            <circle cx="85" cy="85" r="4" fill="#f43f5e" />
            <circle cx="115" cy="85" r="4" fill="#f43f5e" />
            {/* Void Katana */}
            <line x1="170" y1="20" x2="30" y2="180" stroke="#c084fc" strokeWidth="4" strokeLinecap="round" filter="drop-shadow(0 0 10px #a855f7)" />
          </g>
        );

      case 7: // Iron Golem
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#1e293b" opacity="0.3" />
            {/* Massive Steel Frame */}
            <rect x="40" y="55" width="120" height="95" rx="8" fill="#334155" stroke="#94a3b8" strokeWidth="4" />
            {/* Core Reactor */}
            <circle cx="100" cy="110" r="22" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" filter="drop-shadow(0 0 8px #38bdf8)" />
            <circle cx="100" cy="110" r="10" fill="#e0f2fe" />
            {/* Rivets */}
            <circle cx="50" cy="65" r="3" fill="#cbd5e1" />
            <circle cx="150" cy="65" r="3" fill="#cbd5e1" />
            <circle cx="50" cy="140" r="3" fill="#cbd5e1" />
            <circle cx="150" cy="140" r="3" fill="#cbd5e1" />
            {/* Red Eye Visor */}
            <rect x="65" y="70" width="70" height="12" rx="3" fill="#0f172a" />
            <rect x="90" y="73" width="20" height="6" rx="2" fill="#ef4444" filter="drop-shadow(0 0 4px #f87171)" />
          </g>
        );

      case 8: // Dark Mage
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#1e1b4b" opacity="0.3" />
            {/* Magic Runes Circle */}
            <circle cx="100" cy="100" r="75" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
            {/* Cowl */}
            <path d="M45,160 L60,70 Q100,20 140,70 L155,160 Z" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
            {/* Pitch Black Void Face */}
            <ellipse cx="100" cy="95" rx="25" ry="30" fill="#020617" />
            {/* Glowing Oculus */}
            <circle cx="100" cy="95" r="9" fill="#818cf8" filter="drop-shadow(0 0 10px #6366f1)" />
            <circle cx="100" cy="95" r="4" fill="#ffffff" />
          </g>
        );

      case 9: // Plasma Dragon
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#500724" opacity="0.3" />
            {/* Dragon Wings */}
            <path d="M25,60 Q60,40 85,75 Q40,110 25,60 Z" fill="#be185d" opacity="0.7" />
            <path d="M175,60 Q140,40 115,75 Q160,110 175,60 Z" fill="#be185d" opacity="0.7" />
            {/* Horns */}
            <path d="M75,60 Q50,20 40,30 Q65,45 80,65 Z" fill="#ec4899" />
            <path d="M125,60 Q150,20 160,30 Q135,45 120,65 Z" fill="#ec4899" />
            {/* Dragon Snout */}
            <path d="M70,80 L130,80 L120,135 L100,155 L80,135 Z" fill="#831843" stroke="#f472b6" strokeWidth="2" />
            {/* Plasma Eye & Flare */}
            <circle cx="85" cy="95" r="5" fill="#fdf2f8" filter="drop-shadow(0 0 6px #ec4899)" />
            <circle cx="115" cy="95" r="5" fill="#fdf2f8" filter="drop-shadow(0 0 6px #ec4899)" />
            <path d="M90,135 Q100,165 110,135 Z" fill="#f43f5e" filter="drop-shadow(0 0 8px #f43f5e)" />
          </g>
        );

      case 10: // Toxic Mutant
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#052e16" opacity="0.3" />
            {/* Slime Bubbles */}
            <circle cx="60" cy="50" r="14" fill="#22c55e" opacity="0.8" />
            <circle cx="140" cy="55" r="18" fill="#16a34a" opacity="0.8" />
            {/* Mutant Head */}
            <path d="M50,80 Q100,45 150,80 Q160,140 100,165 Q40,140 50,80 Z" fill="#14532d" stroke="#4ade80" strokeWidth="3" />
            {/* Gas Mask Eye Filters */}
            <circle cx="78" cy="95" r="14" fill="#052e16" stroke="#4ade80" strokeWidth="3" />
            <circle cx="122" cy="95" r="14" fill="#052e16" stroke="#4ade80" strokeWidth="3" />
            <circle cx="78" cy="95" r="7" fill="#86efac" filter="drop-shadow(0 0 6px #22c55e)" />
            <circle cx="122" cy="95" r="7" fill="#86efac" filter="drop-shadow(0 0 6px #22c55e)" />
            {/* Biohazard Grate */}
            <rect x="90" y="125" width="20" height="15" rx="3" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
          </g>
        );

      case 11: // Crimson Demon
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#450a0a" opacity="0.3" />
            {/* Massive Curved Horns */}
            <path d="M60,65 Q25,25 20,40 Q45,65 65,80 Z" fill="#991b1b" stroke="#f87171" strokeWidth="2" />
            <path d="M140,65 Q175,25 180,40 Q155,65 135,80 Z" fill="#991b1b" stroke="#f87171" strokeWidth="2" />
            {/* Demon Face */}
            <path d="M60,75 L140,75 L130,135 L100,160 L70,135 Z" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
            {/* Burning Slit Eyes */}
            <polygon points="75,95 90,92 82,105" fill="#fef08a" filter="drop-shadow(0 0 6px #f87171)" />
            <polygon points="125,95 110,92 118,105" fill="#fef08a" filter="drop-shadow(0 0 6px #f87171)" />
            {/* Fang Grin */}
            <path d="M75,130 Q100,145 125,130" stroke="#fca5a5" strokeWidth="3" fill="none" />
          </g>
        );

      case 12: // Cyber Ninja
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#022c22" opacity="0.3" />
            {/* Ninja Mask Cowl */}
            <path d="M55,65 Q100,45 145,65 L150,150 L50,150 Z" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
            {/* High-Tech Sensor Visor Strip */}
            <rect x="65" y="85" width="70" height="10" rx="3" fill="#022c22" stroke="#34d399" strokeWidth="2" />
            <rect x="85" y="87" width="30" height="6" rx="2" fill="#6ee7b7" filter="drop-shadow(0 0 6px #10b981)" />
            {/* Shuriken in front */}
            <path d="M100,120 L108,135 L125,138 L112,150 L115,168 L100,158 L85,168 L88,150 L75,138 L92,135 Z" fill="#34d399" opacity="0.9" />
          </g>
        );

      case 13: // Storm Lord
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#134e4a" opacity="0.3" />
            {/* Cyclone Body */}
            <ellipse cx="100" cy="70" rx="45" ry="18" fill="#14b8a6" opacity="0.7" />
            <ellipse cx="100" cy="100" rx="35" ry="14" fill="#2dd4bf" opacity="0.8" />
            <ellipse cx="100" cy="130" rx="25" ry="10" fill="#5eead4" opacity="0.9" />
            <ellipse cx="100" cy="155" rx="12" ry="6" fill="#99f6e4" />
            {/* Storm Eyes */}
            <circle cx="90" cy="70" r="5" fill="#ffffff" filter="drop-shadow(0 0 6px #2dd4bf)" />
            <circle cx="110" cy="70" r="5" fill="#ffffff" filter="drop-shadow(0 0 6px #2dd4bf)" />
            {/* Lightning Zap */}
            <polyline points="120,40 135,60 125,70 145,95" stroke="#fef08a" strokeWidth="3" fill="none" filter="drop-shadow(0 0 4px #eab308)" />
          </g>
        );

      case 14: // Ancient Guardian
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#451a03" opacity="0.3" />
            {/* Stone Monolith Head */}
            <polygon points="60,50 140,50 155,145 100,165 45,145" fill="#78350f" stroke="#d97706" strokeWidth="3" />
            {/* Glowing Golden Glyphs */}
            <rect x="75" y="70" width="16" height="16" fill="none" stroke="#fcd34d" strokeWidth="2" filter="drop-shadow(0 0 5px #f59e0b)" />
            <rect x="109" y="70" width="16" height="16" fill="none" stroke="#fcd34d" strokeWidth="2" filter="drop-shadow(0 0 5px #f59e0b)" />
            <line x1="85" y1="110" x2="115" y2="110" stroke="#fcd34d" strokeWidth="3" />
            <line x1="100" y1="110" x2="100" y2="135" stroke="#fcd34d" strokeWidth="3" />
          </g>
        );

      case 15: // Blood Moon Warrior
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#4c0519" opacity="0.3" />
            {/* Giant Blood Moon */}
            <circle cx="100" cy="75" r="55" fill="#9f1239" opacity="0.7" filter="drop-shadow(0 0 15px #f43f5e)" />
            {/* Warrior Armor Silhouette */}
            <path d="M60,110 L140,110 L150,170 L50,170 Z" fill="#1e1b4b" stroke="#fb7185" strokeWidth="2" />
            {/* Crimson Visor */}
            <path d="M75,120 L125,120 L100,135 Z" fill="#e11d48" filter="drop-shadow(0 0 6px #f43f5e)" />
          </g>
        );

      case 16: // Phantom King
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#172554" opacity="0.3" />
            {/* Ethereal Crown */}
            <polygon points="60,60 70,35 85,55 100,25 115,55 130,35 140,60" fill="#60a5fa" filter="drop-shadow(0 0 10px #3b82f6)" />
            {/* Ghost Robe */}
            <path d="M55,75 Q100,55 145,75 Q160,150 100,165 Q40,150 55,75 Z" fill="#1e3a8a" opacity="0.8" stroke="#93c5fd" strokeWidth="2" />
            {/* Soul Flame Eyes */}
            <circle cx="85" cy="95" r="6" fill="#dbeafe" filter="drop-shadow(0 0 8px #60a5fa)" />
            <circle cx="115" cy="95" r="6" fill="#dbeafe" filter="drop-shadow(0 0 8px #60a5fa)" />
          </g>
        );

      case 17: // Lava Titan
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#431407" opacity="0.4" />
            {/* Molten Rock Body */}
            <polygon points="50,60 150,60 160,150 40,150" fill="#292524" stroke="#ea580c" strokeWidth="4" />
            {/* Magma Fissures */}
            <path d="M60,80 Q85,110 75,130" stroke="#f97316" strokeWidth="4" fill="none" filter="drop-shadow(0 0 6px #f97316)" />
            <path d="M140,80 Q115,110 125,130" stroke="#f97316" strokeWidth="4" fill="none" filter="drop-shadow(0 0 6px #f97316)" />
            {/* Flaming Core */}
            <circle cx="100" cy="105" r="16" fill="#facc15" filter="drop-shadow(0 0 10px #ea580c)" />
          </g>
        );

      case 18: // Ice Dragon
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#082f49" opacity="0.3" />
            {/* Crystalline Horns */}
            <polygon points="70,55 45,20 60,45" fill="#7dd3fc" filter="drop-shadow(0 0 6px #38bdf8)" />
            <polygon points="130,55 155,20 140,45" fill="#7dd3fc" filter="drop-shadow(0 0 6px #38bdf8)" />
            {/* Ice Dragon Head */}
            <path d="M60,75 L140,75 L125,140 L100,165 L75,140 Z" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Glacier Eyes */}
            <polygon points="78,92 92,88 88,102" fill="#ffffff" filter="drop-shadow(0 0 5px #7dd3fc)" />
            <polygon points="122,92 108,88 112,102" fill="#ffffff" filter="drop-shadow(0 0 5px #7dd3fc)" />
          </g>
        );

      case 19: // Mechanical Beast
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#0f172a" opacity="0.3" />
            {/* Mech Armor Plates */}
            <rect x="50" y="65" width="100" height="80" rx="10" fill="#475569" stroke="#94a3b8" strokeWidth="3" />
            {/* Hazard Stripes */}
            <line x1="60" y1="130" x2="80" y2="145" stroke="#eab308" strokeWidth="3" />
            <line x1="80" y1="130" x2="100" y2="145" stroke="#eab308" strokeWidth="3" />
            <line x1="100" y1="130" x2="120" y2="145" stroke="#eab308" strokeWidth="3" />
            <line x1="120" y1="130" x2="140" y2="145" stroke="#eab308" strokeWidth="3" />
            {/* Scanner Eye */}
            <circle cx="100" cy="95" r="16" fill="#020617" stroke="#ef4444" strokeWidth="2" />
            <circle cx="100" cy="95" r="8" fill="#ef4444" filter="drop-shadow(0 0 8px #ef4444)" />
          </g>
        );

      case 20: // Chaos Lord
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#4a044e" opacity="0.3" />
            {/* Chaos Tentacles */}
            <path d="M40,140 Q20,80 50,60 Q70,70 60,110" fill="#a21caf" opacity="0.7" />
            <path d="M160,140 Q180,80 150,60 Q130,70 140,110" fill="#a21caf" opacity="0.7" />
            {/* Eldritch Eye Central */}
            <circle cx="100" cy="95" r="40" fill="#2e1065" stroke="#d946ef" strokeWidth="3" filter="drop-shadow(0 0 12px #d946ef)" />
            <ellipse cx="100" cy="95" rx="12" ry="24" fill="#f43f5e" />
            <circle cx="100" cy="95" r="5" fill="#fdf4ff" />
          </g>
        );

      case 21: // Moon Rabbit (Cute Boss)
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#500724" opacity="0.2" />
            {/* Moon background */}
            <circle cx="100" cy="80" r="60" fill="#fce7f3" opacity="0.4" />
            {/* Bunny Long Ears */}
            <ellipse cx="75" cy="45" rx="12" ry="32" fill="#ffffff" stroke="#f472b6" strokeWidth="3" transform="rotate(-12 75 45)" />
            <ellipse cx="75" cy="45" rx="6" ry="20" fill="#fbcfe8" transform="rotate(-12 75 45)" />
            <ellipse cx="125" cy="45" rx="12" ry="32" fill="#ffffff" stroke="#f472b6" strokeWidth="3" transform="rotate(12 125 45)" />
            <ellipse cx="125" cy="45" rx="6" ry="20" fill="#fbcfe8" transform="rotate(12 125 45)" />
            {/* Fluffy Body */}
            <circle cx="100" cy="115" r="42" fill="#ffffff" stroke="#f472b6" strokeWidth="3" filter="drop-shadow(0 0 8px #f472b6)" />
            {/* Cute Anime Eyes */}
            <ellipse cx="88" cy="108" rx="6" ry="9" fill="#831843" />
            <circle cx="86" cy="105" r="2.5" fill="#ffffff" />
            <ellipse cx="112" cy="108" rx="6" ry="9" fill="#831843" />
            <circle cx="110" cy="105" r="2.5" fill="#ffffff" />
            {/* Blush cheeks */}
            <ellipse cx="78" cy="120" rx="7" ry="4" fill="#f472b6" opacity="0.8" />
            <ellipse cx="122" cy="120" rx="7" ry="4" fill="#f472b6" opacity="0.8" />
            {/* Bunny Nose & Mouth */}
            <polygon points="98,118 102,118 100,121" fill="#ec4899" />
            <path d="M96,124 Q100,127 104,124" stroke="#831843" strokeWidth="2" fill="none" />
            {/* Magic Pestle / Hammer */}
            <rect x="130" y="90" width="8" height="35" rx="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" transform="rotate(25 134 107)" />
            <rect x="122" y="85" width="24" height="10" rx="3" fill="#f59e0b" transform="rotate(25 134 107)" />
          </g>
        );

      case 22: // Cute Slime King (Cute Boss)
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#064e3b" opacity="0.2" />
            {/* Gold Crown */}
            <polygon points="75,55 85,38 100,48 115,38 125,55" fill="#facc15" stroke="#ca8a04" strokeWidth="2" filter="drop-shadow(0 0 6px #facc15)" />
            <circle cx="100" cy="51" r="3" fill="#ef4444" />
            {/* Jelly Slime Body */}
            <path d="M50,135 C40,95 65,70 100,70 C135,70 160,95 150,135 C145,155 55,155 50,135 Z" fill="#34d399" stroke="#10b981" strokeWidth="3" filter="drop-shadow(0 0 10px #34d399)" />
            {/* Slime Highlight */}
            <ellipse cx="75" cy="85" rx="10" ry="5" fill="#d1fae5" transform="rotate(-20 75 85)" />
            {/* Big Cute Eyes */}
            <ellipse cx="85" cy="110" rx="7" ry="11" fill="#064e3b" />
            <circle cx="83" cy="106" r="3" fill="#ffffff" />
            <ellipse cx="115" cy="110" rx="7" ry="11" fill="#064e3b" />
            <circle cx="113" cy="106" r="3" fill="#ffffff" />
            {/* Cute Blush */}
            <ellipse cx="73" cy="122" rx="6" ry="3.5" fill="#f43f5e" opacity="0.7" />
            <ellipse cx="127" cy="122" rx="6" ry="3.5" fill="#f43f5e" opacity="0.7" />
            {/* Smile */}
            <path d="M95,124 Q100,130 105,124" stroke="#064e3b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
        );

      case 23: // Little Ghost (Cute Boss)
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#3b0764" opacity="0.2" />
            {/* Witchy Mini Hat */}
            <polygon points="90,45 100,20 110,45" fill="#a855f7" />
            <ellipse cx="100" cy="45" rx="16" ry="4" fill="#7e22ce" />
            {/* Round Sheet Ghost Body with Ruffled Hem */}
            <path d="M60,110 C55,65 145,65 140,110 C138,145 130,150 125,140 C120,150 110,150 105,140 C100,150 90,150 85,140 C80,150 70,150 65,140 C62,145 60,130 60,110 Z" fill="#f3e8ff" stroke="#c084fc" strokeWidth="3" filter="drop-shadow(0 0 10px #c084fc)" />
            {/* Sparkly Eyes */}
            <ellipse cx="88" cy="98" rx="6" ry="9" fill="#581c87" />
            <circle cx="86" cy="95" r="2.5" fill="#ffffff" />
            <ellipse cx="112" cy="98" rx="6" ry="9" fill="#581c87" />
            <circle cx="110" cy="95" r="2.5" fill="#ffffff" />
            {/* Cute Open Mouth (Boo!) */}
            <ellipse cx="100" cy="112" rx="4" ry="6" fill="#7e22ce" />
            {/* Pink Cheeks */}
            <circle cx="78" cy="108" r="5" fill="#f472b6" opacity="0.8" />
            <circle cx="122" cy="108" r="5" fill="#f472b6" opacity="0.8" />
          </g>
        );

      case 24: // Magical Cat Boss (Cute Boss)
        return (
          <g>
            <circle cx="100" cy="100" r="85" fill="#451a03" opacity="0.2" />
            {/* Cat Ears */}
            <polygon points="65,65 50,30 80,48" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <polygon points="65,60 56,38 75,50" fill="#fde68a" />
            <polygon points="135,65 150,30 120,48" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <polygon points="135,60 144,38 125,50" fill="#fde68a" />
            {/* Wizard Hat Tilted */}
            <polygon points="85,50 105,15 125,50" fill="#6366f1" />
            <ellipse cx="105" cy="50" rx="20" ry="5" fill="#4f46e5" />
            <circle cx="105" cy="20" r="4" fill="#facc15" filter="drop-shadow(0 0 4px #fde047)" />
            {/* Kitty Face */}
            <circle cx="100" cy="98" r="38" fill="#fbbf24" stroke="#d97706" strokeWidth="3" filter="drop-shadow(0 0 8px #f59e0b)" />
            {/* Large Anime Eyes */}
            <ellipse cx="86" cy="92" rx="7" ry="11" fill="#1e1b4b" />
            <circle cx="84" cy="88" r="3" fill="#ffffff" />
            <circle cx="88" cy="96" r="1.5" fill="#6ee7b7" />
            <ellipse cx="114" cy="92" rx="7" ry="11" fill="#1e1b4b" />
            <circle cx="112" cy="88" r="3" fill="#ffffff" />
            <circle cx="116" cy="96" r="1.5" fill="#6ee7b7" />
            {/* Whiskers */}
            <line x1="60" y1="100" x2="75" y2="102" stroke="#78350f" strokeWidth="2" />
            <line x1="60" y1="108" x2="75" y2="106" stroke="#78350f" strokeWidth="2" />
            <line x1="140" y1="100" x2="125" y2="102" stroke="#78350f" strokeWidth="2" />
            <line x1="140" y1="108" x2="125" y2="106" stroke="#78350f" strokeWidth="2" />
            {/* Nose and Mouth */}
            <polygon points="98,102 102,102 100,105" fill="#ec4899" />
            <path d="M96,107 Q100,110 104,107" stroke="#78350f" strokeWidth="2" fill="none" />
            {/* Magic Star Wand in Paw */}
            <line x1="130" y1="130" x2="145" y2="95" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <polygon points="145,90 148,97 155,98 150,103 152,110 145,106 138,110 140,103 135,98 142,97" fill="#facc15" filter="drop-shadow(0 0 6px #facc15)" />
          </g>
        );

      case 25: // Final Overlord (Supreme Cosmic Boss)
        return (
          <g>
            <defs>
              <linearGradient id="overlord-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            {/* Cosmic Halo Rings */}
            <circle cx="100" cy="100" r="82" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="12 6" filter="drop-shadow(0 0 10px #f43f5e)" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#eab308" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.8" />
            {/* Singularity Core Background */}
            <circle cx="100" cy="100" r="60" fill="#020617" />
            {/* Cosmic Overlord Horns/Spikes */}
            <polygon points="40,50 65,70 50,20" fill="#e11d48" filter="drop-shadow(0 0 8px #f43f5e)" />
            <polygon points="160,50 135,70 150,20" fill="#e11d48" filter="drop-shadow(0 0 8px #f43f5e)" />
            <polygon points="100,10 88,40 112,40" fill="#fbbf24" filter="drop-shadow(0 0 10px #f59e0b)" />
            {/* Monolithic Armor */}
            <polygon points="60,65 140,65 155,125 100,170 45,125" fill="url(#overlord-grad)" stroke="#f43f5e" strokeWidth="3" />
            {/* Overlord Singularity Eye */}
            <circle cx="100" cy="100" r="18" fill="#09090b" stroke="#fbbf24" strokeWidth="3" filter="drop-shadow(0 0 12px #f43f5e)" />
            <circle cx="100" cy="100" r="8" fill="#f43f5e" />
            <circle cx="100" cy="100" r="3" fill="#ffffff" />
            {/* Floating Energy Shards */}
            <polygon points="25,100 35,90 30,110" fill="#a855f7" />
            <polygon points="175,100 165,90 170,110" fill="#a855f7" />
          </g>
        );

      default:
        return (
          <circle cx="100" cy="100" r="70" fill="#64748b" />
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-300 ${sizeClasses} ${
        isAttacking ? 'scale-115 -translate-x-3 drop-shadow-[0_0_25px_rgba(239,68,68,0.8)]' : ''
      } ${isHit ? 'animate-wiggle brightness-175' : 'hover:scale-105'}`}
      style={{ filter: `drop-shadow(0 0 18px ${boss.auraColor}66)` }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none"
      >
        {renderBossSvg(boss.id)}
      </svg>

      {/* Cute badge if applicable */}
      {boss.isCute && size === 'lg' && (
        <span className="absolute -top-1 -right-1 px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-pink-500 text-white shadow-md border border-pink-300 animate-pulse">
          Cute Boss
        </span>
      )}
    </div>
  );
};
