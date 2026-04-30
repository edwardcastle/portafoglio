"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, direction = "up", delay = 0, className }: RevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [-60, 0] : direction === "right" ? [60, 0] : [0, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [40, 0] : [0, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x, y }}
      className={className}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface GlowOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowOnScroll({ children, className }: GlowOnScrollProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className={`relative ${className || ""}`}
    >
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute -inset-1 rounded-xl bg-accent/20 blur-xl -z-10"
      />
      {children}
    </motion.div>
  );
}
