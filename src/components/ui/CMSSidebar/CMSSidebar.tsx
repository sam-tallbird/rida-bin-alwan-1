'use client';
import { FC } from 'react';
import { Link } from '@/i18n/navigation';
import { useParams, usePathname } from 'next/navigation';
import { isRtlLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { 
  LayoutDashboard, 
  Megaphone, 
  Store, 
  Percent, 
  Coffee, 
  Users, 
  MapPin, 
  Newspaper 
} from 'lucide-react';

interface SidebarItem {
  labelKey: string;
  path: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { labelKey: 'Dashboard', path: 'cms/dashboard', icon: <LayoutDashboard size={20} /> },
  { labelKey: 'Campaign', path: 'cms/campaign', icon: <Megaphone size={20} /> },
  { labelKey: 'Store', path: 'cms/store', icon: <Store size={20} /> },
  { labelKey: 'Offers', path: 'cms/offers', icon: <Percent size={20} /> },
  { labelKey: 'Culture', path: 'cms/culture', icon: <Coffee size={20} /> },
  { labelKey: 'Community', path: 'cms/community', icon: <Users size={20} /> },
  { labelKey: 'Branches', path: 'cms/branches', icon: <MapPin size={20} /> },
  { labelKey: 'News', path: 'cms/news', icon: <Newspaper size={20} /> },
];

const CMSSidebar: FC = () => {
  const { locale } = useParams() as { locale: Locale };
  const pathname = usePathname();
  const isRtl = isRtlLocale(locale);

  return (
    <aside className={`w-64 bg-brand-white dark:bg-brand-black border-r border-gray-200 dark:border-gray-800 transition-colors duration-300 ${
      isRtl ? 'border-l border-r-0' : ''
    }`}>
      <div className="h-full flex flex-col">
        {/* Sidebar content */}
        <div className="flex-1 py-6">
          <nav className="px-4 space-y-2">
            {sidebarItems.map(({ labelKey, path, icon }) => {
              const isActive = pathname.includes(path);
              
              return (
                <Link
                  key={labelKey}
                  href={`/${path}`}
                  className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-brand-red text-white' 
                      : 'text-brand-black dark:text-brand-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-brand-red'
                  } ${
                    locale === 'ar' ? 'font-arabic' : locale === 'ku' ? 'font-kurdish' : 'font-sans'
                  }`}
                >
                  <span className={`${isActive ? 'text-white' : 'text-current'}`}>
                    {icon}
                  </span>
                  <span className="font-medium">{labelKey}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default CMSSidebar; 