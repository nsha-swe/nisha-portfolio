interface ScreenPlaceholderProps {
  title: string;
  description: string;
}

export default function ScreenPlaceholder({ title, description }: ScreenPlaceholderProps) {
  return (
    <div className="border border-[var(--border)] bg-white p-6 hover:-translate-y-2 hover:border-[var(--fg)]/20 hover:bg-neutral-50 transition-all duration-200 ease-out focus-within:ring-2 focus-within:ring-[var(--accent)]/20 focus-within:outline-none">
      <div className="aspect-video bg-white border border-[var(--border)] mb-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm font-medium text-[var(--muted)] mb-1">{title}</div>
          <div className="text-xs text-[var(--muted)] font-mono">Screenshot placeholder</div>
        </div>
      </div>
      <div className="text-sm font-semibold mb-1">{title}</div>
      <div className="text-xs text-[var(--muted)]">{description}</div>
    </div>
  );
}

