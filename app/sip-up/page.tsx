import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section from "../components/Section";
import ScrollReveal from "../components/ScrollReveal";
import SpotlightBg from "../components/SpotlightBg";

export const metadata: Metadata = {
  title: "Sip Up — Mobile App | Nisha Ahamed",
  description:
    "Sip Up: A social water-tracking app that turns daily hydration into a competitive game. Log by your favorite water bottle brand, challenge friends, build streaks.",
};

const stack = [
  { name: "React Native", note: "Cross-platform mobile" },
  { name: "Expo", note: "Build & deployment toolchain" },
  { name: "TypeScript", note: "Type-safe codebase" },
  { name: "Supabase", note: "Auth, realtime DB, social graph" },
  { name: "Expo Router", note: "File-based navigation" },
  { name: "NativeWind", note: "Tailwind for React Native" },
  { name: "Reanimated 3", note: "Fluid animations & gestures" },
  { name: "Zustand", note: "Lightweight state management" },
  { name: "Expo Notifications", note: "Streak reminders & challenges" },
];

const waterStats = [
  {
    value: "43%",
    label: "of American adults drink fewer than 4 cups of water per day",
    source: "CDC, 2013 — National Health and Nutrition Examination Survey",
  },
  {
    value: "7%",
    label: "of American adults report drinking no water at all daily",
    source: "CDC / NHANES",
  },
  {
    value: "1–3%",
    label: "body weight fluid loss impairs memory, concentration, and reaction time",
    source: "Journal of Nutrition, 2012 — Armstrong & Lieberman, University of Connecticut",
  },
  {
    value: "$1.2B",
    label: "hydration tracking app market in 2023, growing at 8.4% CAGR through 2030",
    source: "Grand View Research, 2023",
  },
];

const socialStats = [
  {
    value: "95%",
    label: "goal completion rate when paired with a specific accountability partner",
    source: "American Society of Training and Development",
  },
  {
    value: "2–3×",
    label: "more likely to sustain a new behavior with social network reinforcement",
    source: "Damon Centola, Science (2010) — viral spread of health behaviors",
  },
  {
    value: "33%",
    label: "more goals completed by those who shared progress with a friend",
    source: "Dr. Gail Matthews, Dominican University",
  },
  {
    value: "89%",
    label: "increase in physical activity from friendly social competition",
    source: "Wharton School, University of Pennsylvania",
  },
];

const plannedScreens = [
  { label: "Home", value: "Daily ring, streak counter, quick-log CTAs" },
  { label: "Bottle selector", value: "Log by brand (Stanley, Hydro Flask, Yeti…) and size" },
  { label: "Friends feed", value: "Real-time hydration activity from your circle" },
  { label: "Challenges", value: "Create or join 7-day competitive hydration challenges" },
  { label: "Leaderboard", value: "Weekly rankings with XP, badges, and level system" },
  { label: "Stats", value: "Personal trends, streaks, and historical intake" },
];

export default function SipUpPage() {
  return (
    <main className="min-h-screen relative" style={{ background: "var(--bg)" }}>
      <SpotlightBg />

      {/* ── Header ──────────────────────────────────────── */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-28 pb-16">
        <div className="flex flex-col gap-3 mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm transition-opacity hover:opacity-70"
            style={{ color: "var(--muted)" }}
          >
            ← Back to home
          </Link>
          <span className="glass-pill w-fit">
            <span className="glow-dot" />
            Mobile App · In Progress
          </span>
        </div>
        <h1
          className="font-headline text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          style={{ color: "var(--fg)" }}
        >
          Sip Up
        </h1>
        <p
          className="max-w-2xl text-xl leading-relaxed"
          style={{ color: "rgba(240,240,255,0.7)" }}
        >
          A water-tracking app built around the way people actually drink — by brand and bottle size —
          with a social layer that makes hitting your daily goal genuinely competitive.
        </p>
      </header>

      {/* ── Prototype ───────────────────────────────────── */}
      <Section className="py-4">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-4">
            <div className="relative flex justify-center">
              <div
                className="absolute inset-0 blur-3xl opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #60a5fa 0%, #818cf8 50%, transparent 80%)" }}
              />
              <Image
                src="/sipup-prototype.png"
                alt="Sip Up app prototype — home screen showing hydration ring, streak, and today's log"
                width={320}
                height={640}
                className="relative"
                style={{ display: "block", filter: "drop-shadow(0 32px 60px rgba(0,0,0,0.6))" }}
                priority
              />
            </div>
            <p className="text-xs text-center max-w-xs" style={{ color: "rgba(240,240,255,0.3)" }}>
              Early prototype — UI subject to change
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── The Problem ─────────────────────────────────── */}
      <Section>
        <ScrollReveal>
          <div className="glass p-8">
            <span className="glass-pill mb-6 inline-flex">The Problem</span>
            <h2
              className="font-headline text-3xl sm:text-4xl font-semibold mb-4 leading-tight"
              style={{ color: "var(--fg)" }}
            >
              Most Americans are dehydrated.
              <br />
              <span style={{ color: "rgba(240,240,255,0.5)", fontStyle: "italic" }}>
                Existing apps haven&apos;t fixed it.
              </span>
            </h2>
            <p className="max-w-2xl leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
              Hydration apps exist, but they&apos;re not enough. They ask you to enter ounces manually, track
              generic cups, and check in alone. They solve tracking, not motivation. Users want fun, one-tap options. Sip Up is built around
              how people actually drink water in 2026: by their Stanleys, Hydro Flasks, and Yetis.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {waterStats.map(({ value, label, source }) => (
                <div key={value} className="glass-sm p-5">
                  <div
                    className="font-headline text-4xl font-bold mb-2"
                    style={{ color: "var(--fg)" }}
                  >
                    {value}
                  </div>
                  <div className="text-sm mb-2 leading-snug" style={{ color: "var(--muted)" }}>
                    {label}
                  </div>
                  <div className="text-[10px] font-mono" style={{ color: "rgba(240,240,255,0.3)" }}>
                    {source}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── What It Does ────────────────────────────────── */}
      <Section>
        <ScrollReveal>
          <div className="glass p-8">
            <span className="glass-pill mb-6 inline-flex">Core Concept</span>
            <h2
              className="font-headline text-3xl font-semibold mb-6"
              style={{ color: "var(--fg)" }}
            >
              Log how you actually drink.
            </h2>
            <div className="grid gap-6 sm:grid-cols-3 mb-8">
              {[
                {
                  icon: "💧",
                  title: "Bottle-first logging",
                  body:
                    "Select your bottle brand and size — Stanley 40oz, Hydro Flask 32oz, Yeti 30oz — and log with one tap. No mental math, no manual entry.",
                },
                {
                  icon: "🔥",
                  title: "Streaks & XP",
                  body:
                    "Hit your daily goal and build a streak. Earn XP, level up, and unlock badges. Missing a day stings just enough to keep you honest.",
                },
                {
                  icon: "🏆",
                  title: "Social competition",
                  body:
                    "Challenge friends to hydration contests. Follow each other's logs in a real-time activity feed. Turn a solo health habit into a shared game.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="glass-sm p-5">
                  <div className="text-3xl mb-3">{icon}</div>
                  <div
                    className="font-headline text-base font-semibold mb-2"
                    style={{ color: "var(--fg)" }}
                  >
                    {title}
                  </div>
                  <div className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {body}
                  </div>
                </div>
              ))}
            </div>

            <h3
              className="font-headline text-xl font-semibold mb-4"
              style={{ color: "var(--fg)" }}
            >
              Planned screens
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {plannedScreens.map(({ label, value }) => (
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
          </div>
        </ScrollReveal>
      </Section>

      {/* ── The Social Edge ─────────────────────────────── */}
      <Section>
        <ScrollReveal>
          <div className="glass p-8">
            <span className="glass-pill mb-6 inline-flex">The Social Edge</span>
            <h2
              className="font-headline text-3xl sm:text-4xl font-semibold mb-4 leading-tight"
              style={{ color: "var(--fg)" }}
            >
              The most effective habit tool
              <br />
              <span style={{ fontStyle: "italic", color: "rgba(240,240,255,0.55)" }}>
                is other people.
              </span>
            </h2>
            <p className="max-w-2xl leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
              Behavioral research is unambiguous: social accountability and friendly competition are among
              the most reliable mechanisms for sustaining new habits. Sip Up is engineered around this —
              the social layer isn&apos;t a feature, it&apos;s the product.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {socialStats.map(({ value, label, source }) => (
                <div key={value} className="glass-sm p-5">
                  <div
                    className="font-headline text-4xl font-bold mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    {value}
                  </div>
                  <div className="text-sm mb-2 leading-snug" style={{ color: "var(--muted)" }}>
                    {label}
                  </div>
                  <div className="text-[10px] font-mono" style={{ color: "rgba(240,240,255,0.3)" }}>
                    {source}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Tech Stack ──────────────────────────────────── */}
      <Section>
        <ScrollReveal>
          <div className="glass p-8">
            <span className="glass-pill mb-6 inline-flex">Tech Stack</span>
            <h2
              className="font-headline text-3xl font-semibold mb-2"
              style={{ color: "var(--fg)" }}
            >
              Built for scale, designed to feel fast.
            </h2>
            <p className="leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--muted)" }}>
              The stack prioritizes real-time social features, smooth 60fps animations, and a development
              experience that ships to both iOS and Android without compromise.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {stack.map(({ name, note }) => (
                <div key={name} className="glass-sm p-4 flex flex-col gap-1">
                  <div className="font-mono text-sm font-medium" style={{ color: "var(--fg)" }}>
                    {name}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(240,240,255,0.4)" }}>
                    {note}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div
                className="text-xs font-mono uppercase tracking-wider mb-3"
                style={{ color: "var(--muted)" }}
              >
                Why Supabase for social?
              </div>
              <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
                Supabase Realtime lets friend activity feed updates push instantly without polling —
                critical for making the social layer feel alive. Row-level security handles the friend
                graph access patterns cleanly, and the Postgres foundation means complex leaderboard
                queries stay fast as the user base grows.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Status ──────────────────────────────────────── */}
      <Section>
        <ScrollReveal>
          <div className="glass p-8">
            <span className="glass-pill mb-6 inline-flex">Status</span>
            <h2
              className="font-headline text-3xl font-semibold mb-4"
              style={{ color: "var(--fg)" }}
            >
              Prototype stage.
            </h2>
            <p className="leading-relaxed max-w-2xl" style={{ color: "var(--muted)" }}>
              Core home screen, bottle-first logging flow, and streak system are designed and prototyped.
              Currently working through the social graph architecture and the real-time challenge system.
              iOS build targeting for TestFlight in the coming months.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      <footer
        className="relative z-10 mx-auto max-w-5xl px-6 pb-16 text-xs"
        style={{ color: "rgba(240,240,255,0.3)" }}
      >
        <Link href="/" className="transition-opacity hover:opacity-70">
          ← Back to home
        </Link>
      </footer>
    </main>
  );
}
