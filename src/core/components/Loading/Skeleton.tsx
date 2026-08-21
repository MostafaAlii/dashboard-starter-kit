/*
 * ========================================
 * SKELETON COMPONENT
 * ========================================
 */

import { forwardRef } from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect' | 'card' | 'avatar';
  width?: string | number;
  height?: string | number;
  className?: string;
  animated?: boolean;
  count?: number;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      className = '',
      animated = true,
      count = 1,
      ...props
    },
    ref
  ) => {
    const getStyles = () => {
      const baseStyles = {
        background: 'var(--color-skeleton, #e2e8f0)',
        borderRadius: 'var(--radius-md, 8px)',
        ...(animated && {
          backgroundImage: `linear-gradient(
            90deg,
            var(--color-skeleton, #e2e8f0) 0%,
            var(--color-skeleton-shine, #f1f5f9) 30%,
            var(--color-skeleton, #e2e8f0) 60%
          )`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s ease-in-out infinite',
        }),
      };

      switch (variant) {
        case 'text':
          return {
            ...baseStyles,
            height: height || '1rem',
            width: width || '100%',
            borderRadius: 'var(--radius-sm, 4px)',
          };
        case 'circle':
          return {
            ...baseStyles,
            width: width || '40px',
            height: height || '40px',
            borderRadius: '50%',
          };
        case 'avatar':
          return {
            ...baseStyles,
            width: width || '40px',
            height: height || '40px',
            borderRadius: '50%',
            flexShrink: 0,
          };
        case 'card':
          return {
            ...baseStyles,
            width: width || '100%',
            height: height || '200px',
            borderRadius: 'var(--radius-lg, 12px)',
          };
        default:
          return {
            ...baseStyles,
            width: width || '100%',
            height: height || '4rem',
            borderRadius: 'var(--radius-md, 8px)',
          };
      }
    };

    const renderSkeleton = () => {
      const style = getStyles();

      return (
        <div
          ref={ref}
          style={{
            ...style,
            minHeight: '8px',
          }}
          className={className}
          {...props}
        />
      );
    };

    if (count > 1) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {Array.from({ length: count }).map((_, index) => (
            <div key={index}>{renderSkeleton()}</div>
          ))}
        </div>
      );
    }

    return renderSkeleton();
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;