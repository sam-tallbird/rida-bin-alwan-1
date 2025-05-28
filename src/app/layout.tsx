import './globals.css';
import { ReactNode } from 'react';

// RootLayoutProps might not be strictly necessary if it only passes children
interface RootLayoutProps {
  children: ReactNode;
}

// This root layout now just passes children through, as <html> and <body>
// are handled by src/app/[locale]/layout.tsx for localized routes.
// The metadata export can remain here as a default or be removed if
// all metadata is handled within [locale] pages/layouts.
export const metadata = {
  title: 'Ridha Alwan Coffee',
  description: 'Ridha Alwan Coffee - Premium coffee experience',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
