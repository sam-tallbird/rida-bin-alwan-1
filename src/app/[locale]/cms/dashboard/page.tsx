'use client';
import type { Locale } from '@/lib/i18n/config';
import { isRtlLocale } from '@/lib/i18n/config';
import { useParams } from 'next/navigation';
import ProtectedRoute from '@/components/cms/ProtectedRoute';
import CMSNavbar from '@/components/ui/CMSNavbar/CMSNavbar';
import CMSSidebar from '@/components/ui/CMSSidebar/CMSSidebar';

export default function CMSDashboardPage() {
  const { locale } = useParams() as { locale: Locale };
  const isRtl = isRtlLocale(locale);

  return (
    <ProtectedRoute>
      <div className={`min-h-screen bg-brand-white dark:bg-brand-black transition-colors duration-300 ${
        isRtl ? '[direction:rtl]' : ''
      }`}>
        {/* CMS Navbar */}
        <CMSNavbar />
        
        {/* Main layout with sidebar */}
        <div className="flex h-[calc(100vh-5rem)]">
          {/* Sidebar */}
          <CMSSidebar />
          
          {/* Main content area */}
          <main className="flex-1 overflow-auto bg-brand-white-surface dark:bg-brand-black-surface">
            {/* Empty content area - ready for CMS features */}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
} 