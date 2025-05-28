# Ridha Alwan Coffee Website

A modern, multilingual website for Ridha Alwan Coffee built with Next.js 15, featuring RTL/LTR support and a professional design.

## Features

- 🌐 **Internationalization (i18n)**: English and Arabic support with next-intl
- 🔄 **RTL/LTR Support**: Automatic layout direction based on language
- 📱 **Responsive Design**: Mobile-first approach with advanced navbar
- 🎨 **Modern UI**: Tailwind CSS with custom design system
- ⚡ **Performance**: Next.js 15 with Turbopack for fast development
- 🔤 **Typography**: Custom fonts (Aeonik Pro + Noto Naskh Arabic)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The website supports both English and Arabic:
- English: [http://localhost:3000/en](http://localhost:3000/en)
- Arabic: [http://localhost:3000/ar](http://localhost:3000/ar)

## Project Structure

- **`/src/app/[locale]/`** - Internationalized pages
- **`/src/components/`** - Reusable UI components
- **`/src/lib/i18n/`** - Translation configuration and locale files
- **`/public/logo/`** - Locale-specific logos

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **next-intl** - Internationalization
- **Zustand** - State management (if needed)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [next-intl Documentation](https://next-intl-docs.vercel.app/) - learn about internationalization.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
