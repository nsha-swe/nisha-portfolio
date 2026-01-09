"use client";

import { useEffect, useState, useRef } from "react";

export default function SpotlightBg() {
  const [shouldRender, setShouldRender] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const checkConditions = () => {
      if (typeof window === "undefined") return false;

      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return false;

      // Check pointer type
      const prefersFinePointer = window.matchMedia("(pointer: fine)").matches;
      if (!prefersFinePointer) return false;

      // Check viewport width
      if (window.innerWidth < 1024) return false;

      return true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle with requestAnimationFrame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const now = Date.now();
        if (now - lastUpdateRef.current < 16) return; // ~60fps throttle
        lastUpdateRef.current = now;

        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    const initialCheck = checkConditions();
    setShouldRender(initialCheck);

    if (!initialCheck) return;

    // Set initial position to center
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    window.addEventListener("mousemove", handleMouseMove);

    // Check on resize and media query changes
    const mediaQueries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(pointer: fine)"),
    ];

    const handleMediaChange = () => {
      setShouldRender(checkConditions());
    };

    mediaQueries.forEach((mq) => {
      mq.addEventListener("change", handleMediaChange);
    });

    const handleResize = () => {
      setShouldRender(checkConditions());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      mediaQueries.forEach((mq) => {
        mq.removeEventListener("change", handleMediaChange);
      });
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (!shouldRender) {
    // Render static subtle grid background instead
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(0, 0, 0, 0.02) 1px,
              rgba(0, 0, 0, 0.02) 2px
            )
          `,
          opacity: 0.5,
        }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 0, 0, 0.06), transparent 60%)`,
        opacity: 0.08,
        transition: "opacity 0.3s ease-out",
      }}
    />
  );
}

