"use client";

import { useState } from "react";
import { brand } from "@/lib/brand";

interface WaitlistProps {
  /** Product slug used to namespace the stored entry. Omit for site-wide. */
  slug?: string;
  /** Visual variant for dark vs light surfaces. */
  tone?: "light" | "dark";
  /** Show the "Reopening … with …% off" supporting line. */
  showNote?: boolean;
}

/**
 * Reopen waitlist capture. While the lab is relocating every product is sold
 * out, so this turns a dead end into captured demand: visitors leave an email
 * to be notified when ordering resumes (with the reopening discount).
 *
 * Seam: wire to a real ESP later. For now we acknowledge locally, mirroring
 * the newsletter component.
 */
export function Waitlist({ slug, tone = "light", showNote = true }: WaitlistProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const dark = tone === "dark";
  const key = slug ? `solace-club:waitlist:${slug}` : "solace-club:waitlist";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      localStorage.setItem(key, email);
    } catch {
      // ignore
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="space-y-1">
        <p
          className={`font-mono text-xs uppercase tracking-[0.16em] ${
            dark ? "text-accent-bright" : "text-accent"
          }`}
        >
          ☾ You&apos;re on the list.
        </p>
        <p className={`text-xs ${dark ? "text-night-muted" : "text-ink-muted"}`}>
          We&apos;ll email you the moment we reopen &mdash; with your{" "}
          {brand.status.discountPct}% off.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <form onSubmit={onSubmit} className="flex w-full items-center gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@lab.com"
          aria-label="Email address for reopening notification"
          className={`h-11 flex-1 rounded-full border px-4 text-sm outline-none transition-colors ${
            dark
              ? "border-night-line bg-night-raised text-night-text placeholder:text-night-muted focus:border-accent-bright"
              : "border-line bg-paper-raised text-ink placeholder:text-ink-faint focus:border-accent"
          }`}
        />
        <button
          type="submit"
          className={`btn shrink-0 ${
            dark
              ? "bg-accent-bright text-night hover:bg-accent"
              : "bg-ink text-paper hover:bg-accent"
          }`}
        >
          Notify me
        </button>
      </form>
      {showNote && (
        <p
          className={`text-xs leading-relaxed ${
            dark ? "text-night-muted" : "text-ink-muted"
          }`}
        >
          Reopening{" "}
          <strong className={dark ? "text-night-text" : "text-ink"}>
            {brand.status.reopenDate}
          </strong>{" "}
          with{" "}
          <strong className={dark ? "text-night-text" : "text-ink"}>
            {brand.status.discountPct}% off all orders
          </strong>{" "}
          &mdash; be first to know.
        </p>
      )}
    </div>
  );
}
