
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  experimental: {
    esmExternals: 'loose',
  },
  // Fix chunk loading issues
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            name: 'main',
            chunks: 'all',
            enforce: true,
          },
        },
      }
    }
    
    config.externals.push({
      '@clerk/nextjs': '@clerk/nextjs',
    })
    
    return config
  },
  // Add dev origins configuration
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: [
      '*.replit.dev',
      '*.repl.co',
      'localhost:3000',
      'localhost:3001'
    ]
  }),
}

module.exports = nextConfig
