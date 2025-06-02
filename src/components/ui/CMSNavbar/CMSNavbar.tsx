'use client';
import { FC, useState } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { isRtlLocale } from '@/lib/i18n/config';
import { useAuthStore } from '@/lib/store/authStore';
import Container from '@/components/layout/Container';
import { LogOut } from 'lucide-react';
import ConfirmDialog from '@/components/ui/Dialog/ConfirmDialog';

const CMSNavbar: FC = () => {
  const { locale } = useParams() as { locale: string };
  const isRtl = isRtlLocale(locale as 'en' | 'ar' | 'ku');
  const { user, logout } = useAuthStore();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Get the appropriate logo based on locale
  const logoPath = (locale === 'ar' || locale === 'ku') ? '/logo/ar-logo.svg' : '/logo/en-logo.svg';

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutDialog(false);
    window.location.href = `/${locale}/cms/login`;
  };

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-brand-white dark:bg-brand-black transition-colors duration-300 border-b border-gray-200 dark:border-gray-800">
        <nav>
          <Container className="h-20">
            <div className={`flex h-full items-center justify-between ${
              isRtl ? '[direction:rtl]' : ''
            }`}>
              
              {/* Logo (Left side) - Links to main website homepage */}
              <div className="flex justify-start">
                <Link href="/" aria-label="Home" className="block">
                  <Image
                    src={logoPath}
                    alt="Ridha Alwan Coffee"
                    width={80}
                    height={80}
                    priority
                    className="h-16 w-auto"
                  />
                </Link>
              </div>

              {/* Right side - Logout button only (only if authenticated) */}
              {user && (
                <div className="flex items-center">
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-brand-black dark:text-brand-white hover:text-brand-red transition-colors duration-200"
                    aria-label="Logout"
                  >
                    <LogOut size={18} />
                    <span className={`${
                      locale === 'ar' ? 'font-arabic' : locale === 'ku' ? 'font-kurdish' : 'font-sans'
                    }`}>
                      Logout
                    </span>
                  </button>
                </div>
              )}
            </div>
          </Container>
        </nav>
      </header>

      {/* Custom Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        confirmVariant="danger"
      />
    </>
  );
};

export default CMSNavbar; 