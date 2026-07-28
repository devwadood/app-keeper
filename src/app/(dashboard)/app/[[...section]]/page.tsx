import { redirect } from 'next/navigation'
import { Overview } from '@/components/dashboard/overview'
import { SectionPage } from '@/components/dashboard/section-page'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ section?: string[] }>
}) {
  const { section = [] } = await params
  if (!section.length) redirect('/app/overview')
  if (section[0] === 'overview') return <Overview />
  return <SectionPage section={section[0]} detail={section[1]} />
}
