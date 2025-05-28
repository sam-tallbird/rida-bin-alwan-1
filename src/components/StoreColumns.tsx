'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Locale } from '@/lib/i18n/config';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Product {
  id: number;
  name: {
    en: string;
    ar: string;
    ku: string;
  };
  price: {
    en: string;
    ar: string;
    ku: string;
  };
  image: string;
}

interface StoreColumnsProps {
  products: Product[];
  locale: Locale;
}

export default function StoreColumns({ products, locale }: StoreColumnsProps) {
  const columnsRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Distribute products into 3 columns (4 products each)
  const columns = [
    products.slice(0, 4),  // Column 1: products 0-3
    products.slice(4, 8),  // Column 2: products 4-7
    products.slice(8, 12)  // Column 3: products 8-11
  ];

  useEffect(() => {
    if (!columnsRef.current) return;

    const ctx = gsap.context(() => {
      // Columns parallax animation (each column moves at different speed)
      columnRefs.current.forEach((column, pos) => {
        if (column) {
          gsap.to(column, {
            ease: 'none',
            yPercent: -1 * pos * 10, // Each column moves at different speed
            scrollTrigger: {
              trigger: columnsRef.current,
              start: 'clamp(top bottom)',
              end: 'clamp(bottom top)',
              scrub: true
            }
          });
        }
      });

      // Individual image parallax within each item
      const items = columnsRef.current!.querySelectorAll('.column__item');
      items.forEach(item => {
        const image = item.querySelector('.column__item-img');
        if (image) {
          gsap.fromTo(image, {
            y: 30
          }, {
            ease: 'none',
            y: -30,
            scrollTrigger: {
              trigger: item,
              start: 'clamp(top bottom)',
              end: 'clamp(bottom top)',
              scrub: true
            }
          });
        }
      });
    }, columnsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={columnsRef}
      className="columns relative py-20 grid grid-cols-3 gap-4 w-full max-w-6xl mx-auto"
    >
      {columns.map((columnProducts, columnIndex) => (
        <div
          key={columnIndex}
          ref={el => { columnRefs.current[columnIndex] = el; }}
          className="column w-full relative grid gap-4"
          style={{ willChange: 'transform' }}
        >
          {columnProducts.map((product) => (
            <figure key={product.id} className="column__item relative z-10 m-0">
              <div className="column__item-imgwrap w-full aspect-[3/4] relative overflow-hidden rounded-xl">
                <div 
                  className="column__item-img absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${product.image})`,
                    backgroundPosition: '50% 20%',
                    backfaceVisibility: 'hidden',
                    transform: 'translate3d(0, 0, 0)' // Force hardware acceleration
                  }}
                />
              </div>
              
              {/* Product Info */}
              <div className="bg-white dark:bg-brand-black-surface rounded-b-xl p-3 text-center -mt-3 relative z-20">
                {/* Product Name */}
                <h4 className={`text-sm font-medium text-brand-black dark:text-brand-white mb-1 ${
                  locale === 'en' ? 'font-sans' : 'font-arabic'
                }`}>
                  {product.name[locale as keyof typeof product.name]}
                </h4>
                
                {/* Price */}
                <p className={`text-xs text-brand-black/70 dark:text-brand-white/70 ${
                  locale === 'en' ? 'font-sans' : 'font-arabic'
                }`}>
                  {product.price[locale as keyof typeof product.price]}
                </p>
              </div>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
} 