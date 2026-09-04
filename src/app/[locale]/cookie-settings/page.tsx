import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const siteUrl = 'https://visitpontadapiedade.com';
  const paths: Record<string, string> = {
    zh: '/zh/cookie-settings',
    en: '/en/cookie-settings',
    pt: '/pt/cookie-settings',
    mwl: '/mwl/cookie-settings',
  };
  const selfPath = paths[locale] || paths.pt;
  const selfUrl = `${siteUrl}${selfPath}`;

  return {
    title: messages?.cookieSettings?.title,
    alternates: {
      canonical: selfUrl,
      languages: {
        zh: `${siteUrl}${paths.zh}`,
        en: `${siteUrl}${paths.en}`,
        pt: `${siteUrl}${paths.pt}`,
        mwl: `${siteUrl}${paths.mwl}`,
        'x-default': `${siteUrl}${paths.pt}`,
      } as Record<string, string>,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
