'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimal settings for your coffee website
    const lenis = new Lenis({
      // Smooth scrolling intensity (0-1, lower = smoother)
      lerp: 0.05,
      // Scroll speed multiplier for mouse wheel
      wheelMultiplier: 1,
      // Scroll speed multiplier for touch devices
      touchMultiplier: 1,
      // Enable smooth scrolling for wheel events
      smoothWheel: true,
      // Sync touch scrolling (better for mobile)
      syncTouch: true,
      // Touch inertia settings for mobile
      syncTouchLerp: 0.075,
      touchInertiaMultiplier: 35,
      // Auto-resize when window changes
      autoResize: true,
      // Enable anchor link scrolling
      anchors: true,
      // Prevent scroll on certain elements (modals, etc.)
      prevent: (node) => {
        // Prevent smooth scroll on elements with data-lenis-prevent
        return node.hasAttribute('data-lenis-prevent') ||
               node.closest('[data-lenis-prevent]') !== null;
      },
    });

    lenisRef.current = lenis;

    // Animation frame loop for smooth scrolling
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Optional: Log scroll events for debugging
    lenis.on('scroll', () => {
      // Uncomment for debugging
      // console.log('Scroll:', e);
    });

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Expose lenis instance for external use (GSAP ScrollTrigger, etc.)
  useEffect(() => {
    if (lenisRef.current && typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).lenis = lenisRef.current;
    }
  }, []);

  return <>{children}</>;
} 