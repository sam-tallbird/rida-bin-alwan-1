'use client';

import { forwardRef } from 'react';

interface AnimatedServiceCardProps {
  children: React.ReactNode;
  y: number;
  rotation: number;
  opacity: number;
  className?: string;
}

const AnimatedServiceCard = forwardRef<HTMLDivElement, AnimatedServiceCardProps>(
  ({ children, y, rotation, opacity, className = '' }, ref) => {
    const transformStyle = {
      transform: `translateY(${y}px) rotate(${rotation}deg)`,
      opacity,
      // Disable CSS transitions to prevent conflicts with scroll-based animation
      transition: 'none',
      // Ensure smooth rendering
      willChange: 'transform, opacity',
      // Use GPU acceleration for better performance
      backfaceVisibility: 'hidden' as const,
      perspective: 1000,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={transformStyle}
      >
        {children}
      </div>
    );
  }
);

AnimatedServiceCard.displayName = 'AnimatedServiceCard';

export default AnimatedServiceCard; 