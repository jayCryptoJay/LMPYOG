/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow server-side file system access
  experimental: {
    serverComponentsExternalPackages: ['gray-matter'],
  },
}

module.exports = nextConfig
