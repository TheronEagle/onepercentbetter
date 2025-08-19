/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    config.externals.push({
      '@clerk/nextjs': '@clerk/nextjs',
    })
    return config
  },
}

module.exports = nextConfig