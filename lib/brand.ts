/**
 * Centralized brand configuration for solace club.
 *
 * This is the single source of truth for brand identity, contact details,
 * navigation, trust signals and compliance copy. Change values here and they
 * propagate across the entire site.
 */

export const brand = {
  /** Short, lowercase wordmark used in the UI. */
  name: "solace",
  /** Second word of the wordmark, rendered with the accent treatment. */
  nameSuffix: "club",
  /** Full display name. */
  fullName: "solace club",
  /** Legal entity used in copyright + compliance blocks. */
  legalName: "Solace Club Research, LLC",
  /** One-line positioning statement. */
  tagline: "Nothing asserted. Everything recorded.",
  /** Slightly longer supporting line. */
  description:
    "solace club supplies high-purity research compounds — injectable, sublingual, and liquid — and writes every lot into a permanent, searchable ledger of independent test results. Read the proof before you order.",
  /** Compliance one-liner shown in the announcement bar and disclaimers. */
  compliance:
    "For laboratory & research use only. Not for human consumption.",
  /** Production URL (also used as metadataBase + canonical root). */
  url: "https://solace.club",
  /** Locale for metadata + html lang. */
  locale: "en_US",
  /** Founding year for copyright. */
  year: 2026,

  contact: {
    email: "hello@solace.club",
    support: "support@solace.club",
    // Placeholder address — replace with the real registered address.
    address: "1 Research Park Drive, Suite 200, Wilmington, DE 19801",
  },

  social: {
    x: "https://x.com/solaceclub",
    instagram: "https://instagram.com/solaceclub",
  },

  /** Hero / catalog trust statistics. */
  stats: [
    { value: "≥99%", label: "purity standard" },
    { value: "100%", label: "lots independently tested" },
    { value: "0–2 days", label: "order processing" },
  ],

  /** Headline review proof used near CTAs. */
  proof: {
    rating: 4.9,
    count: 2143,
    label: "lots on the public ledger",
  },

  /** Free-shipping threshold (USD) used by the cart progress bar. */
  freeShippingThreshold: 150,

  /** Independent testing partners referenced across the site. */
  labs: ["Janoshik Analytical", "ISO/IEC 17025", "USP <1225>", "HPLC + MS"],
} as const;

/** Primary header navigation. */
export const mainNav = [
  { href: "/catalog", label: "Catalog" },
  { href: "/verify", label: "The Ledger" },
  { href: "/quality", label: "Method" },
  { href: "/faq", label: "Questions" },
] as const;

/** Footer navigation columns. */
export const footerNav = [
  {
    title: "The cabinet",
    links: [
      { href: "/catalog", label: "All compounds" },
      { href: "/catalog?format=injectable", label: "Injectable" },
      { href: "/catalog?format=sublingual", label: "Sublingual" },
      { href: "/catalog?format=liquid", label: "Liquid" },
    ],
  },
  {
    title: "On the record",
    links: [
      { href: "/verify", label: "The ledger" },
      { href: "/quality", label: "Method" },
      { href: "/shipping", label: "Shipping" },
      { href: "/faq", label: "Questions" },
    ],
  },
  {
    title: "The house",
    links: [
      { href: "/legal/disclaimer", label: "Research-use disclaimer" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: `mailto:${brand.contact.email}`, label: "Contact" },
    ],
  },
] as const;

/** Long-form compliance paragraph reused in footer / checkout / 404. */
export const complianceStatement = `For laboratory and research use only. Not for human consumption. Products sold by ${brand.legalName} are intended only for in-vitro laboratory research by qualified professionals. They have not been evaluated by the FDA and are not drugs, supplements, or articles intended for human or veterinary use.`;
