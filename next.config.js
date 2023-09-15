/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.match-gg.kr',
        port: '',
        pathname: '/**/**/*',
      },
    ],
  },
}
