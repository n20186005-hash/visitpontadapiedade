import type { MetadataRoute } from 'next';

const SITE_URL = 'https://visitpontadapiedade.com';
const locales = ['zh', 'en', 'pt', 'mwl'];
const subPaths = ['', '/cookie-settings', '/privacy-policy', '/terms-of-service'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const sub of subPaths) {
    for (const locale of locales) {
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[l] = `${SITE_URL}/${l}${sub}`;
      }
      languages['x-default'] = `${SITE_URL}/pt${sub}`;

      entries.push({
        url: `${SITE_URL}/${locale}${sub}`,
        lastModified: new Date('2026-09-04'),
        changeFrequency: sub === '' ? 'daily' : 'monthly',
        priority: sub === '' ? 1 : 0.4,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
