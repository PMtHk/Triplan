/** @type {import('next').NextConfig} */

module.exports = {
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
