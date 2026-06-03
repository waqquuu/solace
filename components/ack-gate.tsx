"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";

const KEY = "solace-club:ack:v1";

/**
 * Age / research-use acknowledgment gate. Persists acceptance in localStorage
 * so it only appears once per browser. Copy is strictly informational.
 */
export function AckGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let shouldOpen = true;
    try {
      shouldOpen = localStorage.getItem(KEY) !== "1";
    } catch {
      shouldOpen = true;
    }
    // One-time, hydration-safe read of persisted acknowledgment.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (shouldOpen) setOpen(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;

  function accept() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      // ignore
    }
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ack-title"
        className="relative w-full max-w-lg overflow-hidden rounded-[var(--radius-lg)] border border-line bg-paper-raised shadow-lift"
      >
        <div className="grain pointer-events-none" aria-hidden />
        <div className="relative p-7 sm:p-9">
          <p className="eyebrow">Before you enter</p>
          <h2 id="ack-title" className="mt-3 font-display text-2xl sm:text-3xl">
            Research-use acknowledgment
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            {brand.fullName} sells materials strictly for{" "}
            <strong className="text-ink">
              in-vitro laboratory and research use only
            </strong>
            . Products are not drugs, supplements, or articles for human or
            veterinary consumption, and nothing on this site is medical advice.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            By continuing, you confirm that you are at least{" "}
            <strong className="text-ink">21 years of age</strong> and a
            qualified professional acquiring these materials for legitimate
            research purposes.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={accept}
              className="flex-1 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              I confirm — enter site
            </button>
            <a
              href="https://www.google.com"
              className="flex-1 rounded-full border border-line px-6 py-3 text-center text-sm font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              Leave
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
