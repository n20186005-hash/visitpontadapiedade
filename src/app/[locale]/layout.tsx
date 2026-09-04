import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

const SITE_URL = 'https://visitpontadapiedade.com';
const MAPS_URL = 'https://maps.app.goo.gl/4bWc2hpYoZR4FZLS8';

const localeMeta: Record<string, { lang: string; og: string; html: string }> = {
  zh: { lang: 'zh-CN', og: 'zh_CN', html: 'zh-CN' },
  en: { lang: 'en', og: 'en_US', html: 'en' },
  pt: { lang: 'pt', og: 'pt_PT', html: 'pt' },
  mwl: { lang: 'mwl', og: 'pt_PT', html: 'mwl' },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const zhUrl = `${SITE_URL}/zh`;
  const enUrl = `${SITE_URL}/en`;
  const ptUrl = `${SITE_URL}/pt`;
  const mwlUrl = `${SITE_URL}/mwl`;

  let selfUrl = ptUrl;
  if (locale === 'zh') selfUrl = zhUrl;
  else if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'mwl') selfUrl = mwlUrl;

  const base = '/gallery/ponta-da-piedade%20(1).jpg';
  const imageUrl = `${SITE_URL}${base}`;

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'pt': ptUrl,
        'mwl': mwlUrl,
        'x-default': ptUrl,
      } as Record<string, string>,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: 'Ponta da Piedade',
      locale: localeMeta[locale]?.og || 'pt_PT',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1600,
          height: 1067,
          alt: 'Ponta da Piedade - Lagos, Algarve, Portugal',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const meta = (messages as any).meta || {};
  const basic = (messages as any).basicInfo || {};

  const langInfo = localeMeta[locale] || localeMeta.pt;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/${locale === 'pt' ? '' : locale}`,
        name: 'Ponta da Piedade',
        inLanguage: langInfo.lang,
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Ponta da Piedade Visitor Guide',
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.ico`,
      },
      {
        '@type': 'TouristAttraction',
        '@id': `${SITE_URL}/${locale}/#attraction`,
        name: 'Ponta da Piedade',
        alternateName: ['Ponta da Piedade (Lagos)', 'Farol da Ponta da Piedade'],
        description: meta.description || '',
        url: `${SITE_URL}/${locale}`,
        isAccessibleForFree: true,
        image: [
          `${SITE_URL}/gallery/ponta-da-piedade%20(1).jpg`,
          `${SITE_URL}/gallery/ponta-da-piedade%20(2).jpg`,
        ],
        touristType: 'Natural Landscape, Coastal Cliffs, Sea Caves',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Estr. da Ponta da Piedade',
          addressLocality: 'Lagos',
          addressRegion: 'Faro',
          postalCode: '8600-544',
          addressCountry: 'PT',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 37.0805,
          longitude: -8.6723,
        },
        telephone: basic.phoneValue || '+351964875617',
        hasMap: MAPS_URL,
        sameAs: [
          MAPS_URL,
          'https://www.visitportugal.com/en/content/ponta-da-piedade',
          'https://www.amn.pt/DF/Paginas/FaroldaPontadaPiedade.aspx',
        ],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '26811',
          bestRating: '5',
        },
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
    ],
  };

  return (
    <html lang={langInfo.html} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3a7a8d" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
