import { ChartNoAxesCombined } from 'lucide-react'

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-semibold tracking-[-0.02em]">
      <span className="grid size-8 place-items-center rounded-[10px] bg-[var(--foreground)] text-[var(--panel)]">
        <ChartNoAxesCombined size={17} strokeWidth={2.4} />
      </span>
      {!compact && <span>AppLedger</span>}
    </span>
  )
}
