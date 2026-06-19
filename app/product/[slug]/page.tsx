import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brand } from "@/lib/brand";
import {
  getProduct,
  getAllSlugs,
  relatedProducts,
  fromPrice,
} from "@/lib/products";
import { getProductDetail } from "@/lib/product-details";
import { FORMAT_LABELS, FORMAT_BLURBS } from "@/lib/types";
import { jsonLdScript } from "@/lib/jsonld";
import { Stars } from "@/components/stars";
import { AddToCart } from "@/components/add-to-cart";
import { ProductTabs } from "@/components/product-tabs";
import { Reviews } from "@/components/reviews";
import { ProductCard } from "@/components/product-card";
import { Vial } from "@/components/vial";
import { Reveal } from "@/components/reveal";

const TRUST_ICONS = {
  ledger: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 4h11a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 9h6M9 12.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  lab: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 3v6.5L4.6 17a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L15 9.5V3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8 3h8M7.5 14h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  ship: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  flag: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 21V4M5 4h12l-2 4 2 4H5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.fullName,
    description: product.blurb,
    alternates: { canonical: `/product/${slug}` },
    openGraph: {
      title: `${product.fullName} · ${brand.fullName}`,
      description: product.blurb,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  const detail = getProductDetail(slug);
  if (!product || !detail) notFound();

  const related = relatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.fullName,
    image: `${brand.url}${product.image}`,
    description: product.blurb,
    category: product.category,
    brand: { "@type": "Brand", name: brand.fullName },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: fromPrice(product),
      highPrice: Math.max(...product.variants.map((v) => v.price)),
      offerCount: product.variants.length,
      availability:
        product.status === "sold-out"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
    },
  };

  return (
    <div className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-wider text-ink-muted">
          <Link href="/catalog" className="hover:text-ink">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        {/* Main */}
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image stage */}
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] border border-line bg-gradient-to-b from-paper-raised to-paper-sunken">
              <span
                className="absolute inset-x-0 top-0 z-10 h-1"
                style={{ backgroundColor: product.tint ?? "#c4673a" }}
                aria-hidden
              />
              <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden />
              <div
                className="glow float-slow absolute left-1/2 top-1/2 size-2/3 -translate-x-1/2 -translate-y-1/2"
                style={{ background: `radial-gradient(circle at center, ${product.tint ?? "#c4673a"}, transparent 68%)` }}
                aria-hidden
              />
              <Vial
                product={product}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="float-slow"
              />
              <span
                className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border bg-paper/85 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-wider backdrop-blur"
                style={{ borderColor: `${product.tint ?? "#c4673a"}59`, color: product.tint ?? "#c4673a" }}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: product.tint ?? "#c4673a" }}
                />
                {FORMAT_LABELS[product.format]}
              </span>
            </div>
            <p className="mt-3 text-center font-mono text-[0.66rem] uppercase tracking-wider text-ink-faint">
              {FORMAT_BLURBS[product.format]}
            </p>
          </Reveal>

          {/* Buy box */}
          <Reveal delay={80}>
            <span className="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-muted">
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: product.tint ?? "#c4673a" }}
                aria-hidden
              />
              {product.category} · {product.purity}
            </span>
            <h1 className="display-2 mt-2">{product.name}</h1>

            <div className="mt-3 flex items-center gap-3">
              <Stars rating={product.rating} size={18} />
              <span className="text-sm text-ink-muted">
                {product.rating.toFixed(1)} · {product.reviewCount} reviews
              </span>
            </div>

            <p className="lead mt-5">{product.blurb}</p>

            <div className="mt-8 border-t border-line pt-8">
              <AddToCart product={product} />
            </div>

            {/* Trust chips */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: TRUST_ICONS.ledger, t: "On the ledger", s: "Lot-matched" },
                { icon: TRUST_ICONS.lab, t: "HPLC + MS", s: "≥99% target" },
                { icon: TRUST_ICONS.flag, t: "Made in USA", s: "US lab" },
                { icon: TRUST_ICONS.ship, t: "US ships", s: "0–2 days" },
              ].map(({ icon, t, s }) => (
                <div
                  key={t}
                  className="group rounded-[var(--radius)] border border-line bg-paper-raised px-3 py-4 text-center transition-colors hover:border-line-strong"
                >
                  <span className="mx-auto grid size-8 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                    {icon}
                  </span>
                  <p className="mt-2 text-xs font-medium">{t}</p>
                  <p className="font-mono text-[0.56rem] uppercase tracking-wider text-ink-faint">
                    {s}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Tabs */}
        <div className="mt-16 lg:mt-24">
          <ProductTabs detail={detail} />
        </div>

        {/* Reviews */}
        <div className="mt-12 border-t border-line pt-12">
          <h2 className="font-display text-2xl tracking-tight">Reviews</h2>
          <div className="mt-6">
            <Reviews
              reviews={detail.reviews}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-line bg-paper-raised">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
            Related compounds
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
