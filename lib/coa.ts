/**
 * The Ledger — solace club's proof archive.
 *
 * Every lot ever shipped is written here: lot number, compound, purity,
 * identity method, testing lab, and the date it was recorded. The ledger is
 * the single source of truth behind both the homepage feed and the public
 * archive page. `lookupBatch` is the seam: today it resolves against this
 * curated static data; later, swap the implementation for a real backend
 * without changing any UI.
 */

import type { ProductFormat } from "./types";

export interface CoaRecord {
  lot: string;
  product: string;
  slug: string;
  format: ProductFormat;
  method: string;
  purity: string;
  lab: string;
  accreditation: string;
  testedDate: string;
  status: "verified" | "expired";
}

const COA_DATABASE: CoaRecord[] = [
  {
    lot: "BPC-2406A",
    product: "BPC-157 research vial",
    slug: "bpc-157",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.4%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-05-02",
    status: "verified",
  },
  {
    lot: "GLP-2406R",
    product: "GLP-3 (RT) 20 mg research vial",
    slug: "glp-3-rt-20mg",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.2%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-04-29",
    status: "verified",
  },
  {
    lot: "GHK-2406B",
    product: "GHK-Cu 50 mg research vial",
    slug: "ghk-cu-50mg",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.6%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-04-25",
    status: "verified",
  },
  {
    lot: "TB-2405C",
    product: "TB-500 research vial",
    slug: "tb-500",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.1%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-04-21",
    status: "verified",
  },
  {
    lot: "WOLV-2404S",
    product: "BPC-157 + TB-500 (Wolverine) research vial",
    slug: "wolverine-blend",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.0%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-04-18",
    status: "verified",
  },
  {
    lot: "GLOW-2405G",
    product: "GLOW (BPC-157 + TB-500 + GHK-Cu) research vial",
    slug: "glow-blend",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.3%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-04-17",
    status: "verified",
  },
  {
    lot: "NAD-2405L",
    product: "NAD+ solution",
    slug: "nad-plus-solution",
    format: "solution",
    method: "HPLC",
    purity: "98.7%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-04-16",
    status: "verified",
  },
  {
    lot: "IPA-2404A",
    product: "Ipamorelin research vial",
    slug: "ipamorelin",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.3%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-04-12",
    status: "verified",
  },
  {
    lot: "TES-2404T",
    product: "Tesamorelin research vial",
    slug: "tesamorelin",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.2%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-04-10",
    status: "verified",
  },
  {
    lot: "CJC-2404B",
    product: "CJC-1295 / Ipamorelin (No DAC) research vial",
    slug: "cjc-1295-ipamorelin",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.1%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-04-08",
    status: "verified",
  },
  {
    lot: "MOTS-2404M",
    product: "MOTS-c research vial",
    slug: "mots-c",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.0%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-04-05",
    status: "verified",
  },
  {
    lot: "TA1-2404V",
    product: "Thymosin Alpha-1 research vial",
    slug: "thymosin-alpha-1",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.1%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-04-04",
    status: "verified",
  },
  {
    lot: "GLUT-2403L",
    product: "Glutathione solution",
    slug: "glutathione-solution",
    format: "solution",
    method: "HPLC",
    purity: "98.9%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-03-30",
    status: "verified",
  },
  {
    lot: "PT141-2403V",
    product: "PT-141 research vial",
    slug: "pt-141",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.2%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-03-26",
    status: "verified",
  },
  {
    lot: "EPI-2403E",
    product: "Epithalon research vial",
    slug: "epithalon",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.4%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-03-22",
    status: "verified",
  },
  {
    lot: "GHK-2403A",
    product: "GHK-Cu 100 mg research vial",
    slug: "ghk-cu-100mg",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.5%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-03-15",
    status: "expired",
  },
  {
    lot: "BPC-2403X",
    product: "BPC-157 research vial",
    slug: "bpc-157",
    format: "lyophilized",
    method: "HPLC + MS",
    purity: "99.3%",
    lab: "Janoshik Analytical",
    accreditation: "ISO/IEC 17025",
    testedDate: "2026-03-10",
    status: "verified",
  },
];

/** The full archive, newest first. */
export const ledger: CoaRecord[] = [...COA_DATABASE].sort(
  (a, b) => b.testedDate.localeCompare(a.testedDate),
);

/** Example lots surfaced in the UI so visitors can try the lookup. */
export const SAMPLE_LOTS = ledger.slice(0, 4).map((c) => c.lot);

/** Total count of recorded lots (used in ledger summary copy). */
export const ledgerCount = ledger.length;

/** Most recently recorded lots, newest first. */
export function recentLots(n = 6): CoaRecord[] {
  return ledger.slice(0, n);
}

/** Filter the ledger by lot, compound, or slug (case-insensitive). */
export function searchLedger(query: string): CoaRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return ledger;
  return ledger.filter(
    (r) =>
      r.lot.toLowerCase().includes(q) ||
      r.product.toLowerCase().includes(q) ||
      r.slug.toLowerCase().includes(q),
  );
}

export interface LookupResult {
  found: boolean;
  record?: CoaRecord;
}

export async function lookupBatch(lotInput: string): Promise<LookupResult> {
  // Simulate network latency for the mock seam.
  await new Promise((r) => setTimeout(r, 650));
  const lot = lotInput.trim().toUpperCase();
  const record = COA_DATABASE.find((c) => c.lot.toUpperCase() === lot);
  return { found: Boolean(record), record };
}
