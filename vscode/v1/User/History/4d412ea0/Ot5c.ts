import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.clerk.com"],
  },
  eslint: {
    dirs: ["app/"],
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
