import type { NextConfig } from "next";

const repoName = "portfolio";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  ...(process.env.NODE_ENV === "production"
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
};

export default nextConfig;
