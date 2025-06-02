'use client';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Navbar from '@/components/ui/Navbar/Navbar';
import Footer from '@/components/ui/Footer/Footer';

interface ConditionalLayoutProps {
  children: ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Check if current route is a CMS route
  const isCMSRoute = pathname.includes('/cms');

  if (isCMSRoute) {
    // CMS routes: No navbar or footer, just the children
    return <>{children}</>;
  }

  // Regular routes: Include navbar and footer
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
} 