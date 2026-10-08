import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const rawHost = (request.headers.get('host') ?? request.nextUrl.host).split(':')[0];
  // Only normalise the canonical production domain; leave localhost / preview
  // hosts (e.g. *.workers.dev) untouched so local dev keeps working.
  const isCanonicalHost =
    rawHost === 'visitpontadapiedade.com' || rawHost === 'www.visitpontadapiedade.com';
  const isWww = rawHost.startsWith('www.');
  const proto = request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol;
  const needsWww = !isWww;
  const needsHttps = proto !== 'https';

  // Normalise the canonical host to https://www.<domain> (308 permanent).
  if (isCanonicalHost && (needsWww || needsHttps)) {
    const url = request.nextUrl.clone();
    url.host = isWww ? rawHost : `www.${rawHost}`;
    url.protocol = 'https';
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
