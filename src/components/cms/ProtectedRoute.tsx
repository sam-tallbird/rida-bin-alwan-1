'use client';
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import type { Locale } from '@/lib/i18n/config';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { locale } = useParams() as { locale: Locale };
  const { isAuthenticated, initFromStorage } = useAuthStore();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/cms/login`);
    }
  }, [isAuthenticated, locale, router]);

  // Show loading state while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-white dark:bg-brand-black flex items-center justify-center">
        <div className="text-brand-black dark:text-brand-white">
          Checking authentication...
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 