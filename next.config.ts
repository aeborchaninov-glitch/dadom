import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: process.env.DADOM_BUILD_DIR || ".next",
  images: {
    unoptimized: true,
  },
  // File-backed catalogue: normal static generation supports an empty catalogue and strict 404s.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
