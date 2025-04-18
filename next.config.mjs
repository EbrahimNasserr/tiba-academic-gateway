/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.rareblocks.xyz",
                pathname: "/collection/celebration/images/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "img.youtube.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "yt3.googleusercontent.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "tiba-gateway.brsoft-eg.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
