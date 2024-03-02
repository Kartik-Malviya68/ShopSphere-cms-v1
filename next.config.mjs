import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    path: "/_next/image",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
