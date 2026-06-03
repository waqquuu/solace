import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${brand.fullName} storefront.`,
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      intro="Placeholder terms for development. Replace with attorney-reviewed copy before launch."
    >
      <p className="text-sm text-ink-faint">
        Last updated: placeholder. This document is a template and is not legal
        advice.
      </p>

      <h2>1. Research-use only</h2>
      <p>
        All products sold by {brand.legalName} are intended strictly for
        in-vitro laboratory and research use by qualified professionals. They
        are not drugs, dietary supplements, cosmetics, or foods, and are not
        intended for human or veterinary consumption. By purchasing, you affirm
        you understand and accept this restriction.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 21 years of age and legally permitted to purchase
        and handle research materials in your jurisdiction.
      </p>

      <h2>3. Acceptable use</h2>
      <p>
        You agree not to resell, relabel, or represent these materials as fit
        for human or animal consumption, and to handle them in accordance with
        applicable laboratory safety standards and local law.
      </p>

      <h2>4. Orders &amp; pricing</h2>
      <p>
        We reserve the right to refuse or cancel any order. Prices and
        availability are subject to change without notice.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {brand.legalName} is not liable
        for any damages arising from misuse of materials sold through this
        storefront.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>.
      </p>
    </PageShell>
  );
}
