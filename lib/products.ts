import type { Product, ProductCategory, ProductFormat } from "./types";
import { paymentLinkFor } from "./payment-links";

/**
 * Curated catalog (lean listing data). Heavy per-product detail lives in
 * `product-details.ts`, keyed by slug, so listing pages stay light.
 *
 * All copy is strictly informational / research-framed — no health or use
 * claims. Compounds are described in terms of what they have been *studied
 * for* in preclinical / in-vitro literature.
 *
 * Pricing benchmarks the broader research-compound market and sits roughly
 * 10% below it. Every line is currently `sold-out` while the lab relocates.
 */

/**
 * Single source of truth for category color-coding. Joint repair / recovery
 * lines (`Regenerative` singles + the recovery `Blend`s) deliberately share one
 * shade so the cabinet reads as a family at a glance.
 */
export const CATEGORY_COLORS: Record<ProductCategory, string> = {
  Regenerative: "#c2683f",
  Blend: "#c2683f",
  Metabolic: "#6f7fc4",
  Growth: "#c4a24c",
  "Anti-Aging": "#b56a8c",
  Longevity: "#8a6fc4",
  Antioxidant: "#4f9bb5",
  Tanning: "#cf8a4a",
  "Blood Flow": "#c45f7a",
  "Anti-Inflammatory": "#5b8a72",
  Cognitive: "#5fa0a8",
  Sleep: "#6a6fb5",
  Supplies: "#8a8f99",
};

/**
 * Format → shared vial render base. A single uniform vial photo backs every
 * product so the silhouette, cap, and proportions are identical across the
 * catalog; the compound name, label, and accent bar are drawn on top in real
 * type by the `Vial` component. Lyophilized (and sublingual) products show
 * powder; solutions show clear liquid. Each base has a `-light` (ivory) and
 * `-dark` (obsidian) PNG so the shot swaps to match the active theme.
 */
const FORMAT_IMAGE_BASE: Record<ProductFormat, "powder" | "solution"> = {
  lyophilized: "powder",
  sublingual: "powder",
  solution: "solution",
};

const vialImage = (format: ProductFormat, theme: "light" | "dark") =>
  `/products/vial-${FORMAT_IMAGE_BASE[format]}-${theme}.png`;

/** Listing entries without the derived `tint` / `image` (added below). */
type ProductSeed = Omit<Product, "tint" | "image" | "imageDark">;

const seeds: ProductSeed[] = [
  // ---------------- Recovery & repair (one shared shade) ----------------
  {
    slug: "bpc-157",
    name: "BPC-157",
    fullName: "BPC-157 research vial",
    format: "lyophilized",
    category: "Regenerative",
    blurb:
      "A 15-amino-acid peptide studied for tissue protection and angiogenesis in preclinical models.",
    purity: "≥99%",
    variants: [{ id: "10mg", label: "10 mg", price: 35.99 }],
    rating: 4.9,
    reviewCount: 412,
    status: "sold-out",
    featured: true,
    badges: ["Bestseller"],
    tags: ["body protection compound", "repair", "gut", "tendon", "joint"],
  },
  {
    slug: "tb-500",
    name: "TB-500",
    fullName: "TB-500 research vial",
    format: "lyophilized",
    category: "Regenerative",
    blurb:
      "Synthetic fragment of thymosin beta-4 studied for actin regulation and cell migration.",
    purity: "≥99%",
    variants: [{ id: "10mg", label: "10 mg", price: 35.99 }],
    rating: 4.8,
    reviewCount: 268,
    status: "sold-out",
    featured: true,
    tags: ["thymosin beta-4", "actin", "migration", "recovery", "joint"],
  },
  {
    slug: "wolverine-blend",
    name: "Wolverine Blend",
    fullName: "BPC-157 + TB-500 (Wolverine) research vial",
    format: "lyophilized",
    category: "Blend",
    blurb:
      "Co-formulated BPC-157 + TB-500 for combined tissue-repair research.",
    purity: "≥99% each",
    variants: [{ id: "10mg", label: "10 mg blend (5 + 5)", price: 98.99 }],
    rating: 4.9,
    reviewCount: 96,
    status: "sold-out",
    featured: true,
    badges: ["Blend"],
    tags: ["bpc-157", "tb-500", "stack", "repair", "joint"],
  },
  {
    slug: "glow-blend",
    name: "GLOW Blend",
    fullName: "GLOW (BPC-157 + TB-500 + GHK-Cu) research vial",
    format: "lyophilized",
    category: "Blend",
    blurb:
      "Triple recovery blend of BPC-157, TB-500, and GHK-Cu in a single vial.",
    purity: "≥99% each",
    variants: [{ id: "70mg", label: "70 mg blend", price: 103.99 }],
    rating: 4.8,
    reviewCount: 74,
    status: "sold-out",
    featured: true,
    badges: ["Blend"],
    tags: ["bpc-157", "tb-500", "ghk-cu", "stack", "recovery", "skin"],
  },
  {
    slug: "klow-blend",
    name: "KLOW Blend",
    fullName: "KLOW (BPC-157 + TB-500 + GHK-Cu + KPV) research vial",
    format: "lyophilized",
    category: "Blend",
    blurb:
      "Four-component blend adding KPV to the GLOW base for combined repair research.",
    purity: "≥99% each",
    variants: [{ id: "80mg", label: "80 mg blend", price: 116.99 }],
    rating: 4.8,
    reviewCount: 51,
    status: "sold-out",
    badges: ["New", "Blend"],
    tags: ["bpc-157", "tb-500", "ghk-cu", "kpv", "stack", "recovery"],
  },

  // ---------------- Metabolic ----------------
  {
    slug: "glp-3-rt-20mg",
    name: "GLP-3 (RT)",
    fullName: "GLP-3 (RT) 20 mg research vial",
    format: "lyophilized",
    category: "Metabolic",
    blurb:
      "A triple-agonist research peptide targeting GIP, GLP-1, and glucagon receptors.",
    purity: "≥99%",
    variants: [{ id: "20mg", label: "20 mg", price: 116.99 }],
    rating: 4.8,
    reviewCount: 187,
    status: "sold-out",
    featured: true,
    badges: ["Bestseller"],
    tags: ["triple agonist", "gip", "glp-1", "glucagon", "metabolic"],
  },
  {
    slug: "glp-3-rt-30mg",
    name: "GLP-3 (RT)",
    fullName: "GLP-3 (RT) 30 mg research vial",
    format: "lyophilized",
    category: "Metabolic",
    blurb:
      "A triple-agonist research peptide targeting GIP, GLP-1, and glucagon receptors.",
    purity: "≥99%",
    variants: [{ id: "30mg", label: "30 mg", price: 161.99 }],
    rating: 4.8,
    reviewCount: 142,
    status: "sold-out",
    tags: ["triple agonist", "gip", "glp-1", "glucagon", "metabolic"],
  },
  {
    slug: "glp-3-rt-10mg",
    name: "GLP-3 (RT)",
    fullName: "GLP-3 (RT) 10 mg research vial",
    format: "lyophilized",
    category: "Metabolic",
    blurb:
      "A triple-agonist research peptide targeting GIP, GLP-1, and glucagon receptors.",
    purity: "≥99%",
    variants: [{ id: "10mg", label: "10 mg", price: 62.99 }],
    rating: 4.8,
    reviewCount: 118,
    status: "sold-out",
    tags: ["triple agonist", "gip", "glp-1", "glucagon", "metabolic"],
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    fullName: "AOD-9604 research vial",
    format: "lyophilized",
    category: "Metabolic",
    blurb:
      "Modified fragment of human growth hormone (176–191) studied in lipid-metabolism models.",
    purity: "≥99%",
    variants: [{ id: "5mg", label: "5 mg", price: 44.99 }],
    rating: 4.6,
    reviewCount: 64,
    status: "sold-out",
    tags: ["hgh fragment", "176-191", "lipolysis", "metabolic"],
  },
  {
    slug: "5-amino-1mq",
    name: "5-Amino-1MQ",
    fullName: "5-Amino-1MQ research compound",
    format: "lyophilized",
    category: "Metabolic",
    blurb:
      "Small-molecule NNMT inhibitor studied in cellular energy and adipocyte models.",
    purity: "≥98%",
    variants: [{ id: "50mg", label: "50 mg", price: 44.99 }],
    rating: 4.6,
    reviewCount: 41,
    status: "sold-out",
    badges: ["New"],
    tags: ["nnmt", "inhibitor", "metabolic", "small molecule"],
  },
  {
    slug: "mots-c",
    name: "MOTS-C",
    fullName: "MOTS-c research vial",
    format: "lyophilized",
    category: "Metabolic",
    blurb:
      "Mitochondrial-derived peptide studied for metabolic regulation and exercise-mimetic pathways.",
    purity: "≥99%",
    variants: [{ id: "10mg", label: "10 mg", price: 35.99 }],
    rating: 4.7,
    reviewCount: 58,
    status: "sold-out",
    badges: ["New"],
    tags: ["mitochondrial", "metabolic", "longevity", "exercise"],
  },

  // ---------------- Growth ----------------
  {
    slug: "cjc-1295-ipamorelin",
    name: "CJC-1295 / Ipamorelin",
    fullName: "CJC-1295 / Ipamorelin (No DAC) research vial",
    format: "lyophilized",
    category: "Growth",
    blurb:
      "Co-formulated secretagogue pair (No DAC) commonly co-studied in growth-hormone research.",
    purity: "≥99% each",
    variants: [{ id: "10mg", label: "10 mg blend", price: 53.99 }],
    rating: 4.7,
    reviewCount: 88,
    status: "sold-out",
    badges: ["Blend"],
    tags: ["cjc-1295", "ipamorelin", "no dac", "secretagogue"],
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    fullName: "Ipamorelin research vial",
    format: "lyophilized",
    category: "Growth",
    blurb:
      "Selective pentapeptide studied as a growth-hormone secretagogue in preclinical work.",
    purity: "≥99%",
    variants: [{ id: "10mg", label: "10 mg", price: 44.99 }],
    rating: 4.7,
    reviewCount: 142,
    status: "sold-out",
    tags: ["secretagogue", "ghrp", "selective", "growth"],
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    fullName: "Tesamorelin research vial",
    format: "lyophilized",
    category: "Growth",
    blurb:
      "Stabilized GHRH analog studied for growth-hormone axis signaling in preclinical models.",
    purity: "≥99%",
    variants: [{ id: "10mg", label: "10 mg", price: 62.99 }],
    rating: 4.7,
    reviewCount: 73,
    status: "sold-out",
    tags: ["ghrh", "analog", "growth", "secretagogue"],
  },
  {
    slug: "igf-1-lr3",
    name: "IGF-1 LR3",
    fullName: "IGF-1 LR3 research vial",
    format: "lyophilized",
    category: "Growth",
    blurb:
      "Long-acting insulin-like growth factor analog studied in cell-proliferation models.",
    purity: "≥98%",
    variants: [{ id: "1mg", label: "1 mg", price: 62.99 }],
    rating: 4.6,
    reviewCount: 49,
    status: "sold-out",
    tags: ["igf", "growth factor", "lr3", "proliferation"],
  },

  // ---------------- Anti-Aging ----------------
  {
    slug: "ghk-cu-50mg",
    name: "GHK-Cu",
    fullName: "GHK-Cu 50 mg research vial",
    format: "lyophilized",
    category: "Anti-Aging",
    blurb:
      "Naturally occurring copper tripeptide studied for matrix remodeling and collagen pathways.",
    purity: "≥99%",
    variants: [{ id: "50mg", label: "50 mg", price: 26.99 }],
    rating: 4.9,
    reviewCount: 331,
    status: "sold-out",
    featured: true,
    badges: ["Bestseller"],
    tags: ["copper peptide", "collagen", "skin", "matrix", "anti-aging"],
  },
  {
    slug: "ghk-cu-100mg",
    name: "GHK-Cu",
    fullName: "GHK-Cu 100 mg research vial",
    format: "lyophilized",
    category: "Anti-Aging",
    blurb:
      "Naturally occurring copper tripeptide studied for matrix remodeling and collagen pathways.",
    purity: "≥99%",
    variants: [{ id: "100mg", label: "100 mg", price: 44.99 }],
    rating: 4.9,
    reviewCount: 274,
    status: "sold-out",
    tags: ["copper peptide", "collagen", "skin", "matrix", "anti-aging"],
  },

  // ---------------- Longevity ----------------
  {
    slug: "nad-plus-solution",
    name: "NAD+",
    fullName: "NAD+ solution",
    format: "solution",
    category: "Longevity",
    blurb:
      "Pre-suspended NAD+ coenzyme studied for cellular energy and sirtuin pathways.",
    purity: "≥98%",
    variants: [{ id: "30ml-500", label: "30 mL · 500 mg", price: 62.99 }],
    rating: 4.8,
    reviewCount: 209,
    status: "sold-out",
    featured: true,
    badges: ["Solution"],
    tags: ["coenzyme", "longevity", "sirtuin", "dropper"],
  },
  {
    slug: "epithalon",
    name: "Epithalon",
    fullName: "Epithalon research vial",
    format: "lyophilized",
    category: "Longevity",
    blurb:
      "Synthetic tetrapeptide studied in the context of telomerase activity and circadian regulation.",
    purity: "≥99%",
    variants: [{ id: "10mg", label: "10 mg", price: 26.99 }],
    rating: 4.7,
    reviewCount: 67,
    status: "sold-out",
    tags: ["tetrapeptide", "telomerase", "longevity", "epitalon"],
  },
  {
    slug: "thymosin-alpha-1",
    name: "Thymosin Alpha-1",
    fullName: "Thymosin Alpha-1 research vial",
    format: "lyophilized",
    category: "Longevity",
    blurb:
      "28-amino-acid peptide studied for T-cell signaling and immune-modulation pathways.",
    purity: "≥99%",
    variants: [{ id: "10mg", label: "10 mg", price: 35.99 }],
    rating: 4.8,
    reviewCount: 61,
    status: "sold-out",
    tags: ["ta-1", "immune", "t-cell", "longevity"],
  },

  // ---------------- Antioxidant ----------------
  {
    slug: "glutathione-solution",
    name: "Glutathione",
    fullName: "Glutathione solution",
    format: "solution",
    category: "Antioxidant",
    blurb:
      "Reduced glutathione tripeptide studied as a primary intracellular antioxidant.",
    purity: "≥98%",
    variants: [{ id: "30ml-1500", label: "30 mL · 1500 mg", price: 53.99 }],
    rating: 4.7,
    reviewCount: 118,
    status: "sold-out",
    badges: ["Solution"],
    tags: ["antioxidant", "tripeptide", "redox", "dropper"],
  },

  // ---------------- Tanning ----------------
  {
    slug: "melanotan-ii",
    name: "Melanotan II",
    fullName: "Melanotan II research vial",
    format: "lyophilized",
    category: "Tanning",
    blurb:
      "Melanocortin-receptor research peptide studied in melanogenesis pathways.",
    purity: "≥99%",
    variants: [{ id: "10mg", label: "10 mg", price: 26.99 }],
    rating: 4.6,
    reviewCount: 84,
    status: "sold-out",
    tags: ["melanocortin", "melanogenesis", "mt2", "tanning"],
  },

  // ---------------- Blood Flow ----------------
  {
    slug: "pt-141",
    name: "PT-141",
    fullName: "PT-141 research vial",
    format: "lyophilized",
    category: "Blood Flow",
    blurb:
      "Bremelanotide, a melanocortin-receptor research peptide studied in vascular signaling models.",
    purity: "≥99%",
    variants: [{ id: "10mg", label: "10 mg", price: 26.99 }],
    rating: 4.6,
    reviewCount: 73,
    status: "sold-out",
    tags: ["bremelanotide", "melanocortin", "blood flow"],
  },

  // ---------------- Anti-Inflammatory ----------------
  {
    slug: "kpv",
    name: "KPV",
    fullName: "KPV research vial",
    format: "lyophilized",
    category: "Anti-Inflammatory",
    blurb:
      "Alpha-MSH-derived tripeptide studied for anti-inflammatory signaling pathways.",
    purity: "≥99%",
    variants: [{ id: "10mg", label: "10 mg", price: 35.99 }],
    rating: 4.7,
    reviewCount: 55,
    status: "sold-out",
    tags: ["alpha-msh", "tripeptide", "anti-inflammatory", "gut"],
  },

  // ---------------- Cognitive ----------------
  {
    slug: "semax",
    name: "Semax",
    fullName: "Semax research vial",
    format: "lyophilized",
    category: "Cognitive",
    blurb:
      "ACTH(4–10)-derived peptide studied in neurotrophic and cognitive-signaling models.",
    purity: "≥99%",
    variants: [{ id: "10mg", label: "10 mg", price: 26.99 }],
    rating: 4.7,
    reviewCount: 62,
    status: "sold-out",
    tags: ["nootropic", "acth", "bdnf", "cognitive"],
  },
  {
    slug: "selank",
    name: "Selank",
    fullName: "Selank research vial",
    format: "lyophilized",
    category: "Cognitive",
    blurb:
      "Tuftsin-derived peptide studied in anxiolytic and immunomodulatory research models.",
    purity: "≥99%",
    variants: [{ id: "10mg", label: "10 mg", price: 26.99 }],
    rating: 4.7,
    reviewCount: 47,
    status: "sold-out",
    tags: ["tuftsin", "anxiolytic", "cognitive", "nootropic"],
  },

  // ---------------- Sleep ----------------
  {
    slug: "dsip",
    name: "DSIP",
    fullName: "DSIP research vial",
    format: "lyophilized",
    category: "Sleep",
    blurb:
      "Delta sleep-inducing peptide studied in sleep-architecture and neuromodulation models.",
    purity: "≥99%",
    variants: [{ id: "5mg", label: "5 mg", price: 26.99 }],
    rating: 4.6,
    reviewCount: 39,
    status: "sold-out",
    tags: ["delta sleep", "neuromodulation", "sleep"],
  },

  // ---------------- Supplies ----------------
  {
    slug: "bacteriostatic-water",
    name: "Bacteriostatic Water",
    fullName: "Bacteriostatic Water (30 mL)",
    format: "solution",
    category: "Supplies",
    blurb:
      "0.9% benzyl-alcohol bacteriostatic water for laboratory reconstitution of lyophilized compounds.",
    purity: "USP",
    variants: [{ id: "30ml", label: "30 mL", price: 13.49 }],
    rating: 4.9,
    reviewCount: 156,
    status: "sold-out",
    badges: ["Supplies"],
    tags: ["reconstitution", "solvent", "bac water", "supplies"],
  },
];

/**
 * Final catalog with derived per-category `tint` + `image`, plus each variant's
 * Stripe Payment Link pulled in from `payment-links.ts` (one URL per price).
 */
export const products: Product[] = seeds.map((seed) => {
  const link = paymentLinkFor(seed.slug);
  return {
    ...seed,
    variants: link
      ? seed.variants.map((v) => ({ ...v, paymentLink: link }))
      : seed.variants,
    tint: CATEGORY_COLORS[seed.category],
    image: vialImage(seed.format, "light"),
    imageDark: vialImage(seed.format, "dark"),
  };
});

export const CATEGORIES: ProductCategory[] = [
  "Regenerative",
  "Blend",
  "Metabolic",
  "Growth",
  "Anti-Aging",
  "Longevity",
  "Antioxidant",
  "Tanning",
  "Blood Flow",
  "Anti-Inflammatory",
  "Cognitive",
  "Sleep",
  "Supplies",
];

export const FORMATS: ProductFormat[] = ["lyophilized", "solution"];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function fromPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price));
}

export function featuredProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );
  const others = products.filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
