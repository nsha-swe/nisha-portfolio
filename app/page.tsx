// add this import at the top of app/page.tsx
import { Brawler } from "next/font/google";

const brawler = Brawler({ subsets: ["latin"], weight: "400" });

export default function Page() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.06),transparent_60%)]">
      <header className="relative z-10 mx-auto max-w-5xl px-6 pt-16 sm:pt-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-medium backdrop-blur-md mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          portfolio → in progress
        </div>

        <h1
          className={`${brawler.className} text-5xl sm:text-6xl tracking-[-0.02em] leading-[1.05]`}
        >
          Hi, I’m Nisha.
        </h1>

        <p className="mt-4 max-w-2xl text-black/70">
          If you’re reading this, you might be looking for your next Fullstack
          Engineer. I’m rebuilding my portfolio with some really cool features
          that’ll show you it’s me. In the meantime, feel free to reach out.
        </p>
      </header>
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm text-black/60">Status</div>
              <div className="mt-1 text-xl font-semibold">
                Under construction
              </div>
              <p className="mt-2 max-w-xl text-black/70">Shipping soon.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                className="rounded-full border border-black/10 bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
                href="mailto:nsha.swe@gmail.com"
              >
                Email
              </a>
              <a
                className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium hover:bg-black/5"
                href="https://www.linkedin.com/in/nisha-ahamed"
                target="_blank"
              >
                LinkedIn
              </a>
              <a
                className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium hover:bg-black/5"
                href="https://github.com/nsha-swe"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Tile title="Coming Soon" pill="Web App" />
            <Tile title="Coming Soon" pill="Mobile App" />
            <Tile title="Coming Soon" pill="Web App" />
          </div>
        </div>
      </section>

      <footer className="relative z-10 mx-auto max-w-5xl px-6 pb-16 text-xs text-black/50">
        © {new Date().getFullYear()} Nisha Ahamed · New York, NY
      </footer>
    </main>
  );
}

function Tile({ title, pill }: { title: string; pill: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <span className="text-xs inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-0.5">
          {pill}
        </span>
        <span className="text-[10px] text-black/50">Coming soon</span>
      </div>
      <div className="mt-3 text-sm font-medium leading-tight">{title}</div>
      <div className="mt-2 h-16 rounded-xl bg-gradient-to-br from-black/5 to-black/10" />
    </div>
  );
}
