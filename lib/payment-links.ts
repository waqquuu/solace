/**
 * Stripe Payment Link URLs — one per price point.
 *
 * Stripe issues a separate Payment Link for every price, so each product below
 * gets its own URL. To go live:
 *
 *   1. In the Stripe dashboard create a Payment Link for each product at the
 *      exact price shown in the comment.
 *   2. Paste the resulting URL (looks like https://buy.stripe.com/XXXXXXXX)
 *      between the quotes for that product's slug.
 *   3. Leave any you haven't made yet as an empty string ("") — those items
 *      simply fall back to the multi-item Checkout Session flow.
 *
 * Keyed by product slug. Every product currently has a single price, so slug
 * is a 1:1 key. If a product ever gains multiple sizes again, switch that entry
 * to a per-variant map.
 */
export const PAYMENT_LINKS: Record<string, string> = {
  // ---- Recovery & repair ----
  "bpc-157": "", // 10 mg · $35.99
  "tb-500": "", // 10 mg · $35.99
  "wolverine-blend": "", // 10 mg · $98.99
  "glow-blend": "", // 70 mg · $103.99
  "klow-blend": "", // 80 mg · $116.99

  // ---- Metabolic ----
  "glp-3-rt-10mg": "", // 10 mg · $62.99
  "glp-3-rt-20mg": "", // 20 mg · $116.99
  "glp-3-rt-30mg": "", // 30 mg · $161.99
  "aod-9604": "", // 5 mg · $44.99
  "5-amino-1mq": "", // 50 mg · $44.99
  "mots-c": "", // 10 mg · $35.99

  // ---- Growth ----
  "cjc-1295-ipamorelin": "", // 10 mg · $53.99
  ipamorelin: "", // 10 mg · $44.99
  tesamorelin: "", // 10 mg · $62.99
  "igf-1-lr3": "", // 1 mg · $62.99

  // ---- Anti-Aging ----
  "ghk-cu-50mg": "", // 50 mg · $26.99
  "ghk-cu-100mg": "", // 100 mg · $44.99

  // ---- Longevity ----
  "nad-plus-solution": "", // 30 mL · 500 mg · $62.99
  epithalon: "", // 10 mg · $26.99
  "thymosin-alpha-1": "", // 10 mg · $35.99

  // ---- Antioxidant ----
  "glutathione-solution": "", // 30 mL · 1500 mg · $53.99

  // ---- Tanning / Blood Flow / Anti-Inflammatory ----
  "melanotan-ii": "", // 10 mg · $26.99
  "pt-141": "", // 10 mg · $26.99
  kpv: "", // 10 mg · $35.99

  // ---- Cognitive / Sleep ----
  semax: "", // 10 mg · $26.99
  selank: "", // 10 mg · $26.99
  dsip: "", // 5 mg · $26.99

  // ---- Supplies ----
  "bacteriostatic-water": "", // 30 mL · $13.49
};

/** Returns the configured Stripe Payment Link for a slug, or undefined if blank. */
export function paymentLinkFor(slug: string): string | undefined {
  const link = PAYMENT_LINKS[slug];
  return link ? link : undefined;
}
