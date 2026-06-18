"use client";

import { useEffect, useState } from "react";

/**
 * Light/dark theme switch. The site defaults to light ("Dawn"); the choice is
 * persisted to localStorage and applied before paint by the inline script in
 * the root layout, so there's no flash on reload.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // One-time, hydration-safe sync of the initial theme from the DOM.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // ignore (private mode, etc.)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid size-10 place-items-center rounded-full border border-line bg-paper-raised text-ink transition-colors hover:border-line-strong hover:text-accent"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Render the icon only after mount to avoid a hydration mismatch. */}
      <span
        className={`transition-opacity duration-200 ${mounted ? "opacity-100" : "opacity-0"}`}
      >
        {dark ? (
          // Sun — click to go light
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          // Crescent moon — click to go dark
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15.8 3.4A9 9 0 1 0 20.6 18 7.4 7.4 0 0 1 15.8 3.4Z"
              fill="currentColor"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
