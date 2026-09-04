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
  const imgAlt =
    (messages as any)?.hero?.imgAlt ||
    'Ponta da Piedade - Main view in Lagos, Algarve, Portugal';

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
          alt: imgAlt,
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
        url: `${SITE_URL}/${locale}`,
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
        logo: `${SITE_URL}/icons/icon.svg`,
      },
      {
        '@type': 'TouristAttraction',
        '@id': `${SITE_URL}/${locale}/#attraction`,
        name: 'Ponta da Piedade',
        alternateName: ['Ponta da Piedade (Lagos)', 'Ponta da Piedade cliffs, Lagos'],
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
          latitude: 37.079876,
          longitude: -8.671166,
        },
        telephone: basic.phoneValue || '+351964875617',
        hasMap: MAPS_URL,
        sameAs: [
          MAPS_URL,
          'https://www.visitportugal.com',
          'https://www.cm-lagos.pt',
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
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <meta name="apple-mobile-web-app-title" content="Ponta da Piedade" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  function loadAnalytics() {
                    if (window.__gaLoaded) { return; }
                    window.__gaLoaded = true;
                    window.dataLayer = window.dataLayer || [];
                    function gtag() { window.dataLayer.push(arguments); }
                    window.gtag = gtag;
                    gtag('js', new Date());
                    gtag('config', 'G-HXM22WWPKP', { 'anonymize_ip': true });
                    var s = document.createElement('script');
                    s.async = true;
                    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP';
                    document.head.appendChild(s);
                  }
                  var prefs = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
                  if (prefs.analytics) { loadAnalytics(); }
                  window.addEventListener('consent-updated', function() {
                    try {
                      var p = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
                      if (p.analytics) { loadAnalytics(); }
                    } catch (e2) {}
                  });
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if ('serviceWorker' in navigator && location.protocol === 'https:') {
                    window.addEventListener('load', function() {
                      navigator.serviceWorker.register('/sw.js').catch(function() {});
                    });
                  }
                } catch (e) {}
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
