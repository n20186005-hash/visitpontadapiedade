import { useTranslations, useMessages } from 'next-intl';

type StoryItem = { kind: string; title: string; text: string };

const KIND_BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  legend: { bg: 'rgba(139,100,155,0.15)', color: '#8b649b' },
  history: { bg: 'rgba(58,122,141,0.15)', color: '#3a7a8d' },
  fact: { bg: 'rgba(43,138,62,0.15)', color: '#2b8a3e' },
  curiosity: { bg: 'rgba(200,150,40,0.15)', color: '#c89628' },
};

export default function StoriesSection() {
  const t = useTranslations('stories');
  const messages = useMessages() as any;
  const items: StoryItem[] = messages?.stories?.items || [];
  const kinds: Record<string, string> = messages?.stories?.kinds || {};

  return (
    <section id="stories" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        {t('intro') && (
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            {t('intro')}
          </p>
        )}
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-5">
          {items.map((story, i) => {
            const badge = KIND_BADGE_COLORS[story.kind] || KIND_BADGE_COLORS.fact;
            return (
              <article
                key={i}
                className="rounded-xl p-6 sm:p-7"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full"
                    style={{ background: badge.bg, color: badge.color }}
                  >
                    {kinds[story.kind] || story.kind}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {story.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {story.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
