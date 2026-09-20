import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle color choices: Blue, Green, Yellow, White
    const colors = [
      { r: 56, g: 189, b: 248 }, // Bright Blue (#38BDF8)
      { r: 37, g: 99, b: 235 },  // Primary Blue (#2563EB)
      { r: 34, g: 197, b: 94 },  // Green (#22C55E)
      { r: 250, g: 204, b: 21 }, // Yellow (#FACC15)
      { r: 248, g: 250, b: 252 },// White (#F8FAFC)
    ];

    // Responsive particle count (lightweight)
    const particleCount = Math.min(45, Math.max(18, Math.floor((width * height) / 28000)));
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      baseAlpha: number;
      color: { r: number; g: number; b: number };
      pulseSpeed: number;
      pulseAngle: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.8,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.08, // slow upward drift
        alpha: baseAlpha,
        baseAlpha,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseAngle: Math.random() * Math.PI * 2,
      });
    }

    let gridOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep dark sci-fi background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#05070D');
      bgGrad.addColorStop(0.5, '#070C18');
      bgGrad.addColorStop(1, '#05070D');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Animated Futuristic Sci-Fi Grid
      gridOffset = (gridOffset + 0.15) % 50;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.035)';
      ctx.lineWidth = 1;

      // Vertical grid lines
      const gridSize = 50;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal moving grid lines
      for (let y = gridOffset; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Subtle horizontal perspective horizon line
      const centerY = height * 0.55;
      const horizonGrad = ctx.createRadialGradient(width / 2, centerY, 5, width / 2, centerY, width * 0.6);
      horizonGrad.addColorStop(0, 'rgba(37, 99, 235, 0.06)');
      horizonGrad.addColorStop(0.5, 'rgba(34, 197, 94, 0.02)');
      horizonGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw and update glowing particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulseAngle += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.12;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(0.05, p.alpha)})`;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Background Canvas (Particles + Drifting Grid) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 select-none opacity-90"
      />

      {/* Floating Ambient Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Top-Left Blue Orb */}
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-blue-600/12 blur-[100px] animate-orb-1" />

        {/* Bottom-Right Green Orb */}
        <div className="absolute -bottom-24 -right-24 w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[110px] animate-orb-2" />

        {/* Center-Bottom Subtle Yellow/Gold Energy Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-amber-400/5 blur-[90px] animate-glow pointer-events-none" />
      </div>
    </>
  );
};
