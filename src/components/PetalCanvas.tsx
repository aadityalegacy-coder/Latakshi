import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
}

export const PetalCanvas: React.FC<{ active?: boolean }> = ({ active = true }) => {
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

    // Romantic daughter's day petals: soft rose, blush pink, apricot coral, and champagne gold
    const petalColors = ['#fb7185', '#f43f5e', '#fda4af', '#f472b6', '#fb923c', '#fed7aa', '#fde68a'];

    const count = 35;
    const petals: Petal[] = [];

    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 7 + Math.random() * 11,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: 0.6 + Math.random() * 1.2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        opacity: 0.25 + Math.random() * 0.5,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (active) {
        petals.forEach((p) => {
          p.x += p.speedX + Math.sin(p.y * 0.01) * 0.35;
          p.y += p.speedY;
          p.rotation += p.rotSpeed;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;

          // Draw marigold petal shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.6, p.size * 1.1, 0, 0, Math.PI * 2);
          ctx.fill();

          // Delicate petal crease
          ctx.strokeStyle = 'rgba(255,255,255,0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 0.8);
          ctx.lineTo(0, p.size * 0.8);
          ctx.stroke();

          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: active ? 1 : 0, transition: 'opacity 0.5s ease' }}
    />
  );
};
