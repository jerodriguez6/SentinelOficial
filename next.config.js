// next.config.js
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_CM: process.env.API_CM,
    ONDK_PRIVATE_KEY: process.env.ONDK_PRIVATE_KEY,
    AUKA_PRIVATE_KEY: process.env.AUKA_PRIVATE_KEY,
    USDT_PRIVATE_KEY: process.env.USDT_PRIVATE_KEY,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.vetawallet.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cryptologos.cc', // El dominio que quieres autorizar
        port: '',
        pathname: '/logos/**', // Permite cualquier imagen dentro de la carpeta /logos/
      },
    ],
  },
  i18n,
  // --- AÑADE ESTA SECCIÓN ---
  webpack(config, { isServer }) {
    // Si ya tienes una regla para SVGs, asegúrate de que no entre en conflicto.
    // Esta regla excluye los SVGs del manejo por defecto de 'asset/resource'
    // y los pasa a @svgr/webpack.
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { not: /\.(css|scss|sass)$/ }, // Evita que se aplique a SVGs importados desde CSS/Sass
      use: ['@svgr/webpack'], // Usa @svgr/webpack para convertir SVG a componente React
    });

    return config;
  },
  // --- FIN DE LA SECCIÓN A AÑADIR ---
};

module.exports = nextConfig;