/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
    future: { webpack5: true },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.alias.canvas = false
        config.resolve.alias.encoding = false
        return config
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3000/:path*'
        }
      ]
    }
};


module.exports = nextConfig;
