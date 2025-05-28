import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/app/i18n.ts');

const nextConfig: NextConfig = {
  experimental: {
    // optimizeCss: false,
    cssChunking: false,
  }
};

export default withNextIntl(nextConfig);
