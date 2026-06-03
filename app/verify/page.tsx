import type { Metadata } from "next";
import { ledger, ledgerCount } from "@/lib/coa";
import { Ledger } from "@/components/ledger";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "The Ledger",
  description:
    "solace club keeps a permanent, searchable line for every lot — purity, identity method, testing lab, and the day it was recorded. Look up yours, or read the archive top to bottom.",
  alternates: { canonical: "/verify" },
};

export default function LedgerPage() {
  return (
    <div className="relative">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-72 opacity-60" aria-hidden />
      <div className="glow-moon pointer-events-none absolute -top-10 left-1/2 h-64 w-[44rem] -translate-x-1/2" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <p className="eyebrow">The ledger</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            Every lot we&apos;ve shipped, on the record.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Nothing here is asserted — it&apos;s recorded. Each lot keeps a
            permanent line: its measured purity, the method and lab that read
            it, and the date it entered the archive. Find yours by lot number,
            or read the {ledgerCount} entries top to bottom.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <Ledger records={ledger} mode="archive" />
        </Reveal>

        <Reveal delay={160} className="mt-12 border-t border-line pt-8">
          <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
            Testing is performed by accredited third-party laboratories under
            ISO/IEC 17025. A lot marked superseded simply means a newer batch
            has since been recorded; its certificate remains on file. The
            testing lab can confirm any report directly.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
