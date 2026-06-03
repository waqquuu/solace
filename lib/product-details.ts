import type { ProductDetail, Review } from "./types";

/**
 * Heavy, per-product detail keyed by slug. Imported only by the product
 * detail route so listing pages stay lean. All copy is informational and
 * research-framed — describing what compounds have been *studied for*, with
 * no health, dosing, or use claims for humans.
 */

const COA_DISCLAIMER =
  "Every lot is written into the ledger with its independent HPLC purity and mass-spec identity. Look up the lot number on your label to read the exact record for the unit in your hand.";

function review(
  id: string,
  author: string,
  date: string,
  rating: number,
  title: string,
  body: string,
): Review {
  return { id, author, date, rating, title, body, verified: true };
}

export const productDetails: Record<string, ProductDetail> = {
  "bpc-157": {
    overview: [
      "BPC-157 is a synthetic 15-amino-acid sequence derived from a protein found in gastric juice. In preclinical and in-vitro literature it has been studied extensively in the context of angiogenesis, tendon and ligament fibroblast behavior, and gastrointestinal barrier models.",
      "This listing is supplied as a lyophilized (freeze-dried) powder in a sealed, inert-gas-flushed vial for laboratory reconstitution. Each lot is independently assayed for purity and identity before release.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Sequence", value: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val" },
      { label: "Molecular formula", value: "C62H98N16O22" },
      { label: "Molecular weight", value: "1419.53 g/mol" },
      { label: "CAS", value: "137525-51-0" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Identity", value: "Confirmed by mass spectrometry" },
      { label: "Form", value: "Lyophilized powder" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized vials at −20 °C. Material is sealed under inert gas; keep sealed until reconstitution.",
      "Reconstitute with bacteriostatic or sterile water introduced slowly against the vial wall — do not shake. Swirl gently until fully dissolved.",
      "After reconstitution, store at 2–8 °C and protect from light. Use the calculator to determine concentration per aliquot.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 5,
      defaultSolventMl: 2,
      suggestedDoseMcg: 250,
      unitLabel: "vial",
    },
    references: [
      { label: "Sikiric P, et al. — Stable gastric pentadecapeptide BPC 157 (review)", url: "https://pubmed.ncbi.nlm.nih.gov/?term=BPC+157" },
      { label: "Chang CH, et al. — BPC 157 and tendon fibroblasts", url: "https://pubmed.ncbi.nlm.nih.gov/21030672/" },
    ],
    reviews: [
      review("r1", "Dr. M. Reyes", "2026-04-22", 5, "The record matched the vial", "Typed the lot into the ledger and the certificate came straight up — one clean HPLC peak, identity confirmed. I wish every supplier worked in the open like this."),
      review("r2", "L. Fontaine", "2026-04-05", 5, "Solubilized cleanly", "Dissolved fully with no haze. Mass matched the expected value on our internal check."),
      review("r3", "P. Nilsson", "2026-03-28", 4, "Good documentation", "Paperwork was thorough and the seal was intact. Will reorder."),
    ],
  },

  "tb-500": {
    overview: [
      "TB-500 is a synthetic peptide corresponding to an active region of thymosin beta-4. It has been studied in the context of actin sequestration, cell migration, and angiogenesis in preclinical models.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Fragment", value: "Thymosin β-4 (Ac-LKKTETQ active region)" },
      { label: "Molecular formula", value: "C212H350N56O78S" },
      { label: "Molecular weight", value: "4963.4 g/mol" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Identity", value: "Confirmed by mass spectrometry" },
      { label: "Form", value: "Lyophilized powder" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Keep lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water against the vial wall; swirl, do not shake.",
      "Store reconstituted solution at 2–8 °C and use promptly per your protocol.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 5,
      defaultSolventMl: 2,
      suggestedDoseMcg: 500,
      unitLabel: "vial",
    },
    references: [
      { label: "Goldstein AL, et al. — Thymosin β-4 review", url: "https://pubmed.ncbi.nlm.nih.gov/?term=thymosin+beta+4" },
    ],
    reviews: [
      review("r1", "M. Castellano", "2026-04-13", 5, "Single sharp peak", "Exactly what the COA showed. No surprises."),
      review("r2", "A. Whitfield", "2026-03-19", 4, "Solid", "Clean material, intact seal, fast processing."),
    ],
  },

  "ghk-cu": {
    overview: [
      "GHK-Cu is a naturally occurring copper-binding tripeptide (glycyl-L-histidyl-L-lysine complexed with copper(II)). It has been studied in the context of extracellular matrix remodeling and collagen-related signaling pathways in dermal models.",
      "Supplied as a characteristic blue lyophilized powder in a sealed vial. Each lot is independently assayed for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Peptide", value: "Glycyl-L-histidyl-L-lysine : Cu(II)" },
      { label: "Molecular formula", value: "C14H24N6O4·Cu" },
      { label: "Molecular weight", value: "340.86 g/mol (complex)" },
      { label: "CAS", value: "89030-95-5" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Appearance", value: "Blue powder (copper complex)" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C; the blue color reflects the copper complex and is expected.",
      "Reconstitute slowly with sterile water; protect from prolonged light exposure.",
      "Store reconstituted solution at 2–8 °C.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 50,
      defaultSolventMl: 5,
      suggestedDoseMcg: 2000,
      unitLabel: "vial",
    },
    references: [
      { label: "Pickart L, Margolina A — GHK-Cu peptide review", url: "https://pubmed.ncbi.nlm.nih.gov/29849623/" },
    ],
    reviews: [
      review("r1", "L. Fontaine", "2026-04-05", 5, "Beautiful blue powder", "Correct color, correct mass. Copper complex looks legit and the COA backs it up."),
      review("r2", "S. Okafor", "2026-03-30", 5, "Reorder", "Consistent lot to lot. Documentation is excellent."),
    ],
  },

  "glp-3-rt": {
    overview: [
      "GLP-3 (RT) is a research peptide designed as a triple agonist with affinity for the GIP, GLP-1, and glucagon receptors. It has been studied in metabolic-signaling literature involving incretin pathways.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Class", value: "GIP / GLP-1 / glucagon triple agonist" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Identity", value: "Confirmed by mass spectrometry" },
      { label: "Form", value: "Lyophilized powder" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Keep lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water; swirl gently.",
      "Store reconstituted solution at 2–8 °C and protect from light.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 10,
      defaultSolventMl: 2,
      suggestedDoseMcg: 1000,
      unitLabel: "vial",
    },
    references: [
      { label: "Incretin receptor pharmacology (review)", url: "https://pubmed.ncbi.nlm.nih.gov/?term=triple+agonist+GIP+GLP-1+glucagon" },
    ],
    reviews: [
      review("r1", "Dr. K. Anand", "2026-04-25", 5, "Hard to source, clean here", "Mass spec matched the expected multiply-charged ion. Impressed with the documentation."),
      review("r2", "T. Brenner", "2026-04-02", 5, "Excellent", "Reconstituted clear. COA verification worked instantly."),
    ],
  },

  ipamorelin: {
    overview: [
      "Ipamorelin is a selective pentapeptide studied as a growth-hormone secretagogue in preclinical research, noted in the literature for receptor selectivity.",
      "Supplied as a lyophilized powder in a sealed vial. Each lot is independently assayed for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Sequence", value: "Aib-His-D-2-Nal-D-Phe-Lys-NH2" },
      { label: "Molecular formula", value: "C38H49N9O5" },
      { label: "Molecular weight", value: "711.85 g/mol" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Form", value: "Lyophilized powder" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water; swirl, do not shake.",
      "Store reconstituted solution at 2–8 °C.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 5,
      defaultSolventMl: 2,
      suggestedDoseMcg: 200,
      unitLabel: "vial",
    },
    references: [
      { label: "Raun K, et al. — Ipamorelin characterization", url: "https://pubmed.ncbi.nlm.nih.gov/9849822/" },
    ],
    reviews: [
      review("r1", "J. Pereira", "2026-03-21", 5, "Selective and clean", "Single peak on our HPLC. Matches the certificate exactly."),
    ],
  },

  "wolverine-blend": {
    overview: [
      "The Wolverine Blend co-formulates BPC-157 and TB-500 in a single vial for combined tissue-repair research, where both peptides are commonly studied together.",
      "Supplied as a lyophilized blend in a sealed vial. Each component is independently assayed for purity and identity, and both results appear on the lot COA.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Components", value: "BPC-157 + TB-500" },
      { label: "Ratio", value: "1:1 by mass" },
      { label: "Purity", value: "≥99% each (HPLC)" },
      { label: "Identity", value: "Confirmed by mass spectrometry" },
      { label: "Form", value: "Lyophilized powder" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water; swirl gently until clear.",
      "Store reconstituted solution at 2–8 °C and protect from light.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 10,
      defaultSolventMl: 3,
      suggestedDoseMcg: 500,
      unitLabel: "vial",
    },
    references: [
      { label: "Combined repair-peptide literature", url: "https://pubmed.ncbi.nlm.nih.gov/?term=BPC+157+thymosin+beta+4" },
    ],
    reviews: [
      review("r1", "D. Marsh", "2026-04-18", 5, "Great value blend", "Both COAs included. Dissolved completely, no cloudiness."),
      review("r2", "R. Hollis", "2026-03-25", 5, "Convenient", "Saves reconstituting two vials. Documentation on point."),
    ],
  },

  "bpc-157-sublingual": {
    overview: [
      "This sublingual format delivers a fixed BPC-157 aliquot per oral-dissolving strip, intended for research workflows that benefit from pre-measured units rather than reconstitution.",
      "Each batch is produced under documented procedures and the active content per strip is verified analytically. Strips are individually sealed.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Format", value: "Oral-dissolving strip" },
      { label: "Active", value: "BPC-157" },
      { label: "Content", value: "Fixed aliquot per strip (see variant)" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Count", value: "30 strips, individually sealed" },
      { label: "Storage", value: "Cool, dry, sealed pouch" },
    ],
    handling: [
      "Store strips in their sealed pouch in a cool, dry place away from humidity.",
      "Handle with clean, dry instruments; strips dissolve on contact with moisture.",
      "Keep desiccant packet in the pouch and reseal after each access.",
    ],
    references: [
      { label: "Stable gastric pentadecapeptide BPC 157 (review)", url: "https://pubmed.ncbi.nlm.nih.gov/?term=BPC+157" },
    ],
    reviews: [
      review("r1", "C. Devlin", "2026-04-10", 5, "Pre-measured is convenient", "No reconstitution, consistent units. Content assay was included."),
      review("r2", "N. Adeyemi", "2026-03-27", 4, "Tidy format", "Sealed well, dissolves fast. Good for repeat measurements."),
    ],
  },

  "cjc-1295-ipamorelin-sublingual": {
    overview: [
      "A co-formulated CJC-1295 + Ipamorelin sublingual strip, pairing two commonly co-studied secretagogue research peptides in a single pre-measured unit.",
      "Per-strip content for each component is verified analytically and reported on the batch COA.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Format", value: "Oral-dissolving strip" },
      { label: "Actives", value: "CJC-1295 + Ipamorelin" },
      { label: "Purity", value: "≥99% each (HPLC)" },
      { label: "Count", value: "30 strips, individually sealed" },
      { label: "Storage", value: "Cool, dry, sealed pouch" },
    ],
    handling: [
      "Store in the sealed pouch in a cool, dry place.",
      "Handle with dry instruments; reseal with desiccant after each access.",
    ],
    references: [
      { label: "Growth-hormone secretagogue pharmacology (review)", url: "https://pubmed.ncbi.nlm.nih.gov/?term=CJC-1295+ipamorelin" },
    ],
    reviews: [
      review("r1", "E. Vasquez", "2026-04-08", 5, "Convenient pairing", "Both actives listed on the COA. Strips are uniform."),
    ],
  },

  "pt-141-sublingual": {
    overview: [
      "PT-141 (bremelanotide) is a melanocortin-receptor research peptide. This format provides a measured per-strip aliquot for laboratory study.",
      "Per-strip content is verified analytically and reported on the batch COA.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Format", value: "Oral-dissolving strip" },
      { label: "Active", value: "PT-141 (bremelanotide)" },
      { label: "Content", value: "2 mg per strip" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Count", value: "10 strips, individually sealed" },
      { label: "Storage", value: "Cool, dry, sealed pouch" },
    ],
    handling: [
      "Store in the sealed pouch in a cool, dry place away from humidity.",
      "Handle with dry instruments; reseal after each access.",
    ],
    references: [
      { label: "Melanocortin receptor agonist literature", url: "https://pubmed.ncbi.nlm.nih.gov/?term=bremelanotide" },
    ],
    reviews: [
      review("r1", "F. Lindqvist", "2026-03-31", 4, "Measured units", "Useful pre-measured format. Sealed individually."),
    ],
  },

  "thymosin-alpha-1-sublingual": {
    overview: [
      "Thymosin Alpha-1 is a 28-amino-acid peptide studied in the context of T-cell signaling and immune modulation pathways in the literature. This format provides measured per-strip units.",
      "Per-strip content is verified analytically and reported on the batch COA.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Format", value: "Oral-dissolving strip" },
      { label: "Active", value: "Thymosin Alpha-1" },
      { label: "Content", value: "1 mg per strip" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Count", value: "30 strips, individually sealed" },
      { label: "Storage", value: "Cool, dry, sealed pouch" },
    ],
    handling: [
      "Store in the sealed pouch in a cool, dry place.",
      "Handle with dry instruments; reseal with desiccant after each access.",
    ],
    references: [
      { label: "Thymosin alpha-1 immunology (review)", url: "https://pubmed.ncbi.nlm.nih.gov/?term=thymosin+alpha+1" },
    ],
    reviews: [
      review("r1", "G. Romero", "2026-04-14", 5, "Clean and consistent", "Content assay matched the label claim. Reorder."),
    ],
  },

  "nad-plus-liquid": {
    overview: [
      "NAD+ (nicotinamide adenine dinucleotide) is a coenzyme central to redox reactions and is studied in the context of cellular energy metabolism and sirtuin-related pathways. This format is supplied as a pre-suspended liquid with a graduated dropper.",
      "Concentration is verified analytically and reported on the batch COA.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Format", value: "Liquid (graduated dropper)" },
      { label: "Active", value: "NAD+ coenzyme" },
      { label: "Volume", value: "30 mL" },
      { label: "Purity", value: "≥98% (HPLC)" },
      { label: "Storage", value: "2–8 °C, protected from light" },
    ],
    handling: [
      "Refrigerate at 2–8 °C and keep the bottle tightly closed.",
      "Protect from light; NAD+ in solution is light-sensitive.",
      "Use the graduated dropper to measure consistent volumes for your protocol.",
    ],
    tool: {
      kind: "dilution",
      totalMg: 500,
      defaultSolventMl: 30,
      suggestedDoseMcg: 25000,
      unitLabel: "bottle",
    },
    references: [
      { label: "NAD+ metabolism and sirtuins (review)", url: "https://pubmed.ncbi.nlm.nih.gov/?term=NAD%2B+sirtuin" },
    ],
    reviews: [
      review("r1", "H. Sato", "2026-04-20", 5, "Concentration matched", "Assay on the COA matched our internal check. Dropper is accurate."),
      review("r2", "B. Costa", "2026-03-29", 4, "Good liquid format", "No reconstitution needed. Arrived cold-packed."),
    ],
  },

  "glutathione-liquid": {
    overview: [
      "Glutathione is a reduced tripeptide (γ-glutamyl-cysteinyl-glycine) studied as a primary intracellular antioxidant and redox buffer. This format is supplied as a pre-suspended liquid with a graduated dropper.",
      "Concentration is verified analytically and reported on the batch COA.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Format", value: "Liquid (graduated dropper)" },
      { label: "Active", value: "Reduced L-glutathione (GSH)" },
      { label: "Volume", value: "30 mL" },
      { label: "Purity", value: "≥98% (HPLC)" },
      { label: "Storage", value: "2–8 °C, protected from light" },
    ],
    handling: [
      "Refrigerate at 2–8 °C and keep tightly closed.",
      "Protect from light and air; reduced glutathione oxidizes on exposure.",
      "Measure with the graduated dropper for consistent volumes.",
    ],
    tool: {
      kind: "dilution",
      totalMg: 1500,
      defaultSolventMl: 30,
      suggestedDoseMcg: 50000,
      unitLabel: "bottle",
    },
    references: [
      { label: "Glutathione redox biology (review)", url: "https://pubmed.ncbi.nlm.nih.gov/?term=glutathione+antioxidant" },
    ],
    reviews: [
      review("r1", "I. Petrov", "2026-04-11", 5, "Clean reduced GSH", "No discoloration, concentration matched the COA."),
    ],
  },
};

export function getProductDetail(slug: string): ProductDetail | undefined {
  return productDetails[slug];
}
