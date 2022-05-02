/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["edpuzzle.com", "open"],

  },
};

module.exports = nextConfig;
