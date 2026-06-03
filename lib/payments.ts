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

/** Active gateway. Replace with a live implementation when ready. */
export const gateway: PaymentGateway = mockGateway;
