interface HighlightCardProps {
  title: string;
  description: string;
  badge?: string;
}

export default function HighlightCard({ title, description, badge }: HighlightCardProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur-md">
      {badge && (
        <span className="text-xs inline-flex items-center rounded-full border border-black/10 bg-black/5 px-2 py-0.5 mb-3">
          {badge}
        </span>
      )}
      <h3 className="text-lg font-semibold leading-tight mb-2">{title}</h3>
      <p className="text-sm text-black/70 leading-relaxed">{description}</p>
    </div>
  );
}

