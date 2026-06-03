"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";

const KEY = "solace-club:announce-dismissed";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    // One-time, hydration-safe read of the dismissed flag.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDismissed(sessionStorage.getItem(KEY) === "1");
  }, []);

  if (dismissed) return null;

  return (
    <div className="relative z-40 border-b border-night-line bg-night text-night-muted">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em]">
          <span className="text-accent-bright">☾</span> {brand.compliance}
        </p>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(KEY, "1");
            setDismissed(true);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-night-muted transition-colors hover:text-night-text"
          aria-label="Dismiss announcement"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
