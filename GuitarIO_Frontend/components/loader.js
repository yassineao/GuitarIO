import React, { useEffect, useRef, useCallback } from 'react';

const STRINGS = [
  { name: 'E', thickness: 4.0, color: '#c9a84c', glowColor: '#ffe08a', freq: 1.8, decay: 2.2 },
  { name: 'A', thickness: 3.4, color: '#c9a84c', glowColor: '#ffe08a', freq: 2.2, decay: 2.0 },
  { name: 'D', thickness: 2.8, color: '#c9a84c', glowColor: '#ffe08a', freq: 2.8, decay: 1.8 },
  { name: 'G', thickness: 2.0, color: '#d4d4d4', glowColor: '#ffffff', freq: 3.4, decay: 1.6 },
  { name: 'B', thickness: 1.4, color: '#d4d4d4', glowColor: '#ffffff', freq: 4.0, decay: 1.4 },
  { name: 'e', thickness: 1.0, color: '#d4d4d4', glowColor: '#ffffff', freq: 4.8, decay: 1.2 },
];

const CANVAS_W = 400;
const CANVAS_H = 220;
const PAD_X = 30;
const STRING_GAP = (CANVAS_H - 60) / (STRINGS.length - 1);
const STRING_Y_START = 30;

const WavyGuitarStrings = ({ compact = false, label = 'Loading' }) => {
  const canvasRef = useRef(null);
  const stateRef = useRef(
    STRINGS.map(() => ({ amplitude: 0, phase: 0, plucking: false, pluckTime: 0 }))
  );
  const animRef = useRef(null);
  const pluckQueueRef = useRef(0);

  const pluckString = useCallback((index) => {
    const s = stateRef.current[index];
    s.amplitude = 12 + Math.random() * 6;
    s.phase = Math.random() * Math.PI * 2;
    s.plucking = true;
    s.pluckTime = performance.now();
  }, []);

  // Auto-pluck strings in a strum pattern
  useEffect(() => {
    let timeout;
    const scheduleStrum = () => {
      const dir = Math.random() > 0.5 ? 1 : -1;
      const start = dir === 1 ? 0 : STRINGS.length - 1;
      for (let i = 0; i < STRINGS.length; i++) {
        const idx = start + i * dir;
        setTimeout(() => pluckString(idx), i * 80 + Math.random() * 30);
      }
      timeout = setTimeout(scheduleStrum, 2000 + Math.random() * 1200);
    };
    // Initial strum
    scheduleStrum();
    return () => clearTimeout(timeout);
  }, [pluckString]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = CANVAS_W * dpr;
    canvas.height = CANVAS_H * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Draw fret lines
      ctx.save();
      for (let f = 0; f < 5; f++) {
        const x = PAD_X + ((CANVAS_W - PAD_X * 2) / 5) * (f + 1);
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, STRING_Y_START - 10);
        ctx.lineTo(x, STRING_Y_START + STRING_GAP * (STRINGS.length - 1) + 10);
        ctx.stroke();
      }
      ctx.restore();

      // Draw each string
      STRINGS.forEach((str, i) => {
        const baseY = STRING_Y_START + i * STRING_GAP;
        const state = stateRef.current[i];

        // Decay amplitude
        if (state.plucking) {
          const elapsed = (now - state.pluckTime) / 1000;
          const decayed = state.amplitude * Math.exp(-elapsed * str.decay);
          if (decayed < 0.15) {
            state.plucking = false;
            state.amplitude = 0;
          } else {
            state.amplitude = decayed;
          }
        }

        const amp = state.amplitude;
        const segments = 120;
        const dx = (CANVAS_W - PAD_X * 2) / segments;

        // Glow layer
        if (amp > 1) {
          ctx.save();
          ctx.shadowColor = str.glowColor;
          ctx.shadowBlur = amp * 1.5;
          ctx.strokeStyle = str.glowColor;
          ctx.globalAlpha = Math.min(amp / 14, 0.5);
          ctx.lineWidth = str.thickness + 2;
          ctx.beginPath();
          for (let s = 0; s <= segments; s++) {
            const x = PAD_X + s * dx;
            const t = s / segments;
            const envelope = Math.sin(t * Math.PI);
            const y = baseY + Math.sin(t * Math.PI * str.freq * 2 + now * 0.012 * str.freq + state.phase) * amp * envelope;
            s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.restore();
        }

        // Main string
        ctx.save();
        ctx.strokeStyle = str.color;
        ctx.lineWidth = str.thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        for (let s = 0; s <= segments; s++) {
          const x = PAD_X + s * dx;
          const t = s / segments;
          const envelope = Math.sin(t * Math.PI);
          const y = baseY + Math.sin(t * Math.PI * str.freq * 2 + now * 0.012 * str.freq + state.phase) * amp * envelope;
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      });

      // Draw nut and bridge
      ctx.save();
      ctx.fillStyle = '#f5e6c8';
      ctx.shadowColor = 'rgba(245,230,200,0.3)';
      ctx.shadowBlur = 6;
      // Nut (left)
      const nutX = PAD_X - 6;
      ctx.beginPath();
      ctx.roundRect(nutX, STRING_Y_START - 12, 6, STRING_GAP * (STRINGS.length - 1) + 24, 2);
      ctx.fill();
      // Bridge (right)
      const bridgeX = CANVAS_W - PAD_X;
      ctx.beginPath();
      ctx.roundRect(bridgeX, STRING_Y_START - 12, 6, STRING_GAP * (STRINGS.length - 1) + 24, 2);
      ctx.fill();
      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div style={{
      background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: compact ? 'auto' : '100vh',
      minHeight: compact ? '360px' : undefined,
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      gap: '24px',
      borderRadius: compact ? '8px' : undefined,
      padding: compact ? '1.5rem' : undefined,
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: CANVAS_W,
          maxWidth: '100%',
          height: CANVAS_H,
          borderRadius: '16px',
          background: 'linear-gradient(180deg, rgba(50,30,15,0.6) 0%, rgba(30,18,8,0.8) 100%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 0 60px rgba(80,50,20,0.15)',
        }}
      />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <span style={{
          color: '#c9a84c',
          fontSize: '15px',
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          fontWeight: 500,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          opacity: 0.85,
        }}>
          {label}
        </span>
        <span style={{ display: 'flex', gap: '4px' }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#c9a84c',
                animation: `loaderDot 1.4s ${i * 0.2}s infinite ease-in-out both`,
              }}
            />
          ))}
        </span>
      </div>
      <style>{`
        @keyframes loaderDot {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default WavyGuitarStrings;
