/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { globalNotFound: true },
  ...(process.env.NEXT_PRIVATE_STANDALONE ? {} : { output: "export" }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
