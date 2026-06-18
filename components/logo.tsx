import Link from "next/link";
import { brand } from "@/lib/brand";

interface LogoProps {
  className?: string;
  /** Kept for API compatibility; the mark adapts to context via tokens. */
  light?: boolean;
  withMark?: boolean;
}

/** solace club wordmark with a crescent-moon mark (the "nocturne" motif). */
export function Logo({ className = "", withMark = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${brand.fullName} — home`}
    >
      {withMark && (
        <span
          className="relative grid size-8 place-items-center rounded-full border border-line-strong bg-paper-raised transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-accent group-hover:shadow-[0_0_0_4px_var(--accent-soft)]"
          aria-hidden
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12"
          >
            <path
              d="M15.8 3.4A9 9 0 1 0 20.6 18 7.4 7.4 0 0 1 15.8 3.4Z"
              fill="var(--accent)"
            />
          </svg>
        </span>
      )}
      <span className="flex items-baseline gap-1.5">
        <span className="font-display text-[1.4rem] font-medium leading-none tracking-tight text-ink">
          {brand.name}
        </span>
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-ink-muted">
          {brand.nameSuffix}
        </span>
      </span>
    </Link>
  );
}
