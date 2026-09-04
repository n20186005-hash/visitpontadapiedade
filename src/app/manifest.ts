import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ponta da Piedade - Visitor Guide (Lagos, Algarve, Portugal)',
    short_name: 'Ponta da Piedade',
    description:
      'Complete visitor guide to Ponta da Piedade in Lagos, Algarve, Portugal: location map, sea cave boat tours, photos and travel tips.',
    id: '/',
    start_url: '/pt',
    scope: '/',
    lang: 'pt',
    dir: 'ltr',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#f6f9fa',
    theme_color: '#3a7a8d',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
