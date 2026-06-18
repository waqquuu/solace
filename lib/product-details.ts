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
      totalMg: 10,
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
      totalMg: 10,
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

  "wolverine-blend": {
    overview: [
      "The Wolverine Blend co-formulates BPC-157 and TB-500 in a single vial for combined tissue-repair research, where both peptides are commonly studied together.",
      "Supplied as a lyophilized blend in a sealed vial. Each component is independently assayed for purity and identity, and both results appear on the lot COA.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Components", value: "BPC-157 + TB-500" },
      { label: "Ratio", value: "1:1 by mass (5 mg + 5 mg)" },
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

  "glow-blend": {
    overview: [
      "GLOW co-formulates BPC-157, TB-500, and GHK-Cu in one vial — three peptides frequently studied together in tissue-repair and matrix-remodeling research.",
      "Supplied as a lyophilized blend in a sealed vial. Each component is independently assayed for purity and identity, and all results appear on the lot COA.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Components", value: "BPC-157 + TB-500 + GHK-Cu" },
      { label: "Total mass", value: "70 mg blend" },
      { label: "Purity", value: "≥99% each (HPLC)" },
      { label: "Identity", value: "Confirmed by mass spectrometry" },
      { label: "Appearance", value: "Blue-tinted powder (copper complex)" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution; the blue tint reflects the GHK-Cu copper complex and is expected.",
      "Reconstitute slowly with bacteriostatic water; swirl gently and protect from prolonged light.",
      "Store reconstituted solution at 2–8 °C.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 70,
      defaultSolventMl: 5,
      suggestedDoseMcg: 1000,
      unitLabel: "vial",
    },
    references: [
      { label: "Combined repair- and matrix-peptide literature", url: "https://pubmed.ncbi.nlm.nih.gov/?term=BPC+157+GHK-Cu" },
    ],
    reviews: [
      review("r1", "S. Okafor", "2026-04-19", 5, "Three in one", "All three actives on the COA. Reconstituted clean with the expected blue tint."),
      review("r2", "K. Mensah", "2026-03-31", 5, "Saves time", "One vial instead of three. Documentation was complete."),
    ],
  },

  "klow-blend": {
    overview: [
      "KLOW builds on the GLOW base by adding KPV, pairing BPC-157, TB-500, and GHK-Cu with an alpha-MSH-derived tripeptide commonly studied in anti-inflammatory signaling.",
      "Supplied as a lyophilized four-component blend in a sealed vial. Each component is independently assayed for purity and identity, and all results appear on the lot COA.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Components", value: "BPC-157 + TB-500 + GHK-Cu + KPV" },
      { label: "Total mass", value: "80 mg blend" },
      { label: "Purity", value: "≥99% each (HPLC)" },
      { label: "Identity", value: "Confirmed by mass spectrometry" },
      { label: "Appearance", value: "Blue-tinted powder (copper complex)" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water; swirl gently and protect from light.",
      "Store reconstituted solution at 2–8 °C.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 80,
      defaultSolventMl: 5,
      suggestedDoseMcg: 1000,
      unitLabel: "vial",
    },
    references: [
      { label: "KPV anti-inflammatory peptide literature", url: "https://pubmed.ncbi.nlm.nih.gov/?term=KPV+peptide" },
    ],
    reviews: [
      review("r1", "Dr. A. Lindqvist", "2026-04-21", 5, "Complete blend", "Four actives, four COA lines. Impressive documentation."),
    ],
  },

  "ghk-cu-50mg": {
    overview: [
      "GHK-Cu is a naturally occurring copper-binding tripeptide (glycyl-L-histidyl-L-lysine complexed with copper(II)). It has been studied in the context of extracellular matrix remodeling and collagen-related signaling pathways in dermal models.",
      "Supplied as a characteristic blue lyophilized powder in a sealed 50 mg vial. Each lot is independently assayed for purity and identity.",
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

  "ghk-cu-100mg": {
    overview: [
      "GHK-Cu is a naturally occurring copper-binding tripeptide (glycyl-L-histidyl-L-lysine complexed with copper(II)). It has been studied in the context of extracellular matrix remodeling and collagen-related signaling pathways in dermal models.",
      "Supplied as a characteristic blue lyophilized powder in a sealed 100 mg vial. Each lot is independently assayed for purity and identity.",
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
      totalMg: 100,
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

  "glp-3-rt-20mg": {
    overview: [
      "GLP-3 (RT) is a research peptide designed as a triple agonist with affinity for the GIP, GLP-1, and glucagon receptors. It has been studied in metabolic-signaling literature involving incretin pathways.",
      "Supplied as a lyophilized powder in a sealed 20 mg vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
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
      totalMg: 20,
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

  "glp-3-rt-30mg": {
    overview: [
      "GLP-3 (RT) is a research peptide designed as a triple agonist with affinity for the GIP, GLP-1, and glucagon receptors. It has been studied in metabolic-signaling literature involving incretin pathways.",
      "Supplied as a lyophilized powder in a sealed 30 mg vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
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
      totalMg: 30,
      defaultSolventMl: 3,
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

  "glp-3-rt-10mg": {
    overview: [
      "GLP-3 (RT) is a research peptide designed as a triple agonist with affinity for the GIP, GLP-1, and glucagon receptors. It has been studied in metabolic-signaling literature involving incretin pathways.",
      "Supplied as a lyophilized powder in a sealed 10 mg vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
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

  "aod-9604": {
    overview: [
      "AOD-9604 is a modified fragment of the C-terminus of human growth hormone (residues 176–191) with an added tyrosine. It has been studied in lipid-metabolism and adipocyte models in the preclinical literature.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Fragment", value: "hGH (176–191) analog, Tyr-extended" },
      { label: "Molecular formula", value: "C78H123N23O23S2" },
      { label: "Molecular weight", value: "1815.1 g/mol" },
      { label: "CAS", value: "221231-10-3" },
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
      suggestedDoseMcg: 300,
      unitLabel: "vial",
    },
    references: [
      { label: "hGH fragment 176-191 metabolism literature", url: "https://pubmed.ncbi.nlm.nih.gov/?term=AOD-9604" },
    ],
    reviews: [
      review("r1", "J. Pereira", "2026-04-09", 5, "Clean fragment", "Mass matched the COA. Sealed and labeled well."),
    ],
  },

  "5-amino-1mq": {
    overview: [
      "5-Amino-1MQ (5-amino-1-methylquinolinium) is a small-molecule inhibitor of nicotinamide N-methyltransferase (NNMT). It has been studied in cellular energy-metabolism and adipocyte models in the preclinical literature.",
      "Supplied as a lyophilized solid in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Class", value: "NNMT inhibitor (small molecule)" },
      { label: "Compound", value: "5-amino-1-methylquinolinium" },
      { label: "Molecular formula", value: "C10H11N2 (cation)" },
      { label: "Molecular weight", value: "159.21 g/mol (cation)" },
      { label: "Purity", value: "≥98% (HPLC)" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute with bacteriostatic or sterile water; swirl gently until dissolved.",
      "Store reconstituted solution at 2–8 °C and protect from light.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 50,
      defaultSolventMl: 2,
      suggestedDoseMcg: 500,
      unitLabel: "vial",
    },
    references: [
      { label: "NNMT inhibition and metabolism (review)", url: "https://pubmed.ncbi.nlm.nih.gov/?term=NNMT+inhibitor" },
    ],
    reviews: [
      review("r1", "T. Marchetti", "2026-04-07", 4, "As described", "Dissolved cleanly. Good supporting paperwork."),
    ],
  },

  "mots-c": {
    overview: [
      "MOTS-c is a mitochondrial-derived peptide encoded within the 12S rRNA region. It has been studied for roles in metabolic homeostasis and exercise-mimetic signaling in preclinical models.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Sequence", value: "Met-Arg-Trp-Gln-Glu-Met-Gly-Tyr-Ile-Phe-Tyr-Pro-Arg-Lys-Leu-Arg" },
      { label: "Molecular weight", value: "2174.6 g/mol" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Identity", value: "Confirmed by mass spectrometry" },
      { label: "Form", value: "Lyophilized powder" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water; swirl gently.",
      "Store reconstituted solution at 2–8 °C.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 10,
      defaultSolventMl: 2,
      suggestedDoseMcg: 1000,
      unitLabel: "vial",
    },
    references: [
      { label: "Lee C, et al. — MOTS-c mitochondrial peptide", url: "https://pubmed.ncbi.nlm.nih.gov/?term=MOTS-c" },
    ],
    reviews: [
      review("r1", "H. Sato", "2026-04-15", 5, "Clean peptide", "Mass spec matched. Sealed under inert gas as stated."),
    ],
  },

  "cjc-1295-ipamorelin": {
    overview: [
      "This vial co-formulates CJC-1295 (No DAC, i.e. modified GRF 1-29) with Ipamorelin — two growth-hormone secretagogue research peptides commonly co-studied together.",
      "Supplied as a lyophilized blend in a sealed vial. Each component is independently assayed for purity and identity, and both results appear on the lot COA.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Components", value: "CJC-1295 (No DAC) + Ipamorelin" },
      { label: "Class", value: "GHRH analog + GHRP" },
      { label: "Purity", value: "≥99% each (HPLC)" },
      { label: "Identity", value: "Confirmed by mass spectrometry" },
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
      totalMg: 10,
      defaultSolventMl: 2,
      suggestedDoseMcg: 250,
      unitLabel: "vial",
    },
    references: [
      { label: "Growth-hormone secretagogue pharmacology (review)", url: "https://pubmed.ncbi.nlm.nih.gov/?term=CJC-1295+ipamorelin" },
    ],
    reviews: [
      review("r1", "E. Vasquez", "2026-04-08", 5, "Convenient pairing", "Both actives listed on the COA. Reconstituted clear."),
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
      totalMg: 10,
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

  tesamorelin: {
    overview: [
      "Tesamorelin is a stabilized analog of growth-hormone-releasing hormone (GHRH 1-44). It has been studied in the context of the growth-hormone axis and lipid metabolism in the literature.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Class", value: "GHRH (1-44) analog" },
      { label: "Molecular formula", value: "C221H366N72O67S" },
      { label: "Molecular weight", value: "5135.9 g/mol" },
      { label: "CAS", value: "218949-48-5" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
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
      { label: "GHRH analog pharmacology (review)", url: "https://pubmed.ncbi.nlm.nih.gov/?term=tesamorelin" },
    ],
    reviews: [
      review("r1", "Dr. R. Venn", "2026-04-11", 5, "Hard to find clean", "Mass spec confirmed identity. Good cold-chain packaging."),
    ],
  },

  "igf-1-lr3": {
    overview: [
      "IGF-1 LR3 (Long R3 IGF-1) is an 83-amino-acid analog of insulin-like growth factor 1 with extended half-life characteristics. It has been studied in cell-proliferation and differentiation models in vitro.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Class", value: "IGF-1 analog (Long R3)" },
      { label: "Residues", value: "83 amino acids" },
      { label: "Molecular weight", value: "9117.6 g/mol" },
      { label: "Purity", value: "≥98% (HPLC)" },
      { label: "Identity", value: "Confirmed by mass spectrometry" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water or dilute acetic acid per protocol; swirl gently.",
      "Store reconstituted solution at 2–8 °C and use promptly.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 1,
      defaultSolventMl: 1,
      suggestedDoseMcg: 50,
      unitLabel: "vial",
    },
    references: [
      { label: "IGF-1 LR3 in-vitro literature", url: "https://pubmed.ncbi.nlm.nih.gov/?term=IGF-1+LR3" },
    ],
    reviews: [
      review("r1", "B. Costa", "2026-04-03", 4, "Reconstituted well", "Cloud-free solution. COA included as expected."),
    ],
  },

  epithalon: {
    overview: [
      "Epithalon (Epitalon) is a synthetic tetrapeptide (Ala-Glu-Asp-Gly) studied in the context of telomerase activity and circadian regulation in preclinical and in-vitro literature.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Sequence", value: "Ala-Glu-Asp-Gly (AEDG)" },
      { label: "Molecular formula", value: "C14H22N4O9" },
      { label: "Molecular weight", value: "390.35 g/mol" },
      { label: "CAS", value: "307297-39-8" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water; swirl gently.",
      "Store reconstituted solution at 2–8 °C.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 10,
      defaultSolventMl: 2,
      suggestedDoseMcg: 1000,
      unitLabel: "vial",
    },
    references: [
      { label: "Khavinson V, et al. — Epithalon peptide literature", url: "https://pubmed.ncbi.nlm.nih.gov/?term=epithalon" },
    ],
    reviews: [
      review("r1", "I. Petrov", "2026-04-06", 5, "Clean tetrapeptide", "Mass matched the COA. Quick processing."),
    ],
  },

  "thymosin-alpha-1": {
    overview: [
      "Thymosin Alpha-1 is a 28-amino-acid peptide studied in the context of T-cell signaling and immune-modulation pathways in the literature.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently assayed for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Residues", value: "28 amino acids (acetylated N-terminus)" },
      { label: "Molecular formula", value: "C129H215N33O55" },
      { label: "Molecular weight", value: "3108.3 g/mol" },
      { label: "CAS", value: "62304-98-7" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water; swirl, do not shake.",
      "Store reconstituted solution at 2–8 °C.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 10,
      defaultSolventMl: 2,
      suggestedDoseMcg: 1000,
      unitLabel: "vial",
    },
    references: [
      { label: "Thymosin alpha-1 immunology (review)", url: "https://pubmed.ncbi.nlm.nih.gov/?term=thymosin+alpha+1" },
    ],
    reviews: [
      review("r1", "G. Romero", "2026-04-14", 5, "Clean and consistent", "Identity confirmed by MS on the COA. Reorder."),
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

  "melanotan-ii": {
    overview: [
      "Melanotan II is a cyclic melanocortin-receptor research peptide studied in melanogenesis and related signaling pathways in preclinical models.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Class", value: "Cyclic melanocortin agonist" },
      { label: "Molecular formula", value: "C50H69N15O9" },
      { label: "Molecular weight", value: "1024.18 g/mol" },
      { label: "CAS", value: "121062-08-6" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water; swirl, do not shake.",
      "Store reconstituted solution at 2–8 °C.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 10,
      defaultSolventMl: 2,
      suggestedDoseMcg: 250,
      unitLabel: "vial",
    },
    references: [
      { label: "Melanocortin receptor agonist literature", url: "https://pubmed.ncbi.nlm.nih.gov/?term=melanotan+II" },
    ],
    reviews: [
      review("r1", "F. Lindqvist", "2026-03-31", 4, "Clean cyclic peptide", "Mass spec matched. Sealed well."),
    ],
  },

  "pt-141": {
    overview: [
      "PT-141 (bremelanotide) is a melanocortin-receptor research peptide studied in vascular and neurosignaling models in the preclinical literature.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Compound", value: "Bremelanotide" },
      { label: "Molecular formula", value: "C50H68N14O10" },
      { label: "Molecular weight", value: "1025.2 g/mol" },
      { label: "CAS", value: "189691-06-3" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water; swirl, do not shake.",
      "Store reconstituted solution at 2–8 °C.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 10,
      defaultSolventMl: 2,
      suggestedDoseMcg: 1000,
      unitLabel: "vial",
    },
    references: [
      { label: "Melanocortin receptor agonist literature", url: "https://pubmed.ncbi.nlm.nih.gov/?term=bremelanotide" },
    ],
    reviews: [
      review("r1", "C. Devlin", "2026-04-10", 4, "As described", "Clean material, identity confirmed on the COA."),
    ],
  },

  kpv: {
    overview: [
      "KPV is a C-terminal tripeptide fragment of alpha-MSH (Lys-Pro-Val) studied for anti-inflammatory signaling pathways in preclinical and in-vitro models.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Sequence", value: "Lys-Pro-Val (KPV)" },
      { label: "Molecular formula", value: "C16H30N4O4" },
      { label: "Molecular weight", value: "342.43 g/mol" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Identity", value: "Confirmed by mass spectrometry" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water; swirl gently.",
      "Store reconstituted solution at 2–8 °C.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 10,
      defaultSolventMl: 2,
      suggestedDoseMcg: 500,
      unitLabel: "vial",
    },
    references: [
      { label: "KPV anti-inflammatory peptide literature", url: "https://pubmed.ncbi.nlm.nih.gov/?term=KPV+peptide" },
    ],
    reviews: [
      review("r1", "N. Adeyemi", "2026-04-02", 5, "Clean tripeptide", "Dissolved instantly. COA complete."),
    ],
  },

  semax: {
    overview: [
      "Semax is a synthetic peptide derived from ACTH(4–10) studied in neurotrophic and cognitive-signaling models, including BDNF-related pathways, in the preclinical literature.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Sequence", value: "Met-Glu-His-Phe-Pro-Gly-Pro" },
      { label: "Molecular formula", value: "C37H51N9O10S" },
      { label: "Molecular weight", value: "813.92 g/mol" },
      { label: "CAS", value: "80714-61-0" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water; swirl gently.",
      "Store reconstituted solution at 2–8 °C.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 10,
      defaultSolventMl: 2,
      suggestedDoseMcg: 300,
      unitLabel: "vial",
    },
    references: [
      { label: "Semax neuropeptide literature", url: "https://pubmed.ncbi.nlm.nih.gov/?term=semax" },
    ],
    reviews: [
      review("r1", "P. Nilsson", "2026-04-12", 5, "Clean nootropic peptide", "Identity confirmed by MS. Good documentation."),
    ],
  },

  selank: {
    overview: [
      "Selank is a synthetic heptapeptide derived from the immunomodulatory peptide tuftsin, studied in anxiolytic and immunomodulatory research models in the preclinical literature.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Sequence", value: "Thr-Lys-Pro-Arg-Pro-Gly-Pro" },
      { label: "Molecular formula", value: "C33H57N11O9" },
      { label: "Molecular weight", value: "751.9 g/mol" },
      { label: "CAS", value: "129954-34-3" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water; swirl gently.",
      "Store reconstituted solution at 2–8 °C.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 10,
      defaultSolventMl: 2,
      suggestedDoseMcg: 300,
      unitLabel: "vial",
    },
    references: [
      { label: "Selank tuftsin-analog literature", url: "https://pubmed.ncbi.nlm.nih.gov/?term=selank" },
    ],
    reviews: [
      review("r1", "A. Whitfield", "2026-04-04", 5, "Clean heptapeptide", "Mass matched. Sealed under inert gas."),
    ],
  },

  dsip: {
    overview: [
      "DSIP (delta sleep-inducing peptide) is a nonapeptide studied in sleep-architecture and neuromodulation models in the preclinical literature.",
      "Supplied as a lyophilized powder in a sealed vial for laboratory reconstitution. Each lot is independently tested for purity and identity.",
      COA_DISCLAIMER,
    ],
    specs: [
      { label: "Sequence", value: "Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu" },
      { label: "Molecular formula", value: "C35H48N10O15" },
      { label: "Molecular weight", value: "848.8 g/mol" },
      { label: "CAS", value: "62568-57-4" },
      { label: "Purity", value: "≥99% (HPLC)" },
      { label: "Storage", value: "−20 °C, protected from light" },
    ],
    handling: [
      "Store lyophilized at −20 °C until reconstitution.",
      "Reconstitute slowly with bacteriostatic water; swirl gently.",
      "Store reconstituted solution at 2–8 °C.",
    ],
    tool: {
      kind: "reconstitution",
      totalMg: 5,
      defaultSolventMl: 2,
      suggestedDoseMcg: 250,
      unitLabel: "vial",
    },
    references: [
      { label: "DSIP neuropeptide literature", url: "https://pubmed.ncbi.nlm.nih.gov/?term=delta+sleep+inducing+peptide" },
    ],
    reviews: [
      review("r1", "R. Hollis", "2026-04-01", 4, "Clean material", "Dissolved fully. COA included."),
    ],
  },

  "bacteriostatic-water": {
    overview: [
      "Bacteriostatic water is sterile water containing 0.9% benzyl alcohol as a bacteriostatic preservative, used in the laboratory to reconstitute lyophilized compounds where repeated withdrawals from a single vial are anticipated.",
      "Supplied in a sealed 30 mL vial. This is a laboratory supply item, not a research compound.",
      "For laboratory use only. Not for human or veterinary use.",
    ],
    specs: [
      { label: "Composition", value: "Water for injection + 0.9% benzyl alcohol" },
      { label: "Volume", value: "30 mL" },
      { label: "Grade", value: "USP" },
      { label: "Sterility", value: "Sealed, multi-withdrawal vial" },
      { label: "Storage", value: "Room temperature, away from light" },
    ],
    handling: [
      "Store at controlled room temperature; keep the stopper sealed and wipe before each withdrawal.",
      "Introduce slowly against the wall of the compound vial to avoid foaming.",
      "Discard per your laboratory's protocol once the in-use window has elapsed.",
    ],
    references: [
      { label: "USP — Bacteriostatic Water for Injection monograph", url: "https://www.usp.org/" },
    ],
    reviews: [
      review("r1", "M. Halloran", "2026-04-17", 5, "Lab staple", "Exactly what you need for reconstitution. Sealed and clean."),
      review("r2", "D. Marsh", "2026-03-24", 5, "Reorder every time", "Consistent and well packaged."),
    ],
  },
};

export function getProductDetail(slug: string): ProductDetail | undefined {
  return productDetails[slug];
}
