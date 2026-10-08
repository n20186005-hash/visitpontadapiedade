import type { MetadataRoute } from 'next';
import { SITE_URL, TOPIC_PATHS } from '@/i18n/routing';

const locales = ['zh', 'en', 'pt'];
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
        lastModified: new Date('2026-10-01'),
        changeFrequency: sub === '' ? 'weekly' : 'monthly',
        priority: sub === '' ? 1 : 0.4,
        alternates: {
          languages,
        },
      });
    }
  }

  // Long-tail topic pages (each available in a single language)
  for (const [path, locale] of Object.entries(TOPIC_PATHS)) {
    const url = `${SITE_URL}/${locale}/${path}`;
    entries.push({
      url,
      lastModified: new Date('2026-10-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          [locale]: url,
          'x-default': url,
        },
      },
    });
  }

  return entries;
}
