import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'play-lh.googleusercontent.com' }],
  },
  poweredByHeader: false,
}

export default withPayload(nextConfig)
