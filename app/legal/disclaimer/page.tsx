import type { Metadata } from "next";
import { brand, complianceStatement } from "@/lib/brand";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Research-Use Disclaimer",
  description:
    "All products are for in-vitro laboratory and research use only. Not for human or veterinary consumption.",
  alternates: { canonical: "/legal/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Research-Use Disclaimer"
      intro="Read this carefully. It governs how every product on this site may be used."
    >
      <div className="rounded-[var(--radius-lg)] border border-accent/30 bg-accent-soft/40 p-6">
        <p className="font-medium text-ink">{complianceStatement}</p>
      </div>

      <h2>Not for consumption</h2>
      <p>
        Products are not drugs, supplements, cosmetics, or foods. They have not
        been evaluated by the FDA and are not intended to diagnose, treat, cure,
        or prevent any disease. They are not intended for human or veterinary
        use of any kind.
      </p>

      <h2>No health or use claims</h2>
      <p>
        Any scientific references provided on product pages describe published
        preclinical or in-vitro literature for context only. They are not
        claims about safety, efficacy, or appropriate use, and must not be
        interpreted as such.
      </p>

      <h2>Buyer responsibility</h2>
      <p>
        By purchasing, you confirm you are a qualified professional acquiring
        these materials for legitimate laboratory research, that you are at
        least 21 years of age, and that you will handle and store them in
        accordance with applicable safety standards and law.
      </p>

      <h2>Questions</h2>
      <p>
        Contact{" "}
        <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a> with
        any questions about appropriate research use.
      </p>
    </PageShell>
  );
}
