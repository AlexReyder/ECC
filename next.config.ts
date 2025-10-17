import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsHmrCache: false,
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    localPatterns: [
    {
      pathname: '/img/**',
      search: '',
    },
  ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ru1.storage.beget.cloud',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
