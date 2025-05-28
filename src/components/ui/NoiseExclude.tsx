import React, { ReactNode } from 'react';

interface NoiseExcludeProps {
  children: ReactNode;
  className?: string;
  /** Whether to use the theme background color. Default: true */
  useThemeBackground?: boolean;
  /** Custom background color if not using theme background */
  backgroundColor?: string;
}

/**
 * NoiseExclude component creates a noise-free zone by isolating the blend context
 * and applying a solid background. Use this to wrap content where you don't want
 * the noise effect to appear.
 */
const NoiseExclude: React.FC<NoiseExcludeProps> = ({
  children,
  className = "",
  useThemeBackground = true,
  backgroundColor,
}) => {
  const backgroundStyle = useThemeBackground 
    ? "bg-brand-white dark:bg-brand-black" 
    : "";

  const customStyle = backgroundColor 
    ? { backgroundColor } 
    : {};

  return (
    <div 
      className={`isolation-isolate ${backgroundStyle} ${className}`}
      style={customStyle}
    >
      {children}
    </div>
  );
};

export default NoiseExclude; 