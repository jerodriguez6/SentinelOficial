// next.config.js
const { i18n } = require('./next-i18next.config'); // Import your i18n config

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing environment variables
  env: {
    API_CM: process.env.API_CM,
    ONDK_PRIVATE_KEY: process.env.ONDK_PRIVATE_KEY,
    AUKA_PRIVATE_KEY: process.env.AUKA_PRIVATE_KEY,
    USDT_PRIVATE_KEY: process.env.USDT_PRIVATE_KEY,
  },

  // Your existing image configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.vetawallet.com',
        port: '',
        pathname: '/**',
      },
      { // This was added in your second paste
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
    ],
  },

  // --- Add the i18n configuration here ---
  i18n, // This line is crucial for Next.js to handle internationalization
};

module.exports = nextConfig;