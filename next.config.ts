import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'images.unsplash.com' },
    ],
  },
  // 天气模块使用 Server Component + ISR（fetch revalidate），需要服务端运行时，
  // 因此不使用静态导出（output: 'export'）。部署可用 next start / Vercel。
};

export default withNextIntl(nextConfig);
