import Link from "next/link";
import Section from "./components/Section";
import HighlightCard from "./components/HighlightCard";
import StackedCard from "./components/StackedCard";
import SpotlightBg from "./components/SpotlightBg";
import ScrollReveal from "./components/ScrollReveal";

export default function Page() {
  return (
    <main className="min-h-screen bg-white relative">
      <SpotlightBg />
      {/* Hero Section */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-12 border-b border-[var(--border)] bg-white">
        <h1 className="font-headline text-5xl sm:text-6xl tracking-tight leading-[1.1] mb-6">
          Nisha Ahamed
        </h1>
        <h2 className="font-headline text-3xl sm:text-4xl tracking-tight leading-[1.2] mb-6 text-[var(--fg)] font-normal">
          Full-stack engineer focused on product systems, transactional flows, and modern web architecture.
        </h2>
        <p className="max-w-3xl text-[var(--muted)] text-lg leading-relaxed">
          I build frontend-first platforms on top of rules-driven backends, working across React, APIs, and data layers in fintech-adjacent and health-tech domains.
        </p>
      </header>

      {/* What I'm Building Now */}
      <Section className="py-8">
        <ScrollReveal>
          <div className="border border-[var(--border)] bg-white p-6">
          <h2 className="font-headline text-2xl font-semibold mb-4">{"What I'm building now"}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="border border-[var(--border)] bg-white p-4 hover:-translate-y-2 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out focus-within:ring-2 focus-within:ring-[var(--accent)]/20 focus-within:outline-none">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs inline-flex items-center font-mono uppercase tracking-wider text-[var(--muted)] px-2 py-0.5 border border-[var(--border)]">
                  Web App
                </span>
              </div>
              <div className="text-sm font-semibold leading-tight mb-2">Mishty</div>
              <div className="text-xs text-[var(--muted)]">Production-style full-stack system with real-time features and robust error handling. Topic? Top secret 😉 Check back for updates!</div>
            </div>
            <Link
              href="/fintech-lab"
              className="border border-[var(--border)] bg-white p-4 hover:-translate-y-2 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out focus:ring-2 focus:ring-[var(--accent)]/20 focus:outline-none block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs inline-flex items-center font-mono uppercase tracking-wider text-[var(--muted)] px-2 py-0.5 border border-[var(--border)]">
                  Fintech
                </span>
              </div>
              <div className="text-sm font-semibold leading-tight mb-2">Tally</div>
              <div className="text-xs text-[var(--muted)]">Mini sandbox for transactional product surfaces — payments-style timeline and reconciliation explorer with simulated USD data.</div>
            </Link>
            <div className="border border-[var(--border)] bg-white p-4 hover:-translate-y-2 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out focus-within:ring-2 focus-within:ring-[var(--accent)]/20 focus-within:outline-none">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs inline-flex items-center font-mono uppercase tracking-wider text-[var(--muted)] px-2 py-0.5 border border-[var(--border)]">
                  Mobile App
                </span>
              </div>
              <div className="text-sm font-semibold leading-tight mb-2">Benefits Wallet</div>
              <div className="text-xs text-[var(--muted)] mb-2">
                A mobile-first {"wallet"} experience modeling claims and cost-share as a transaction timeline. Internally uses ledger-style adjustments and reconciliation concepts (simulated data). Planned screens: Timeline, Claim detail, Dispute flow, Reconciliation summary. Tech: Expo + React Native + TypeScript.
              </div>
              <div className="text-[10px] text-[var(--muted)] italic">Concept + prototype in progress.</div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </Section>

      {/* Proof/Highlights */}
      <Section>
        <ScrollReveal>
        <h2 className="font-headline text-3xl font-semibold mb-6">Highlights</h2>
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

      {/* Featured Case Study */}
      <Section>
        <ScrollReveal>
        <StackedCard index={0}>
          <div className="border border-[var(--border)] bg-white p-8 hover:-translate-y-2 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs inline-flex items-center font-mono uppercase tracking-wider text-[var(--muted)] px-2 py-0.5 border border-[var(--border)]">
                Case Study
              </span>
            </div>
            <h2 className="font-headline text-3xl font-semibold mb-4">Payment Gateway Reliability</h2>
            <p className="text-[var(--muted)] mb-6 leading-relaxed">
              Redesigned payment processing pipeline to handle peak traffic and reduce failed transactions. 
              Implemented circuit breakers, exponential backoff, and comprehensive monitoring. 
              System now processes 10x volume with 99.9% uptime during critical payment windows.
            </p>
            <div className="grid gap-4 sm:grid-cols-3 mt-6">
              <div>
                <div className="text-sm text-[var(--muted)] mb-1 font-mono uppercase text-xs tracking-wider">Challenge</div>
                <div className="text-sm font-medium">High failure rate during peak hours</div>
              </div>
              <div>
                <div className="text-sm text-[var(--muted)] mb-1 font-mono uppercase text-xs tracking-wider">Solution</div>
                <div className="text-sm font-medium">Resilient architecture with graceful degradation</div>
              </div>
              <div>
                <div className="text-sm text-[var(--muted)] mb-1 font-mono uppercase text-xs tracking-wider">Impact</div>
                <div className="text-sm font-medium">99.9% uptime, 10x capacity</div>
              </div>
            </div>
          </div>
        </StackedCard>
        </ScrollReveal>
      </Section>

      {/* Fintech Interests */}
      <Section>
        <ScrollReveal>
          <h2 className="font-headline text-3xl font-semibold mb-6">Fintech Focus Areas</h2>
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

      {/* Tally */}
      <Section>
        <ScrollReveal>
          <StackedCard index={1}>
            <div className="border border-[var(--border)] bg-white p-8 hover:-translate-y-2 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs inline-flex items-center font-mono uppercase tracking-wider text-[var(--muted)] px-2 py-0.5 border border-[var(--border)]">
                  Interactive Tools
                </span>
              </div>
              <h2 className="font-headline text-3xl font-semibold mb-4">Tally</h2>
              <p className="text-[var(--muted)] mb-6 leading-relaxed">
                Tally is a transactional sandbox featuring a payments-style timeline and a reconciliation explorer that models ledger adjustments and mismatches using simulated USD data.
              </p>
              <Link
                href="/fintech-lab"
                className="inline-flex items-center border border-[var(--fg)] bg-[var(--fg)] text-white px-5 py-2 text-sm font-medium hover:-translate-y-1 hover:opacity-90 transition-all duration-200 ease-out"
              >
                Explore Tally →
              </Link>
            </div>
          </StackedCard>
        </ScrollReveal>
      </Section>

      {/* DockIQ */}
      <Section>
        <ScrollReveal>
          <StackedCard index={2}>
            <div className="border border-[var(--border)] bg-white p-8 hover:-translate-y-2 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs inline-flex items-center font-mono uppercase tracking-wider text-[var(--muted)] px-2 py-0.5 border border-[var(--border)]">
                  Systems Project
                </span>
              </div>
              <h2 className="font-headline text-3xl font-semibold mb-4">DockIQ</h2>
              <p className="text-[var(--muted)] mb-6 leading-relaxed">
                DockIQ is a real-time container monitoring platform that surfaces live Docker metrics through WebSockets, Prometheus, and a React dashboard — designed for observability, operational clarity, and performance insight.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6 mb-6">
                <div>
                  <div className="text-sm font-medium mb-2 font-mono uppercase text-xs tracking-wider text-[var(--muted)]">Real-time Metrics</div>
                  <div className="text-sm text-[var(--muted)]">CPU, memory, network I/O, PIDs</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2 font-mono uppercase text-xs tracking-wider text-[var(--muted)]">Live Container Status</div>
                  <div className="text-sm text-[var(--muted)]">WebSocket-driven updates</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2 font-mono uppercase text-xs tracking-wider text-[var(--muted)]">Monitoring Stack</div>
                  <div className="text-sm text-[var(--muted)]">Dockerode, Prometheus, Grafana</div>
                </div>
              </div>
              <div className="mb-6">
                <div className="text-sm font-medium mb-2 font-mono uppercase text-xs tracking-wider text-[var(--muted)]">Tech Stack</div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center border border-[var(--border)] px-2 py-1 font-mono">React</span>
                  <span className="inline-flex items-center border border-[var(--border)] px-2 py-1 font-mono">TypeScript</span>
                  <span className="inline-flex items-center border border-[var(--border)] px-2 py-1 font-mono">Material UI</span>
                  <span className="inline-flex items-center border border-[var(--border)] px-2 py-1 font-mono">WebSockets</span>
                  <span className="inline-flex items-center border border-[var(--border)] px-2 py-1 font-mono">Node.js</span>
                  <span className="inline-flex items-center border border-[var(--border)] px-2 py-1 font-mono">Express</span>
                  <span className="inline-flex items-center border border-[var(--border)] px-2 py-1 font-mono">Dockerode</span>
                  <span className="inline-flex items-center border border-[var(--border)] px-2 py-1 font-mono">Prometheus</span>
                  <span className="inline-flex items-center border border-[var(--border)] px-2 py-1 font-mono">Grafana</span>
                  <span className="inline-flex items-center border border-[var(--border)] px-2 py-1 font-mono">Docker</span>
                </div>
              </div>
              <a
                href="https://dock-iq.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-[var(--fg)] bg-[var(--fg)] text-white px-5 py-2 text-sm font-medium hover:-translate-y-1 hover:opacity-90 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              >
                View DockIQ →
              </a>
            </div>
          </StackedCard>
        </ScrollReveal>
      </Section>

      {/* Stack + Experience */}
      <Section>
        <ScrollReveal>
          <h2 className="font-headline text-3xl font-semibold mb-6">Stack + Experience</h2>
          <div className="border border-[var(--border)] bg-white p-8">
          <div className="space-y-8">
            {/* Stack */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Stack</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-[var(--muted)] mb-2 font-mono uppercase text-xs tracking-wider">Languages</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">JavaScript</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">TypeScript</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">Python</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">SQL</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">C#</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--muted)] mb-2 font-mono uppercase text-xs tracking-wider">Frameworks & Libraries</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">React</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">Next.js</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">Redux</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">Express</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">React Native</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">Tailwind CSS</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">Prisma</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--muted)] mb-2 font-mono uppercase text-xs tracking-wider">Data & Infra</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">PostgreSQL</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">SQL</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">Docker</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">Terraform</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">WebSockets</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-[var(--muted)] mb-2 font-mono uppercase text-xs tracking-wider">Testing</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">Jest</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">React Testing Library</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">Cypress</span>
                    <span className="inline-flex items-center border border-[var(--border)] px-3 py-1 text-sm font-mono">Enzyme</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="pt-6 border-t border-[var(--border)]">
              <h3 className="text-xl font-semibold mb-4">Experience</h3>
              <p className="text-[var(--muted)] leading-relaxed">
                Full-stack engineer leaning frontend, focused on building complex product surfaces on top of rules-driven, transactional backends. My work spans React architecture, API orchestration, and Python/SQL service logic supporting eligibility, claims, and cost-share flows that mirror financial authorization and reconciliation patterns.
              </p>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </Section>

      {/* Contact */}
      <Section>
        <ScrollReveal>
          <div className="border border-[var(--border)] bg-white p-8">
          <h2 className="font-headline text-3xl font-semibold mb-4">Get in touch</h2>
          <p className="text-[var(--muted)] mb-6 max-w-2xl">
             {"Whether it's to discuss projects, product systems, or whether or not cortados are here to stay— reach out via email, LinkedIn, or GitHub."}
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <a
              className="border border-[var(--fg)] bg-[var(--fg)] text-white px-5 py-2 text-sm font-medium hover:-translate-y-1 hover:opacity-90 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              href="mailto:nsha.swe@gmail.com"
            >
              Email
            </a>
            <a
              className="border border-[var(--border)] bg-white px-5 py-2 text-sm font-medium hover:-translate-y-1 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              href="https://www.linkedin.com/in/nisha-ahamed"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="border border-[var(--border)] bg-white px-5 py-2 text-sm font-medium hover:-translate-y-1 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              href="https://github.com/nsha-swe"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--border)]">
            <span className="text-sm text-[var(--muted)]">Resume available on request</span>
            <a
              className="border border-[var(--fg)] bg-[var(--fg)] text-white px-4 py-1.5 text-xs font-medium hover:-translate-y-1 hover:opacity-90 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
              href="mailto:nsha.swe@gmail.com?subject=Resume%20request%20—%20Nisha%20Ahamed&body=Hi%20Nisha,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20see%20your%20resume.%20Here's%20a%20bit%20of%20context%20on%20the%20role:%0A%0ACompany:%0ARole:%0ALocation:%0A%0AThanks,%0A"
            >
              Request resume
            </a>
          </div>
          </div>
        </ScrollReveal>
      </Section>

      <footer className="relative z-10 mx-auto max-w-5xl px-6 pb-16 text-xs text-[var(--muted)] bg-white">
        © {new Date().getFullYear()} Nisha Ahamed · New York, NY
      </footer>
    </main>
  );
}
