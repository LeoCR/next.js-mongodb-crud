/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flowbite.com", "githubusercontent.com"],
  },
  env: {
    UI_URL: process.env.UI_URL,
  },
};

module.exports = nextConfig
