export const metadata = { title: "Under Construction" };

export default function Page() {
  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* soft floating circles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[15%] h-64 w-64 rounded-full bg-black/5 blur-2xl" />
        <div className="absolute right-[-5%] top-[35%] h-40 w-40 rounded-full bg-black/10 blur-xl" />
        <div className="absolute left-[20%] bottom-[10%] h-28 w-28 rounded-full bg-black/5 blur-xl" />
      </div>

      <div className="relative z-10 mx-6 w-full max-w-xl rounded-3xl border border-black/10 bg-white/70 p-10 text-center shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium tracking-wide">
          Portfolio · Nisha Ahamed
        </span>
        <h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight">
          Under Construction
        </h1>
        <p className="mt-4 text-black/70">
          I’m rebuilding my portfolio. Please check back soon.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium hover:bg-black/5"
            href="https://www.linkedin.com/in/your-handle"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium hover:bg-black/5"
            href="https://github.com/your-handle"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
