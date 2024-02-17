import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["assets.adidas.com", "www.nike.com", "static.nike.com","images.puma.com","storage.sg.content-cdn.io"],
    loader: "default",
    path: "/_next/image",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
