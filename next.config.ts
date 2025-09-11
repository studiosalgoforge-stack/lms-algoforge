/** @type {import('next').NextConfig} */

const nextConfig = {
<<<<<<< HEAD
=======
  eslint: {
    // Disable ESLint errors during build
    ignoreDuringBuilds: true,
  },
>>>>>>> 554c5343c23f350e1a8699831b9f7e0b95b864ba
  async rewrites() {
    return [
      {
        source: "/api/:path*",
<<<<<<< HEAD
        destination: "http://localhost:5000/api/:path*", // Proxy to backend
=======
        destination: process.env.NEXT_PUBLIC_API_BASE + "/:path*", // Proxy to backend using env
>>>>>>> 554c5343c23f350e1a8699831b9f7e0b95b864ba
      },
    ];
  },
};
<<<<<<< HEAD
=======

>>>>>>> 554c5343c23f350e1a8699831b9f7e0b95b864ba
export default nextConfig;
