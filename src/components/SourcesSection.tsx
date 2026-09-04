import { useTranslations, useMessages } from 'next-intl';

export default function SourcesSection() {
  const t = useTranslations('sourcesSection');
  const messages = useMessages() as any;
  const resources: Array<{ name: string; url: string }> =
    messages?.footer?.resources || [];

  return (
    <section id="sources" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <ol className="space-y-3 mb-10">
          {resources.map((resource, i) => (
            <li key={i} className="text-sm flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <span className="font-medium shrink-0" style={{ color: 'var(--text-secondary)' }}>
                {String(i + 1).padStart(2, '0')}.
              </span>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                {resource.name}
              </a>
            </li>
          ))}
        </ol>

        <p
          className="text-xs max-w-3xl leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('note')}
        </p>
      </div>
    </section>
  );
}
