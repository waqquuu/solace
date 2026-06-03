"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart-context";
import { formatCurrency } from "@/lib/format";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    updateQuantity,
    removeItem,
    freeShippingThreshold,
    freeShippingRemaining,
  } = useCart();

  const progress = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100,
  );

  return (
    <>
      {/* Scrim */}
      <div
        className={`fixed inset-0 z-[70] bg-black/65 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-[80] flex h-dvh w-full max-w-md flex-col bg-paper shadow-lift transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-xl">Your order</h2>
          <button
            type="button"
            onClick={closeCart}
            className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:border-line-strong"
            aria-label="Close cart"
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
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="border-b border-line px-5 py-4">
            <p className="text-xs text-ink-muted">
              {freeShippingRemaining > 0 ? (
                <>
                  Add{" "}
                  <span className="font-semibold text-ink">
                    {formatCurrency(freeShippingRemaining)}
                  </span>{" "}
                  for free shipping
                </>
              ) : (
                <span className="font-semibold text-accent-ink">
                  ☾ You&apos;ve unlocked free shipping
                </span>
              )}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-sunken">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="grid size-16 place-items-center rounded-full bg-paper-sunken">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 7h12l-1 13H7L6 7Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 7a3 3 0 0 1 6 0"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-ink-muted">Your order is empty.</p>
              <Link
                href="/catalog"
                onClick={closeCart}
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                Browse the catalog
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {items.map((item) => (
                <li
                  key={`${item.slug}-${item.variantId}`}
                  className="flex gap-4 py-4"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-line bg-paper-raised"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-medium leading-tight hover:text-accent"
                        >
                          {item.name}
                        </Link>
                        <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ink-muted">
                          {item.variantLabel}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug, item.variantId)}
                        className="text-ink-faint transition-colors hover:text-ink"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 6l12 12M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.slug,
                              item.variantId,
                              item.quantity - 1,
                            )
                          }
                          className="grid size-8 place-items-center text-ink-muted transition-colors hover:text-ink"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.slug,
                              item.variantId,
                              item.quantity + 1,
                            )
                          }
                          className="grid size-8 place-items-center text-ink-muted transition-colors hover:text-ink"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-semibold tabular-nums">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-line px-5 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-muted">Subtotal</span>
              <span className="font-display text-xl tabular-nums">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-faint">
              Shipping & taxes calculated at checkout.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="mt-4 flex h-12 items-center justify-center rounded-full bg-ink text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              Checkout
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 w-full text-center text-xs text-ink-muted transition-colors hover:text-ink"
            >
              Continue browsing
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
