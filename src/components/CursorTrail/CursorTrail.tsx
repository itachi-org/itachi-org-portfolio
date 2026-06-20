import { useEffect, useRef } from 'react';
import './CursorTrail.css';

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Touch devices have no real cursor — skip the effect entirely so
    // we don't pay for a hidden canvas/rAF loop on phones and tablets.
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; alpha: number; size: number }[] = [];
    let mouse = { x: -100, y: -100 };

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      particles.push({
        x: mouse.x,
        y: mouse.y,
        alpha: 1,
        size: Math.random() * 3 + 1
      });
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.alpha -= 0.02;
        p.size *= 0.95;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 231, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ffe7';
        ctx.fill();

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-canvas" />;
}
