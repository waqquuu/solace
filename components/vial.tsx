import type { Product } from "@/lib/types";
import { brand } from "@/lib/brand";
import { ProductImage } from "./product-image";

/**
 * The product vial.
 *
 * Every product shares one of four base photos (powder / solution × light /
 * dark) so the glass, cap, and proportions are pixel-identical across the
 * catalog — fixing the old per-product drift (mismatched shapes, "double" caps,
 * inconsistent label bars). The label itself is drawn here in CSS, not baked
 * into the image: the compound name renders in the real brand serif, and the
 * horizontal accent bar is a fixed-size element, so it is guaranteed uniform on
 * every vial regardless of name length. Category color lives only in the bar.
 *
 * All type and spacing use container query units (`cqw`) so the label scales
 * with the vial wherever it appears — tiny cards through the full product page.
 * The wrapper carries any motion/transform classes (float, hover-scale,
 * sold-out fade) so the label stays glued to the glass as it animates.
 */
export function Vial({
  product,
  sizes,
  priority = false,
  className = "",
}: {
  product: Product;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const tint = product.tint ?? "#c4673a";

  return (
    <div className={`absolute inset-0 [container-type:inline-size] ${className}`}>
      <ProductImage
        light={product.image}
        dark={product.imageDark}
        alt={product.fullName}
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />

      {/* CSS label — sits centered on the vial body */}
      <div
        className="pointer-events-none absolute left-1/2 top-[51%] flex w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
        style={{
          paddingTop: "2.6cqw",
          paddingBottom: "2.6cqw",
          paddingInline: "1.8cqw",
          borderRadius: "0.8cqw",
          background: "#f1ebdf",
          boxShadow:
            "0 0.4cqw 1.6cqw rgba(20,15,10,0.22), inset 0 0 0 0.12cqw rgba(120,105,85,0.18)",
        }}
        aria-hidden
      >
        <span
          style={{
            fontFamily: "var(--font-plex-mono), monospace",
            fontSize: "1.45cqw",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#9a8f7d",
            lineHeight: 1,
          }}
        >
          {brand.fullName}
        </span>

        <span
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "3.5cqw",
            lineHeight: 1.04,
            color: "#211b14",
            marginTop: "1cqw",
            wordBreak: "break-word",
          }}
        >
          {product.name}
        </span>

        <span
          style={{
            display: "block",
            height: "0.55cqw",
            width: "58%",
            marginTop: "1.4cqw",
            marginBottom: "1.4cqw",
            borderRadius: "1cqw",
            backgroundColor: tint,
          }}
        />

        <span
          style={{
            fontFamily: "var(--font-plex-mono), monospace",
            fontSize: "1.2cqw",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#8a8170",
            lineHeight: 1,
          }}
        >
          For research use only
        </span>
      </div>
    </div>
  );
}
