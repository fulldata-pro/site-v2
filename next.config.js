/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.fulldata.pro',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mock-cdn.fulldata.pro',
        port: '',
        pathname: '/**',
      }
    ],
  },
  webpack: (config) => {
    // Ignore temp_reports and temp_db directories
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/temp_reports/**', '**/temp_db/**', '**/node_modules/**']
    }
    return config
  }
}

module.exports = nextConfig