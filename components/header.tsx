"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/lib/brand";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { useCart } from "./cart-context";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart, hydrated } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`glass relative border-b transition-all duration-300 ${
          scrolled ? "header-accent border-line" : "border-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 ${
            scrolled ? "h-[60px]" : "h-[76px]"
          }`}
        >
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="underline-in absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Link href="/catalog" className="btn btn-primary">
                Enter the catalog
              </Link>
            </span>

            <ThemeToggle />

            <button
              type="button"
              onClick={openCart}
              className="relative grid size-10 place-items-center rounded-full border border-line bg-paper-raised transition-colors hover:border-line-strong"
              aria-label="Open cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 7h12l-1 13H7L6 7Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 7a3 3 0 0 1 6 0"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              {hydrated && count > 0 && (
                <span className="absolute -right-1 -top-1 grid min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[0.62rem] font-bold text-night">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full border border-line bg-paper-raised md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div className="flex w-4 flex-col gap-1">
                <span
                  className={`h-0.5 w-full bg-ink transition-transform duration-300 ${
                    menuOpen ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-ink transition-opacity duration-200 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-ink transition-transform duration-300 ${
                    menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`grid overflow-hidden border-b border-line bg-paper-raised transition-all duration-300 md:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-transparent"
        }`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {mainNav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-accent-soft text-accent-ink"
                    : "text-ink hover:bg-paper-sunken"
                }`}
                style={{
                  transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/catalog"
              className="mt-2 rounded-xl bg-ink px-4 py-3 text-center text-base font-medium text-paper"
            >
              Enter the catalog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
