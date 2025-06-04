'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTriggeredLottieProps {
  animationData: any;
  className?: string;
  sectionHeight?: string;
}

export default function ScrollTriggeredLottie({
  animationData,
  className = "",
  sectionHeight = "h-[400vh]" // Default to 4x viewport height for long scrolling
}: ScrollTriggeredLottieProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !lottieRef.current) return;

    const lottie = lottieRef.current;
    const section = sectionRef.current;

    // Get total frames of the animation
    const totalFrames = lottie.getDuration(true) || 0;

    // Only proceed if we have frames
    if (totalFrames === 0) return;

    // Create GSAP timeline
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const frame = Math.round(self.progress * totalFrames);
          lottie.goToAndStop(frame, true);
        },
        onEnter: () => {
          lottie.goToAndStop(0, true);
        },
        onLeave: () => {
          lottie.goToAndStop(totalFrames, true);
        },
        onEnterBack: () => {
          const progress = timelineRef.current?.scrollTrigger?.progress || 0;
          const frame = Math.round(progress * totalFrames);
          lottie.goToAndStop(frame, true);
        }
      }
    });

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [animationData]);

  return (
    <div 
      ref={sectionRef} 
      className={`w-full ${sectionHeight} ${className}`}
    >
      <div className="sticky top-0 w-full h-screen">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
} 