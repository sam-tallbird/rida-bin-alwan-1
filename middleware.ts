import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/lib/i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // The default locale to be used when visiting a non-locale prefixed path
  defaultLocale,
  // Always prefix locale segments, even for default locale (/en)
  localePrefix: 'always'
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    // Match all paths that don't start with:
    // - api (API routes)
    // - _next (Next.js internals)
    // - _vercel (Vercel internals)
    // - _static (Vercel internals)
    // and don't end with common file extensions
    '/((?!api|_next|_vercel|_static|favicon.ico|.*\\..*).+)'
  ]
}; 