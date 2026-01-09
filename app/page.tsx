import { Brawler } from "next/font/google";
import Link from "next/link";
import Section from "./components/Section";
import HighlightCard from "./components/HighlightCard";
import StackedCard from "./components/StackedCard";

const brawler = Brawler({ subsets: ["latin"], weight: "400" });

export default function Page() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.06),transparent_60%)]">
      {/* Hero Section */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-16 sm:pt-24">
        <h1 className={`${brawler.className} text-5xl sm:text-6xl tracking-[-0.02em] leading-[1.05] mb-4`}>
          Nisha Ahamed
        </h1>
        <h2 className={`${brawler.className} text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.05] mb-4`}>
          Full-stack engineer focused on product systems, transactional flows, and modern web architecture.
        </h2>

        <p className="max-w-3xl text-black/70 text-lg leading-relaxed">
          I build frontend-first platforms on top of rules-driven backends, working across React, APIs, and data layers in fintech-adjacent and health-tech domains.
        </p>
      </header>

      {/* What I'm Building Now */}
      <Section className="py-8">
        <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <h2 className={`${brawler.className} text-2xl font-semibold mb-4`}>What I'm building now</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-0.5">
                  Web App
                </span>
              </div>
              <div className="text-sm font-medium leading-tight mb-2">Mishty</div>
              <div className="text-xs text-black/70">Production-style full-stack system with real-time features and robust error handling. Topic? Top secret 😉 Check back for updates!</div>
            </div>
            <Link
              href="/fintech-lab"
              className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur-md hover:bg-white/90 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-0.5">
                  Fintech
                </span>
              </div>
              <div className="text-sm font-medium leading-tight mb-2">Tally</div>
              <div className="text-xs text-black/70">Mini sandbox for transactional product surfaces — payments-style timeline and reconciliation explorer with simulated USD data.</div>
            </Link>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-0.5">
                  Mobile App
                </span>
              </div>
              <div className="text-sm font-medium leading-tight mb-2">Benefits Wallet</div>
              <div className="text-xs text-black/70 mb-2">
                A mobile-first "wallet" experience modeling claims and cost-share as a transaction timeline. Internally uses ledger-style adjustments and reconciliation concepts (simulated data). Planned screens: Timeline, Claim detail, Dispute flow, Reconciliation summary. Tech: Expo + React Native + TypeScript.
              </div>
              <div className="text-[10px] text-black/50 italic">Concept + prototype in progress.</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Proof/Highlights */}
      <Section>
        <h2 className={`${brawler.className} text-3xl font-semibold mb-6`}>Highlights</h2>
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
      </Section>

      {/* Featured Case Study */}
      <Section>
        <StackedCard index={0}>
          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-0.5">
                Case Study
              </span>
            </div>
            <h2 className={`${brawler.className} text-3xl font-semibold mb-4`}>Payment Gateway Reliability</h2>
            <p className="text-black/70 mb-6 leading-relaxed">
              Redesigned payment processing pipeline to handle peak traffic and reduce failed transactions. 
              Implemented circuit breakers, exponential backoff, and comprehensive monitoring. 
              System now processes 10x volume with 99.9% uptime during critical payment windows.
            </p>
            <div className="grid gap-4 sm:grid-cols-3 mt-6">
              <div>
                <div className="text-sm text-black/60 mb-1">Challenge</div>
                <div className="text-sm font-medium">High failure rate during peak hours</div>
              </div>
              <div>
                <div className="text-sm text-black/60 mb-1">Solution</div>
                <div className="text-sm font-medium">Resilient architecture with graceful degradation</div>
              </div>
              <div>
                <div className="text-sm text-black/60 mb-1">Impact</div>
                <div className="text-sm font-medium">99.9% uptime, 10x capacity</div>
              </div>
            </div>
          </div>
        </StackedCard>
      </Section>

      {/* Fintech Interests */}
      <Section>
        <h2 className={`${brawler.className} text-3xl font-semibold mb-6`}>Fintech Focus Areas</h2>
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
      </Section>

      {/* Tally */}
      <Section>
        <StackedCard index={1}>
          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-0.5">
                Interactive Tools
              </span>
            </div>
            <h2 className={`${brawler.className} text-3xl font-semibold mb-4`}>Tally</h2>
            <p className="text-black/70 mb-6 leading-relaxed">
              Tally is a transactional sandbox featuring a payments-style timeline and a reconciliation explorer that models ledger adjustments and mismatches using simulated USD data.
            </p>
            <Link
              href="/fintech-lab"
              className="inline-flex items-center rounded-full border border-black/10 bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              Explore Tally →
            </Link>
          </div>
        </StackedCard>
      </Section>

      {/* DockIQ */}
      <Section>
        <StackedCard index={2}>
          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-0.5">
                Systems Project
              </span>
            </div>
            <h2 className={`${brawler.className} text-3xl font-semibold mb-4`}>DockIQ</h2>
            <p className="text-black/70 mb-6 leading-relaxed">
              DockIQ is a real-time container monitoring platform that surfaces live Docker metrics through WebSockets, Prometheus, and a React dashboard — designed for observability, operational clarity, and performance insight.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6 mb-6">
              <div>
                <div className="text-sm font-medium text-black/80 mb-2">Real-time Metrics</div>
                <div className="text-sm text-black/70">CPU, memory, network I/O, PIDs</div>
              </div>
              <div>
                <div className="text-sm font-medium text-black/80 mb-2">Live Container Status</div>
                <div className="text-sm text-black/70">WebSocket-driven updates</div>
              </div>
              <div>
                <div className="text-sm font-medium text-black/80 mb-2">Monitoring Stack</div>
                <div className="text-sm text-black/70">Dockerode, Prometheus, Grafana</div>
              </div>
            </div>
            <div className="mb-6">
              <div className="text-sm font-medium text-black/80 mb-2">Tech Stack</div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-1">React</span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-1">TypeScript</span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-1">Material UI</span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-1">WebSockets</span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-1">Node.js</span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-1">Express</span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-1">Dockerode</span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-1">Prometheus</span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-1">Grafana</span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-1">Docker</span>
              </div>
            </div>
            <a
              href="https://dock-iq.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-black/10 bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-black/20"
            >
              View DockIQ →
            </a>
          </div>
        </StackedCard>
      </Section>

      {/* Stack + Experience */}
      <Section>
        <h2 className={`${brawler.className} text-3xl font-semibold mb-6`}>Stack + Experience</h2>
        <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="space-y-8">
            {/* Stack */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Stack</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-black/60 mb-2">Languages</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">JavaScript</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">TypeScript</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">Python</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">SQL</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">C#</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-black/60 mb-2">Frameworks & Libraries</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">React</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">Next.js</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">Redux</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">Express</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">React Native</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">Tailwind CSS</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">Prisma</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-black/60 mb-2">Data & Infra</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">PostgreSQL</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">SQL</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">Docker</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">Terraform</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">WebSockets</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-black/60 mb-2">Testing</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">Jest</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">React Testing Library</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">Cypress</span>
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-sm">Enzyme</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="pt-6 border-t border-black/10">
              <h3 className="text-xl font-semibold mb-4">Experience</h3>
              <p className="text-black/70 leading-relaxed">
                Full-stack engineer leaning frontend, focused on building complex product surfaces on top of rules-driven, transactional backends. My work spans React architecture, API orchestration, and Python/SQL service logic supporting eligibility, claims, and cost-share flows that mirror financial authorization and reconciliation patterns.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section>
        <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <h2 className={`${brawler.className} text-3xl font-semibold mb-4`}>Get in touch</h2>
          <p className="text-black/70 mb-6 max-w-2xl">
             Whether it's to discuss projects, product systems, or whether or not cortados are here to stay— reach out via email, LinkedIn, or GitHub.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <a
              className="rounded-full border border-black/10 bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-black/20"
              href="mailto:nsha.swe@gmail.com"
            >
              Email
            </a>
            <a
              className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-black/20"
              href="https://www.linkedin.com/in/nisha-ahamed"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-black/20"
              href="https://github.com/nsha-swe"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-black/10">
            <span className="text-sm text-black/60">Resume available on request</span>
            <a
              className="rounded-full border border-black/10 bg-black px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-black/20"
              href="mailto:nsha.swe@gmail.com?subject=Resume%20request%20—%20Nisha%20Ahamed&body=Hi%20Nisha,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20see%20your%20resume.%20Here's%20a%20bit%20of%20context%20on%20the%20role:%0A%0ACompany:%0ARole:%0ALocation:%0A%0AThanks,%0A"
            >
              Request resume
            </a>
          </div>
        </div>
      </Section>

      <footer className="relative z-10 mx-auto max-w-5xl px-6 pb-16 text-xs text-black/50">
        © {new Date().getFullYear()} Nisha Ahamed · New York, NY
      </footer>
    </main>
  );
}
