# Noise Effect Implementation

## Overview

The noise effect adds a subtle film grain texture across the website to enhance the visual aesthetic. This implementation is optimized for performance and integrates seamlessly with the theme system.

## Components

### 1. `Noise` Component (`src/components/ui/Noise.tsx`)

The main noise component that renders an animated canvas overlay.

**Features:**
- **Performance optimized**: Uses HTML5 Canvas with proper device pixel ratio handling
- **Theme aware**: Automatically adjusts opacity based on light/dark theme
- **Responsive**: Scales properly on all screen sizes
- **Customizable**: Multiple blend modes and parameters
- **Navbar exclusion**: Automatically excludes navbar area by default

**Props:**
```typescript
interface NoiseProps {
  patternSize?: number;           // Size of noise pattern (default: 250)
  patternScaleX?: number;         // Horizontal scale (default: 1)
  patternScaleY?: number;         // Vertical scale (default: 1)
  patternRefreshInterval?: number; // Animation speed (default: 2)
  patternAlpha?: number;          // Opacity (default: 15)
  className?: string;             // Additional CSS classes
  excludeFromNavbar?: boolean;    // Exclude navbar area (default: true)
  blendMode?: string;             // CSS blend mode (default: 'multiply')
}
```

### 2. `NoiseExclude` Component (`src/components/ui/NoiseExclude.tsx`)

Utility component to create noise-free zones.

**Usage:**
```tsx
import NoiseExclude from '@/components/ui/NoiseExclude';

<NoiseExclude>
  <div>This content will not have noise overlay</div>
</NoiseExclude>
```

## Implementation Details

### How It Works

1. **Canvas Rendering**: Uses HTML5 Canvas to generate and animate random grain patterns
2. **CSS Blend Modes**: Uses `mix-blend-mode` to overlay the noise on background content
3. **Theme Integration**: Adjusts opacity automatically for light/dark themes
4. **Performance**: Optimized with proper frame rate control and efficient pattern generation

### Theme Compatibility

The noise works on both light and dark backgrounds:

- **Light Theme**: Full opacity noise with multiply blend mode
- **Dark Theme**: Reduced opacity (70%) to maintain readability
- **Blend Modes**: 
  - `multiply`: Best for most cases, darkens the background
  - `overlay`: More dramatic effect
  - `soft-light`: Subtle enhancement
  - `normal`: Direct overlay without blending

### Excluding Specific Areas

#### Method 1: Using `NoiseExclude` Component
```tsx
<NoiseExclude>
  <YourComponent />
</NoiseExclude>
```

#### Method 2: Using CSS Classes
```tsx
<div className="noise-exclude">
  Content without noise
</div>
```

#### Method 3: Custom CSS
```css
.my-noise-free-area {
  isolation: isolate;
  background: var(--background);
}
```

## Best Practices

### 1. Performance Considerations
- The noise component is lightweight but runs continuously
- Use `patternRefreshInterval` to control animation frequency
- Consider reducing `patternSize` on lower-end devices

### 2. Visual Design
- **Subtle is better**: Keep `patternAlpha` low (10-20)
- **Match your aesthetic**: Experiment with different blend modes
- **Test thoroughly**: Check readability on all content types

### 3. Accessibility
- Ensure text remains readable with noise overlay
- Consider adding a "reduce motion" preference check
- Test with screen readers

### 4. Mobile Optimization
- The component automatically handles device pixel ratio
- Consider reducing intensity on mobile devices
- Test battery impact on extended usage

## Configuration Examples

### Subtle Background Texture
```tsx
<Noise
  patternSize={200}
  patternRefreshInterval={4}
  patternAlpha={8}
  blendMode="multiply"
/>
```

### Dramatic Film Grain
```tsx
<Noise
  patternSize={150}
  patternRefreshInterval={2}
  patternAlpha={25}
  blendMode="overlay"
/>
```

### Minimalist Static Noise
```tsx
<Noise
  patternSize={300}
  patternRefreshInterval={10}
  patternAlpha={5}
  blendMode="soft-light"
/>
```

## Troubleshooting

### Common Issues

1. **Noise appears on navbar**
   - Solution: Ensure `excludeFromNavbar={true}` (default)
   - Alternative: Wrap navbar in `NoiseExclude`

2. **Poor performance on mobile**
   - Reduce `patternSize` to 150-200
   - Increase `patternRefreshInterval` to 4-6

3. **Text readability issues**
   - Lower `patternAlpha` to 8-12
   - Try `soft-light` blend mode
   - Use `NoiseExclude` for text-heavy areas

4. **Inconsistent appearance across themes**
   - The component automatically adjusts for themes
   - Check that your theme provider is working correctly

## Integration Notes

- The noise component is automatically included in the layout
- It integrates with the existing theme system
- Z-index is managed to stay below navigation but above content
- No additional dependencies required

## Future Enhancements

Potential improvements for future versions:
- Motion preference detection
- Performance monitoring
- Advanced pattern algorithms
- Dynamic intensity based on content type 