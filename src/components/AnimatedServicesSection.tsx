'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import ServiceCard from '@/components/ServiceCard';
import AnimatedServiceCard from '@/components/AnimatedServiceCard';
import { useServiceCardsAnimation, type CardAnimationConfig } from '@/hooks/useServiceCardsAnimation';
import type { Locale } from '@/lib/i18n/config';

interface ServiceCardData {
  cardKey: string;
  imageSrc: string;
  rotation: number;
}

interface AnimatedServicesSectionProps {
  servicesCardsData: ServiceCardData[];
}

export default function AnimatedServicesSection({ servicesCardsData }: AnimatedServicesSectionProps) {
  const t = useTranslations('home');
  const locale = useLocale() as Locale;

  // Define systematic animation configurations for each card
  // Pattern: startY increases by +20, startRotation increases by +5, scrollOffset increases progressively
  const cardAnimationConfigs: CardAnimationConfig[] = useMemo(() => [
    // Row 1 - Cards 1-4
    { startY: 400, endY: 0, startRotation: 15, endRotation: 0, scrollOffset: 0.0 },   // Card 1
    { startY: 420, endY: 0, startRotation: 20, endRotation: 0, scrollOffset: 0.1 },   // Card 2
    { startY: 440, endY: 0, startRotation: 25, endRotation: 0, scrollOffset: 0.15 },  // Card 3
    { startY: 460, endY: 0, startRotation: 30, endRotation: 0, scrollOffset: 0.2 },   // Card 4
    
    // Row 2 - Cards 5-8 (continuing the same pattern)
    { startY: 480, endY: 0, startRotation: 35, endRotation: 0, scrollOffset: 0.2 },  // Card 5
    { startY: 500, endY: 0, startRotation: 40, endRotation: 0, scrollOffset: 0.1 },   // Card 6
    { startY: 520, endY: 0, startRotation: 45, endRotation: 0, scrollOffset: 0.15 },  // Card 7
    { startY: 540, endY: 0, startRotation: 50, endRotation: 0, scrollOffset: 0.2 },   // Card 8
  ], []);

  // Initialize the animation system
  const { sectionRef, cardStates, getCardRef } = useServiceCardsAnimation({
    cardConfigs: cardAnimationConfigs,
    sensitivity: 0.9, // High sensitivity for responsive scroll
    // Using default easeOutCubic for smooth deceleration
  });

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-brand-white dark:bg-brand-black"
    >
      <div className="container mx-auto px-12 max-w-full">
        <div className="max-w-8xl">
          {/* Section Label */}
          <div className="flex flex-col items-start mb-4">
            {/* Coffee Stain Icon - Smaller */}
            <div className="mb-6">
              <Image
                src="/red-dot.svg"
                alt="Coffee Stain Icon"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            </div>
            
            {/* Services Label - Bigger */}
            <h2 className={`text-2xl font-medium text-brand-black dark:text-brand-white ${
              locale === 'en' ? 'font-sans' : locale === 'ku' ? 'font-arabic' : 'font-arabic'
            }`}>
              {t('services.label')}
            </h2>
          </div>

          {/* Headline */}
          <div className="max-w-7xl mb-16">
            <h3 className={`text-4xl leading-tight text-brand-black dark:text-brand-white ${
              locale === 'en' ? 'font-sans text-left' : 'font-arabic text-right'
            }`}>
              {t('services.headline')}
            </h3>
          </div>

          {/* Animated Services Cards Grid - 4 columns x 2 rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {servicesCardsData.map((card, index) => {
              const cardState = cardStates[index] || { y: 0, rotation: 0, opacity: 1 };
              
              return (
                <AnimatedServiceCard
                  key={card.cardKey}
                  ref={getCardRef(index)}
                  y={cardState.y}
                  rotation={cardState.rotation}
                  opacity={cardState.opacity}
                >
                  <ServiceCard
                    cardNumber={`[${String(index + 1).padStart(2, '0')}]`}
                    cardKey={card.cardKey}
                    imageSrc={card.imageSrc}
                    index={index}
                    rotation={0} // Remove static rotation since we're handling it with animation
                  />
                </AnimatedServiceCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 