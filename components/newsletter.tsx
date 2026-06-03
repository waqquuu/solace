"use client";

import { useState } from "react";

interface NewsletterProps {
  /** Visual variant for dark vs light surfaces. */
  tone?: "light" | "dark";
  compact?: boolean;
}

export function Newsletter({ tone = "light", compact = false }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const dark = tone === "dark";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Seam: wire to a real ESP later. For now, acknowledge locally.
    try {
      localStorage.setItem("solace-club:newsletter", email);
    } catch {
      // ignore
    }
    setDone(true);
  }

  if (done) {
    return (
      <p
        className={`font-mono text-xs uppercase tracking-[0.16em] ${
          dark ? "text-accent-bright" : "text-accent"
        }`}
      >
        ☾ You&apos;re on the list — we&apos;ll note new lots.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm items-center gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@lab.com"
        aria-label="Email address"
        className={`h-11 flex-1 rounded-full border px-4 text-sm outline-none transition-colors ${
          dark
            ? "border-night-line bg-night-raised text-night-text placeholder:text-night-muted focus:border-accent-bright"
            : "border-line bg-paper-raised text-ink placeholder:text-ink-faint focus:border-accent"
        }`}
      />
      <button
        type="submit"
        className={`h-11 shrink-0 rounded-full px-5 text-sm font-medium transition-colors ${
          dark
            ? "bg-accent-bright text-night hover:bg-accent"
            : "bg-ink text-paper hover:bg-accent"
        } ${compact ? "px-4" : ""}`}
      >
        Join
      </button>
    </form>
  );
}
