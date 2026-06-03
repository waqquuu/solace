import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { formatCurrency } from "@/lib/format";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Shipping",
  description:
    "Processing times, domestic shipping, cold-chain handling, and tracking for solace club orders.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <PageShell
      eyebrow="Shipping"
      title="Processed fast. Tracked end to end."
      intro="Orders are prepared carefully and shipped domestically with tracking on every parcel."
    >
      <h2>Processing</h2>
      <p>
        Orders are typically processed within <strong>0–2 business days</strong>
        . You&apos;ll receive a confirmation email when your order is placed and
        a second email with tracking once it ships.
      </p>

      <h2>Domestic shipping</h2>
      <ul>
        <li>
          <strong>
            Free shipping on orders over {formatCurrency(brand.freeShippingThreshold)}
          </strong>{" "}
          within the United States.
        </li>
        <li>A flat rate applies to orders below the free-shipping threshold.</li>
        <li>All parcels ship with carrier tracking.</li>
      </ul>

      <h2>Cold-chain items</h2>
      <p>
        Temperature-sensitive products — such as liquids and certain
        reconstitution-ready compounds — ship with appropriate cold-pack
        protection. Refrigerate applicable items on arrival per the handling
        notes on each product page.
      </p>

      <h2>Storage on arrival</h2>
      <ul>
        <li>Lyophilized vials: store at −20 °C, protected from light.</li>
        <li>Liquids: refrigerate at 2–8 °C, protected from light.</li>
        <li>Sublingual strips: keep sealed in a cool, dry place.</li>
      </ul>

      <h2>International</h2>
      <p>
        Availability of international shipping varies. Contact{" "}
        <a href={`mailto:${brand.contact.support}`}>{brand.contact.support}</a>{" "}
        before ordering from outside the United States.
      </p>

      <p className="text-sm text-ink-faint">
        For laboratory &amp; research use only. Not for human consumption.
      </p>
    </PageShell>
  );
}
