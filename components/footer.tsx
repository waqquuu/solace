import Link from "next/link";
import { brand, footerNav, complianceStatement } from "@/lib/brand";
import { Logo } from "./logo";
import { Newsletter } from "./newsletter";

export function Footer() {
  return (
    <footer className="section-dark relative overflow-hidden">
      <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-night-muted">
              {brand.fullName} keeps a permanent, public ledger for every lot it
              ships — independently tested, matched to your label, and yours to
              read. For laboratory and research use only.
            </p>

            <div className="mt-8">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-night-text">
                New to the ledger
              </p>
              <p className="mb-3 mt-1 text-xs text-night-muted">
                A quiet note when fresh lots are recorded. Nothing else.
              </p>
              <Newsletter tone="dark" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-night-text">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-night-muted transition-colors hover:text-night-text"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-night-line pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-night-muted">
            {complianceStatement}
          </p>
          <div className="mt-6 flex flex-col gap-3 text-xs text-night-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {brand.year} {brand.legalName}. All rights reserved.
            </p>
            <div className="flex gap-5">
              <Link href="/legal/terms" className="hover:text-night-text">
                Terms
              </Link>
              <Link href="/legal/privacy" className="hover:text-night-text">
                Privacy
              </Link>
              <Link href="/legal/disclaimer" className="hover:text-night-text">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
