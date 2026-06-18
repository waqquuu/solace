/**
 * Stripe Checkout Session endpoint (multi-item carts).
 *
 * Per-item Stripe *Payment Links* only support a single price per URL, so a
 * cart with two or more different products can't use them. This route creates a
 * proper Stripe Checkout Session from the cart and returns its hosted URL.
 *
 * It builds line items with inline `price_data` (amount + name) so it does NOT
 * depend on pre-created Stripe Price IDs — the operator only needs a secret key.
 *
 * SAFETY:
 * - The secret key is read from `process.env.STRIPE_SECRET_KEY` (server-only).
 *   It is NEVER sent to the client and must never be committed.
 * - Until that env var is set, this route returns 503 so nothing half-works.
 * - Amounts are recomputed here from each item's unit price × quantity; the
 *   client-supplied total is ignored for charging.
 */

interface IncomingItem {
  name: string;
  variantLabel?: string;
  unitPrice: number;
  quantity: number;
}

interface IncomingBody {
  items?: IncomingItem[];
  customer?: { email?: string; name?: string };
  shipping?: number;
}

const STRIPE_API = "https://api.stripe.com/v1/checkout/sessions";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return Response.json(
      {
        ok: false,
        error:
          "Stripe is not configured yet (missing STRIPE_SECRET_KEY). Add it to the server environment to enable multi-item checkout.",
      },
      { status: 503 },
    );
  }

  let body: IncomingBody;
  try {
    body = (await req.json()) as IncomingBody;
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const items = body.items ?? [];
  if (items.length === 0) {
    return Response.json({ ok: false, error: "Cart is empty." }, { status: 400 });
  }

  const origin =
    req.headers.get("origin") ??
    new URL(req.url).origin;

  // Stripe expects form-encoded, deeply-nested params.
  const form = new URLSearchParams();
  form.set("mode", "payment");
  form.set("success_url", `${origin}/checkout/confirmation?session_id={CHECKOUT_SESSION_ID}`);
  form.set("cancel_url", `${origin}/checkout`);
  if (body.customer?.email) form.set("customer_email", body.customer.email);

  items.forEach((item, i) => {
    const amountCents = Math.round(item.unitPrice * 100);
    const label = item.variantLabel
      ? `${item.name} · ${item.variantLabel}`
      : item.name;
    form.set(`line_items[${i}][quantity]`, String(Math.max(1, item.quantity)));
    form.set(`line_items[${i}][price_data][currency]`, "usd");
    form.set(`line_items[${i}][price_data][unit_amount]`, String(amountCents));
    form.set(`line_items[${i}][price_data][product_data][name]`, label);
  });

  // Optional flat shipping as its own line item.
  if (body.shipping && body.shipping > 0) {
    const i = items.length;
    form.set(`line_items[${i}][quantity]`, "1");
    form.set(`line_items[${i}][price_data][currency]`, "usd");
    form.set(`line_items[${i}][price_data][unit_amount]`, String(Math.round(body.shipping * 100)));
    form.set(`line_items[${i}][price_data][product_data][name]`, "Shipping");
  }

  try {
    const res = await fetch(STRIPE_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    const data = (await res.json()) as { url?: string; error?: { message?: string } };
    if (!res.ok || !data.url) {
      return Response.json(
        { ok: false, error: data.error?.message ?? "Stripe session creation failed." },
        { status: 502 },
      );
    }
    return Response.json({ ok: true, url: data.url });
  } catch {
    return Response.json(
      { ok: false, error: "Could not reach Stripe. Please try again." },
      { status: 502 },
    );
  }
}
