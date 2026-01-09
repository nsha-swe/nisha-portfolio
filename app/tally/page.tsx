import { Metadata } from "next";
import Link from "next/link";
import Section from "../components/Section";
import TransactionTimeline from "./components/TransactionTimeline";
import ReconciliationExplorer from "./components/ReconciliationExplorer";

export const metadata: Metadata = {
  title: "Tally — Interactive Tools | Nisha Ahamed",
  description: "Tally: Interactive fintech tools for payment surfaces. Transaction Timeline and Reconciliation Explorer with simulated USD data—no external APIs required.",
};

export default function FintechLabPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-12 border-b border-[var(--border)]">
        <div className="flex flex-col gap-2 mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            ← Back to home
          </Link>
          <div className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--panel)] px-3 py-1 text-xs font-mono uppercase tracking-wider text-[var(--muted)] w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Tally
          </div>
        </div>
        <h1 className="font-headline text-5xl sm:text-6xl tracking-tight leading-[1.05] mb-6">
          Tally
        </h1>
        <p className="max-w-3xl text-[var(--muted)] text-lg leading-relaxed mb-6">
          Interactive tools to explore payment processing and reconciliation concepts. All data is generated
          locally—no external APIs or real transactions.
        </p>
        <div className="border border-[var(--border)] bg-white p-4 max-w-3xl">
          <p className="text-sm text-[var(--muted)]">
            <strong>Disclaimer:</strong> These tools use simulated data generated in your browser. They are for
            educational purposes only and do not connect to any payment processors or financial systems.
          </p>
        </div>
      </header>

      {/* Transaction Timeline Tool */}
      <Section>
        <TransactionTimeline />
      </Section>

      {/* Reconciliation Explorer Tool */}
      <Section>
        <ReconciliationExplorer />
      </Section>

      <footer className="relative z-10 mx-auto max-w-5xl px-6 pb-16 text-xs text-[var(--muted)] bg-white">
        <Link href="/" className="hover:text-[var(--fg)] transition-colors">
          ← Back to home
        </Link>
      </footer>
    </main>
  );
}

