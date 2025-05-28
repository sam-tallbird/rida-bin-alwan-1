import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useLocale } from 'next-intl';

// Lenis type is already declared globally, we'll use the existing one

export interface CardAnimationConfig {
  startY: number;           // Starting Y position offset (pixels)
  endY: number;             // Ending Y position (should be 0 for default state)
  startRotation: number;    // Starting rotation (degrees)
  endRotation: number;      // Ending rotation (should be 0 for default state)
  scrollOffset: number;     // Delay/offset for staggered effect (0-1)
}

interface UseServiceCardsAnimationOptions {
  cardConfigs: CardAnimationConfig[];
  sensitivity?: number;     // How sensitive the scroll trigger is (0-1)
  easing?: (t: number) => number;
}

export function useServiceCardsAnimation(options: UseServiceCardsAnimationOptions) {
  const locale = useLocale();
  const isRTL = locale === 'ar' || locale === 'ku';
  
  const [cardStates, setCardStates] = useState<Array<{
    y: number;
    rotation: number;
    opacity: number;
  }>>([]);
  
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRefs = useRef<(HTMLElement | null)[]>([]);

  // Easing function - easeOutCubic for smooth deceleration
  const easeOutCubic = useCallback((t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  }, []);

  const easing = useMemo(() => options.easing || easeOutCubic, [options.easing, easeOutCubic]);
  const sensitivity = useMemo(() => options.sensitivity || 0.8, [options.sensitivity]);
  const cardConfigs = useMemo(() => options.cardConfigs, [options.cardConfigs]);

  // Initialize card states
  useEffect(() => {
    const initialStates = cardConfigs.map((config) => ({
      y: config.startY,
      rotation: isRTL ? -config.startRotation : config.startRotation,
      opacity: 1, // Always 100% opacity as requested
    }));
    setCardStates(initialStates);
  }, [cardConfigs, isRTL]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !cardConfigs.length) return;

    const handleScroll = () => {
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate section visibility progress
      // Start animation when section enters viewport
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      
      // Define animation range - very sensitive to scroll within section
      const startPoint = windowHeight * 0.3; // Start when section is 90% into viewport
      const endPoint = windowHeight * 0.1;   // End when section is 10% from top
      
      let sectionProgress = 0;
      
      if (sectionTop <= startPoint && sectionBottom >= endPoint) {
        // Section is in the animation range
        const totalRange = startPoint - endPoint;
        const currentPosition = startPoint - sectionTop;
        sectionProgress = Math.max(0, Math.min(1, currentPosition / totalRange));
      } else if (sectionTop < endPoint) {
        // Section has passed the animation range
        sectionProgress = 1;
      }

      // Apply sensitivity multiplier to make scroll more responsive
      sectionProgress = Math.min(1, sectionProgress * (1 / sensitivity));

      // Update each card state with individual progress and stagger
      const newCardStates = cardConfigs.map((config) => {
        // Calculate individual card progress with stagger offset
        let cardProgress = sectionProgress - config.scrollOffset;
        cardProgress = Math.max(0, Math.min(1, cardProgress));
        
        // Apply easing
        const easedProgress = easing(cardProgress);
        
        // Calculate current values
        const currentY = config.startY + (config.endY - config.startY) * easedProgress;
        const baseRotation = config.startRotation + (config.endRotation - config.startRotation) * easedProgress;
        const currentRotation = isRTL ? -baseRotation : baseRotation;
        
        return {
          y: currentY,
          rotation: currentRotation,
          opacity: 1, // Always 100% opacity
        };
      });

      setCardStates(newCardStates);
    };

    // Setup scroll listener with Lenis integration
    const setupScrollListener = () => {
      if (typeof window !== 'undefined' && window.lenis) {
        // Use Lenis scroll events for better performance and synchronization
        window.lenis.on('scroll', handleScroll);
        return () => window.lenis?.off('scroll', handleScroll);
      } else {
        // Fallback to native scroll events
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
      }
    };

    // Setup scroll listener with a small delay to ensure Lenis is initialized
    const timeoutId = setTimeout(() => {
      const removeScrollListener = setupScrollListener();
      
      // Store cleanup function
      if (sectionRef.current) {
        (sectionRef.current as HTMLElement & { _scrollCleanup?: () => void })._scrollCleanup = removeScrollListener;
      }
    }, 100);
    
    // Initial check
    handleScroll();

    return () => {
      clearTimeout(timeoutId);
      
      // Call stored cleanup function
      const currentSection = sectionRef.current;
      const cleanup = (currentSection as HTMLElement & { _scrollCleanup?: () => void })?._scrollCleanup;
      if (cleanup) cleanup();
    };
  }, [cardConfigs, isRTL, sensitivity, easing]);

  // Helper function to get card ref setter
  const getCardRef = (index: number) => (el: HTMLElement | null) => {
    cardsRefs.current[index] = el;
  };

  return {
    sectionRef,
    cardStates,
    getCardRef,
    isRTL,
  };
} 