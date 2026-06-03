import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${brand.fullName} handles your information.`,
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Placeholder privacy policy for development. Replace with attorney-reviewed copy before launch."
    >
      <p className="text-sm text-ink-faint">
        Last updated: placeholder. This document is a template and is not legal
        advice.
      </p>

      <h2>Information we collect</h2>
      <p>
        We collect information you provide at checkout (such as name, email, and
        shipping details) and basic analytics about how the site is used.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To process and ship your orders.</li>
        <li>To send order confirmations and batch/COA updates you opt into.</li>
        <li>To improve the storefront experience.</li>
      </ul>

      <h2>Payments</h2>
      <p>
        Payment details are handled by vetted, encrypted third-party processors.
        This storefront does not store card numbers or payment secrets. Cart
        contents and acknowledgments are stored locally in your browser.
      </p>

      <h2>Your choices</h2>
      <p>
        You can unsubscribe from email at any time and request deletion of your
        information by contacting{" "}
        <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>.
      </p>

      <h2>Cookies &amp; local storage</h2>
      <p>
        We use browser local storage to remember your cart and your research-use
        acknowledgment. These remain on your device.
      </p>
    </PageShell>
  );
}
