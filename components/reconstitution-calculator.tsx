"use client";

import { useState } from "react";
import type { ReconstitutionTool } from "@/lib/types";

/**
 * Research reconstitution / dilution calculator. Pure arithmetic helper for
 * laboratory planning — not dosing guidance.
 */
export function ReconstitutionCalculator({ tool }: { tool: ReconstitutionTool }) {
  const [totalMg, setTotalMg] = useState(tool.totalMg);
  const [solventMl, setSolventMl] = useState(tool.defaultSolventMl);
  const [doseMcg, setDoseMcg] = useState(tool.suggestedDoseMcg);

  const concentrationMgMl = solventMl > 0 ? totalMg / solventMl : 0;
  const concentrationMcgMl = concentrationMgMl * 1000;
  const volumePerDoseMl =
    concentrationMcgMl > 0 ? doseMcg / concentrationMcgMl : 0;
  const unitsPerContainer =
    doseMcg > 0 ? (totalMg * 1000) / doseMcg : 0;

  const isReconstitution = tool.kind === "reconstitution";

  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-paper-raised p-6">
      <h3 className="font-display text-xl">
        {isReconstitution ? "Reconstitution calculator" : "Concentration calculator"}
      </h3>
      <p className="mt-1 text-sm text-ink-muted">
        A planning aid for laboratory measurement. Figures are arithmetic only —
        not dosing guidance for any living subject.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Field
          label={isReconstitution ? "Compound in vial" : "Compound in bottle"}
          suffix="mg"
          value={totalMg}
          onChange={setTotalMg}
        />
        <Field
          label={isReconstitution ? "Solvent added" : "Solution volume"}
          suffix="mL"
          value={solventMl}
          onChange={setSolventMl}
        />
        <Field
          label="Target aliquot"
          suffix="mcg"
          value={doseMcg}
          onChange={setDoseMcg}
        />
      </div>

      <dl className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2">
        <Result
          label="Concentration"
          value={`${concentrationMgMl.toFixed(2)} mg/mL`}
        />
        <Result
          label="Volume per aliquot"
          value={`${volumePerDoseMl.toFixed(3)} mL`}
        />
        <Result
          label="Aliquots per container"
          value={`${Math.floor(unitsPerContainer)}`}
        />
      </dl>
    </div>
  );
}

function Field({
  label,
  suffix,
  value,
  onChange,
}: {
  label: string;
  suffix: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[0.62rem] uppercase tracking-wider text-ink-muted">
        {label}
      </span>
      <div className="mt-1.5 flex items-center rounded-full border border-line bg-paper focus-within:border-accent">
        <input
          type="number"
          min={0}
          step="any"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="h-10 w-full bg-transparent px-4 text-sm outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="pr-4 font-mono text-xs text-ink-faint">{suffix}</span>
      </div>
    </label>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper-raised px-5 py-4">
      <dt className="font-mono text-[0.62rem] uppercase tracking-wider text-ink-faint">
        {label}
      </dt>
      <dd className="mt-1 font-display text-xl tabular-nums">{value}</dd>
    </div>
  );
}
