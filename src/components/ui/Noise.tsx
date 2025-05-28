'use client';
import React, { useRef, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
  className?: string;
  excludeFromNavbar?: boolean;
  blendMode?: 'multiply' | 'overlay' | 'soft-light' | 'normal';
}

const Noise: React.FC<NoiseProps> = ({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 95,
  className = "",
  excludeFromNavbar = true,
  blendMode = 'soft-light',
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animationId: number;

    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext("2d");
    if (!patternCtx) return;

    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const patternPixelDataLength = patternSize * patternSize * 4;

    const resize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr * patternScaleX, dpr * patternScaleY);
    };

    const updatePattern = () => {
      // Adjust noise intensity based on theme
      const themeAlpha = theme === 'dark' ? patternAlpha * 0.7 : patternAlpha;
      
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255;
        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = themeAlpha;
      }
      patternCtx.putImageData(patternData, 0, 0);
    };

    const drawGrain = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pattern = ctx.createPattern(patternCanvas, "repeat");
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        updatePattern();
        drawGrain();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    const handleResize = () => {
      resize();
    };

    window.addEventListener("resize", handleResize);
    resize();
    loop();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) {
        window.cancelAnimationFrame(animationId);
      }
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha, theme]);

  const baseClasses = "pointer-events-none select-none";
  const positionClasses = excludeFromNavbar 
    ? "fixed inset-0 top-20" // Start below navbar (80px = 20 * 0.25rem)
    : "fixed inset-0";
  
  const blendModeClass = `mix-blend-${blendMode}`;
  const zIndexClass = excludeFromNavbar ? "z-10" : "z-0";

  return (
    <canvas 
      className={`${baseClasses} ${positionClasses} ${blendModeClass} ${zIndexClass} w-full h-full ${className}`}
      ref={grainRef}
      style={{
        mixBlendMode: blendMode,
      }}
    />
  );
};

export default Noise; 