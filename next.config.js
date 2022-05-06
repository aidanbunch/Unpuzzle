/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["edpuzzle.com"],
  },
};

module.exports = nextConfig;