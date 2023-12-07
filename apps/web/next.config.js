/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: ["@lir/lib", "@lir/ui"],
};

module.exports = nextConfig;
