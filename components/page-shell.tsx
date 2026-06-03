import { Reveal } from "./reveal";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}

/** Consistent header + prose container for content/legal pages. */
export function PageShell({ eyebrow, title, intro, children }: PageShellProps) {
  return (
    <div className="relative">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-72 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {intro}
            </p>
          )}
        </Reveal>
        <Reveal delay={100} className="prose-shell mt-12">
          {children}
        </Reveal>
      </div>
    </div>
  );
}
