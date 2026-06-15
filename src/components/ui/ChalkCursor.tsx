"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  life: number;
}

const ChalkCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { darkMode } = useTheme();

  // Keep theme value in ref for immediate access inside frame loop
  const themeRef = useRef(darkMode);
  useEffect(() => {
    themeRef.current = darkMode;
  }, [darkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 100;

    // Track cursor coordinates
    const mouse = { x: 0, y: 0, lastX: 0, lastY: 0, active: false };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Color choices matching central variables
    const getChalkColors = () => {
      if (themeRef.current) {
        // Dark Mode Chalk
        return ["#f3f4f6", "#fef08a", "#93c5fd", "#86efac", "#fda4af"];
      } else {
        // Light Mode Ink/Pencil
        return ["#18181b", "#dc2626", "#2563eb", "#52525b"];
      }
    };

    const addParticle = (x: number, y: number, isClick = false) => {
      const colors = getChalkColors();
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const angle = Math.random() * Math.PI * 2;
      const speed = isClick ? Math.random() * 4 + 1 : Math.random() * 1.2 + 0.3;
      const vx = Math.cos(angle) * speed + (mouse.x - mouse.lastX) * 0.15;
      const vy = Math.sin(angle) * speed + (mouse.y - mouse.lastY) * 0.15 - (themeRef.current ? 0.2 : 0); // slight upwards float for chalk dust

      const size = themeRef.current
        ? Math.random() * 3.5 + 1 // Chalk dust is fine
        : Math.random() * 5 + 1.5; // Ink drops can be slightly larger

      particles.push({
        x,
        y,
        vx,
        vy,
        size,
        color,
        alpha: 1,
        decay: isClick ? Math.random() * 0.02 + 0.015 : Math.random() * 0.03 + 0.02,
        life: 1.0
      });

      if (particles.length > maxParticles) {
        particles.shift();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Spawn particles as the cursor moves
      const dist = Math.hypot(mouse.x - mouse.lastX, mouse.y - mouse.lastY);
      if (dist > 3) {
        const steps = Math.min(Math.floor(dist / 3), 3);
        for (let i = 0; i < steps; i++) {
          const ratio = i / steps;
          const px = mouse.lastX + (mouse.x - mouse.lastX) * ratio;
          const py = mouse.lastY + (mouse.y - mouse.lastY) * ratio;
          addParticle(px, py);
        }
      }
    };

    const handleMouseDown = () => {
      // Click burst!
      const burstCount = themeRef.current ? 15 : 8;
      for (let i = 0; i < burstCount; i++) {
        addParticle(mouse.x, mouse.y, true);
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // Support only on devices with fine pointers (mouse) to prevent scroll jank on touchscreens
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (mediaQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousedown", handleMouseDown);
      document.body.addEventListener("mouseleave", handleMouseLeave);
    }

    // Canvas draw and physics loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay;
        p.alpha = Math.max(0, p.life);

        // Apply physics
        if (themeRef.current) {
          // Chalk dust drifting: float slightly with horizontal sway
          p.x += p.vx + Math.sin(p.life * 10) * 0.1;
          p.y += p.vy + 0.15; // slow falling gravity
        } else {
          // Pencil/Ink: drop downwards
          p.x += p.vx;
          p.y += p.vy + 0.25; // standard gravity
        }

        p.vx *= 0.96; // drag
        p.vy *= 0.96;

        if (p.alpha <= 0 || p.size <= 0.1) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        if (themeRef.current) {
          // Chalk dust has soft glowing edges
          ctx.shadowBlur = 4;
          ctx.shadowColor = p.color;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        } else {
          // Ink droplet is slightly organic
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9990] block"
      style={{ mixBlendMode: darkMode ? "screen" : "multiply" }}
    />
  );
};

export default ChalkCursor;
