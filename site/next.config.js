/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: '../public',
  env: {
    name: 'TechRing',
    description: 'SDR workspace images for Kasm Workspaces.',
    icon: '/img/logo.svg',
    listUrl: 'https://techring-live.github.io/kasm-registry/',
    contactUrl: 'https://github.com/techring-live/kasm-registry/issues',
  },
  reactStrictMode: true,
  basePath: '/kasm-registry/1.0',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
