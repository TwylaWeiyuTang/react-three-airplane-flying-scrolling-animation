/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents:
      true |
      {
        ssr: true,
      },
  },
};

module.exports = nextConfig;
