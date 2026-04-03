"use client";

import { useEffect, useState, useRef } from "react";

/**
 * AuroraBg — replaces the old editorial spotlight.
 * Three large soft-gradient orbs (purple, blue, teal) that shift
 * slightly with mouse movement, creating liquid-glass depth.
 */
export default function SpotlightBg() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [canParallax, setCanParallax] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const ok =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.matchMedia("(pointer: fine)").matches &&
      window.innerWidth >= 1024;

    setCanParallax(ok);
    if (!ok) return;

    const handleMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setMouse({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const dx = canParallax ? (mouse.x - 0.5) * 60 : 0;
  const dy = canParallax ? (mouse.y - 0.5) * 40 : 0;
  const transition = canParallax ? "transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)" : "none";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Purple orb — top-left */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "65vw",
          height: "65vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.4) 0%, rgba(109,40,217,0.12) 45%, transparent 70%)",
          filter: "blur(70px)",
          transform: `translate(${dx * -0.6}px, ${dy * -0.6}px)`,
          transition,
          willChange: "transform",
        }}
      />

      {/* Blue orb — top-right */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          right: "-10%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.34) 0%, rgba(37,99,235,0.1) 45%, transparent 70%)",
          filter: "blur(80px)",
          transform: `translate(${dx * 0.8}px, ${dy * 0.5}px)`,
          transition,
          willChange: "transform",
        }}
      />

      {/* Teal orb — bottom-centre */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "25%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.28) 0%, rgba(13,148,136,0.08) 45%, transparent 70%)",
          filter: "blur(90px)",
          transform: `translate(${dx * 0.4}px, ${dy * 0.9}px)`,
          transition,
          willChange: "transform",
        }}
      />
    </div>
  );
}
