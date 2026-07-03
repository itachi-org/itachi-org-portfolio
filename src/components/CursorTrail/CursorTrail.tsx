import { useEffect, useRef } from 'react';
import './CursorTrail.css';

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // add near the mouse declaration
    let mouse = { x: -100, y: -100, dx: 0, dy: 0, speed: 0 };
    let lastMoveTime = performance.now(); // NEW

    const TRAIL_FADE_MS = 500;  // how long a trail segment lingers before fully fading
    const GLOW_FADE_MS = 350;   // how long the cursor glow lingers after movement stops

    // Chidori state
    const positions: { x: number; y: number; t: number }[] = [];
    const sparks: { x: number; y: number; vx: number; vy: number; life: number; ttl: number }[] = [];
    const clickBursts: { x: number; y: number; start: number; intensity: number; duration: number; bolts: number; maxRadius: number }[] = [];
    let lastPointerTime = 0;
    const MAX_POS = 14;
    const MAX_SPARKS = 140;
    const baseBlue = 'rgba(120,200,255,';

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    // debug: confirm mounted
    // eslint-disable-next-line no-console
    console.log('CursorTrail mounted');
    // seed an initial position so the effect is visible without moving
    try {
      positions.unshift({ x: window.innerWidth / 2, y: window.innerHeight / 2, t: performance.now() });
    } catch (e) {
      // ignore if positions not defined yet
    }

    const onPointerMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();
      const dx = x - mouse.x;
      const dy = y - mouse.y;
      const dist = Math.max(Math.hypot(dx, dy), 0.001);
      const speed = Math.min(dist * 0.9, 64);
      mouse.x = x;
      mouse.y = y;
      mouse.dx = dx / dist;
      mouse.dy = dy / dist;
      mouse.speed = speed;

      // sample positions for the trail (time-based)
      if (now - lastPointerTime > 20) {
        positions.unshift({ x, y, t: now });
        if (positions.length > MAX_POS) positions.pop();
        lastPointerTime = now;
      }

      // spawn sparks scaled to speed
      const sc = Math.min(5, Math.floor(speed / 8));
      for (let i = 0; i < sc; i++) {
        if (sparks.length > MAX_SPARKS) break;
        const ang = Math.random() * Math.PI * 2;
        const sp = 1 + Math.random() * 3 + speed * 0.02;
        // shorter-lived sparks for snappier aftereffect
        sparks.push({ x: x + (Math.random() - 0.5) * 6, y: y + (Math.random() - 0.5) * 6, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 0, ttl: 220 + Math.random() * 260 });
      }
    };
    window.addEventListener('pointermove', onPointerMove);
    const onPointerDown = (e: PointerEvent) => {
      const now = performance.now();
      const x = e.clientX;
      const y = e.clientY;
      // push a burst that will spawn outward bolts with randomized size/shape and slight delay
      const delay = 80 + Math.random() * 180; // ms
      const bolts = 2 + Math.floor(Math.random() * 2); // 2-3 bolts (smaller)
      const maxRadius = 40 + Math.random() * 100; // 40-140 px (smaller)
      const intensity = 0.6 + Math.random() * 1.2; // 0.6-1.8
      const duration = 200 + Math.random() * 400; // 200-600 ms (shorter)
      clickBursts.push({ x, y, start: now + delay, intensity, duration, bolts, maxRadius });
      // spawn immediate strong sparks
      for (let i = 0; i < 8; i++) {
        if (sparks.length > MAX_SPARKS) break;
        const ang = Math.random() * Math.PI * 2;
        const sp = 3 + Math.random() * 4;
        // shorter immediate sparks to reduce lingering
        sparks.push({ x: x + (Math.random() - 0.5) * 8, y: y + (Math.random() - 0.5) * 8, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 0, ttl: 160 + Math.random() * 320 });
      }
    };
    window.addEventListener('pointerdown', onPointerDown);

    const jitter = (amount: number) => (Math.random() - 0.5) * amount;

    const drawLightning = (ax: number, ay: number, bx: number, by: number, intensity: number, mode: 'jagged' | 'curve' | 'spiral' | 'sine' = 'jagged') => {
      const dist = Math.hypot(bx - ax, by - ay) || 1;
      const segs = Math.max(4, Math.floor(4 + intensity * 6));
      const pts: { x: number; y: number }[] = [];
      const baseAngle = Math.atan2(by - ay, bx - ax);

      for (let i = 0; i <= segs; i++) {
        const t = i / segs;
        let x = ax + (bx - ax) * t;
        let y = ay + (by - ay) * t;

        if (mode === 'jagged') {
          const off = 8 * (1 - Math.abs(0.5 - t)) * intensity;
          x += jitter(off);
          y += jitter(off);
        } else if (mode === 'curve' || mode === 'sine') {
          // perpendicular offset
          const nx = -(by - ay) / dist;
          const ny = (bx - ax) / dist;
          const amp = (dist * 0.18) * (0.6 + Math.random() * 0.9) * intensity;
          const wave = mode === 'sine' ? Math.sin(t * Math.PI * (2 + Math.floor(Math.random() * 3))) : Math.sin(t * Math.PI);
          const off = amp * wave;
          x += nx * off + jitter(4 * intensity);
          y += ny * off + jitter(4 * intensity);
        } else if (mode === 'spiral') {
          // spiral outward from ax,ay
          const spin = 2 + Math.random() * 4; // turns
          const r = t * dist;
          const angle = baseAngle + t * spin * Math.PI * 2 + jitter(0.6);
          x = ax + Math.cos(angle) * r + jitter(6 * (1 - t) * intensity);
          y = ay + Math.sin(angle) * r + jitter(6 * (1 - t) * intensity);
        }

        pts.push({ x, y });
      }

      // draw glow
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.strokeStyle = baseBlue + (0.08 * intensity) + ')';
      ctx.lineWidth = Math.max(6, 12 * intensity);
      ctx.stroke();

      // bright core
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.strokeStyle = baseBlue + '0.98)';
      ctx.lineWidth = Math.max(1.6, 2.2 * intensity);
      ctx.stroke();
      ctx.restore();
    };

    // Dense chaotic core — layered micro-arcs + hot center, additive blending
    const drawChidoriCore = (cx: number, cy: number, speedFactor: number, now: number) => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter'; // additive so overlaps brighten

      const coreRadius = 16 * speedFactor;

      // 1. Outer soft glow (unchanged style, just slightly tighter falloff)
      const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 2.2);
      outerGlow.addColorStop(0, 'rgba(180,230,255,0.5)');
      outerGlow.addColorStop(0.4, 'rgba(120,200,255,0.25)');
      outerGlow.addColorStop(1, 'rgba(120,200,255,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // 2. Dense micro-arc shell — many short chaotic bolts packed around the core
      const arcCount = 14;
      for (let i = 0; i < arcCount; i++) {
        // fresh random angle/radius each frame = chaotic crackle, not smooth orbit
        const angle = Math.random() * Math.PI * 2;
        const innerR = coreRadius * (0.15 + Math.random() * 0.25);
        const outerR = coreRadius * (0.7 + Math.random() * 0.9);
        const ax = cx + Math.cos(angle) * innerR;
        const ay = cy + Math.sin(angle) * innerR;
        const bx = cx + Math.cos(angle + jitter(0.8)) * outerR;
        const by = cy + Math.sin(angle + jitter(0.8)) * outerR;
        drawLightning(ax, ay, bx, by, 0.5 + Math.random() * 0.5, 'jagged');
      }

      // 3. A few slightly longer stray arcs breaking out of the shell (irregular silhouette)
      const strayCount = 4;
      for (let i = 0; i < strayCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = coreRadius * (1.1 + Math.random() * 0.9);
        const ex = cx + Math.cos(angle) * r;
        const ey = cy + Math.sin(angle) * r;
        drawLightning(cx, cy, ex, ey, 0.4 + Math.random() * 0.4, Math.random() < 0.5 ? 'jagged' : 'curve');
      }

      // 4. Small, very bright hot center (tight, not a wide gradient)
      const hot = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 0.5);
      hot.addColorStop(0, 'rgba(255,255,255,0.95)');
      hot.addColorStop(0.5, 'rgba(200,240,255,0.85)');
      hot.addColorStop(1, 'rgba(120,200,255,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = hot;
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      const now = performance.now();

      mouse.speed *= 0.92;

      // age out old trail points (trail behind cursor still fades)
      while (positions.length && now - positions[positions.length - 1].t > TRAIL_FADE_MS) {
        positions.pop();
      }

      // ...click bursts block unchanged...

      // trail fade (unchanged from previous fix)
      for (let i = 0; i < positions.length - 1; i++) {
        const a = positions[i];
        const b = positions[i + 1];
        const age = now - a.t;
        const fade = Math.max(0, 1 - age / TRAIL_FADE_MS);
        if (fade <= 0) continue;
        const speedBoost = 1 + Math.min(mouse.speed / 18, 1.6);
        const intensity = fade * speedBoost;
        drawLightning(a.x, a.y, b.x, b.y, intensity);
      }

      // ...sparks block unchanged...

      // // Chidori glow at cursor — ALWAYS drawn, never fades
      // if (mouse.x >= 0 && mouse.y >= 0) {
      //   const mx = mouse.x;
      //   const my = mouse.y;
      //   const speedFactor = Math.min(1.8, mouse.speed / 12 + 0.6);

      //   const g = ctx.createRadialGradient(mx, my, 0, mx, my, 28 * speedFactor);
      //   g.addColorStop(0, 'rgba(180,230,255,0.95)');
      //   g.addColorStop(0.2, 'rgba(120,200,255,0.6)');
      //   g.addColorStop(1, 'rgba(120,200,255,0)');
      //   ctx.beginPath();
      //   ctx.arc(mx, my, 28 * speedFactor, 0, Math.PI * 2);
      //   ctx.fillStyle = g;
      //   ctx.fill();

      //   if (positions.length > 1) {
      //     // moving (or just stopped, trail still alive): forks from trail history
      //     for (let i = 0; i < Math.min(5, positions.length - 1); i++) {
      //       const p = positions[i];
      //       drawLightning(p.x, p.y, mx + jitter(6), my + jitter(6), 0.6 + 0.6 * (1 - i / 6) * speedFactor);
      //     }
      //   } else {
      //     // fully idle: generate small self-sustaining forks around the cursor
      //     // so the Chidori keeps crackling even with an empty trail
      //     const idleForkCount = 4;
      //     for (let i = 0; i < idleForkCount; i++) {
      //       const angle = (now / 400 + (i / idleForkCount) * Math.PI * 2) % (Math.PI * 2);
      //       const r = 10 + Math.sin(now / 220 + i) * 6;
      //       const ex = mx + Math.cos(angle) * r;
      //       const ey = my + Math.sin(angle) * r;
      //       drawLightning(mx, my, ex, ey, 0.5 + 0.3 * Math.sin(now / 180 + i));
      //     }
      //   }
      // }

      // Chidori core at cursor — ALWAYS drawn, dense and chaotic every frame
      if (mouse.x >= 0 && mouse.y >= 0) {
        const mx = mouse.x;
        const my = mouse.y;
        const speedFactor = Math.min(1.8, mouse.speed / 12 + 0.6);

        drawChidoriCore(mx, my, speedFactor, now);

        // forks still connect from recent trail into the core while moving
        if (positions.length > 1) {
          for (let i = 0; i < Math.min(5, positions.length - 1); i++) {
            const p = positions[i];
            drawLightning(p.x, p.y, mx + jitter(6), my + jitter(6), 0.6 + 0.6 * (1 - i / 6) * speedFactor);
          }
        }
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-canvas" />;
}
