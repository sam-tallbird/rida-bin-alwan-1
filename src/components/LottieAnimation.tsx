'use client';

import { useMemo } from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  animationData: object; // Changed from 'any' to 'object' to fix TypeScript error
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieAnimation({ 
  animationData, 
  className = "", 
  loop = true, 
  autoplay = true
}: LottieAnimationProps) {
  const options = useMemo(() => ({
    animationData,
    loop,
    autoplay,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }), [animationData, loop, autoplay]);

  return (
    <div className={`w-full ${className}`}>
      <Lottie 
        animationData={options.animationData}
        loop={options.loop}
        autoplay={options.autoplay}
        style={{ width: '100%', height: '100%' }}
        rendererSettings={options.rendererSettings}
      />
    </div>
  );
} 