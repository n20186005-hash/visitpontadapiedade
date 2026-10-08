import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const SITE_URL = 'https://www.visitpontadapiedade.com';

export const routing = defineRouting({
  locales: ['zh', 'en', 'pt'],
  defaultLocale: 'pt',
  localePrefix: {
    mode: 'always',
  },
  pathnames: {
    '/': '/',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
    '/passadicos-ponta-da-piedade': '/passadicos-ponta-da-piedade',
    '/como-chegar-ponta-da-piedade': '/como-chegar-ponta-da-piedade',
    '/ponta-da-piedade-boardwalk': '/ponta-da-piedade-boardwalk',
    '/ponta-da-piedade-parking': '/ponta-da-piedade-parking',
    '/ponta-da-piedade-boat-tours': '/ponta-da-piedade-boat-tours',
    '/ponta-da-piedade-caves': '/ponta-da-piedade-caves',
  },
});

export type Locale = (typeof routing.locales)[number];

export const TOPIC_PATHS: Record<string, string> = {
  'passadicos-ponta-da-piedade': 'pt',
  'como-chegar-ponta-da-piedade': 'pt',
  'ponta-da-piedade-boardwalk': 'en',
  'ponta-da-piedade-parking': 'en',
  'ponta-da-piedade-boat-tours': 'en',
  'ponta-da-piedade-caves': 'en',
};

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
