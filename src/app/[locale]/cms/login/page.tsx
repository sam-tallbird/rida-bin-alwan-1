'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { isRtlLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { useAuthStore } from '@/lib/store/authStore';
import Image from 'next/image';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function CMSLoginPage() {
  const router = useRouter();
  const { locale } = useParams() as { locale: Locale };
  const isRtl = isRtlLocale(locale);
  const { login, isAuthenticated, initFromStorage } = useAuthStore();

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/${locale}/cms/dashboard`);
    }
  }, [isAuthenticated, locale, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(credentials.username, credentials.password);
      
      if (success) {
        router.push(`/${locale}/cms/dashboard`);
      } else {
        setError('Invalid username or password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  return (
    <div className={`min-h-screen bg-brand-white dark:bg-brand-black transition-colors duration-300 flex items-center justify-center px-12 py-20 ${
      isRtl ? '[direction:rtl]' : ''
    }`}>
      {/* Login form */}
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo/en-logo.svg"
            alt="Ridha Alwan Coffee"
            width={160}
            height={160}
            priority
            className="h-28 w-auto"
          />
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username field */}
          <div>
            <label 
              htmlFor="username"
              className={`block text-sm font-medium text-brand-black dark:text-brand-white mb-2 ${
                locale === 'ar' ? 'font-arabic text-right' : locale === 'ku' ? 'font-kurdish text-right' : 'font-sans text-left'
              }`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 bg-brand-white-surface dark:bg-brand-black-surface border border-gray-300 dark:border-gray-600 rounded-lg text-brand-black dark:text-brand-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-200 ${
                locale === 'ar' ? 'font-arabic text-right' : locale === 'ku' ? 'font-kurdish text-right' : 'font-sans text-left'
              }`}
              placeholder="Enter your username"
              disabled={isLoading}
            />
          </div>

          {/* Password field */}
          <div>
            <label 
              htmlFor="password"
              className={`block text-sm font-medium text-brand-black dark:text-brand-white mb-2 ${
                locale === 'ar' ? 'font-arabic text-right' : locale === 'ku' ? 'font-kurdish text-right' : 'font-sans text-left'
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 bg-brand-white-surface dark:bg-brand-black-surface border border-gray-300 dark:border-gray-600 rounded-lg text-brand-black dark:text-brand-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-200 ${
                  isRtl ? 'pr-12' : 'pr-12'
                } ${
                  locale === 'ar' ? 'font-arabic text-right' : locale === 'ku' ? 'font-kurdish text-right' : 'font-sans text-left'
                }`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${isRtl ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center text-gray-400 hover:text-brand-red transition-colors duration-200`}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className={`text-brand-red text-sm ${
              locale === 'ar' ? 'font-arabic text-right' : locale === 'ku' ? 'font-kurdish text-right' : 'font-sans text-left'
            }`}>
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading || !credentials.username || !credentials.password}
            className={`w-full bg-brand-red hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse ${
              locale === 'ar' ? 'font-arabic' : locale === 'ku' ? 'font-kurdish' : 'font-sans'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Demo credentials info */}
        <div className="mt-8 p-4 bg-brand-white-surface dark:bg-brand-black-surface rounded-lg">
          <p className={`text-sm text-brand-black dark:text-brand-white opacity-70 mb-2 ${
            locale === 'ar' ? 'font-arabic text-right' : locale === 'ku' ? 'font-kurdish text-right' : 'font-sans text-left'
          }`}>
            Demo Credentials:
          </p>
          <p className={`text-sm text-brand-black dark:text-brand-white ${
            locale === 'ar' ? 'font-arabic text-right' : locale === 'ku' ? 'font-kurdish text-right' : 'font-sans text-left'
          }`}>
            Username: <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">admin</span>
          </p>
          <p className={`text-sm text-brand-black dark:text-brand-white ${
            locale === 'ar' ? 'font-arabic text-right' : locale === 'ku' ? 'font-kurdish text-right' : 'font-sans text-left'
          }`}>
            Password: <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">ridha2025</span>
          </p>
        </div>
      </div>
    </div>
  );
} 