import { brand } from "@/lib/brand";

/**
 * "Made in the USA" trust pill. Small, on-brand badge (mono caps + a minimal
 * flag glyph tinted with the house accent). Used inline in the hero and footer.
 * Text comes from `brand.madeIn`.
 */
export function MadeInUsa({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] ${
        tone === "dark"
          ? "border-night-line bg-white/[0.04] text-night-text"
          : "border-accent/40 bg-accent-soft text-accent-ink"
      } ${className}`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="3.5"
          y="6"
          width="17"
          height="12"
          rx="1.2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M3.5 7.2A1.2 1.2 0 0 1 4.7 6H11v6H3.5Z" fill="var(--accent)" />
        <circle cx="7.2" cy="9" r="1.15" fill="var(--paper)" />
        <path
          d="M11 14.2h9M11 16.4h9"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
      Made in the {brand.madeIn}
    </span>
  );
}

/**
 * "Made in the USA" seal — a circular quality stamp meant to overlap product
 * imagery. Far more prominent than the inline pill: concentric accent rings,
 * star accents, and the country set in the display serif. Sized via `className`
 * (pass a width; height follows from the square aspect).
 */
export function MadeInUsaSeal({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative grid aspect-square select-none place-items-center rounded-full border border-accent/45 bg-paper/95 text-center shadow-lift backdrop-blur ${className}`}
      aria-label={`Made in the ${brand.madeIn}`}
    >
      <span
        className="pointer-events-none absolute inset-[7%] rounded-full border border-accent/25"
        aria-hidden
      />
      <div className="flex flex-col items-center justify-center px-2 leading-none">
        <span className="text-[0.5rem] tracking-[0.3em] text-accent" aria-hidden>
          ★ ★ ★
        </span>
        <span className="mt-1 font-mono text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-ink-muted">
          Made in the
        </span>
        <span className="font-display text-[1.55rem] leading-none tracking-tight text-accent-ink">
          {brand.madeIn}
        </span>
        <span className="mt-0.5 font-mono text-[0.42rem] uppercase tracking-[0.2em] text-ink-faint">
          Research grade
        </span>
      </div>
    </div>
  );
}
