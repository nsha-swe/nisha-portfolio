interface KeyDecisionsProps {
  decisions: string[];
}

export default function KeyDecisions({ decisions }: KeyDecisionsProps) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
      <h3 className="text-2xl font-semibold mb-6">Key decisions</h3>
      <ul className="space-y-3">
        {decisions.map((decision, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="text-emerald-600 mt-1">•</span>
            <span className="text-black/80 leading-relaxed">{decision}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

