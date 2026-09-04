import { useTranslations, useMessages } from 'next-intl';

type HistoryItem = { era: string; title: string; text: string };

export default function HistorySection() {
  const t = useTranslations('history');
  const messages = useMessages() as any;
  const items: HistoryItem[] = messages?.history?.items || [];

  return (
    <section id="history" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        {t('intro') && (
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            {t('intro')}
          </p>
        )}
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="relative pl-8 sm:pl-10">
          <div
            className="absolute left-[9px] sm:left-[11px] top-1 bottom-1 w-px"
            style={{ background: 'var(--border-color)' }}
          />
          {items.map((item, i) => (
            <div key={i} className="relative pb-10 last:pb-0">
              <span
                className="absolute -left-8 sm:-left-10 top-1 w-[19px] h-[19px] sm:w-[23px] sm:h-[23px] rounded-full border-2 flex items-center justify-center"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--accent)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
              </span>
              <p
                className="text-xs font-semibold tracking-wide uppercase mb-1"
                style={{ color: 'var(--accent)' }}
              >
                {item.era}
              </p>
              <h3 className="font-display text-lg font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
