"use client";

import { useMemo, useState } from "react";
import type { Product, ProductCategory, ProductFormat } from "@/lib/types";
import { FORMAT_LABELS } from "@/lib/types";
import { fromPrice, CATEGORY_COLORS } from "@/lib/products";
import { ProductCard } from "./product-card";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "name";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "rating", label: "Top rated" },
  { key: "name", label: "Name A–Z" },
];

interface CatalogBrowserProps {
  products: Product[];
  categories: ProductCategory[];
  formats: ProductFormat[];
  initialFormat?: ProductFormat | null;
}

export function CatalogBrowser({
  products,
  categories,
  formats,
  initialFormat = null,
}: CatalogBrowserProps) {
  const [format, setFormat] = useState<ProductFormat | "all">(
    initialFormat ?? "all",
  );
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list = products.slice();

    if (format !== "all") list = list.filter((p) => p.format === format);
    if (category !== "all") list = list.filter((p) => p.category === category);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.fullName.toLowerCase().includes(q) ||
          p.blurb.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => fromPrice(a) - fromPrice(b));
        break;
      case "price-desc":
        list.sort((a, b) => fromPrice(b) - fromPrice(a));
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort(
          (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
        );
    }
    return list;
  }, [products, format, category, query, sort]);

  const resetFilters = () => {
    setFormat("all");
    setCategory("all");
    setQuery("");
    setSort("featured");
  };

  return (
    <div>
      {/* Controls */}
      <div className="glass sticky top-[60px] z-30 -mx-4 flex flex-col gap-4 rounded-[var(--radius-lg)] border border-line/60 px-4 py-4 sm:-mx-6 sm:px-6">
        {/* Row 1: format toggles (left) + search/sort (right) */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <FilterChip
              active={format === "all"}
              onClick={() => setFormat("all")}
            >
              All formats
            </FilterChip>
            {formats.map((f) => (
              <FilterChip
                key={f}
                active={format === f}
                onClick={() => setFormat(f)}
              >
                {FORMAT_LABELS[f]}
              </FilterChip>
            ))}
          </div>

          {/* Search + sort */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="flex h-10 flex-1 items-center rounded-full border border-line bg-paper-raised px-3 focus-within:border-accent lg:flex-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M20 20l-3-3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search compounds"
                aria-label="Search compounds"
                className="w-full min-w-0 bg-transparent px-2 text-sm outline-none placeholder:text-ink-faint lg:w-48"
              />
            </div>
            <div className="relative shrink-0">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort products"
                className="h-10 appearance-none rounded-full border border-line bg-paper-raised pl-4 pr-9 text-sm outline-none transition-colors hover:border-line-strong focus:border-accent"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 2: category pills — wrap to a full-width row, never clipped */}
        <div className="flex flex-wrap gap-2 border-t border-line/50 pt-4">
          <FilterChip
            subtle
            active={category === "all"}
            onClick={() => setCategory("all")}
          >
            All
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c}
              subtle
              active={category === c}
              onClick={() => setCategory(c)}
              dotColor={CATEGORY_COLORS[c]}
            >
              {c}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
        {filtered.length} {filtered.length === 1 ? "result" : "results"}
      </p>

      {/* Grid or empty state */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center justify-center gap-4 rounded-[var(--radius-lg)] border border-dashed border-line-strong py-20 text-center">
          <div className="grid size-14 place-items-center rounded-full bg-paper-sunken">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
              <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="font-display text-xl">No compounds match</p>
            <p className="mt-1 text-sm text-ink-muted">
              Try a different format, category, or search term.
            </p>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-line-strong"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  subtle = false,
  onClick,
  children,
  dotColor,
}: {
  active: boolean;
  subtle?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dotColor?: string;
}) {
  // When a category chip with a tint is active, fill it with its own color.
  const tintActive = active && subtle && dotColor;
  return (
    <button
      type="button"
      onClick={onClick}
      style={
        tintActive
          ? { backgroundColor: `${dotColor}1f`, color: dotColor, borderColor: `${dotColor}59` }
          : undefined
      }
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        tintActive
          ? "border"
          : active
            ? subtle
              ? "bg-accent-soft text-accent-ink"
              : "bg-ink text-paper"
            : "border border-line text-ink-muted hover:border-line-strong hover:text-ink"
      }`}
    >
      {dotColor && (
        <span
          className="size-1.5 rounded-full"
          style={{ backgroundColor: dotColor }}
          aria-hidden
        />
      )}
      {children}
    </button>
  );
}
