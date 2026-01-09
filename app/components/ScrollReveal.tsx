"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsVisible(true); // Show immediately if reduced motion
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    if (mediaQuery.matches) {
      setIsVisible(true);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once revealed, stop observing (once: true)
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: prefersReducedMotion || isVisible ? 1 : 0,
        transform: prefersReducedMotion || isVisible ? "translateY(0)" : "translateY(8px)",
        transition: prefersReducedMotion
          ? "none"
          : "opacity 0.4s ease-out, transform 0.4s ease-out",
      }}
    >
      {children}
    </div>
  );
}

