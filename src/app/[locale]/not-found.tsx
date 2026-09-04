'use client';

import { useEffect, useState } from 'react';

const COPY: Record<string, { title: string; text: string; back: string; home: string }> = {
  pt: {
    title: 'Página não encontrada',
    text: 'Não conseguimos encontrar a página que procura. O conteúdo pode ter sido movido.',
    back: 'Voltar à página inicial',
    home: '/pt',
  },
  en: {
    title: 'Page Not Found',
    text: 'We could not find the page you were looking for. The content may have moved.',
    back: 'Back to homepage',
    home: '/en',
  },
  zh: {
    title: '页面未找到（404）',
    text: '很抱歉，未能找到您要访问的页面，相关内容可能已被移动。',
    back: '返回首页',
    home: '/zh',
  },
  mwl: {
    title: 'Page Not Found',
    text: 'We could not find the page you were looking for. The content may have moved.',
    back: 'Back to homepage',
    home: '/en',
  },
};

export default function NotFound() {
  const [copy, setCopy] = useState(COPY.en);

  useEffect(() => {
    const segment = window.location.pathname.split('/')[1];
    if (segment && COPY[segment]) {
      setCopy(COPY[segment]);
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-xl">
        <p className="font-display text-6xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
          404
        </p>
        <h1
          className="font-display text-2xl sm:text-3xl font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {copy.title}
        </h1>
        <p className="mb-10 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {copy.text}
        </p>
        <a
          href={copy.home}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-white transition-colors"
          style={{ background: 'var(--accent)' }}
        >
          {copy.back}
        </a>
      </div>
    </main>
  );
}
