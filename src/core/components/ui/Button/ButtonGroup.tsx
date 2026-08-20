/*
 * ========================================
 * BUTTON GROUP
 * ========================================
 */

import { forwardRef, Children, cloneElement, isValidElement } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { ButtonGroupProps } from './types';
import type { ButtonProps } from './types';

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      orientation = 'horizontal',
      className = '',
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const isHorizontal = orientation === 'horizontal';

    return (
      <div
        ref={ref}
        style={{
          display: 'inline-flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          gap: isHorizontal ? '0' : '0.25rem',
          borderRadius: 'var(--radius-md, 8px)',
          overflow: 'hidden',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        {...props}
      >
        {Children.map(children, (child, index) => {
          if (!isValidElement<ButtonProps>(child)) return child;

          const isFirst = index === 0;
          const isLast = index === Children.count(children) - 1;

          return cloneElement(child, {
            variant,
            size,
            style: {
              ...(isHorizontal && {
                borderRadius:
                  isRTL
                    ? isFirst
                      ? 'var(--radius-md, 8px) 0 0 var(--radius-md, 8px)'
                      : isLast
                      ? '0 var(--radius-md, 8px) var(--radius-md, 8px) 0'
                      : '0'
                    : isFirst
                    ? 'var(--radius-md, 8px) 0 0 var(--radius-md, 8px)'
                    : isLast
                    ? '0 var(--radius-md, 8px) var(--radius-md, 8px) 0'
                    : '0',
                borderLeft: isHorizontal && !isRTL && !isFirst ? 'none' : undefined,
                borderRight: isHorizontal && isRTL && !isFirst ? 'none' : undefined,
              }),
              ...(child.props.style || {}),
            },
          });
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;