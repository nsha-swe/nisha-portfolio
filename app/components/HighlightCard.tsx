interface HighlightCardProps {
  title: string;
  description: string;
  badge?: string;
}

export default function HighlightCard({ title, description, badge }: HighlightCardProps) {
  return (
    <div className="border border-[var(--border)] bg-white p-6 hover:-translate-y-2 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out focus-within:ring-2 focus-within:ring-[var(--accent)]/20 focus-within:outline-none">
      {badge && (
        <span className="text-xs inline-flex items-center font-mono uppercase tracking-wider text-[var(--muted)] px-2 py-0.5 mb-3 border border-[var(--border)]">
          {badge}
        </span>
      )}
      <h3 className="text-lg font-semibold leading-tight mb-2">{title}</h3>
      <p className="text-sm text-[var(--muted)] leading-relaxed">{description}</p>
    </div>
  );
}

