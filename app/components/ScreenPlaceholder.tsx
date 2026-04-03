interface ScreenPlaceholderProps {
  title: string;
  description: string;
}

export default function ScreenPlaceholder({ title, description }: ScreenPlaceholderProps) {
  return (
    <div className="glass glass-hover p-5">
      <div
        className="aspect-video rounded-xl mb-4 flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="text-center">
          <div className="text-sm font-medium mb-1" style={{ color: "var(--muted)" }}>{title}</div>
          <div className="text-xs font-mono" style={{ color: "rgba(240,240,255,0.3)" }}>Screenshot placeholder</div>
        </div>
      </div>
      <div className="text-sm font-semibold mb-1" style={{ color: "var(--fg)" }}>{title}</div>
      <div className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{description}</div>
    </div>
  );
}
