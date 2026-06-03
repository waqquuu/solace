"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { Stars } from "./stars";

/**
 * A single large focus testimonial that quietly cross-fades between entries.
 * Respects prefers-reduced-motion (transitions are neutralized in CSS).
 */
export function QuoteRotator({ quotes }: { quotes: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || quotes.length <= 1) return;

    const interval = setInterval(() => {
      setShown(false);
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % quotes.length);
        setShown(true);
      }, 500);
      return () => clearTimeout(swap);
    }, 6000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const t = quotes[index];

  return (
    <figure className="mx-auto max-w-3xl text-center">
      <div
        className={`transition-opacity duration-500 ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-center">
          <Stars rating={5} size={16} />
        </div>
        <blockquote className="mt-6 font-display text-2xl leading-snug tracking-tight text-balance sm:text-3xl">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-6 flex items-center justify-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-muted">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-accent-ink">
            <span className="size-1 rounded-full bg-current" />
            Verified lab
          </span>
          <span>
            {t.author} · {formatDate(t.date)}
          </span>
        </figcaption>
      </div>

      {/* Progress dots */}
      <div className="mt-8 flex justify-center gap-1.5" aria-hidden>
        {quotes.map((q, i) => (
          <span
            key={q.author}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === index ? "w-6 bg-accent" : "w-1.5 bg-line-strong"
            }`}
          />
        ))}
      </div>
    </figure>
  );
}
