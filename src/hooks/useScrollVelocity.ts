"use client";

import { useEffect, useRef } from "react";

export function useScrollVelocity() {
  const velocity = useRef(0);
  const lastScroll = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    let rafId: number;

    function update() {
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        const currentScroll = window.scrollY;
        const newVelocity = Math.abs(currentScroll - lastScroll.current) / dt;
        velocity.current = velocity.current * 0.8 + newVelocity * 0.2;
        lastScroll.current = currentScroll;
        lastTime.current = now;
      }
      rafId = requestAnimationFrame(update);
    }

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return velocity;
}
