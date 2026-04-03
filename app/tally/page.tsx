import { Metadata } from "next";
import Link from "next/link";
import Section from "../components/Section";
import TransactionTimeline from "./components/TransactionTimeline";
import ReconciliationExplorer from "./components/ReconciliationExplorer";
import SpotlightBg from "../components/SpotlightBg";

export const metadata: Metadata = {
  title: "Tally — Interactive Tools | Nisha Ahamed",
  description:
    "Tally: Interactive fintech tools for payment surfaces. Transaction Timeline and Reconciliation Explorer with simulated USD data—no external APIs required.",
};

export default function FintechLabPage() {
  return (
    <main className="min-h-screen relative" style={{ background: "var(--bg)" }}>
      <SpotlightBg />

      {/* Header */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-12">
        <div className="flex flex-col gap-3 mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm transition-colors"
            style={{ color: "var(--muted)" }}
          >
            ← Back to home
          </Link>
          <span className="glass-pill w-fit">
            <span className="glow-dot" />
            Tally
          </span>
        </div>
        <h1
          className="font-headline text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6"
          style={{ color: "var(--fg)" }}
        >
          Tally
        </h1>
        <p
          className="max-w-3xl text-lg leading-relaxed mb-6"
          style={{ color: "var(--muted)" }}
        >
          Interactive tools to explore payment processing and reconciliation concepts. All data
          is generated locally — no external APIs or real transactions.
        </p>
        <div className="glass-sm p-4 max-w-3xl">
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            <strong style={{ color: "var(--fg)" }}>Disclaimer:</strong> These tools use simulated
            data generated in your browser. They are for educational purposes only and do not
            connect to any payment processors or financial systems.
          </p>
        </div>
      </header>

      <Section>
        <TransactionTimeline />
      </Section>

      <Section>
        <ReconciliationExplorer />
      </Section>

      <footer
        className="relative z-10 mx-auto max-w-5xl px-6 pb-16 text-xs"
        style={{ color: "rgba(240,240,255,0.3)" }}
      >
        <Link href="/" className="transition-colors hover:opacity-70">
          ← Back to home
        </Link>
      </footer>
    </main>
  );
}
