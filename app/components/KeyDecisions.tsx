interface KeyDecisionsProps {
  decisions: string[];
}

export default function KeyDecisions({ decisions }: KeyDecisionsProps) {
  return (
    <div className="border border-[var(--border)] bg-white p-8 hover:-translate-y-1 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out">
      <h3 className="font-headline text-2xl font-semibold mb-6">Key decisions</h3>
      <ul className="space-y-4">
        {decisions.map((decision, idx) => (
          <li key={idx} className="flex items-start gap-4">
            <span className="text-[var(--accent)] mt-1 font-mono">•</span>
            <span className="leading-relaxed flex-1">{decision}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

