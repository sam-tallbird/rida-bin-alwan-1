import { useEffect, useState, useRef } from 'react';

// Extend Window interface to include lenis
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lenis?: any;
  }
}

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const [isInView, setIsInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  // easeInOutQuad easing function
  const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    const handleScroll = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on element position
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Start animation when element enters viewport
      const startPoint = windowHeight;
      // End animation when we've scrolled 10% into the section
      const endPoint = windowHeight - (elementHeight * 0.4);
      
      let progress = 0;
      
      if (elementTop <= startPoint && elementTop >= endPoint) {
        progress = (startPoint - elementTop) / (startPoint - endPoint);
        progress = Math.max(0, Math.min(1, progress));
      } else if (elementTop < endPoint) {
        progress = 1;
      }
      
      // Apply easing
      const easedProgress = easeInOutQuad(progress);
      setScrollProgress(easedProgress);
    };

    observer.observe(element);

    // Use Lenis scroll events if available, fallback to native scroll
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
      if (element) {
        element.setAttribute('data-cleanup', 'true');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (element as any)._scrollCleanup = removeScrollListener;
      }
    }, 100);
    
    // Initial check
    handleScroll();

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      
      // Call stored cleanup function
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cleanup = (element as any)?._scrollCleanup;
      if (cleanup) cleanup();
    };
  }, [options.threshold, options.rootMargin]);

  return {
    elementRef,
    isInView,
    scrollProgress,
  };
} 