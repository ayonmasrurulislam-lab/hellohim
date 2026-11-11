import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { proposalConfig } from '../config/proposalConfig';

export const StarrySkySection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [constellationDrawn, setConstellationDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 480);

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 65 : 130;

    interface Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      alphaSpeed: number;
    }

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }

    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        alphaSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1)
      });
    }

    // Parametric heart constellation points
    const heartNodesCount = 14;
    const heartNodes: { x: number; y: number }[] = [];
    const centerX = width / 2;
    const centerY = height / 2 - 20;
    const scale = isMobile ? 7 : 11;

    for (let i = 0; i < heartNodesCount; i++) {
      const t = (i / heartNodesCount) * Math.PI * 2;
      // Heart parametric formula
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      heartNodes.push({
        x: centerX + x * scale,
        y: centerY + y * scale
      });
    }

    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 80,
      speed: 9,
      angle: Math.PI / 4,
      opacity: 0,
      active: false
    };

    let animationFrameId: number;
    let progress = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw twinkling background stars
      for (const star of stars) {
        star.alpha += star.alphaSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.15) {
          star.alphaSpeed *= -1;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Shooting Star occasionally
      if (!shootingStar.active && Math.random() < 0.012) {
        shootingStar = {
          x: Math.random() * (width * 0.6),
          y: Math.random() * (height * 0.4),
          length: Math.random() * 60 + 60,
          speed: Math.random() * 6 + 8,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          opacity: 1,
          active: true
        };
      }

      if (shootingStar.active) {
        const endX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length;
        const endY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length;

        const grad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, endX, endY);
        grad.addColorStop(0, `rgba(255, 240, 200, 0)`);
        grad.addColorStop(1, `rgba(255, 240, 200, ${shootingStar.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.018;

        if (shootingStar.opacity <= 0) {
          shootingStar.active = false;
        }
      }

      // 3. Connect constellation points with glowing gold line
      if (progress < 1) {
        progress += 0.005;
      } else {
        setConstellationDrawn(true);
      }

      const drawCount = Math.floor(progress * heartNodes.length);

      // Constellation lines
      ctx.strokeStyle = 'rgba(232, 180, 184, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);

      ctx.beginPath();
      for (let i = 0; i <= drawCount && i < heartNodes.length; i++) {
        const node = heartNodes[i];
        if (i === 0) {
          ctx.moveTo(node.x, node.y);
        } else {
          ctx.lineTo(node.x, node.y);
        }
      }
      if (progress >= 1 && heartNodes.length > 0) {
        ctx.lineTo(heartNodes[0].x, heartNodes[0].y); // close the loop
      }
      ctx.stroke();
      ctx.setLineDash([]); // reset dash

      // Constellation star nodes
      for (let i = 0; i < heartNodes.length; i++) {
        const node = heartNodes[i];
        const isDrawn = i <= drawCount;
        const nodeAlpha = isDrawn ? 0.9 : 0.2;

        // Glowing outer halo
        const haloGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8);
        haloGrad.addColorStop(0, `rgba(253, 230, 138, ${nodeAlpha * 0.8})`);
        haloGrad.addColorStop(1, 'rgba(253, 230, 138, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Node center
        ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = 480;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="starry-sky" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto z-20">
      {/* Container with deep cosmic aura */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-[#E8B4B8]/20 shadow-2xl shadow-indigo-950/60 p-6 sm:p-10 text-center">
        {/* Canvas for stars and constellation */}
        <canvas
          ref={canvasRef}
          className="w-full h-[400px] sm:h-[460px] block"
          aria-hidden="true"
        />

        {/* Text Reveal Below or Overlaid */}
        <div className="relative z-10 -mt-16 sm:-mt-20 max-w-xl mx-auto pb-6">
          <p className="font-sans text-xs tracking-widest text-[#E8B4B8] uppercase mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FCD34D]" />
            Constellation of Us
            <Sparkles className="w-3.5 h-3.5 text-[#FCD34D]" />
          </p>
          <blockquote className="font-serif-cormorant text-2xl sm:text-3xl md:text-4xl text-[#F9E8D2] font-normal italic leading-relaxed">
            "{proposalConfig.starryQuote}"
          </blockquote>
          <p className="font-script text-2xl sm:text-3xl text-[#FDE68A] mt-4">
            Forever aligned with you
          </p>
        </div>
      </div>
    </section>
  );
};
