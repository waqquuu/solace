import type { Metadata } from "next";
import Link from "next/link";
import { brand, complianceStatement } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your research-compound order has been received.",
  robots: { index: false, follow: false },
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="relative">
      <div className="glow pointer-events-none absolute left-1/2 top-0 size-[28rem] -translate-x-1/2 opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:py-28">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent-soft text-accent-ink">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <h1 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl">
          Order confirmed
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Thank you — your order has been received and is entering processing.
          A confirmation has been sent to your email with tracking to follow.
        </p>

        {order && (
          <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-paper-raised px-5 py-3">
            <span className="font-mono text-[0.62rem] uppercase tracking-wider text-ink-faint">
              Order
            </span>
            <span className="font-mono text-sm font-semibold">{order}</span>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/catalog"
            className="inline-flex h-12 items-center rounded-full bg-ink px-7 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            Continue browsing
          </Link>
          <Link
            href="/verify"
            className="inline-flex h-12 items-center rounded-full border border-line bg-paper-raised px-7 text-sm font-medium transition-colors hover:border-line-strong"
          >
            Read the ledger
          </Link>
        </div>

        <p className="mx-auto mt-12 max-w-xl text-xs leading-relaxed text-ink-faint">
          {complianceStatement}
        </p>
        <p className="mt-3 text-xs text-ink-faint">
          Questions? Contact{" "}
          <a href={`mailto:${brand.contact.support}`} className="text-accent">
            {brand.contact.support}
          </a>
        </p>
      </div>
    </div>
  );
}
