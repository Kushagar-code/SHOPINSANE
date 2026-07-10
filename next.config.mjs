/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { nextRuntime }) => {
    if (nextRuntime === 'edge') {
      config.externals.push(({ request }, callback) => {
        if (request === 'async_hooks') {
          return callback(null, 'module node:async_hooks');
        }
        callback();
      });
    }
    return config;
  },
};

export default nextConfig;
