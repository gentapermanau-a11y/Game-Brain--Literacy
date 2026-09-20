import React from 'react';

interface PixelPlayerSpriteProps {
  state: 'idle' | 'attack' | 'hit' | 'victory' | 'defeat';
  name: string;
}

export const PixelPlayerSprite: React.FC<PixelPlayerSpriteProps> = ({ state, name }) => {
  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Character Name / Title Badge */}
      <div className="mb-1 flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-900/95 border border-rose-500/60 text-[10px] font-rpg font-bold text-rose-300 shadow-lg backdrop-blur-md tracking-wider">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        <span>{name}</span>
        <span className="text-[9px] text-amber-300 font-sans ml-0.5">(Ayanokoji)</span>
      </div>

      {/* Sprite Container with state-based animations */}
      <div
        className={`relative w-28 h-32 md:w-36 md:h-40 transition-all duration-300 ${
          state === 'idle'
            ? 'animate-pixel-idle'
            : state === 'attack'
            ? 'animate-pixel-attack translate-x-12 scale-110'
            : state === 'hit'
            ? 'animate-pixel-hit -translate-x-6'
            : state === 'victory'
            ? 'animate-pixel-victory'
            : 'animate-pixel-defeat opacity-85'
        }`}
        style={{ imageRendering: 'pixelated' }}
      >
        {/* SVG Pixel Art - Kiyotaka Ayanokoji Model */}
        <svg
          viewBox="0 0 36 44"
          className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(225,29,72,0.6)]"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Ground Shadow */}
          <ellipse
            cx="18"
            cy="42"
            rx="11"
            ry="2"
            fill="#000000"
            opacity={state === 'defeat' ? 0.3 : 0.65}
          />

          {/* Tactical Chess Mastermind Aura (Background Glow) */}
          {state === 'attack' && (
            <g opacity="0.8">
              {/* Chessboard grid energy projection */}
              <path
                d="M 20,10 L 36,2 L 36,36 L 20,28 Z"
                fill="url(#chessGrid)"
                opacity="0.4"
              />
              <circle cx="28" cy="18" r="8" fill="#e11d48" opacity="0.3" className="animate-ping" />
            </g>
          )}

          {state === 'victory' && (
            <g opacity="0.7">
              <circle cx="18" cy="20" r="14" stroke="#facc15" strokeWidth="1" strokeDasharray="2 2" fill="none" className="animate-spin-slow" />
              <polygon points="18,2 20,6 24,6 21,9 22,13 18,10 14,13 15,9 12,6 16,6" fill="#fde047" opacity="0.6" />
            </g>
          )}

          {/* Defs for gradients & patterns */}
          <defs>
            <pattern id="chessGrid" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="2" height="2" fill="#c084fc" opacity="0.3" />
              <rect x="2" y="2" width="2" height="2" fill="#f43f5e" opacity="0.3" />
            </pattern>
          </defs>

          {/* AYANOKOJI CHARACTER SPRITE */}
          <g>
            {/* 1. LEGS & LOAFERS */}
            {state === 'defeat' ? (
              // Defeat Pose: Kneeling calmly on one knee with stoic poise
              <g>
                {/* Left Leg (Kneeling) */}
                <rect x="10" y="32" width="8" height="6" fill="#0d9488" />
                <rect x="10" y="32" width="8" height="2" fill="#0f766e" />
                {/* Right Leg */}
                <rect x="18" y="34" width="9" height="5" fill="#0d9488" />
                {/* White Socks */}
                <rect x="8" y="37" width="3" height="2" fill="#f8fafc" />
                <rect x="26" y="38" width="3" height="2" fill="#f8fafc" />
                {/* Black Loafers */}
                <rect x="6" y="38" width="6" height="3" rx="1" fill="#0f172a" />
                <rect x="25" y="39" width="7" height="3" rx="1" fill="#0f172a" />
              </g>
            ) : state === 'attack' ? (
              // Attack Pose: Forward Lunge Stance
              <g>
                {/* Left Leg (Back) */}
                <rect x="8" y="26" width="6" height="11" fill="#0f766e" />
                <rect x="8" y="34" width="6" height="3" fill="#042f2e" />
                {/* Right Leg (Forward) */}
                <rect x="20" y="25" width="7" height="12" fill="#0d9488" />
                <rect x="22" y="25" width="3" height="12" fill="#14b8a6" />
                {/* Socks */}
                <rect x="9" y="36" width="4" height="2" fill="#f8fafc" />
                <rect x="22" y="36" width="4" height="2" fill="#f8fafc" />
                {/* Black Loafers */}
                <rect x="7" y="37" width="7" height="4" rx="1" fill="#0f172a" />
                <rect x="21" y="37" width="8" height="4" rx="1" fill="#0f172a" />
                <rect x="8" y="38" width="4" height="1" fill="#334155" />
                <rect x="23" y="38" width="5" height="1" fill="#334155" />
              </g>
            ) : (
              // Idle / Normal Stance: Neat standing with teal trousers & loafers
              <g>
                {/* Left Pant Leg */}
                <rect x="11" y="25" width="6" height="12" fill="#0f766e" />
                <rect x="11" y="25" width="2" height="12" fill="#042f2e" />
                {/* Right Pant Leg */}
                <rect x="18" y="25" width="6" height="12" fill="#0d9488" />
                <rect x="20" y="25" width="2" height="12" fill="#14b8a6" />
                {/* Center Crease */}
                <rect x="17" y="25" width="1" height="10" fill="#042f2e" />

                {/* White Socks */}
                <rect x="12" y="36" width="4" height="2" fill="#f8fafc" />
                <rect x="19" y="36" width="4" height="2" fill="#f8fafc" />

                {/* Black Loafer Shoes */}
                <rect x="10" y="37" width="7" height="4" rx="1" fill="#0f172a" />
                <rect x="18" y="37" width="7" height="4" rx="1" fill="#0f172a" />
                <rect x="11" y="38" width="4" height="1" fill="#334155" />
                <rect x="19" y="38" width="4" height="1" fill="#334155" />
              </g>
            )}

            {/* 2. TORSO & RED MAGENTA BLAZER UNIFORM */}
            <g transform={state === 'defeat' ? 'translate(0, 5)' : ''}>
              {/* White Dress Shirt Inner */}
              <rect x="15" y="13" width="6" height="13" fill="#ffffff" />
              <rect x="17" y="13" width="2" height="13" fill="#e2e8f0" />

              {/* Navy Blue Necktie */}
              <path d="M 17,14 L 19,14 L 18.5,21 L 17.5,21 Z" fill="#1e3a8a" />
              <polygon points="17.5,21 18.5,21 18,23" fill="#1d4ed8" />

              {/* Red Crimson Blazer Main Body */}
              <rect x="11" y="13" width="14" height="12" fill="#e11d48" />
              {/* Blazer Shadow (Left side) */}
              <rect x="11" y="13" width="3" height="12" fill="#be123c" />
              {/* Blazer Highlight (Right side) */}
              <rect x="21" y="13" width="3" height="12" fill="#f43f5e" />

              {/* Gold Lapel Trim (Iconic School Uniform Detail) */}
              {/* Left Gold Lapel Border */}
              <path d="M 13,13 L 15,13 L 16,21 L 14,21 Z" fill="#fbbf24" />
              <path d="M 13.5,13 L 14.5,13 L 15.5,21 L 14.5,21 Z" fill="#fef08a" />
              {/* Right Gold Lapel Border */}
              <path d="M 21,13 L 23,13 L 22,21 L 20,21 Z" fill="#fbbf24" />
              <path d="M 21.5,13 L 22.5,13 L 21.5,21 L 20.5,21 Z" fill="#fef08a" />

              {/* Dark Pocket Trim & Gold Buttons */}
              <rect x="12" y="19" width="3" height="1" fill="#1e293b" />
              <rect x="21" y="19" width="3" height="1" fill="#1e293b" />

              {/* Left Arm (In Pocket for Idle) */}
              {state === 'idle' || state === 'hit' ? (
                <g>
                  {/* Sleeve bent with hand in trouser pocket */}
                  <path d="M 11,14 L 8,18 L 10,24 L 13,22 Z" fill="#be123c" />
                  <path d="M 9,18 L 11,23 M 10,23" stroke="#9f1239" strokeWidth="1" />
                  {/* Gold cuff buttons */}
                  <circle cx="10" cy="22" r="0.5" fill="#facc15" />
                  <circle cx="11" cy="23" r="0.5" fill="#facc15" />
                </g>
              ) : state === 'attack' ? (
                // Arm thrusting back for balance
                <path d="M 11,14 L 5,18 L 7,23 L 12,21 Z" fill="#be123c" />
              ) : (
                <path d="M 11,14 L 8,20 L 10,24 L 13,22 Z" fill="#be123c" />
              )}
            </g>

            {/* 3. HEAD & AYANOKOJI HAIR / FACE */}
            <g transform={state === 'defeat' ? 'translate(0, 5)' : ''}>
              {/* Neck */}
              <rect x="16" y="11" width="4" height="3" fill="#fed7aa" />
              <rect x="16" y="12" width="4" height="1" fill="#fdba74" />

              {/* Face Base */}
              <rect x="14" y="5" width="8" height="7" fill="#ffedd5" />
              {/* Jaw & Chin outline */}
              <polygon points="14,10 16,12 20,12 22,10 22,5 14,5" fill="#ffedd5" />
              <rect x="14" y="10" width="2" height="2" fill="#fed7aa" />

              {/* Eyes & Stoic Expression */}
              {state === 'defeat' ? (
                // Defeat: Eyes closed in calm stoic shadow
                <g>
                  <line x1="18" y1="8" x2="21" y2="8" stroke="#78350f" strokeWidth="1" />
                  <rect x="14" y="5" width="8" height="3" fill="#000000" opacity="0.25" />
                </g>
              ) : (
                // Normal Ayanokoji Eyes: Calm, analytical amber/golden gaze facing right
                <g>
                  {/* Right Eye (Primary) */}
                  <rect x="18" y="7" width="3" height="2" fill="#ffffff" />
                  <rect x="19" y="7" width="2" height="2" fill="#d97706" />
                  <rect x="20" y="7" width="1" height="1" fill="#451a03" />
                  <rect x="19" y="7" width="1" height="0.5" fill="#fef08a" />
                  {/* Eye lid / eyebrow line */}
                  <line x1="18" y1="6" x2="21" y2="6" stroke="#991b1b" strokeWidth="0.8" />

                  {/* Left Eye (Perspective edge) */}
                  <rect x="15" y="7" width="2" height="2" fill="#ffffff" />
                  <rect x="16" y="7" width="1" height="2" fill="#d97706" />
                  <line x1="15" y1="6" x2="17" y2="6" stroke="#991b1b" strokeWidth="0.8" />

                  {/* Neutral Stoic Mouth */}
                  <rect x="18" y="10" width="2" height="0.5" fill="#9a3412" />
                </g>
              )}

              {/* AYANOKOJI CRIMSON HAIR (Layered Bangs & Spikes) */}
              <g>
                {/* Back / Top Spikes */}
                <path d="M 12,5 L 14,1 L 18,0 L 22,1 L 24,4 L 23,7 L 13,7 Z" fill="#b91c1c" />
                <path d="M 15,1 L 18,0 L 21,2 Z" fill="#ef4444" /> {/* Top Highlight */}

                {/* Side Hair Tufts (Framing cheeks) */}
                <path d="M 12,4 L 11,8 L 13,10 L 14,7 Z" fill="#991b1b" />
                <path d="M 22,4 L 25,8 L 23,10 L 22,6 Z" fill="#b91c1c" />

                {/* Signature Layered Forehead Bangs */}
                {/* Bang 1 (Center-right spike) */}
                <path d="M 18,3 L 19,8 L 21,8 L 20,3 Z" fill="#dc2626" />
                {/* Bang 2 (Center-left spike) */}
                <path d="M 16,3 L 17,7 L 18.5,7 L 17,3 Z" fill="#b91c1c" />
                {/* Bang 3 (Right edge bang) */}
                <path d="M 20,4 L 22,8 L 23,7 L 21,4 Z" fill="#ef4444" />
                {/* Bang 4 (Far left strand) */}
                <path d="M 14,3 L 15,7 L 16,6 L 15,3 Z" fill="#7f1d1d" />
              </g>
            </g>

            {/* 4. RIGHT ARM & BLACK CHESS PIECE (MASTERMIND MOTIF) */}
            <g transform={state === 'defeat' ? 'translate(0, 5)' : ''}>
              {state === 'attack' ? (
                // ATTACK: Reaching forward, holding out Black Chess King, releasing mind blade!
                <g>
                  {/* Extended Arm */}
                  <rect x="22" y="14" width="8" height="4" fill="#f43f5e" />
                  <rect x="22" y="14" width="8" height="1" fill="#fbbf24" /> {/* Gold cuff trim */}
                  {/* White Cuff & Hand */}
                  <rect x="29" y="14" width="2" height="4" fill="#ffffff" />
                  <rect x="30" y="15" width="2" height="3" fill="#ffedd5" />

                  {/* Black Chess King Piece */}
                  <g transform="translate(31, 11)">
                    <rect x="1" y="5" width="4" height="2" fill="#18181b" />
                    <rect x="2" y="2" width="2" height="4" fill="#27272a" />
                    <polygon points="1,2 3,0 5,2" fill="#18181b" />
                    {/* Tiny Gold Crown Top */}
                    <rect x="2.5" y="-1" width="1" height="2" fill="#facc15" />
                  </g>

                  {/* Slash / Mind Energy Effect from Chess Piece */}
                  <path
                    d="M 33,2 Q 38,15 32,28"
                    fill="none"
                    stroke="#c084fc"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  <path
                    d="M 34,6 Q 37,15 34,24"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              ) : state === 'victory' ? (
                // VICTORY: Holding Chess Piece High calmly
                <g>
                  {/* Arm raised up */}
                  <rect x="22" y="10" width="4" height="7" fill="#f43f5e" />
                  <rect x="22" y="10" width="4" height="1" fill="#fbbf24" />
                  <rect x="22" y="8" width="4" height="2" fill="#ffffff" />
                  <rect x="22" y="6" width="3" height="3" fill="#ffedd5" />

                  {/* Black Chess King Held Up */}
                  <g transform="translate(22, 0)">
                    <rect x="0" y="4" width="5" height="2" fill="#18181b" />
                    <rect x="1" y="1" width="3" height="4" fill="#27272a" />
                    <polygon points="0,1 2.5,-1 5,1" fill="#18181b" />
                    <rect x="2" y="-2" width="1" height="2" fill="#facc15" />
                  </g>
                </g>
              ) : state === 'defeat' ? (
                // DEFEAT: Hand on ground with chess piece lying down
                <g>
                  <rect x="20" y="22" width="3" height="5" fill="#be123c" />
                  <rect x="20" y="27" width="3" height="2" fill="#ffedd5" />
                  {/* Chess piece on ground */}
                  <rect x="22" y="29" width="4" height="2" fill="#18181b" />
                </g>
              ) : (
                // IDLE: Right hand holding Black Chess King in front of chest
                <g>
                  {/* Right Arm bent towards chest */}
                  <path d="M 22,14 L 26,17 L 24,21 L 20,18 Z" fill="#e11d48" />
                  <path d="M 23,17 L 25,20" stroke="#f43f5e" strokeWidth="1" />
                  {/* Gold sleeve cuff trim */}
                  <rect x="23" y="19" width="3" height="1" fill="#fbbf24" />
                  <rect x="23" y="20" width="2" height="1.5" fill="#ffffff" />
                  <rect x="24" y="18" width="2" height="2" fill="#ffedd5" />

                  {/* Black Chess King Piece held between fingers */}
                  <g transform="translate(25, 14)">
                    <rect x="1" y="4" width="4" height="2" fill="#18181b" />
                    <rect x="2" y="1" width="2" height="4" fill="#27272a" />
                    <polygon points="1,1 3,-1 5,1" fill="#18181b" />
                    <rect x="2.5" y="-2" width="1" height="1.5" fill="#facc15" />
                  </g>
                </g>
              )}
            </g>
          </g>

          {/* Red Hit Flash Overlay */}
          {state === 'hit' && (
            <rect x="0" y="0" width="36" height="44" fill="#ef4444" opacity="0.4" />
          )}
        </svg>
      </div>
    </div>
  );
};
