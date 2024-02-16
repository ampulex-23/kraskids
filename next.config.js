/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
};

module.exports = nextConfig;
