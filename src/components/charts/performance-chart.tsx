'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { day: 'Jul 1', revenue: 1280, spend: 620 },
  { day: 'Jul 4', revenue: 1510, spend: 710 },
  { day: 'Jul 7', revenue: 1390, spend: 660 },
  { day: 'Jul 10', revenue: 1880, spend: 790 },
  { day: 'Jul 13', revenue: 1760, spend: 830 },
  { day: 'Jul 16', revenue: 2140, spend: 910 },
  { day: 'Jul 19', revenue: 2030, spend: 880 },
  { day: 'Jul 22', revenue: 2480, spend: 990 },
  { day: 'Jul 25', revenue: 2290, spend: 1040 },
  { day: 'Jul 27', revenue: 2710, spend: 1090 },
]

export function PerformanceChart() {
  return (
    <div className="h-[275px] w-full" aria-label="Revenue and spend chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -20, right: 4, top: 12 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5b5ce2" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#5b5ce2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--muted)', fontSize: 11 }}
          />
          <YAxis
            tickFormatter={(v) => `$${v / 1000}k`}
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--muted)', fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--panel)',
              color: 'var(--foreground)',
              fontSize: 12,
            }}
            formatter={(value, name) => [`$${Number(value).toLocaleString()} USD`, name]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#5b5ce2"
            strokeWidth={2.2}
            fill="url(#revenueFill)"
            name="Revenue"
          />
          <Area
            type="monotone"
            dataKey="spend"
            stroke="#e39742"
            strokeWidth={2}
            fill="transparent"
            name="Ad spend"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
