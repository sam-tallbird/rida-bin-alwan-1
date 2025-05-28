import {createNavigation} from 'next-intl/navigation';
// import {routing} from './routing'; // Old import, routing.ts deleted
import {locales, defaultLocale} from '../lib/i18n/config'; // Corrected import path

// Construct the routing configuration object expected by createNavigation
const routingConfig = {
  locales,
  defaultLocale,
  localePrefix: 'always' as const // Match the middleware setting, ensure type correctness
};

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routingConfig); 