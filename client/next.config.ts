import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.mspectrum.com.ph",
      },
      {
        protocol: "https",
        hostname: "www.meralcopowergen.com.ph",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "www.bworldonline.com",
      },
    ],
  },
};

export default nextConfig;
