/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@wilma/shared-ui",
    "@wilma/shared-types",
    "@wilma/shared-utils",
    "@wilma/shared-auth"
  ],
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
