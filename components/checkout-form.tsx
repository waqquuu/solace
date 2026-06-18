"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "./cart-context";
import { formatCurrency } from "@/lib/format";
import { gateway, type CheckoutLineItem } from "@/lib/payments";
import { brand } from "@/lib/brand";

const FLAT_SHIPPING = 12;

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clear, freeShippingThreshold } = useCart();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping =
    items.length === 0 || subtotal >= freeShippingThreshold ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const lineItems: CheckoutLineItem[] = items.map((i) => ({
      productSlug: i.slug,
      variantId: i.variantId,
      name: i.name,
      variantLabel: i.variantLabel,
      unitPrice: i.unitPrice,
      quantity: i.quantity,
      paymentLink: i.paymentLink,
    }));

    const result = await gateway.createCheckoutSession({
      items: lineItems,
      customer: { email, name },
      subtotal,
      shipping,
      total,
    });

    if (result.ok && result.redirectUrl) {
      clear();
      router.push(result.redirectUrl);
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-dashed border-line-strong py-20 text-center">
        <p className="font-display text-2xl">Your order is empty</p>
        <p className="text-ink-muted">Add a compound to continue to checkout.</p>
        <Link
          href="/catalog"
          className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
        >
          Browse the catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
      {/* Form */}
      <form onSubmit={onSubmit} className="order-2 lg:order-1">
        <div className="rounded-[var(--radius-lg)] border border-line bg-paper-raised p-6 sm:p-8">
          <h2 className="font-display text-xl">Contact</h2>
          <div className="mt-4 grid gap-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@lab.com"
              required
            />
            <Input
              label="Full name / institution"
              value={name}
              onChange={setName}
              placeholder="Dr. Jane Doe / Acme Research"
              required
            />
          </div>

          <h2 className="mt-8 font-display text-xl">Payment</h2>
          <div className="mt-4 rounded-[var(--radius)] border border-dashed border-line-strong bg-paper p-4">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-accent-soft text-accent-ink">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
              <p className="font-mono text-[0.68rem] uppercase tracking-wider text-ink-muted">
                Demo mode · gateway-agnostic seam
              </p>
            </div>
            <p className="mt-3 text-sm text-ink-muted">
              This storefront runs a mock payment gateway — no card is charged
              and no secrets are stored. A real processor (Stripe, Adyen, etc.)
              plugs into the same interface without UI changes.
            </p>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-ink text-sm font-medium text-paper transition-colors hover:bg-accent disabled:opacity-60"
          >
            {submitting
              ? "Placing order…"
              : `Place order · ${formatCurrency(total)}`}
          </button>
          <p className="mt-3 text-center text-xs text-ink-faint">
            {brand.compliance}
          </p>
        </div>
      </form>

      {/* Summary */}
      <aside className="order-1 lg:order-2">
        <div className="rounded-[var(--radius-lg)] border border-line bg-paper-raised p-6">
          <h2 className="font-display text-xl">Order summary</h2>
          <ul className="mt-4 divide-y divide-line">
            {items.map((i) => (
              <li
                key={`${i.slug}-${i.variantId}`}
                className="flex items-center gap-3 py-3"
              >
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-line bg-paper">
                  <Image
                    src={i.image}
                    alt={i.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                  <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-ink text-[0.62rem] font-bold text-paper">
                    {i.quantity}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{i.name}</p>
                  <p className="font-mono text-[0.62rem] uppercase tracking-wider text-ink-muted">
                    {i.variantLabel}
                  </p>
                </div>
                <span className="text-sm tabular-nums">
                  {formatCurrency(i.unitPrice * i.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <Row label="Subtotal" value={formatCurrency(subtotal)} />
            <Row
              label="Shipping"
              value={shipping === 0 ? "Free" : formatCurrency(shipping)}
            />
            <div className="flex items-center justify-between border-t border-line pt-3">
              <span className="font-medium">Total</span>
              <span className="font-display text-xl tabular-nums">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[0.62rem] uppercase tracking-wider text-ink-muted">
        {label}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-11 w-full rounded-full border border-line bg-paper px-4 text-sm outline-none transition-colors focus:border-accent placeholder:text-ink-faint"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-ink-muted">
      <span>{label}</span>
      <span className="tabular-nums text-ink">{value}</span>
    </div>
  );
}
