/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force all routes to be dynamic by default
  experimental: {
    serverActions: true,
  },
  // Disable static generation for all pages
  output: 'standalone',
};

module.exports = nextConfig;
