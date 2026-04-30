"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const CONNECTION_DISTANCE = 150;
const MOUSE_RADIUS = 100;
const MOUSE_FORCE = 0.5;
const BASE_SPEED = 0.3;
const SCROLL_SPEED_MULTIPLIER = 3;

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const scrollVelocity = useScrollVelocity();

  const getParticleCount = useCallback(() => {
    if (typeof window === "undefined") return 80;
    const width = window.innerWidth;
    if (width < 768) return 40;
    if (width < 1200) return 60;
    return 80;
  }, []);

  const initParticles = useCallback(
    (width: number, height: number) => {
      const count = getParticleCount();
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * BASE_SPEED,
          vy: (Math.random() - 0.5) * BASE_SPEED,
          radius: Math.random() * 1.5 + 1,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
      particlesRef.current = particles;
    },
    [getParticleCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = document.documentElement.scrollHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas!.width, canvas!.height);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    }
    window.addEventListener("mousemove", onMouseMove);

    function animate() {
      if (!canvas || !ctx) return;
      if (document.hidden) {
        animFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const speedMultiplier =
        1 + Math.min(scrollVelocity.current * SCROLL_SPEED_MULTIPLIER, 4);
      const particles = particlesRef.current;
      const scrollY = window.scrollY;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * MOUSE_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (Math.abs(p.vx) < BASE_SPEED * 0.1) {
          p.vx += (Math.random() - 0.5) * 0.02;
        }
        if (Math.abs(p.vy) < BASE_SPEED * 0.1) {
          p.vy += (Math.random() - 0.5) * 0.02;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        if (p.y > scrollY - 200 && p.y < scrollY + window.innerHeight + 200) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
          ctx.fill();
        }
      }

      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        if (pi.y < scrollY - 200 || pi.y > scrollY + window.innerHeight + 200)
          continue;
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.2;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [initParticles, scrollVelocity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
