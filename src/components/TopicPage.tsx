import type { Metadata } from 'next';
import { SITE_URL } from '@/i18n/routing';
import { TOPICS, type TopicDef, type TopicLocale } from '@/lib/topics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function buildTopicMetadata(
  slug: string,
  locale: TopicLocale
): Metadata {
  const topic = TOPICS.find((t) => t.slug === slug && t.locale === locale);
  if (!topic) return {};
  const url = `${SITE_URL}/${locale}/${slug}`;

  return {
    title: topic.title,
    description: topic.description,
    alternates: {
      canonical: url,
      languages: {
        [locale]: url,
        'x-default': url,
      } as Record<string, string>,
    },
    openGraph: {
      title: topic.title,
      description: topic.description,
      url,
      siteName: 'Ponta da Piedade',
      locale: locale === 'pt' ? 'pt_PT' : locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'article',
      images: [
        {
          url: `${SITE_URL}/gallery/ponta-da-piedade%20(1).jpg`,
          width: 1600,
          height: 1067,
          alt: topic.navLabel,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.title,
      description: topic.description,
      images: [`${SITE_URL}/gallery/ponta-da-piedade%20(1).jpg`],
    },
    robots: { index: true, follow: true },
  };
}

export default function TopicPage({ topic }: { topic: TopicDef }) {
  const { locale, slug, navLabel, title, description, intro, sections, faq, updated } =
    topic;
  const url = `${SITE_URL}/${locale}/${slug}`;
  const homeUrl = `${SITE_URL}/${locale}`;
  const related = TOPICS.filter((t) => t.locale === locale && t.slug !== slug);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ponta da Piedade',
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: navLabel,
        item: url,
      },
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <div
          className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-2 text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          <nav aria-label="Breadcrumb">
            <a href={homeUrl} style={{ color: 'var(--accent)' }}>
              Ponta da Piedade
            </a>
            <span className="mx-2">/</span>
            <span style={{ color: 'var(--text-secondary)' }}>{navLabel}</span>
          </nav>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <h1
            className="font-display text-3xl sm:text-4xl font-semibold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h1>
          <p
            className="text-base leading-relaxed mb-10"
            style={{ color: 'var(--text-secondary)' }}
          >
            {intro}
          </p>

          {sections.map((section, i) => (
            <section key={i} className="mb-10">
              <h2
                className="font-display text-2xl font-semibold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {section.title}
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {section.body}
              </p>
            </section>
          ))}

          <section className="mb-10">
            <h2
              className="font-display text-2xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              FAQ
            </h2>
            <div className="space-y-5">
              {faq.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <h3
                    className="font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.q}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <p className="text-xs mb-10" style={{ color: 'var(--text-muted)' }}>
            {locale === 'pt'
              ? `Última verificação das informações: ${updated}.`
              : locale === 'zh'
                ? `信息最近核实时间：${updated}。`
                : `Visitor information last verified: ${updated}.`}
          </p>

          {related.length > 0 && (
            <section className="mb-10">
              <h2
                className="font-display text-xl font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                {locale === 'pt'
                  ? 'Leia também'
                  : locale === 'zh'
                    ? '相关指南'
                    : 'Related guides'}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <a
                    key={r.slug}
                    href={`/${locale}/${r.slug}`}
                    className="rounded-xl p-5 transition-shadow hover:shadow-md"
                    style={{
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div
                      className="font-semibold mb-1"
                      style={{ color: 'var(--accent)' }}
                    >
                      {r.navLabel}
                    </div>
                    <div
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {r.description}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          <div className="flex justify-center">
            <a
              href={homeUrl}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-white transition-colors"
              style={{ background: 'var(--accent)' }}
            >
              {locale === 'pt'
                ? 'Voltar à página principal'
                : locale === 'zh'
                  ? '返回首页'
                  : 'Back to main guide'}
            </a>
          </div>
        </article>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Footer />
    </>
  );
}
