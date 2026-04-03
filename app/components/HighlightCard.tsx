interface HighlightCardProps {
  title: string;
  description: string;
  badge?: string;
}

export default function HighlightCard({ title, description, badge }: HighlightCardProps) {
  return (
    <div className="glass glass-hover p-6 cursor-default">
      {badge && (
        <span className="glass-pill mb-4">
          {badge}
        </span>
      )}
      <h3 className="text-base font-semibold leading-tight mb-2 text-[var(--fg)]">
        {title}
      </h3>
      <p className="text-sm text-[var(--muted)] leading-relaxed">{description}</p>
    </div>
  );
}
