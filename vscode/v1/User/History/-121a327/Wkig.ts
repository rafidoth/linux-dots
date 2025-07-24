import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        port: "3000",
        pathname: "/**/*",
        search: "",
      },
    ],
  },
};

export default nextConfig;
