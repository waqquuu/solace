"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CoaRecord } from "@/lib/coa";
import { SAMPLE_LOTS } from "@/lib/coa";
import { FORMAT_LABELS } from "@/lib/types";
import { formatDate } from "@/lib/format";

interface LedgerProps {
  /** Full set of records to draw from (already sorted newest-first). */
  records: CoaRecord[];
  /** "feed" = compact homepage view; "archive" = full searchable page. */
  mode?: "feed" | "archive";
  /** How many rows to show in feed mode before a query is entered. */
  feedLimit?: number;
}

/**
 * The Ledger — solace club's signature proof archive. A chronological,
 * searchable record of every lot, with each row expandable to its full
 * Certificate of Analysis. Reading the ledger *is* verification.
 */
export function Ledger({ records, mode = "feed", feedLimit = 6 }: LedgerProps) {
  const [query, setQuery] = useState("");
  const [openLot, setOpenLot] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return records;
    return records.filter(
      (r) =>
        r.lot.toLowerCase().includes(q) ||
        r.product.toLowerCase().includes(q) ||
        r.slug.toLowerCase().includes(q),
    );
  }, [records, query]);

  const rows = useMemo(() => {
    if (mode === "archive") return filtered;
    return query.trim() ? filtered.slice(0, 8) : records.slice(0, feedLimit);
  }, [mode, filtered, query, records, feedLimit]);

  return (
    <div>
      {/* Lookup */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex h-13 flex-1 items-center rounded-full border border-line bg-paper-raised px-5 py-3 focus-within:border-accent">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-faint">
            Lot
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Look up a lot — e.g. BPC-2406A"
            aria-label="Look up a lot number"
            className="ml-3 w-full bg-transparent text-base outline-none placeholder:text-ink-faint"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="shrink-0 text-ink-faint transition-colors hover:text-ink"
              aria-label="Clear lookup"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </label>
      </div>

      {/* Sample lots hint */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-faint">
          Try
        </span>
        {SAMPLE_LOTS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setQuery(s)}
            className="rounded-full border border-line px-3 py-1 font-mono text-[0.66rem] text-ink-muted transition-colors hover:border-accent hover:text-accent-bright"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Ledger header row (column labels) */}
      <div className="mt-8 hidden grid-cols-[6.5rem_1fr_5rem_2.5rem] items-center gap-4 border-b border-line pb-2 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-ink-faint sm:grid">
        <span>Recorded</span>
        <span>Lot · compound</span>
        <span className="text-right">Purity</span>
        <span className="text-right">State</span>
      </div>

      {/* Rows */}
      {rows.length > 0 ? (
        <ul>
          {rows.map((r) => {
            const open = openLot === r.lot;
            return (
              <li key={r.lot} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpenLot(open ? null : r.lot)}
                  aria-expanded={open}
                  className="grid w-full grid-cols-[1fr_auto] items-center gap-4 py-4 text-left transition-colors hover:bg-paper-raised/50 sm:grid-cols-[6.5rem_1fr_5rem_2.5rem]"
                >
                  <span className="order-2 font-mono text-[0.66rem] uppercase tracking-wider text-ink-faint sm:order-1">
                    {formatDate(r.testedDate)}
                  </span>
                  <span className="order-1 min-w-0 sm:order-2">
                    <span className="font-mono text-sm text-accent-ink">
                      {r.lot}
                    </span>
                    <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="truncate font-display text-base leading-tight">
                        {r.product}
                      </span>
                      <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-ink-faint">
                        {FORMAT_LABELS[r.format]}
                      </span>
                    </span>
                  </span>
                  <span className="order-3 text-right font-mono text-sm text-ink">
                    {r.purity}
                  </span>
                  <span className="order-4 flex items-center justify-end gap-2">
                    <span
                      className={`size-1.5 rounded-full ${
                        r.status === "verified" ? "bg-accent" : "bg-ink-faint"
                      }`}
                      aria-hidden
                    />
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`text-ink-faint transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Expanded COA detail */}
                <div
                  className={`grid transition-all duration-300 ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="pb-6">
                      <div className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-3">
                        <Cell label="Method" value={r.method} />
                        <Cell label="Testing lab" value={r.lab} />
                        <Cell label="Accreditation" value={r.accreditation} />
                      </div>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-faint">
                          {r.status === "verified" ? (
                            <span className="text-accent-ink">
                              ☾ Recorded &amp; current
                            </span>
                          ) : (
                            <span>Superseded by a newer lot</span>
                          )}
                        </p>
                        <Link
                          href={`/product/${r.slug}`}
                          className="text-sm font-medium text-accent-ink transition-colors hover:text-accent-bright"
                        >
                          View compound →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-8 rounded-[var(--radius-lg)] border border-dashed border-line-strong px-6 py-14 text-center">
          <p className="font-display text-xl">No line for that lot</p>
          <p className="mt-2 text-sm text-ink-muted">
            We couldn&apos;t find{" "}
            <span className="font-mono text-ink">{query}</span> in the ledger.
            Check the lot number printed on your label, or reach out and
            we&apos;ll locate the record.
          </p>
        </div>
      )}

      {/* Feed footer → full archive */}
      {mode === "feed" && !query.trim() && (
        <div className="mt-8 flex items-center justify-between">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">
            {records.length} lots on the record
          </p>
          <Link
            href="/verify"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent-bright"
          >
            Open the full ledger
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
      )}
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper-raised px-5 py-4">
      <p className="font-mono text-[0.56rem] uppercase tracking-wider text-ink-faint">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
