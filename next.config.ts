import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/I/**",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;

