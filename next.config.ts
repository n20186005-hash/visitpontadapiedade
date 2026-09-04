import path from 'node:path';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // 本机上级目录存在其它 lockfile，显式锁定 tracing 根目录为项目根。
  outputFileTracingRoot: path.join(__dirname),
  // 天气模块使用 Server Component + ISR（fetch revalidate），需要服务端运行时，
  // 因此不使用静态导出（output: 'export'）。部署可用 next start / Vercel。
};

export default withNextIntl(nextConfig);
