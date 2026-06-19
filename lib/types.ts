export type ProductFormat = "lyophilized" | "sublingual" | "solution";

export type ProductCategory =
  | "Regenerative"
  | "Blend"
  | "Metabolic"
  | "Growth"
  | "Anti-Aging"
  | "Longevity"
  | "Antioxidant"
  | "Tanning"
  | "Blood Flow"
  | "Anti-Inflammatory"
  | "Cognitive"
  | "Sleep"
  | "Supplies";

export type StockStatus = "in-stock" | "low-stock" | "sold-out";

export interface PriceVariant {
  /** Stable id used as a cart key suffix. */
  id: string;
  /** Human label, e.g. "5 mg", "30 strips", "30 mL". */
  label: string;
  price: number;
  /** Optional strike-through compare-at price. */
  compareAt?: number;
  /**
   * Stripe Payment Link for this exact price point. Stripe issues one link per
   * price, so each variant carries its own URL. Populated by the operator once
   * the links are created; consumed by the payments seam in `lib/payments.ts`.
   */
  paymentLink?: string;
}

export interface Review {
  id: string;
  author: string;
  /** ISO date string. */
  date: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Reference {
  label: string;
  url: string;
}

/** Lean listing model — kept light so catalog pages stay fast. */
export interface Product {
  slug: string;
  /** Compound name, e.g. "BPC-157". */
  name: string;
  /** Full product name incl. format, e.g. "BPC-157 research vial". */
  fullName: string;
  format: ProductFormat;
  category: ProductCategory;
  /** One-line listing description. */
  blurb: string;
  /** Purity standard label, e.g. "≥99%". */
  purity: string;
  /** Public image path (light theme variant). */
  image: string;
  /** Public image path for the dark theme variant. */
  imageDark: string;
  variants: PriceVariant[];
  rating: number;
  reviewCount: number;
  status: StockStatus;
  featured?: boolean;
  /** Small marketing badges shown on the card, e.g. "New". */
  badges?: string[];
  /** Searchable keyword tags. */
  tags?: string[];
  /** Per-compound label color (hex), used to color-code cards/labels. */
  tint?: string;
}

/** Heavy detail model — loaded only on the product page, keyed by slug. */
export interface ProductDetail {
  /** Long-form overview paragraphs (informational, research-framed). */
  overview: string[];
  specs: Spec[];
  /** Handling / storage tab content. */
  handling: string[];
  /** Reconstitution / dosing tool configuration (optional). */
  tool?: ReconstitutionTool;
  references: Reference[];
  reviews: Review[];
}

export interface ReconstitutionTool {
  kind: "reconstitution" | "dilution";
  /** Total compound in the container, mg (lyophilized) or mg total (solution). */
  totalMg: number;
  /** Default solvent / volume in mL. */
  defaultSolventMl: number;
  /** Suggested research aliquot in mcg (lyophilized) or mg (oral). */
  suggestedDoseMcg: number;
  /** Unit shown for the container. */
  unitLabel: string;
}

export const FORMAT_LABELS: Record<ProductFormat, string> = {
  lyophilized: "Lyophilized",
  sublingual: "Sublingual",
  solution: "Solution",
};

export const FORMAT_BLURBS: Record<ProductFormat, string> = {
  lyophilized: "Lyophilized powder in a sealed vial for reconstitution.",
  sublingual: "Oral-dissolving format, individually sealed.",
  solution: "Pre-suspended solution with a graduated dropper.",
};
