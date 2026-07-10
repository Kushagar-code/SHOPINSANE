/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { webpack, nextRuntime }) => {
    if (nextRuntime === 'edge') {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /^async_hooks$/,
          'node:async_hooks'
        )
      );
    }
    return config;
  },
};

export default nextConfig;
