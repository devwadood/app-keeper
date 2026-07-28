import { ArrowDownRight, ArrowUpRight, Info } from 'lucide-react'

export function KpiCard({
  label,
  value,
  change,
  positive = true,
  note,
}: {
  label: string
  value: string
  change: string
  positive?: boolean
  note?: string
}) {
  const Icon = positive ? ArrowUpRight : ArrowDownRight
  return (
    <article className="panel min-w-0 p-4">
      <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--muted)]">
        {label}
        {note && <Info size={12} aria-label={note} />}
      </div>
      <p className="tabular mt-3 truncate text-[22px] font-semibold tracking-[-0.035em]">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-1.5 text-[11px]">
        <span
          className={`inline-flex items-center font-semibold ${positive ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}
        >
          <Icon size={13} /> {change}
        </span>
        <span className="text-[var(--muted)]">vs previous period</span>
      </div>
    </article>
  )
}
