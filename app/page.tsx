import Link from "next/link";
import Section from "./components/Section";
import HighlightCard from "./components/HighlightCard";
import StackedCard from "./components/StackedCard";
import SpotlightBg from "./components/SpotlightBg";
import ScrollReveal from "./components/ScrollReveal";

export default function Page() {
  return (
    <main className="min-h-screen relative" style={{ background: "var(--bg)" }}>
      <SpotlightBg />

      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-16">
        <div className="mb-6">
          <span className="glass-pill">
            <span className="glow-dot" />
            Available for opportunities
          </span>
        </div>
        <h1
          className="font-headline text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          style={{ color: "var(--fg)" }}
        >
          Nisha Ahamed
        </h1>
        <h2
          className="font-headline text-2xl sm:text-3xl font-medium tracking-tight leading-[1.3] mb-6"
          style={{ color: "rgba(240,240,255,0.75)" }}
        >
          Full-stack engineer focused on product systems,&nbsp;transactional
          flows, and modern web architecture.
        </h2>
        <p
          className="max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          I build frontend-first platforms on top of rules-driven backends,
          working across React, APIs, and data layers in fintech-adjacent and
          health-tech domains.
        </p>
      </header>

      {/* ── What I'm Building Now ──────────────────────────── */}
      <Section className="py-8">
        <ScrollReveal>
          <div className="glass p-6 sm:p-8">
            <h2 className="font-headline text-2xl font-semibold mb-6" style={{ color: "var(--fg)" }}>
              {"What I'm building now"}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Mishty */}
              <div className="glass glass-hover p-5">
                <span className="glass-pill mb-4">Web App</span>
                <div className="text-sm font-semibold leading-tight mb-2" style={{ color: "var(--fg)" }}>
                  Mishty
                </div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                  Production-style full-stack system with real-time features and robust error handling.
                  Topic? Top secret 😉 Check back for updates!
                </div>
              </div>

              {/* Tally */}
              <Link
                href="/tally"
                className="glass glass-hover p-5 block"
              >
                <span className="glass-pill mb-4">Fintech</span>
                <div className="text-sm font-semibold leading-tight mb-2" style={{ color: "var(--fg)" }}>
                  Tally
                </div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                  Mini sandbox for transactional product surfaces — payments-style timeline and reconciliation
                  explorer with simulated USD data.
                </div>
              </Link>

              {/* Benefits Wallet */}
              <div className="glass glass-hover p-5">
                <span className="glass-pill mb-4">Mobile App</span>
                <div className="text-sm font-semibold leading-tight mb-2" style={{ color: "var(--fg)" }}>
                  Benefits Wallet
                </div>
                <div className="text-xs leading-relaxed mb-2" style={{ color: "var(--muted)" }}>
                  A mobile-first wallet experience modeling claims and cost-share as a transaction timeline.
                  Planned screens: Timeline, Claim detail, Dispute flow, Reconciliation summary.
                  Tech: Expo + React Native + TypeScript.
                </div>
                <div className="text-[10px] italic" style={{ color: "rgba(240,240,255,0.35)" }}>
                  Concept + prototype in progress.
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Highlights ────────────────────────────────────── */}
      <Section>
        <ScrollReveal>
          <h2 className="font-headline text-3xl font-semibold mb-6" style={{ color: "var(--fg)" }}>
            Highlights
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <HighlightCard
              title="Payment Processing"
              description="Built and maintained payment gateway integrations handling millions in transaction volume. Implemented idempotency, retry logic, and webhook verification."
              badge="Backend"
            />
            <HighlightCard
              title="Transaction Reconciliation"
              description="Designed automated reconciliation system matching bank statements to ledger entries. Reduced manual review time by 80% through fuzzy matching algorithms."
              badge="Systems"
            />
            <HighlightCard
              title="Frontend Architecture"
              description="Led migration to React with TypeScript, improving type safety and developer velocity. Established component library and design system patterns."
              badge="Frontend"
            />
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Featured Case Study ───────────────────────────── */}
      <Section>
        <ScrollReveal>
          <StackedCard index={0}>
            <div className="glass glass-hover p-8">
              <div className="flex items-center gap-2 mb-5">
                <span className="glass-pill">Case Study</span>
              </div>
              <h2 className="font-headline text-3xl font-semibold mb-4" style={{ color: "var(--fg)" }}>
                Payment Gateway Reliability
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                Redesigned payment processing pipeline to handle peak traffic and reduce failed transactions.
                Implemented circuit breakers, exponential backoff, and comprehensive monitoring.
                System now processes 10x volume with 99.9% uptime during critical payment windows.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Challenge", value: "High failure rate during peak hours" },
                  { label: "Solution", value: "Resilient architecture with graceful degradation" },
                  { label: "Impact", value: "99.9% uptime, 10x capacity" },
                ].map(({ label, value }) => (
                  <div key={label} className="glass-sm p-4">
                    <div
                      className="text-xs font-mono uppercase tracking-wider mb-1"
                      style={{ color: "var(--accent)" }}
                    >
                      {label}
                    </div>
                    <div className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </StackedCard>
        </ScrollReveal>
      </Section>

      {/* ── Fintech Focus Areas ───────────────────────────── */}
      <Section>
        <ScrollReveal>
          <h2 className="font-headline text-3xl font-semibold mb-6" style={{ color: "var(--fg)" }}>
            Fintech Focus Areas
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <HighlightCard
              title="Payments & Transaction Flows"
              description="Designing reliable payment pipelines with proper error handling, idempotency, and audit trails. Experience with Stripe, Plaid, and custom payment processors."
            />
            <HighlightCard
              title="Reconciliation & Ledger Systems"
              description="Building automated reconciliation engines that match transactions across multiple sources. Implementing double-entry accounting principles in distributed systems."
            />
            <HighlightCard
              title="Risk & Verification"
              description="Developing fraud detection systems with rule engines and ML models. Implementing KYC/AML workflows and transaction monitoring."
            />
            <HighlightCard
              title="Reliability & Observability"
              description="Ensuring financial systems meet strict uptime requirements. Implementing comprehensive logging, monitoring, and alerting for critical paths."
            />
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Tally ─────────────────────────────────────────── */}
      <Section>
        <ScrollReveal>
          <StackedCard index={1}>
            <div className="glass glass-hover p-8">
              <div className="flex items-center gap-2 mb-5">
                <span className="glass-pill">Interactive Tools</span>
              </div>
              <h2 className="font-headline text-3xl font-semibold mb-4" style={{ color: "var(--fg)" }}>
                Tally
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                Tally is a transactional sandbox featuring a payments-style timeline and a reconciliation
                explorer that models ledger adjustments and mismatches using simulated USD data.
              </p>
              <Link href="/tally" className="btn-primary">
                Explore Tally →
              </Link>
            </div>
          </StackedCard>
        </ScrollReveal>
      </Section>

      {/* ── DockIQ ────────────────────────────────────────── */}
      <Section>
        <ScrollReveal>
          <StackedCard index={2}>
            <div className="glass glass-hover p-8">
              <div className="flex items-center gap-2 mb-5">
                <span className="glass-pill">Systems Project</span>
              </div>
              <h2 className="font-headline text-3xl font-semibold mb-4" style={{ color: "var(--fg)" }}>
                DockIQ
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                DockIQ is a real-time container monitoring platform that surfaces live Docker metrics through
                WebSockets, Prometheus, and a React dashboard — designed for observability, operational
                clarity, and performance insight.
              </p>
              <div className="grid gap-4 sm:grid-cols-3 mb-6">
                {[
                  { label: "Real-time Metrics", value: "CPU, memory, network I/O, PIDs" },
                  { label: "Live Container Status", value: "WebSocket-driven updates" },
                  { label: "Monitoring Stack", value: "Dockerode, Prometheus, Grafana" },
                ].map(({ label, value }) => (
                  <div key={label} className="glass-sm p-4">
                    <div
                      className="text-xs font-mono uppercase tracking-wider mb-1"
                      style={{ color: "var(--accent)" }}
                    >
                      {label}
                    </div>
                    <div className="text-sm" style={{ color: "var(--muted)" }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <div
                  className="text-xs font-mono uppercase tracking-wider mb-3"
                  style={{ color: "var(--muted)" }}
                >
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React","TypeScript","Material UI","WebSockets",
                    "Node.js","Express","Dockerode","Prometheus","Grafana","Docker",
                  ].map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
              <a
                href="https://dock-iq.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View DockIQ →
              </a>
            </div>
          </StackedCard>
        </ScrollReveal>
      </Section>

      {/* ── Stack + Experience ────────────────────────────── */}
      <Section>
        <ScrollReveal>
          <h2 className="font-headline text-3xl font-semibold mb-6" style={{ color: "var(--fg)" }}>
            Stack + Experience
          </h2>
          <div className="glass p-8">
            <div className="space-y-8">
              {/* Stack */}
              <div>
                <h3 className="text-xl font-semibold mb-5" style={{ color: "var(--fg)" }}>
                  Stack
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      label: "Languages",
                      chips: ["JavaScript","TypeScript","Python","SQL","C#"],
                    },
                    {
                      label: "Frameworks & Libraries",
                      chips: ["React","Next.js","Redux","Express","React Native","Tailwind CSS","Prisma"],
                    },
                    {
                      label: "Data & Infra",
                      chips: ["PostgreSQL","SQL","Docker","Terraform","WebSockets"],
                    },
                    {
                      label: "Testing",
                      chips: ["Jest","React Testing Library","Cypress","Enzyme"],
                    },
                  ].map(({ label, chips }) => (
                    <div key={label}>
                      <div
                        className="text-xs font-mono uppercase tracking-wider mb-2"
                        style={{ color: "var(--muted)" }}
                      >
                        {label}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {chips.map((c) => (
                          <span key={c} className="chip">{c}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div
                className="pt-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--fg)" }}>
                  Experience
                </h3>
                <p className="leading-relaxed" style={{ color: "var(--muted)" }}>
                  Full-stack engineer leaning frontend, focused on building complex product surfaces on top of
                  rules-driven, transactional backends. My work spans React architecture, API orchestration,
                  and Python/SQL service logic supporting eligibility, claims, and cost-share flows that mirror
                  financial authorization and reconciliation patterns.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Contact ───────────────────────────────────────── */}
      <Section>
        <ScrollReveal>
          <div className="glass p-8">
            <h2 className="font-headline text-3xl font-semibold mb-4" style={{ color: "var(--fg)" }}>
              Get in touch
            </h2>
            <p className="mb-6 max-w-2xl leading-relaxed" style={{ color: "var(--muted)" }}>
              {
                "Whether it's to discuss projects, product systems, or whether or not cortados are here to stay — reach out via email, LinkedIn, or GitHub."
              }
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <a className="btn-primary" href="mailto:nsha.swe@gmail.com">
                Email
              </a>
              <a
                className="btn-secondary"
                href="https://www.linkedin.com/in/nisha-ahamed"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="btn-secondary"
                href="https://github.com/nsha-swe"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
            <hr className="glass-divider mb-6" />
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm" style={{ color: "var(--muted)" }}>
                Resume available on request
              </span>
              <a
                className="btn-secondary"
                href="mailto:nsha.swe@gmail.com?subject=Resume%20request%20—%20Nisha%20Ahamed&body=Hi%20Nisha,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20see%20your%20resume.%20Here's%20a%20bit%20of%20context%20on%20the%20role:%0A%0ACompany:%0ARole:%0ALocation:%0A%0AThanks,%0A"
                style={{ fontSize: "0.8rem", padding: "7px 18px" }}
              >
                Request resume
              </a>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <footer
        className="relative z-10 mx-auto max-w-5xl px-6 pb-16 text-xs"
        style={{ color: "rgba(240,240,255,0.3)" }}
      >
        © {new Date().getFullYear()} Nisha Ahamed · New York, NY
      </footer>
    </main>
  );
}
