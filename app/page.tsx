import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { products, FORMATS, fromPrice } from "@/lib/products";
import { ledger, recentLots } from "@/lib/coa";
import { testimonials, methodSteps } from "@/lib/content";
import { formatCurrency, formatDate } from "@/lib/format";
import { FORMAT_LABELS, FORMAT_BLURBS } from "@/lib/types";
import { Reveal } from "@/components/reveal";
import { Ledger } from "@/components/ledger";
import { QuoteRotator } from "@/components/quote-rotator";

const latest = recentLots(1)[0];

export default function Home() {
  const cabinet = FORMATS.map((format) => ({
    format,
    items: products.filter((p) => p.format === format),
  }));

  return (
    <>
      {/* ===================== OVERTURE ===================== */}
      <section className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
        <div className="starfield pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="glow-moon pointer-events-none absolute -top-24 left-1/2 h-[30rem] w-[64rem] -translate-x-1/2" aria-hidden />
        <div className="aurora pointer-events-none absolute -bottom-40 left-1/2 size-[44rem] -translate-x-1/2" aria-hidden />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center sm:px-6 lg:py-36">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-ink-muted">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M15.8 3.4A9 9 0 1 0 20.6 18 7.4 7.4 0 0 1 15.8 3.4Z"
                  fill="var(--accent)"
                />
              </svg>
              {brand.fullName}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-8 font-display text-5xl font-medium leading-[1.04] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Proof, kept quietly
              <br className="hidden sm:block" /> on the record.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
              High-purity research compounds — injectable, sublingual, and
              liquid. Every lot is tested by an independent lab and written into
              a permanent ledger you can read. Nothing here asks for your faith.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/catalog"
                className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-sm font-medium text-paper transition-colors hover:bg-accent-bright"
              >
                Enter the catalog
              </Link>
              <Link
                href="/verify"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-7 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-bright"
              >
                Read the ledger
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </Reveal>

          {latest && (
            <Reveal delay={320}>
              <p className="mt-12 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-faint">
                Last recorded —{" "}
                <span className="text-accent-ink">{latest.lot}</span> ·{" "}
                {latest.product} · {formatDate(latest.testedDate)}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ===================== THE LEDGER (signature) ===================== */}
      <section className="border-y border-line bg-paper-raised/40">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <p className="eyebrow">The ledger</p>
              <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
                Read the proof, lot by lot.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="max-w-sm text-sm leading-relaxed text-ink-muted sm:text-right">
                Our signature isn&apos;t a badge — it&apos;s the archive. Look
                up the number on your label, or browse what&apos;s been recorded
                lately.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120} className="mt-10">
            <div className="card-night rounded-[var(--radius-lg)] border border-line p-5 sm:p-8">
              <Ledger records={ledger} mode="feed" feedLimit={6} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== THE CABINET ===================== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <Reveal>
          <p className="eyebrow">The cabinet</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl tracking-tight sm:text-4xl">
            What&apos;s on the shelf, by format.
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-16">
          {cabinet.map((group, gi) => (
            <div key={group.format}>
              <Reveal className="flex items-end justify-between gap-4 border-b border-line pb-4">
                <div>
                  <h3 className="font-display text-2xl">
                    {FORMAT_LABELS[group.format]}
                  </h3>
                  <p className="mt-1 max-w-md text-sm text-ink-muted">
                    {FORMAT_BLURBS[group.format]}
                  </p>
                </div>
                <Link
                  href={`/catalog?format=${group.format}`}
                  className="hidden shrink-0 items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-accent-bright sm:inline-flex"
                >
                  All {group.items.length}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </Reveal>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {group.items.slice(0, 4).map((p, i) => (
                  <Reveal key={p.slug} delay={gi * 40 + i * 40}>
                    <Link href={`/product/${p.slug}`} className="group block">
                      <div className="card-night relative aspect-square overflow-hidden rounded-[var(--radius)] border border-line">
                        <span
                          className="absolute inset-x-0 top-0 z-10 h-1"
                          style={{ backgroundColor: p.tint ?? "#c4673a" }}
                          aria-hidden
                        />
                        <Image
                          src={p.image}
                          alt={p.fullName}
                          fill
                          sizes="(min-width: 1024px) 22vw, 45vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute right-3 top-3 rounded-full border border-line bg-paper/80 px-2 py-0.5 font-mono text-[0.54rem] uppercase tracking-wider text-accent-ink backdrop-blur">
                          {p.purity}
                        </span>
                      </div>
                      <div className="mt-3 flex items-baseline justify-between gap-2">
                        <span className="flex items-center gap-2 font-display text-lg leading-tight transition-colors group-hover:text-accent-bright">
                          <span
                            className="size-2 shrink-0 rounded-full"
                            style={{ backgroundColor: p.tint ?? "#c4673a" }}
                            aria-hidden
                          />
                          {p.name}
                        </span>
                        <span className="shrink-0 font-mono text-xs text-ink-muted">
                          {formatCurrency(fromPrice(p))}
                        </span>
                      </div>
                      <p className="mt-0.5 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-ink-faint">
                        {p.category}
                      </p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== HOW A LOT EARNS ITS LINE ===================== */}
      <section className="section-dawn relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <Reveal>
            <p className="eyebrow">Method</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">
              How a lot earns its line.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
              A compound doesn&apos;t reach the catalog until it has been built,
              measured by someone with no stake in the result, and written down
              where you can find it.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-line bg-line sm:grid-cols-3">
            {methodSteps.map((step, i) => (
              <Reveal
                key={step.num}
                delay={i * 100}
                className="bg-paper-raised p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-4xl text-accent/40">
                    {step.num}
                  </span>
                  {i < methodSteps.length - 1 && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="hidden text-ink-faint sm:block"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <h3 className="mt-4 font-display text-xl">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <Link
              href="/quality"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:gap-3"
            >
              Read the method in full
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===================== IN THEIR WORDS ===================== */}
      <section className="relative overflow-hidden">
        <div className="glow pointer-events-none absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:py-28">
          <Reveal>
            <p className="eyebrow">In their words</p>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <QuoteRotator quotes={testimonials} />
          </Reveal>
        </div>
      </section>

      {/* ===================== QUIET CLOSE ===================== */}
      <section className="relative overflow-hidden border-t border-line bg-paper-raised/40">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="glow-moon pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <Reveal>
            <span className="mx-auto grid size-12 place-items-center rounded-full border border-line-strong bg-paper" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15.8 3.4A9 9 0 1 0 20.6 18 7.4 7.4 0 0 1 15.8 3.4Z"
                  fill="var(--accent)"
                />
              </svg>
            </span>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
              Source it once. Confirm it whenever you like.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/catalog"
                className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-sm font-medium text-paper transition-colors hover:bg-accent-bright"
              >
                Enter the catalog
              </Link>
              <Link
                href="/verify"
                className="inline-flex h-12 items-center rounded-full border border-line-strong px-7 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent-bright"
              >
                Read the ledger
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
