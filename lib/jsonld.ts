import { brand } from "./brand";

/**
 * Serialize a JSON-LD object for safe embedding in a <script> tag.
 * Escapes `<` to its unicode equivalent to prevent XSS injection,
 * per the Next.js JSON-LD guidance.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.legalName,
    alternateName: brand.fullName,
    url: brand.url,
    description: brand.description,
    email: brand.contact.email,
    sameAs: [brand.social.x, brand.social.instagram],
    slogan: brand.tagline,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.fullName,
    url: brand.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${brand.url}/catalog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
