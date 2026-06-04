import type { Product, ProductCategory, ProductFormat } from "./types";

/**
 * Curated catalog (lean listing data). Heavy per-product detail lives in
 * `product-details.ts`, keyed by slug, so listing pages stay light.
 *
 * All copy is strictly informational / research-framed — no health or use
 * claims. Compounds are described in terms of what they have been *studied
 * for* in preclinical / in-vitro literature.
 */
export const products: Product[] = [
  // ---------------- Injectable ----------------
  {
    slug: "bpc-157",
    tint: "#c2683f",
    name: "BPC-157",
    fullName: "BPC-157 research vial",
    format: "injectable",
    category: "Recovery & Repair",
    blurb:
      "A 15-amino-acid peptide studied for tissue protection and angiogenesis in preclinical models.",
    purity: "≥99%",
    image: "/products/bpc-157.png",
    variants: [
      { id: "5mg", label: "5 mg", price: 39.99 },
      { id: "10mg", label: "10 mg", price: 64.99 },
    ],
    rating: 4.9,
    reviewCount: 412,
    status: "in-stock",
    featured: true,
    badges: ["Bestseller"],
    tags: ["body protection compound", "repair", "gut", "tendon"],
  },
  {
    slug: "tb-500",
    tint: "#5b8a72",
    name: "TB-500",
    fullName: "TB-500 research vial",
    format: "injectable",
    category: "Recovery & Repair",
    blurb:
      "Synthetic fragment of thymosin beta-4 studied for actin regulation and cell migration.",
    purity: "≥99%",
    image: "/products/tb-500.png",
    variants: [
      { id: "5mg", label: "5 mg", price: 44.99 },
      { id: "10mg", label: "10 mg", price: 74.99 },
    ],
    rating: 4.8,
    reviewCount: 268,
    status: "in-stock",
    featured: true,
    tags: ["thymosin beta-4", "actin", "migration"],
  },
  {
    slug: "ghk-cu",
    tint: "#b56a8c",
    name: "GHK-Cu",
    fullName: "GHK-Cu research vial",
    format: "injectable",
    category: "Cosmetic",
    blurb:
      "Naturally occurring copper tripeptide studied for matrix remodeling and collagen pathways.",
    purity: "≥99%",
    image: "/products/ghk-cu.png",
    variants: [
      { id: "50mg", label: "50 mg", price: 34.99 },
      { id: "100mg", label: "100 mg", price: 54.99 },
    ],
    rating: 4.9,
    reviewCount: 331,
    status: "in-stock",
    featured: true,
    badges: ["Bestseller"],
    tags: ["copper peptide", "collagen", "skin", "matrix"],
  },
  {
    slug: "glp-3-rt",
    tint: "#6f7fc4",
    name: "GLP-3 (RT)",
    fullName: "GLP-3 (RT) research vial",
    format: "injectable",
    category: "Metabolic",
    blurb:
      "A triple-agonist research peptide targeting GIP, GLP-1, and glucagon receptors.",
    purity: "≥99%",
    image: "/products/glp-3-rt.png",
    variants: [
      { id: "5mg", label: "5 mg", price: 69.99 },
      { id: "10mg", label: "10 mg", price: 119.99 },
      { id: "20mg", label: "20 mg", price: 199.99 },
    ],
    rating: 4.8,
    reviewCount: 187,
    status: "in-stock",
    featured: true,
    badges: ["New"],
    tags: ["triple agonist", "gip", "glp-1", "glucagon", "metabolic"],
  },
  {
    slug: "ipamorelin",
    tint: "#c4a24c",
    name: "Ipamorelin",
    fullName: "Ipamorelin research vial",
    format: "injectable",
    category: "Vitality",
    blurb:
      "Selective pentapeptide studied as a growth-hormone secretagogue in preclinical work.",
    purity: "≥99%",
    image: "/products/ipamorelin.png",
    variants: [
      { id: "5mg", label: "5 mg", price: 42.99 },
      { id: "10mg", label: "10 mg", price: 69.99 },
    ],
    rating: 4.7,
    reviewCount: 142,
    status: "low-stock",
    tags: ["secretagogue", "ghrp", "selective"],
  },
  {
    slug: "wolverine-blend",
    tint: "#b5544b",
    name: "Wolverine Blend",
    fullName: "Wolverine Blend research vial",
    format: "injectable",
    category: "Blends",
    blurb:
      "Co-formulated BPC-157 + TB-500 for combined tissue-repair research.",
    purity: "≥99% each",
    image: "/products/wolverine-blend.png",
    variants: [
      { id: "10mg", label: "10 mg (5 + 5)", price: 109.99 },
      { id: "20mg", label: "20 mg (10 + 10)", price: 184.99 },
    ],
    rating: 4.9,
    reviewCount: 96,
    status: "in-stock",
    featured: true,
    badges: ["Blend"],
    tags: ["bpc-157", "tb-500", "stack", "repair"],
  },

  // ---------------- Sublingual ----------------
  {
    slug: "bpc-157-sublingual",
    tint: "#cf7d4a",
    name: "BPC-157",
    fullName: "BPC-157 sublingual strips",
    format: "sublingual",
    category: "Recovery & Repair",
    blurb:
      "Oral-dissolving strips delivering a fixed BPC-157 aliquot per unit for research.",
    purity: "≥99%",
    image: "/products/bpc-157-sublingual.png",
    variants: [
      { id: "30ct-500mcg", label: "30 strips · 500 mcg", price: 79.99 },
      { id: "30ct-750mcg", label: "30 strips · 750 mcg", price: 99.99 },
    ],
    rating: 4.8,
    reviewCount: 154,
    status: "in-stock",
    featured: true,
    badges: ["Sublingual"],
    tags: ["strip", "oral dissolving", "fixed dose"],
  },
  {
    slug: "cjc-1295-ipamorelin-sublingual",
    tint: "#7aa05a",
    name: "CJC-1295 + Ipamorelin",
    fullName: "CJC-1295 + Ipamorelin sublingual strips",
    format: "sublingual",
    category: "Vitality",
    blurb:
      "Co-formulated secretagogue pair in a precise per-strip oral-dissolving format.",
    purity: "≥99% each",
    image: "/products/cjc-ipamorelin-sublingual.png",
    variants: [{ id: "30ct", label: "30 strips", price: 129.99 }],
    rating: 4.7,
    reviewCount: 88,
    status: "in-stock",
    badges: ["Blend"],
    tags: ["cjc-1295", "ipamorelin", "strip", "secretagogue"],
  },
  {
    slug: "pt-141-sublingual",
    tint: "#c45f7a",
    name: "PT-141",
    fullName: "PT-141 sublingual strips",
    format: "sublingual",
    category: "Vitality",
    blurb:
      "Melanocortin-receptor research peptide in a measured per-strip oral format.",
    purity: "≥99%",
    image: "/products/pt-141-sublingual.png",
    variants: [{ id: "10ct", label: "10 strips · 2 mg", price: 89.99 }],
    rating: 4.6,
    reviewCount: 73,
    status: "in-stock",
    tags: ["bremelanotide", "melanocortin", "strip"],
  },
  {
    slug: "thymosin-alpha-1-sublingual",
    tint: "#5fa0a8",
    name: "Thymosin Alpha-1",
    fullName: "Thymosin Alpha-1 sublingual strips",
    format: "sublingual",
    category: "Longevity",
    blurb:
      "28-amino-acid peptide studied for T-cell signaling pathways, in oral-dissolving format.",
    purity: "≥99%",
    image: "/products/thymosin-alpha-1-sublingual.png",
    variants: [{ id: "30ct", label: "30 strips · 1 mg", price: 139.99 }],
    rating: 4.8,
    reviewCount: 61,
    status: "in-stock",
    badges: ["New"],
    tags: ["ta-1", "immune", "t-cell", "strip"],
  },

  // ---------------- Liquid ----------------
  {
    slug: "nad-plus-liquid",
    tint: "#8a6fc4",
    name: "NAD+",
    fullName: "NAD+ liquid",
    format: "liquid",
    category: "Longevity",
    blurb:
      "Pre-suspended NAD+ coenzyme studied for cellular energy and sirtuin pathways.",
    purity: "≥98%",
    image: "/products/nad-plus-liquid.png",
    variants: [
      { id: "30ml-500", label: "30 mL · 500 mg", price: 99.99 },
      { id: "30ml-1000", label: "30 mL · 1000 mg", price: 159.99 },
    ],
    rating: 4.8,
    reviewCount: 209,
    status: "in-stock",
    featured: true,
    badges: ["Liquid"],
    tags: ["coenzyme", "longevity", "sirtuin", "dropper"],
  },
  {
    slug: "glutathione-liquid",
    tint: "#4f9bb5",
    name: "Glutathione",
    fullName: "Glutathione liquid",
    format: "liquid",
    category: "Cosmetic",
    blurb:
      "Reduced glutathione tripeptide studied as a primary intracellular antioxidant.",
    purity: "≥98%",
    image: "/products/glutathione-liquid.png",
    variants: [{ id: "30ml-1500", label: "30 mL · 1500 mg", price: 84.99 }],
    rating: 4.7,
    reviewCount: 118,
    status: "in-stock",
    tags: ["antioxidant", "tripeptide", "redox", "dropper"],
  },
];

export const CATEGORIES: ProductCategory[] = [
  "Recovery & Repair",
  "Metabolic",
  "Cosmetic",
  "Vitality",
  "Longevity",
  "Blends",
];

export const FORMATS: ProductFormat[] = ["injectable", "sublingual", "liquid"];

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
