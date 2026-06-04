import type { Metadata } from "next";
import Image from "next/image";
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
import { Reveal } from "@/components/reveal";

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
            <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] border border-line bg-paper-raised">
              <span
                className="absolute inset-x-0 top-0 z-10 h-1"
                style={{ backgroundColor: product.tint ?? "#c4673a" }}
                aria-hidden
              />
              <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden />
              <div className="glow absolute left-1/2 top-1/2 size-2/3 -translate-x-1/2 -translate-y-1/2" aria-hidden />
              <Image
                src={product.image}
                alt={product.fullName}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="relative object-cover"
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
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-muted">
              {product.category} · {product.purity}
            </span>
            <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <Stars rating={product.rating} size={18} />
              <span className="text-sm text-ink-muted">
                {product.rating.toFixed(1)} · {product.reviewCount} reviews
              </span>
            </div>

            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              {product.blurb}
            </p>

            <div className="mt-8 border-t border-line pt-8">
              <AddToCart product={product} />
            </div>

            {/* Trust chips */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                ["☾", "On the ledger", "Lot-matched"],
                ["☾", "HPLC + MS", "≥99% target"],
                ["☾", "US ships", "0–2 days"],
              ].map(([icon, t, s]) => (
                <div
                  key={t}
                  className="rounded-[var(--radius)] border border-line bg-paper-raised px-3 py-3 text-center"
                >
                  <p className="text-accent">{icon}</p>
                  <p className="mt-1 text-xs font-medium">{t}</p>
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
