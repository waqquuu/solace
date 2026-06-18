"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";
import { Waitlist } from "./waitlist";

/** Per-session flag so the relocation notice shows once, not on every nav. */
const NOTICE_KEY = "solace-club:notice:v1";

type Step = "age" | "notice" | "closed";

/**
 * Two-step entry experience:
 *  1. Age / research-use acknowledgment (21+). Shown on EVERY visit/page load —
 *     it is deliberately not remembered, so anyone reaching the site must
 *     affirm 21+ and research use again.
 *  2. Relocation notice — surfaced after the age gate while the lab is paused
 *     (brand.status.open === false), shown once per session.
 * Copy is strictly informational.
 */
export function AckGate() {
  const [step, setStep] = useState<Step>("closed");

  useEffect(() => {
    // The 21+/research gate appears on every load — render it immediately and
    // unconditionally once we're on the client (keeps SSR markup clean).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep("age");
  }, []);

  useEffect(() => {
    if (step !== "closed") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [step]);

  if (step === "closed") return null;

  function confirmAge() {
    let noticeSeen = false;
    try {
      noticeSeen = sessionStorage.getItem(NOTICE_KEY) === "1";
    } catch {
      // ignore
    }
    if (!brand.status.open && !noticeSeen) {
      setStep("notice");
    } else {
      setStep("closed");
    }
  }

  function dismissNotice() {
    try {
      sessionStorage.setItem(NOTICE_KEY, "1");
    } catch {
      // ignore
    }
    setStep("closed");
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
          {step === "age" ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow">Before you enter</p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-3 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-accent-ink">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                  21+
                </span>
              </div>
              <h2 id="ack-title" className="mt-3 font-display text-2xl sm:text-3xl">
                Research-use acknowledgment
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {brand.fullName} sells materials strictly for{" "}
                <strong className="text-ink">
                  in-vitro laboratory and research use only
                </strong>
                . Products are not drugs, supplements, or articles for human or
                veterinary consumption, and nothing on this site is medical
                advice.
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
                  onClick={confirmAge}
                  className="flex flex-1 items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
                >
                  I am 21+ &mdash; enter site
                </button>
                <a
                  href="https://www.google.com"
                  className="flex-1 rounded-full border border-line px-6 py-3 text-center text-sm font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  Leave
                </a>
              </div>
            </>
          ) : (
            <>
              <p className="eyebrow">A quick note</p>
              <h2 id="ack-title" className="mt-3 font-display text-2xl sm:text-3xl">
                We&apos;re moving to a bigger home.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Ordering is <strong className="text-ink">paused</strong>{" "}
                while we relocate into a larger facility and build out new
                infrastructure.
                We&apos;ve grown so much, so quickly — and that&apos;s entirely
                down to you. Thank you for the support that made this move
                necessary.
              </p>
              <div className="mt-5 rounded-[var(--radius)] border border-accent/40 bg-accent-soft p-4">
                <p className="text-sm leading-relaxed text-accent-ink">
                  We reopen{" "}
                  <strong>{brand.status.reopenDate}</strong> with{" "}
                  <strong>{brand.status.discountPct}% off all orders</strong> to
                  say thanks. Until then, every line is marked sold out — feel
                  free to browse the catalog and read the ledger.
                </p>
              </div>

              <div className="mt-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-muted">
                  Be first through the door
                </p>
                <div className="mt-2">
                  <Waitlist showNote={false} />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={dismissNotice}
                  className="w-full rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
                >
                  Continue to the site
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
