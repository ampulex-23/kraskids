/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  //distDir: '/var/www/html',
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
};

module.exports = nextConfig;
