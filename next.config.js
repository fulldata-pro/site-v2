/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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