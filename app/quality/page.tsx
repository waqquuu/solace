import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Method",
  description:
    "How solace club builds, independently tests, and permanently records every lot in the ledger — and how to read the record for the unit in your hand.",
  alternates: { canonical: "/quality" },
};

export default function QualityPage() {
  return (
    <PageShell
      eyebrow="Method"
      title="We don't ask you to trust us. We write it down."
      intro={`${brand.fullName} runs on one rule: nothing is asserted, everything is recorded. A lot doesn't reach the cabinet until an independent lab has measured it and the result has a permanent line in the ledger.`}
    >
      <h2>Why a ledger, not a promise</h2>
      <p>
        Most research-compound sellers reuse a single, generic Certificate of
        Analysis across countless batches — a document that was never tied to
        your unit, often with no way to confirm the lab ran it at all. Work that
        starts from unverified material is compromised before the first
        measurement. So instead of a promise, we keep a record: every lot we
        ship has its own line, and that line never disappears.
      </p>

      <h2>How a lot earns its line</h2>
      <p>
        Every compound moves through the same documented path before it is
        eligible to be sold:
      </p>
      <ul>
        <li>
          <strong>Built.</strong> Solid-phase synthesis under documented
          procedures, followed by repeated HPLC purification passes toward ≥99%
          purity (≥98% for certain coenzymes and antioxidants).
        </li>
        <li>
          <strong>Measured.</strong> Each lot goes to an accredited third-party
          laboratory for HPLC purity quantification and mass-spectrometry
          identity confirmation. We never grade our own material.
        </li>
        <li>
          <strong>Recorded.</strong> The result is written to the ledger against
          the exact lot number printed on your label — permanent and searchable.
        </li>
        <li>
          <strong>Sealed &amp; traceable.</strong> Vials are flushed with inert
          gas and sealed; every unit carries lot-level traceability back to its
          line.
        </li>
      </ul>

      <h2>Reading the record</h2>
      <p>
        Openness only counts if you can check it. Open{" "}
        <Link href="/verify">The Ledger</Link>, enter the lot number on your
        label, and read the exact report for your unit — and the accredited lab
        can confirm that report directly.
      </p>

      <h2>Accreditation &amp; methods</h2>
      <p>
        Our testing partners operate under <strong>ISO/IEC 17025</strong>{" "}
        accreditation and validate methods consistent with{" "}
        <strong>USP &lt;1225&gt;</strong>. Purity is determined by HPLC;
        identity is confirmed by mass spectrometry.
      </p>

      <p className="text-sm text-ink-faint">
        All materials are sold strictly for in-vitro laboratory and research use
        only. Nothing on this page is a health, performance, or use claim.
      </p>
    </PageShell>
  );
}
