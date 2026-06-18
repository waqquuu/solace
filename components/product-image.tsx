import Image from "next/image";

interface ProductImageProps {
  /** Light-theme image path. */
  light: string;
  /** Dark-theme image path. */
  dark: string;
  alt: string;
  sizes: string;
  /** Extra classes applied to both <Image> layers. */
  className?: string;
  priority?: boolean;
}

/**
 * Renders both the light and dark product shots stacked; CSS (`.vial-light` /
 * `.vial-dark`, toggled by `html.dark` in globals.css) reveals the one that
 * matches the active theme. Doing the swap in CSS keeps it flash-free and works
 * in server-rendered markup. Both layers use `fill`, so the parent must be
 * `relative`.
 */
export function ProductImage({
  light,
  dark,
  alt,
  sizes,
  className = "",
  priority = false,
}: ProductImageProps) {
  return (
    <>
      <Image
        src={light}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`vial-light ${className}`}
      />
      <Image
        src={dark}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        priority={priority}
        className={`vial-dark ${className}`}
      />
    </>
  );
}
