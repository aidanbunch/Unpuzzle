/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["jedpuzzle.com"],
  },
};

module.exports = nextConfig;
