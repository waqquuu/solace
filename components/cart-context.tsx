"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { brand } from "@/lib/brand";

export interface CartItem {
  slug: string;
  variantId: string;
  name: string;
  variantLabel: string;
  unitPrice: number;
  image: string;
  format: string;
  quantity: number;
  /** Stripe Payment Link for this exact price, if one has been configured. */
  paymentLink?: string;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  hydrated: boolean;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (slug: string, variantId: string) => void;
  updateQuantity: (slug: string, variantId: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const STORAGE_KEY = "solace-club:cart:v1";

const CartContext = createContext<CartContextValue | null>(null);

function keyOf(slug: string, variantId: string) {
  return `${slug}::${variantId}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // One-time, hydration-safe load of the persisted cart.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration to avoid clobbering).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items, hydrated]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const k = keyOf(item.slug, item.variantId);
        const existing = prev.find((i) => keyOf(i.slug, i.variantId) === k);
        if (existing) {
          return prev.map((i) =>
            keyOf(i.slug, i.variantId) === k
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        return [...prev, { ...item, quantity }];
      });
      setIsOpen(true);
    },
    [],
  );

  const removeItem = useCallback((slug: string, variantId: string) => {
    const k = keyOf(slug, variantId);
    setItems((prev) => prev.filter((i) => keyOf(i.slug, i.variantId) !== k));
  }, []);

  const updateQuantity = useCallback(
    (slug: string, variantId: string, quantity: number) => {
      const k = keyOf(slug, variantId);
      setItems((prev) =>
        quantity <= 0
          ? prev.filter((i) => keyOf(i.slug, i.variantId) !== k)
          : prev.map((i) =>
              keyOf(i.slug, i.variantId) === k ? { ...i, quantity } : i,
            ),
      );
    },
    [],
  );

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    [items],
  );
  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const freeShippingRemaining = Math.max(
    0,
    brand.freeShippingThreshold - subtotal,
  );

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    isOpen,
    hydrated,
    freeShippingThreshold: brand.freeShippingThreshold,
    freeShippingRemaining,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
