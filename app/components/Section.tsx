import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({ children, className = "" }: SectionProps) {
  return (
    <section
      className={`relative z-10 mx-auto max-w-5xl px-6 py-16 ${className}`}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {children}
    </section>
  );
}
