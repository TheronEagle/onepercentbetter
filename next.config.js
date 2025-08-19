/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  experimental: {
    esmExternals: 'loose',
  },
  // Configure for Replit deployment
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  trailingSlash: false,
  // Add output for static deployment if needed
  // output: 'standalone',
}

module.exports = nextConfig