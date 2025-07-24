import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.clerk.com"],
  },
  eslint: {
    dirs: ["app/"],
  },
};

export default nextConfig;
