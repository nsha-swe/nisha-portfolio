"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface StackedCardProps {
  children: ReactNode;
  index: number;
  className?: string;
}

export default function StackedCard({ children, index, className = "" }: StackedCardProps) {
  const [isActive, setIsActive] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsActive(entry.isIntersecting && entry.intersectionRatio > 0.5);
        });
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [prefersReducedMotion]);

  // Calculate top offset: 96px base + 24px per index
  const topOffset = 96 + index * 24;

  return (
    <div
      ref={cardRef}
      className={className}
      style={
        prefersReducedMotion
          ? {}
          : {
              position: "relative",
            }
      }
    >
      <div
        className={
          prefersReducedMotion
            ? ""
            : `lg:sticky lg:transition-transform lg:transition-opacity lg:duration-300 ${
                isActive ? "lg:opacity-100 lg:translate-y-0" : "lg:opacity-90 lg:translate-y-1"
              }`
        }
        style={
          prefersReducedMotion
            ? {}
            : {
                top: `${topOffset}px`,
              }
        }
      >
        {children}
      </div>
    </div>
  );
}
