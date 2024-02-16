/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['assets.adidas.com']
    },
    eslint:{
        ignoreDuringBuilds: true
    }
};

export default nextConfig;
