import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'petal' | 'bokeh' | 'heart';
  color: string;
}

export const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Limit particles for mobile battery & performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 22 : 48;

    const colors = [
      'rgba(232, 180, 184, ',  // rose gold
      'rgba(247, 214, 208, ',  // blush pink
      'rgba(249, 232, 210, ',  // champagne
      'rgba(255, 182, 193, '   // soft pink
    ];

    const particles: Particle[] = [];

    const createParticle = (initialY?: number): Particle => {
      const typeRand = Math.random();
      const type: 'petal' | 'bokeh' | 'heart' =
        typeRand < 0.5 ? 'petal' : typeRand < 0.85 ? 'bokeh' : 'heart';

      const baseColor = colors[Math.floor(Math.random() * colors.length)];

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        size:
          type === 'bokeh'
            ? Math.random() * 28 + 12
            : type === 'heart'
            ? Math.random() * 10 + 8
            : Math.random() * 12 + 6,
        speedY: type === 'bokeh' ? -(Math.random() * 0.4 + 0.15) : Math.random() * 0.8 + 0.4,
        speedX: (Math.random() - 0.5) * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.45 + 0.15,
        type,
        color: baseColor
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.scale(size / 15, size / 15);
      c.fillStyle = `${color}${alpha})`;
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(-5, -5, -10, 0, -10, 5);
      c.bezierCurveTo(-10, 10, -5, 15, 0, 18);
      c.bezierCurveTo(5, 15, 10, 10, 10, 5);
      c.bezierCurveTo(10, 0, 5, -5, 0, 0);
      c.fill();
      c.restore();
    };

    const drawPetal = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rotation);
      c.fillStyle = `${p.color}${p.opacity})`;
      c.beginPath();
      c.ellipse(0, 0, p.size * 0.5, p.size, Math.PI / 4, 0, 2 * Math.PI);
      c.fill();
      c.restore();
    };

    const drawBokeh = (c: CanvasRenderingContext2D, p: Particle) => {
      const gradient = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      gradient.addColorStop(0, `${p.color}${p.opacity * 0.8})`);
      gradient.addColorStop(0.5, `${p.color}${p.opacity * 0.3})`);
      gradient.addColorStop(1, `${p.color}0)`);

      c.fillStyle = gradient;
      c.beginPath();
      c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      c.fill();
    };

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 16.6, 2);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speedY * delta;
        p.x += Math.sin(currentTime * 0.001 + i) * 0.3 + p.speedX * delta;
        p.rotation += p.rotationSpeed * delta;

        // Reset particles wrapping top/bottom
        if (p.speedY > 0 && p.y > height + 40) {
          particles[i] = createParticle(-20);
        } else if (p.speedY < 0 && p.y < -40) {
          particles[i] = createParticle(height + 20);
        }

        if (p.type === 'bokeh') {
          drawBokeh(ctx, p);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p);
        } else {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
