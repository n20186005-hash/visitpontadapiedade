import { useTranslations, useMessages } from 'next-intl';

type FacilityItem = { name: string; desc: string };

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items: FacilityItem[] = messages?.facilities?.items || [];

  return (
    <section id="facilities" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div
          className="rounded-xl p-4 mb-8 text-sm leading-relaxed"
          style={{ background: 'var(--card-bg)', borderLeft: '4px solid var(--accent)', color: 'var(--text-secondary)' }}
        >
          {t('note')}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5 flex gap-4"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="flex-none w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                style={{ background: 'var(--accent-soft, rgba(58,122,141,0.15))', color: 'var(--accent)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-base" style={{ color: 'var(--text-primary)' }}>
                  {item.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
