import Link from "next/link";
import type { Product } from "@/lib/types";
import { FORMAT_LABELS } from "@/lib/types";
import { fromPrice } from "@/lib/products";
import { formatCurrency } from "@/lib/format";
import { Stars } from "./stars";
import { Vial } from "./vial";

const STATUS_LABEL: Record<Product["status"], string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "sold-out": "Sold out",
};

export function ProductCard({ product }: { product: Product }) {
  const tint = product.tint ?? "#c4673a";
  const singleVariant = product.variants.length === 1;
  const sizeLabel = singleVariant
    ? product.variants[0].label
    : `${product.variants.length} sizes`;
  const soldOut = product.status === "sold-out";
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-paper-raised ring-1 ring-inset ring-transparent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong hover:shadow-lift hover:ring-accent/15"
    >
      {/* Per-compound color spine */}
      <span
        className="absolute inset-x-0 top-0 z-10 h-1"
        style={{ backgroundColor: tint }}
        aria-hidden
      />
      {/* Image stage */}
      <div className="relative aspect-square overflow-hidden bg-paper-sunken">
        <div
          className="glow absolute left-1/2 top-1/2 size-2/3 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-40"
          aria-hidden
        />
        <Vial
          product={product}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className={`transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07] ${
            soldOut ? "opacity-60 saturate-[0.85]" : ""
          }`}
        />

        {/* Hover sheen */}
        <div
          className="pointer-events-none absolute inset-0 z-[5] -translate-x-full bg-gradient-to-r from-transparent via-paper/25 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"
          aria-hidden
        />

        {soldOut && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="rounded-full border border-paper/30 bg-night/70 px-4 py-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-paper backdrop-blur-sm">
              Sold out
            </span>
            <span className="translate-y-1 rounded-full bg-accent px-3 py-1 text-[0.66rem] font-medium text-paper opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              Notify me when back
            </span>
          </div>
        )}

        {/* Top badges row — left group wraps; purity stays pinned right */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border bg-paper/85 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider backdrop-blur"
              style={{ borderColor: `${tint}59`, color: tint }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: tint }}
              />
              {FORMAT_LABELS[product.format]}
            </span>
            {product.badges?.map((b) => (
              <span
                key={b}
                className="rounded-full px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-paper"
                style={{ backgroundColor: tint }}
              >
                {b}
              </span>
            ))}
          </div>

          <span className="shrink-0 rounded-full border border-line bg-paper/80 px-2.5 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-accent-ink backdrop-blur">
            {product.purity}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span
            className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em]"
            style={{ color: tint }}
          >
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: tint }}
              aria-hidden
            />
            {product.category}
          </span>
          <span
            className={`inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-wider ${
              product.status === "in-stock"
                ? "text-accent"
                : product.status === "low-stock"
                  ? "text-gold"
                  : "text-ink-faint"
            }`}
          >
            <span className="size-1.5 rounded-full bg-current" />
            {STATUS_LABEL[product.status]}
          </span>
        </div>

        <div className="mt-1 flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg leading-tight">{product.name}</h3>
          <span
            className="shrink-0 rounded-full border px-2 py-0.5 font-mono text-[0.62rem] font-semibold tracking-wider text-ink-soft"
            style={{ borderColor: `${tint}59` }}
          >
            {sizeLabel}
          </span>
        </div>

        <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">
          {product.blurb}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <Stars rating={product.rating} size={13} />
          <span className="text-xs text-ink-faint">
            {product.rating.toFixed(1)} · {product.reviewCount}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            {!singleVariant && (
              <span className="font-mono text-[0.62rem] uppercase tracking-wider text-ink-faint">
                from
              </span>
            )}
            <p className="font-display text-xl leading-none">
              {formatCurrency(fromPrice(product))}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors group-hover:text-accent">
            View
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
