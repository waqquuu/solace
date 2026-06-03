import type { Metadata } from "next";
import { faqs } from "@/lib/content";
import { jsonLdScript } from "@/lib/jsonld";
import { Accordion } from "@/components/accordion";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers on research-use policy, batch verification, formats, shipping, purity standards and returns.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <PageShell
        eyebrow="Support"
        title="Frequently asked questions"
        intro="Everything about how we test, verify, ship, and what research-use means. Can't find it? Reach out anytime."
      >
        <Accordion items={faqs} />
      </PageShell>
    </>
  );
}
