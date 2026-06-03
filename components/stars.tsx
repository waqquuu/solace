interface StarsProps {
  rating: number;
  size?: number;
  className?: string;
}

/** Accessible star rating with fractional fill. */
export function Stars({ rating, size = 16, className = "" }: StarsProps) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span
      className={`relative inline-flex ${className}`}
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
      style={{ fontSize: size, lineHeight: 1 }}
    >
      <span className="text-ink-faint/50">★★★★★</span>
      <span
        className="absolute inset-0 overflow-hidden whitespace-nowrap text-gold"
        style={{ width: `${pct}%` }}
        aria-hidden
      >
        ★★★★★
      </span>
    </span>
  );
}
