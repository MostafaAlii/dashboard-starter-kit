/*
 * ========================================
 * AVATAR GROUP
 * ========================================
 */

import { forwardRef } from 'react';
import { Avatar } from './Avatar';
import type { AvatarGroupProps } from './types';

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars, max = 5, size = 'md', shape = 'circle', className = '' }, ref) => {
    const displayAvatars = avatars.slice(0, max);
    const remaining = avatars.length - max;

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'flex-end',
          gap: '-4px',
        }}
        className={className}
      >
        {remaining > 0 && (
          <Avatar
            size={size}
            shape={shape}
            fallback={`+${remaining}`}
            style={{
              marginRight: '-4px',
              border: '2px solid var(--color-card, #ffffff)',
            }}
          />
        )}
        {displayAvatars.map((avatar, index) => (
          <Avatar
            key={index}
            {...avatar}
            size={size}
            shape={shape}
            style={{
              marginRight: '-4px',
              border: '2px solid var(--color-card, #ffffff)',
            }}
          />
        ))}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';