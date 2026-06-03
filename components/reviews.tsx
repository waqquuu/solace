import type { Review } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { Stars } from "./stars";

interface ReviewsProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export function Reviews({ reviews, rating, reviewCount }: ReviewsProps) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 border-b border-line pb-6">
        <span className="font-display text-4xl leading-none">
          {rating.toFixed(1)}
        </span>
        <div>
          <Stars rating={rating} size={18} />
          <p className="mt-1 text-sm text-ink-muted">
            Based on {reviewCount.toLocaleString()} verified reviews
          </p>
        </div>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {reviews.map((r) => (
          <li
            key={r.id}
            className="rounded-[var(--radius)] border border-line bg-paper-raised p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <Stars rating={r.rating} size={14} />
              {r.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-wider text-accent-ink">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Verified lab
                </span>
              )}
            </div>
            <h4 className="mt-3 font-medium">{r.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              &ldquo;{r.body}&rdquo;
            </p>
            <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-wider text-ink-faint">
              {r.author} · {formatDate(r.date)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
