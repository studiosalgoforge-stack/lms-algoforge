/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    // Disable ESLint errors during build
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_BASE + "/:path*", // Proxy to backend using env
      },
    ];
  },
};

export default nextConfig;
