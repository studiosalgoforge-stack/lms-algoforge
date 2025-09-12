/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:10000/api/:path*", // Proxy to backend
      },
    ];
  },
};
export default nextConfig;