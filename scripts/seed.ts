import config from '@payload-config'
import { getPayload } from 'payload'

const accounts = ['WalrusTech', 'WingTech', 'HyperLumen', 'XentroLabs']
const appNames = [
  'Naat Ringtones',
  'Islamic Ringtones',
  'Ramadan Ringtones',
  'Azaan Ringtones',
  'Ertugrul Ringtones',
  'Turkish Ringtones',
  'Funny Ringtones',
  'Islamic Wallpapers',
  'Qibla Finder',
  'Barcode Scanner',
  'Animal Ringtones',
  'Birds Ringtones',
  'Notification Ringtones',
  'Simple Calculator',
  'Animal Wallpapers',
  'Flash Light',
  'Marla Calculator',
  'Unit Converter',
  'Device-Info',
  'Prayer Times',
]

const slugify = (value: string) => value.toLowerCase().replaceAll(/[^a-z0-9]+/g, '')

async function seed() {
  const payload = await getPayload({ config })
  const existing = await payload.find({
    collection: 'organizations',
    where: { slug: { equals: 'wyndgo-demo' } },
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs.length) {
    console.log('Deterministic demo already exists; no changes made.')
    return
  }
  const organization = await payload.create({
    collection: 'organizations',
    data: {
      name: 'WyndGo Studio · Demo',
      slug: 'wyndgo-demo',
      baseCurrency: 'USD',
      timezone: 'Asia/Karachi',
      fiscalYearStart: 1,
      reportingDayCutoff: 0,
    },
    overrideAccess: true,
  })
  const password = process.env.SEED_PLATFORM_ADMIN_PASSWORD
  const email = process.env.SEED_PLATFORM_ADMIN_EMAIL
  if (email && password) {
    const user = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name: 'Demo Owner',
        platformRole: 'platform-admin',
        activeOrganization: organization.id,
      },
      overrideAccess: true,
    })
    await payload.create({
      collection: 'organization-memberships',
      data: {
        organization: organization.id,
        user: user.id,
        role: 'owner',
        status: 'active',
      },
      overrideAccess: true,
    })
  }
  const connection = await payload.create({
    collection: 'google-connections',
    data: {
      organization: organization.id,
      name: 'Demo Google identity',
      googleEmail: 'demo@appledger.local',
      status: 'active',
      sourceMetadata: { mode: 'mock', demo: true },
    },
    overrideAccess: true,
  })
  const profiles = await Promise.all(
    accounts.map((name) =>
      payload.create({
        collection: 'play-console-profiles',
        data: {
          organization: organization.id,
          connection: connection.id,
          name,
          status: 'active',
          currency: 'USD',
          timezone: 'Asia/Karachi',
        },
        overrideAccess: true,
      }),
    ),
  )
  const apps = await Promise.all(
    appNames.map((name, index) =>
      payload.create({
        collection: 'apps',
        data: {
          organization: organization.id,
          name,
          packageName: `com.wyndgo.${slugify(name)}`,
          displayPackageName: `com.wyndgo.${slugify(name)}`,
          playProfile: profiles[index % profiles.length].id,
          status: 'active',
        },
        overrideAccess: true,
      }),
    ),
  )
  for (let day = 0; day < 90; day += 1) {
    const date = new Date(Date.UTC(2026, 6, 27 - day)).toISOString()
    for (let index = 0; index < apps.length; index += 1) {
      const revenue = (45 + ((day * 17 + index * 31) % 170)).toFixed(6)
      await payload.create({
        collection: 'app-daily-financials',
        data: {
          organization: organization.id,
          app: apps[index].id,
          date,
          amount: Number(revenue),
          currency: 'USD',
          status: day < 3 ? 'preliminary' : 'finalized',
          sourceKey: `demo:${apps[index].id}:${date.slice(0, 10)}`,
          calculationVersion: 'v1',
          finalized: day >= 3,
        },
        overrideAccess: true,
      })
    }
  }
  console.log(`Seeded ${apps.length} apps and 90 days of deterministic demo facts.`)
}

await seed()
