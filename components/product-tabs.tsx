"use client";

import { useState } from "react";
import type { ProductDetail } from "@/lib/types";
import { ReconstitutionCalculator } from "./reconstitution-calculator";

interface ProductTabsProps {
  detail: ProductDetail;
}

export function ProductTabs({ detail }: ProductTabsProps) {
  const toolLabel =
    detail.tool?.kind === "dilution" ? "Concentration" : "Reconstitution";

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "specs", label: "Specifications" },
    { id: "handling", label: "Handling" },
    ...(detail.tool ? [{ id: "tool", label: toolLabel }] : []),
    { id: "references", label: "References" },
  ];

  const [active, setActive] = useState("overview");

  return (
    <div>
      {/* Tab bar */}
      <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
              active === t.id ? "text-ink" : "text-ink-muted hover:text-ink"
            }`}
          >
            {t.label}
            {active === t.id && (
              <span className="underline-in absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent" />
            )}
          </button>
        ))}
      </div>

      <div className="py-8">
        {active === "overview" && (
          <div className="space-y-4 text-ink-soft leading-relaxed">
            {detail.overview.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {active === "specs" && (
          <dl className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2">
            {detail.specs.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-1 bg-paper-raised px-5 py-4"
              >
                <dt className="font-mono text-[0.62rem] uppercase tracking-wider text-ink-faint">
                  {s.label}
                </dt>
                <dd className="text-sm font-medium break-words">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {active === "handling" && (
          <ul className="space-y-3">
            {detail.handling.map((h, i) => (
              <li key={i} className="flex gap-3 text-ink-soft">
                <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-[0.6rem] text-accent-ink">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        )}

        {active === "tool" && detail.tool && (
          <ReconstitutionCalculator tool={detail.tool} />
        )}

        {active === "references" && (
          <ul className="space-y-3">
            {detail.references.map((r) => (
              <li key={r.url}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-2 text-ink-soft transition-colors hover:text-accent"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-1 shrink-0"
                  >
                    <path
                      d="M10 14L21 3m0 0h-6m6 0v6M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="leading-relaxed">{r.label}</span>
                </a>
              </li>
            ))}
            <li className="pt-2 text-xs text-ink-faint">
              References are provided for scientific context only and do not
              constitute health or use claims.
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
