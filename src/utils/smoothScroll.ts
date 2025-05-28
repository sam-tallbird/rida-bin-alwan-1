// Utility functions for Lenis smooth scrolling

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lenis?: any;
  }
}

export interface ScrollToOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
  lock?: boolean;
  force?: boolean;
  onComplete?: () => void;
}

/**
 * Scroll to a specific element or position using Lenis
 */
export function scrollTo(
  target: string | number | HTMLElement,
  options: ScrollToOptions = {}
) {
  if (typeof window === 'undefined' || !window.lenis) {
    console.warn('Lenis is not available. Make sure SmoothScrollProvider is properly initialized.');
    return;
  }

  window.lenis.scrollTo(target, {
    offset: options.offset || 0,
    duration: options.duration || 1.2,
    easing: options.easing,
    immediate: options.immediate || false,
    lock: options.lock || false,
    force: options.force || false,
    onComplete: options.onComplete,
  });
}

/**
 * Scroll to the top of the page
 */
export function scrollToTop(options: ScrollToOptions = {}) {
  scrollTo(0, {
    duration: 1.5,
    ...options,
  });
}

/**
 * Scroll to the bottom of the page
 */
export function scrollToBottom(options: ScrollToOptions = {}) {
  scrollTo('bottom', {
    duration: 1.5,
    ...options,
  });
}

/**
 * Stop smooth scrolling
 */
export function stopScroll() {
  if (typeof window !== 'undefined' && window.lenis) {
    window.lenis.stop();
  }
}

/**
 * Resume smooth scrolling
 */
export function startScroll() {
  if (typeof window !== 'undefined' && window.lenis) {
    window.lenis.start();
  }
}

/**
 * Get current scroll position
 */
export function getScrollPosition(): number {
  if (typeof window !== 'undefined' && window.lenis) {
    return window.lenis.scroll;
  }
  return window.scrollY || 0;
}

/**
 * Get scroll progress (0 to 1)
 */
export function getScrollProgress(): number {
  if (typeof window !== 'undefined' && window.lenis) {
    return window.lenis.progress;
  }
  
  // Fallback calculation
  const scrollTop = window.scrollY || 0;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  return documentHeight > 0 ? scrollTop / documentHeight : 0;
}

/**
 * Check if currently scrolling
 */
export function isScrolling(): boolean {
  if (typeof window !== 'undefined' && window.lenis) {
    return window.lenis.isScrolling;
  }
  return false;
}

/**
 * Add scroll event listener
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function onScroll(callback: (data: any) => void) {
  if (typeof window !== 'undefined' && window.lenis) {
    window.lenis.on('scroll', callback);
    return () => window.lenis.off('scroll', callback);
  }
  
  // Fallback to native scroll
  const handleScroll = () => callback({ scroll: window.scrollY });
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
} 