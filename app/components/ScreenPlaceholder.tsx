interface ScreenPlaceholderProps {
  title: string;
  description: string;
}

export default function ScreenPlaceholder({ title, description }: ScreenPlaceholderProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur-md">
      <div className="aspect-video bg-gradient-to-br from-black/5 to-black/10 rounded-xl mb-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm font-medium text-black/60 mb-1">{title}</div>
          <div className="text-xs text-black/40">Screenshot placeholder</div>
        </div>
      </div>
      <div className="text-sm font-medium mb-1">{title}</div>
      <div className="text-xs text-black/70">{description}</div>
    </div>
  );
}

