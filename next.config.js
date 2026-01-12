/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/app',
        destination: 'https://app.on-tonight.com',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
