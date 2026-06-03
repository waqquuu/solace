import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { FORMAT_LABELS } from "@/lib/types";
import { fromPrice } from "@/lib/products";
import { formatCurrency } from "@/lib/format";
import { Stars } from "./stars";

const STATUS_LABEL: Record<Product["status"], string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "sold-out": "Sold out",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-paper-raised transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift"
    >
      {/* Image stage */}
      <div className="relative aspect-square overflow-hidden bg-paper-sunken">
        <div
          className="glow absolute left-1/2 top-1/2 size-2/3 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-40"
          aria-hidden
        />
        <Image
          src={product.image}
          alt={product.fullName}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="relative object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-line bg-paper/80 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-ink backdrop-blur">
            {FORMAT_LABELS[product.format]}
          </span>
          {product.badges?.map((b) => (
            <span
              key={b}
              className="rounded-full bg-accent px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-night"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Purity badge */}
        <span className="absolute right-3 top-3 rounded-full border border-line bg-paper/80 px-2.5 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-accent-ink backdrop-blur">
          {product.purity}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-muted">
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

        <h3 className="mt-1 font-display text-lg leading-tight">
          {product.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
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
            <span className="font-mono text-[0.62rem] uppercase tracking-wider text-ink-faint">
              from
            </span>
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
