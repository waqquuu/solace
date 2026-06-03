import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Securely complete your research-compound order.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
        Checkout
      </h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Every lot you order already has a line in the ledger. For laboratory
        &amp; research use only.
      </p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
