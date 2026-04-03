interface KeyDecisionsProps {
  decisions: string[];
}

export default function KeyDecisions({ decisions }: KeyDecisionsProps) {
  return (
    <div className="glass p-8">
      <h3 className="font-headline text-2xl font-semibold mb-6" style={{ color: "var(--fg)" }}>
        Key decisions
      </h3>
      <ul className="space-y-4">
        {decisions.map((decision, idx) => (
          <li key={idx} className="flex items-start gap-4">
            <span className="mt-1 font-mono text-sm" style={{ color: "var(--accent)" }}>›</span>
            <span className="leading-relaxed flex-1 text-sm" style={{ color: "var(--muted)" }}>
              {decision}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
