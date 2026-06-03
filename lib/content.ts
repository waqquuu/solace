export interface Testimonial {
  quote: string;
  author: string;
  date: string;
  title: string;
}

export const testimonials: Testimonial[] = [
  {
    title: "The certificate matched the lot",
    quote:
      "Entered the lot number and the exact report came up — clean single peak on the HPLC trace. Quietly reassuring.",
    author: "M. Halloran",
    date: "2026-04-22",
  },
  {
    title: "Documentation done right",
    quote:
      "Identity confirmed by mass spec, paperwork tied to the vial itself. No noise, no guesswork.",
    author: "Dr. R. Venn",
    date: "2026-04-05",
  },
  {
    title: "Calm, careful packaging",
    quote:
      "Sealed, labeled, traceable. The liquid arrived cold and the concentration matched the certificate.",
    author: "S. Okafor",
    date: "2026-04-13",
  },
  {
    title: "Exactly as described",
    quote:
      "Copper complex was the right color and mass, and the lot-matched certificate made internal sign-off simple.",
    author: "Dr. A. Lindqvist",
    date: "2026-04-23",
  },
  {
    title: "Tidy sublingual format",
    quote:
      "Pre-measured units with an assay on file. Saves reconstitution time and the records stay immaculate.",
    author: "T. Marchetti",
    date: "2026-04-10",
  },
  {
    title: "We reorder without hesitation",
    quote:
      "Consistent lot to lot, and every shipment carries its own certificate. That consistency is the whole point.",
    author: "H. Sato",
    date: "2026-04-20",
  },
];

export interface MethodStep {
  num: string;
  title: string;
  body: string;
}

/**
 * "How a lot earns its line" — the path a compound takes before it is written
 * into the ledger. Framed around being recorded, not a generic vendor process.
 */
export const methodSteps: MethodStep[] = [
  {
    num: "01",
    title: "Built",
    body: "Each compound is made by solid-phase synthesis under documented procedures, then purified until it clears our threshold.",
  },
  {
    num: "02",
    title: "Measured",
    body: "An accredited third-party lab reads purity by HPLC and confirms identity by mass spectrometry. We never grade our own material.",
  },
  {
    num: "03",
    title: "Recorded",
    body: "The result is written to the ledger against the lot on your vial — permanent, searchable, and confirmable with the lab itself.",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "What does “for research use only” mean?",
    a: "All products are intended strictly for in-vitro laboratory research by qualified professionals. They are not drugs, supplements, cosmetics, or foods, and are not intended for human or veterinary consumption. Nothing on this site is medical advice.",
  },
  {
    q: "How do I check a lot before I trust it?",
    a: "Every lot is written into our public ledger alongside its independent HPLC purity and mass-spec identity. Open The Ledger, type the lot number printed on your label, and read the exact record for the unit in your hand. The accredited lab that ran the analysis can confirm it directly.",
  },
  {
    q: "What is the difference between injectable, sublingual, and liquid formats?",
    a: "Injectable vials are lyophilized powder for laboratory reconstitution. Sublingual strips are pre-measured oral-dissolving units. Liquids are pre-suspended solutions with a graduated dropper. Format choice is a matter of research workflow; all are tested to the same standard.",
  },
  {
    q: "How are orders shipped?",
    a: "Orders are processed within 0–2 business days and ship domestically within the US with tracking. Temperature-sensitive items (such as liquids) ship with appropriate cold-pack protection.",
  },
  {
    q: "What is your purity standard?",
    a: "Our target is ≥99% purity for peptide compounds (≥98% for certain coenzymes and antioxidants), confirmed by HPLC, with identity confirmed by mass spectrometry. The exact figure for your lot appears on its COA.",
  },
  {
    q: "Do you store payment information?",
    a: "No. Payments are handled through vetted, encrypted processors via a gateway-agnostic integration. We never store card numbers or secrets on this storefront.",
  },
  {
    q: "Can I return a product?",
    a: "Because these are research materials, sealed items may be eligible for return only if unopened and undamaged. Contact us with your order number and lot number and we will help.",
  },
];
