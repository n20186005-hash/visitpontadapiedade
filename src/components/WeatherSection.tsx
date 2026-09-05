// WeatherSection — Server Component.
// Fetches real-time weather + multi-day forecast from the free Open-Meteo API
// (https://open-meteo.com, no API key required) and caches the result for 30 min (ISR).
import { getMessages } from 'next-intl/server';

type WeatherMessages = {
  weather: {
    title: string;
    subtitle: string;
    currentTitle: string;
    forecastTitle: string;
    feels: string;
    wind: string;
    humidity: string;
    precipitation: string;
    updated: string;
    today: string;
    unavailable: string;
    codes: Record<string, string>;
  };
};

type DailyRow = {
  date: string;
  code: number;
  tMax: number;
  tMin: number;
  precip: number | null;
};

type WeatherData = {
  current?: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    time: string;
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: (number | null)[];
  };
};

const LAT = 37.0799;
const LON = -8.6712;

const INTl_LOCALE: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en-US',
  pt: 'pt-PT',
  mwl: 'pt-PT',
};

function weatherCategory(code: number): string {
  if (code === 0) return 'clear';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 67) return 'rain';
  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86)
    return 'snow';
  if (code >= 80 && code <= 82) return 'showers';
  if (code >= 95) return 'thunder';
  return 'unknown';
}

async function fetchWeather(): Promise<WeatherData | null> {
  try {
    const url =
      'https://api.open-meteo.com/v1/forecast' +
      `?latitude=${LAT}&longitude=${LON}` +
      '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
      '&timezone=Europe%2FLisbon&forecast_days=7&wind_speed_unit=kmh';
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as WeatherData;
  } catch {
    return null;
  }
}

export default async function WeatherSection({ locale }: { locale: string }) {
  const messages = (await getMessages()) as unknown as WeatherMessages;
  const t = messages.weather;
  const data = await fetchWeather();

  const fmtIntl = new Intl.DateTimeFormat(INTl_LOCALE[locale] || 'pt-PT', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const fmtTime = new Intl.DateTimeFormat(INTl_LOCALE[locale] || 'pt-PT', {
    timeZone: 'Europe/Lisbon',
    hour: '2-digit',
    minute: '2-digit',
  });

  if (!data?.current || !data?.daily) {
    return (
      <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeader title={t.title} subtitle={t.subtitle} />
          <div
            className="rounded-xl p-6 text-center text-sm"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
          >
            {t.unavailable}
          </div>
        </div>
      </section>
    );
  }

  const cur = data.current;
  const daily: DailyRow[] = (data.daily?.time || []).map((date, i) => ({
    date,
    code: data.daily!.weather_code[i],
    tMax: data.daily!.temperature_2m_max[i],
    tMin: data.daily!.temperature_2m_min[i],
    precip: data.daily!.precipitation_probability_max[i] ?? null,
  }));

  const category = weatherCategory(cur.weather_code);
  const currentLabel = t.codes[category] || t.codes.unknown;

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t.title} subtitle={t.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current conditions */}
          <div
            className="lg:col-span-1 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <div>
              <p className="text-sm mb-3 font-medium" style={{ color: 'var(--text-muted)' }}>
                {t.currentTitle}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <WeatherGlyph category={category} size={56} />
                <div>
                  <span className="text-5xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                    {Math.round(cur.temperature_2m)}
                  </span>
                  <span className="text-2xl align-top" style={{ color: 'var(--text-muted)' }}>°C</span>
                </div>
              </div>
              <p className="text-lg font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                {currentLabel}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {t.feels} {Math.round(cur.apparent_temperature)}°C
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Metric label={t.wind} value={`${Math.round(cur.wind_speed_10m)} km/h`} />
              <Metric label={t.humidity} value={`${cur.relative_humidity_2m}%`} />
            </div>
            <p className="text-xs mt-6 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {t.updated} {fmtTime.format(new Date(cur.time))}
            </p>
          </div>

          {/* Forecast */}
          <div className="lg:col-span-2">
            <p className="text-sm mb-3 font-medium" style={{ color: 'var(--text-muted)' }}>
              {t.forecastTitle}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
              {daily.map((d, i) => {
                const cat = weatherCategory(d.code);
                const isToday = i === 0;
                const label = isToday ? t.today : fmtIntl.format(new Date(`${d.date}T12:00:00`));
                return (
                  <div
                    key={d.date}
                    className="rounded-xl p-4 text-center"
                    style={{
                      background: isToday ? 'var(--card-bg)' : 'var(--bg-tertiary)',
                      border: isToday ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                    }}
                  >
                    <p className="text-xs font-medium mb-2" style={{ color: isToday ? 'var(--accent)' : 'var(--text-secondary)' }}>
                      {label}
                    </p>
                    <div className="flex justify-center mb-2">
                      <WeatherGlyph category={cat} size={34} />
                    </div>
                    <p className="text-xs leading-tight mb-2 min-h-[1.5rem]" style={{ color: 'var(--text-secondary)' }}>
                      {t.codes[cat] || t.codes.unknown}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {Math.round(d.tMax)}° / {Math.round(d.tMin)}°
                    </p>
                    {d.precip != null && (
                      <p className="text-xs mt-1 flex items-center justify-center gap-1" style={{ color: 'var(--text-muted)' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2v20M2 12h20" />
                        </svg>
                        {d.precip}%
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h2>
      {subtitle ? (
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          {subtitle}
        </p>
      ) : (
        <div className="mb-8" />
      )}
      <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg p-3" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
      <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>
    </div>
  );
}

function WeatherGlyph({ category, size }: { category: string; size: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'var(--accent)',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (category) {
    case 'clear':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case 'partly':
      return (
        <svg {...common}>
          <path d="M12 3a6 6 0 0 0-5.7 8.3A4.5 4.5 0 0 0 7 20h9a5 5 0 0 0 1.7-9.7A6 6 0 0 0 12 3z" />
        </svg>
      );
    case 'cloudy':
      return (
        <svg {...common}>
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case 'fog':
      return (
        <svg {...common}>
          <path d="M8 6h8M8 10h10M8 14h10M8 18h8" />
        </svg>
      );
    case 'drizzle':
      return (
        <svg {...common}>
          <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
          <path d="M12 13v3M8 15v2M16 15v2" />
        </svg>
      );
    case 'rain':
      return (
        <svg {...common}>
          <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
          <path d="M12 13v6M8 15v5M16 15v5" />
        </svg>
      );
    case 'showers':
      return (
        <svg {...common}>
          <path d="M12 2v3M4.9 4.9l2.1 2.1M2 12h3" />
          <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
          <path d="M12 14v5M8 16v4M16 16v4" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...common}>
          <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
          <path d="M12 13v5M9 16l3 3 3-3M9 19l3-3 3 3" />
        </svg>
      );
    case 'thunder':
      return (
        <svg {...common}>
          <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
          <path d="M13 12l-3 4h4l-3 4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
