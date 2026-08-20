/*
 * ========================================
 * AVATAR COMPONENT
 * ========================================
 */

import { useState, forwardRef } from 'react';
import { AvatarImage } from './AvatarImage';
import { AvatarFallback } from './AvatarFallback';
import type { AvatarProps } from './types';

const sizeMap = {
  xs: '24px',
  sm: '32px',
  md: '40px',
  lg: '48px',
  xl: '56px',
  '2xl': '72px',
};

const statusSizeMap = {
  xs: '6px',
  sm: '8px',
  md: '10px',
  lg: '12px',
  xl: '14px',
  '2xl': '16px',
};

const statusColorMap = {
  online: 'var(--color-success, #22c55e)',
  offline: 'var(--color-gray-400, #9ca3af)',
  away: 'var(--color-warning, #eab308)',
  busy: 'var(--color-error, #ef4444)',
  none: 'transparent',
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      fallback,
      size = 'md',
      shape = 'circle',
      status = 'none',
      className = '',
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const [hasError, setHasError] = useState(false);
    const sizeValue = sizeMap[size];
    const borderRadius =
      shape === 'circle'
        ? '50%'
        : shape === 'square'
        ? '0'
        : 'var(--radius-md, 8px)';

    const handleImageError = () => {
      setHasError(true);
    };

    const showFallback = !src || hasError;

    return (
      <div
        ref={ref}
        dir={document.documentElement.getAttribute('dir') || 'ltr'}
        style={{
          position: 'relative',
          display: 'inline-flex',
          flexShrink: 0,
          width: sizeValue,
          height: sizeValue,
          borderRadius,
          background: 'var(--color-background-secondary, #f1f5f9)',
          cursor: onClick ? 'pointer' : 'default',
          overflow: 'hidden',
          userSelect: 'none',
        }}
        className={className}
        onClick={onClick}
        {...props}
      >
        {/* Image */}
        {!showFallback && (
          <AvatarImage src={src} alt={alt} onError={handleImageError} />
        )}

        {/* Fallback */}
        {showFallback && fallback && (
          <AvatarFallback delayMs={0}>{fallback}</AvatarFallback>
        )}

        {/* Custom Children */}
        {children}

        {/* Status Indicator */}
        {status !== 'none' && (
          <span
            style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              display: 'block',
              width: statusSizeMap[size],
              height: statusSizeMap[size],
              borderRadius: '50%',
              background: statusColorMap[status],
              border: '2px solid var(--color-card, #ffffff)',
              boxShadow: '0 0 0 1px var(--color-background, #f8fafc)',
            }}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';