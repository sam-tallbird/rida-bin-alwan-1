import localFont from 'next/font/local'
import { Noto_Naskh_Arabic } from 'next/font/google'

export const aeonik = localFont({
  src: [
    {
      path: '../../public/fonts/AeonikPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AeonikPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AeonikPro-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AeonikPro-Black.woff2',
      weight: '900',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-aeonik'
})

export const notoNaskhArabic = Noto_Naskh_Arabic({
  weight: ['400', '500', '700'],
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-noto-naskh-arabic',
  fallback: ['Arial', 'sans-serif']
}) 