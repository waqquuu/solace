/**
 * Gateway-agnostic payments seam.
 *
 * The rest of the app talks only to `createCheckoutSession`. Today it runs in
 * mock mode (no network, no secrets). To plug in a real processor (Stripe,
 * Adyen, etc.) later, implement a new `PaymentGateway` and swap the `gateway`
 * export — no UI changes required.
 *
 * NEVER hardcode secrets here. Real gateways should read keys from server-only
 * environment variables (e.g. process.env.STRIPE_SECRET_KEY) inside a Route
 * Handler or Server Action, never in client code.
 */

export interface CheckoutLineItem {
  productSlug: string;
  variantId: string;
  name: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
  /**
   * Stripe Payment Link for this exact price point (mirrors
   * `PriceVariant.paymentLink`). Stripe issues one link per price, so each
   * variant carries its own URL. Consumed by `stripeLinkGateway`.
   */
  paymentLink?: string;
}

export interface CheckoutCustomer {
  email: string;
  name: string;
}

export interface CheckoutRequest {
  items: CheckoutLineItem[];
  customer: CheckoutCustomer;
  subtotal: number;
  shipping: number;
  total: number;
}

export interface CheckoutResult {
  ok: boolean;
  orderId: string;
  /** Where to redirect after a successful session is created. */
  redirectUrl?: string;
  error?: string;
}

export interface PaymentGateway {
  readonly id: string;
  readonly mode: "mock" | "live";
  createCheckoutSession(req: CheckoutRequest): Promise<CheckoutResult>;
}

function generateOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SC-${stamp}-${rand}`;
}

/**
 * Mock gateway — simulates a successful checkout session locally.
 * Swap this for a real implementation behind the same interface.
 */
const mockGateway: PaymentGateway = {
  id: "mock",
  mode: "mock",
  async createCheckoutSession(req) {
    await new Promise((r) => setTimeout(r, 900));
    if (!req.items.length) {
      return { ok: false, orderId: "", error: "Cart is empty." };
    }
    const orderId = generateOrderId();
    return {
      ok: true,
      orderId,
      redirectUrl: `/checkout/confirmation?order=${orderId}`,
    };
  },
};

/**
 * Stripe gateway (hybrid).
 *
 * Handles both of the operator's realities:
 *
 * - Single-item cart with a configured Payment Link → redirect straight to that
 *   Stripe-hosted page (one link per price; see `lib/payment-links.ts`). No
 *   server keys needed for this path.
 * - Everything else (multi-item carts, or an item whose link isn't made yet) →
 *   POST the cart to `/api/checkout`, which creates a Stripe Checkout Session
 *   server-side using `STRIPE_SECRET_KEY`, and redirect to the returned URL.
 *
 * This is wired and ready but NOT the active gateway: while the storefront is
 * paused every product is `sold-out`, so checkout is unreachable. To go live,
 * change the `gateway` export below from `mockGateway` to `stripeGateway`.
 */
export const stripeGateway: PaymentGateway = {
  id: "stripe",
  mode: "live",
  async createCheckoutSession(req) {
    if (!req.items.length) {
      return { ok: false, orderId: "", error: "Cart is empty." };
    }

    // Fast path: a single price with its own Payment Link.
    if (req.items.length === 1 && req.items[0].paymentLink) {
      return {
        ok: true,
        orderId: generateOrderId(),
        redirectUrl: req.items[0].paymentLink,
      };
    }

    // Multi-item (or unlinked) path: server-created Checkout Session.
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: req.items,
          customer: req.customer,
          shipping: req.shipping,
        }),
      });
      const data = (await res.json()) as { ok: boolean; url?: string; error?: string };
      if (!data.ok || !data.url) {
        return {
          ok: false,
          orderId: "",
          error: data.error ?? "Could not start Stripe checkout.",
        };
      }
      return { ok: true, orderId: generateOrderId(), redirectUrl: data.url };
    } catch {
      return {
        ok: false,
        orderId: "",
        error: "Could not reach the checkout service. Please try again.",
      };
    }
  },
};

/**
 * Active gateway. Currently the local mock so the paused/sold-out storefront can
 * be previewed without charging anything. Switch to `stripeGateway` once the
 * Payment Links are pasted into `lib/payment-links.ts` and/or
 * `STRIPE_SECRET_KEY` is set on the server.
 */
export const gateway: PaymentGateway = mockGateway;
