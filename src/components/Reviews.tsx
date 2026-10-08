import { useTranslations } from 'next-intl';

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i <= count ? '#f0b429' : 'var(--border-color)'}
          stroke="none"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const t = useTranslations('reviews');
  const tHero = useTranslations('hero');

  return (
    <section id="reviews" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div
          className="rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center gap-6"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
        >
          <div className="flex flex-col items-center sm:items-start gap-2 sm:w-48 shrink-0">
            <div className="flex items-baseline gap-2">
              <span
                className="font-display text-5xl font-bold"
                style={{ color: 'var(--accent)' }}
              >
                {tHero('rating')}
              </span>
              <span className="text-lg" style={{ color: 'var(--text-muted)' }}>
                / 5
              </span>
            </div>
            <Stars count={Math.round(Number(tHero('rating')) || 5)} />
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {tHero('reviewCount')} · Google
            </span>
          </div>
          <div className="flex-1">
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('declaration')}
            </p>
          </div>
        </div>

        {/* More reviews link — arrow only */}
        <div className="flex justify-center">
          <a
            href="https://maps.app.goo.gl/4bWc2hpYoZR4FZLS8"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{
              color: 'var(--accent)',
              border: '1px solid var(--accent)',
            }}
          >
            <span>{t('moreReviews')}</span>
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
          </a>
        </div>
      </div>
    </section>
  );
}
