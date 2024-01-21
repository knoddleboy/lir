/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: ["@lir/lib", "@lir/ui"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
  // Had to ignore eslint for building inside
  // docker eslint causes strange errors.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
