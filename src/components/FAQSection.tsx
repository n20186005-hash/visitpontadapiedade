import { useTranslations, useMessages } from 'next-intl';

type FaqItem = { q: string; a: string };

export default function FAQSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items: FaqItem[] = messages?.faq?.items || [];

  return (
    <section id="faq" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        {t('subtitle') && (
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            {t('subtitle')}
          </p>
        )}
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl overflow-hidden"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <summary
                className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 font-medium text-base select-none"
                style={{ color: 'var(--text-primary)' }}
              >
                <span>{item.q}</span>
                <span
                  className="flex-none text-lg transition-transform duration-200 group-open:rotate-45"
                  style={{ color: 'var(--accent)' }}
                >
                  +
                </span>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
