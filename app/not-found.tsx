import Link from "next/link";
import { brand } from "@/lib/brand";

export default function NotFound() {
  return (
    <div className="relative">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="glow pointer-events-none absolute left-1/2 top-10 size-[26rem] -translate-x-1/2 opacity-40" aria-hidden />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 font-display text-6xl tracking-tight sm:text-7xl">
          No line for that lot.
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
          There&apos;s no record at this address. The page you&apos;re after may
          have moved, or it was never written into the ledger.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Back to home
          </Link>
          <Link
            href="/verify"
            className="inline-flex h-12 items-center rounded-full border border-line bg-paper-raised px-7 text-sm font-medium transition-colors hover:border-line-strong"
          >
            Open the ledger
          </Link>
        </div>
        <p className="mt-14 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">
          {brand.compliance}
        </p>
      </div>
    </div>
  );
}
