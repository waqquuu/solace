import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { products, CATEGORIES, FORMATS } from "@/lib/products";
import type { ProductFormat } from "@/lib/types";
import { CatalogBrowser } from "@/components/catalog-browser";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Browse high-purity research compounds across injectable and liquid formats — each independently tested and recorded in the ledger.",
  alternates: { canonical: "/catalog" },
};

const VALID_FORMATS = new Set<string>(FORMATS);

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ format?: string; q?: string }>;
}) {
  const params = await searchParams;
  const initialFormat: ProductFormat | null =
    params.format && VALID_FORMATS.has(params.format)
      ? (params.format as ProductFormat)
      : null;

  return (
    <div className="relative">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60" aria-hidden />
      <div className="glow-moon pointer-events-none absolute -top-10 left-1/2 h-64 w-[44rem] -translate-x-1/2" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
          <p className="eyebrow">Catalog · {products.length} compounds</p>
          <h1 className="display-2 mt-3">The cabinet</h1>
          <p className="lead mt-4 max-w-2xl">
            Every compound here is independently tested and carries its own line
            in the ledger. Filter by format or research category.
          </p>
          {!brand.status.open && (
            <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-4 py-2 text-sm text-accent-ink">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              <span>
                Ordering paused while we relocate &mdash; reopening{" "}
                <strong>{brand.status.reopenDate}</strong> with{" "}
                <strong>{brand.status.discountPct}% off</strong>. Tap any
                compound to get notified.
              </span>
            </div>
          )}
        </Reveal>

        <div className="mt-10">
          <CatalogBrowser
            products={products}
            categories={CATEGORIES}
            formats={FORMATS}
            initialFormat={initialFormat}
          />
        </div>
      </div>
    </div>
  );
}
