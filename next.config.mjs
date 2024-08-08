/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        port: "", // Leave empty if not using a specific port
        pathname: "/**", // Allows any path after the domain
      },
    ],
  },
  env: {
    EDGE_STORE_URL: process.env.EDGE_STORE_URL,
    EDGE_STORE_API_KEY: process.env.EDGE_STORE_API_KEY,
  },
};

module.exports = nextConfig;
