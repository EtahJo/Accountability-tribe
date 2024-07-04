import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    return config;
  },
};
const config = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);

export default config;
