"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { FORMAT_LABELS } from "@/lib/types";
import { formatCurrency } from "@/lib/format";
import { useCart } from "./cart-context";

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
          disabled={soldOut}
          className={`flex h-11 flex-1 items-center justify-center rounded-full text-sm font-medium transition-colors ${
            soldOut
              ? "cursor-not-allowed bg-paper-sunken text-ink-faint"
              : "bg-ink text-paper hover:bg-accent"
          }`}
        >
          {soldOut ? "Sold out" : added ? "☾ Added to order" : "Add to order"}
        </button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-faint">
        For laboratory &amp; research use only. Not for human consumption. Every
        lot ships with its own line in the ledger.
      </p>
    </div>
  );
}
