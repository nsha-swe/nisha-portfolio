import { Brawler } from "next/font/google";
import { Metadata } from "next";
import Link from "next/link";
import Section from "../components/Section";
import TransactionTimeline from "./components/TransactionTimeline";
import ReconciliationExplorer from "./components/ReconciliationExplorer";

const brawler = Brawler({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Tally — Interactive Tools | Nisha Ahamed",
  description: "Tally: Interactive fintech tools for payment surfaces. Transaction Timeline and Reconciliation Explorer with simulated USD data—no external APIs required.",
};

export default function FintechLabPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.06),transparent_60%)]">
      {/* Header */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-16 sm:pt-24">
        <div className="flex flex-col gap-2 mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-black/60 hover:text-black transition-colors"
          >
            ← Back to home
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-medium backdrop-blur-md w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Tally
          </div>
        </div>
        <h1 className={`${brawler.className} text-5xl sm:text-6xl tracking-[-0.02em] leading-[1.05] mb-4`}>
          Tally
        </h1>
        <p className="max-w-3xl text-black/70 text-lg leading-relaxed mb-6">
          Interactive tools to explore payment processing and reconciliation concepts. All data is generated
          locally—no external APIs or real transactions.
        </p>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 max-w-3xl">
          <p className="text-sm text-amber-900">
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

      <footer className="relative z-10 mx-auto max-w-5xl px-6 pb-16 text-xs text-black/50">
        <Link href="/" className="hover:text-black transition-colors">
          ← Back to home
        </Link>
      </footer>
    </main>
  );
}

