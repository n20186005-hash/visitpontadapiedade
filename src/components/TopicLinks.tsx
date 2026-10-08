import { TOPICS, type TopicLocale } from '@/lib/topics';

const headings: Record<TopicLocale, string> = {
  pt: 'Guias relacionados',
  en: 'Related guides',
  zh: '相关指南',
};

export default function TopicLinks({ locale }: { locale: TopicLocale }) {
  const related = TOPICS.filter((t) => t.locale === locale);
  if (related.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {headings[locale]}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((topic) => (
            <a
              key={topic.slug}
              href={`/${locale}/${topic.slug}`}
              className="group rounded-2xl p-6 transition-shadow hover:shadow-md flex flex-col"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                className="font-display text-lg font-semibold mb-2 group-hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                {topic.navLabel}
              </div>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {topic.description}
              </p>
              <span
                className="mt-4 text-sm font-medium inline-flex items-center gap-1"
                style={{ color: 'var(--accent)' }}
              >
                {locale === 'pt'
                  ? 'Ler guia'
                  : locale === 'zh'
                    ? '阅读攻略'
                    : 'Read guide'}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
