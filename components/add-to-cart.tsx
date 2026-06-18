"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { FORMAT_LABELS } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { useCart } from "./cart-context";
import { Waitlist } from "./waitlist";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const soldOut = product.status === "sold-out";

  function handleAdd() {
    if (soldOut) return;
    addItem(
      {
        slug: product.slug,
        variantId: variant.id,
        name: product.name,
        variantLabel: variant.label,
        unitPrice: variant.price,
        image: product.image,
        format: FORMAT_LABELS[product.format],
        paymentLink: variant.paymentLink,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div>
      {/* Price */}
      <div className="flex items-end gap-3">
        <span className="font-display text-3xl">
          {formatCurrency(variant.price)}
        </span>
        {variant.compareAt && (
          <span className="mb-1 text-ink-faint line-through">
            {formatCurrency(variant.compareAt)}
          </span>
        )}
      </div>

      {soldOut ? (
        <div className="mt-6 rounded-[var(--radius)] border border-line bg-paper-sunken/60 p-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
              <span className="size-1.5 rounded-full bg-current" aria-hidden />
              Sold out
            </span>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-muted">
              Ordering paused while we relocate
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Leave your email and we&apos;ll let you know the moment{" "}
            {product.name} is back on the shelf.
          </p>
          <div className="mt-4">
            <Waitlist slug={product.slug} />
          </div>
        </div>
      ) : (
        <>
          {/* Variant selector */}
          {product.variants.length > 1 && (
            <div className="mt-6">
              <span className="font-mono text-[0.62rem] uppercase tracking-wider text-ink-muted">
                Variant
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      v.id === variantId
                        ? "border-accent bg-accent-soft text-accent-ink"
                        : "border-line text-ink-muted hover:border-line-strong hover:text-ink"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-line">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid size-11 place-items-center text-ink-muted transition-colors hover:text-ink"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center tabular-nums">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="grid size-11 place-items-center text-ink-muted transition-colors hover:text-ink"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="btn btn-primary flex-1"
            >
              {added ? "☾ Added to order" : "Add to order"}
            </button>
          </div>
        </>
      )}

      <p className="mt-4 text-xs leading-relaxed text-ink-faint">
        For laboratory &amp; research use only. Not for human consumption. Every
        lot ships with its own line in the ledger.
      </p>
    </div>
  );
}
