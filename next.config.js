/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["edpuzzle.com"]
  },
};

module.exports = nextConfig;
