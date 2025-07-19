/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@wilma/ui', '@wilma/shared', '@wilma/auth', '@wilma/database'],
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
