/*
 * ========================================
 * AVATAR IMAGE
 * ========================================
 */

import { useState, forwardRef, ImgHTMLAttributes } from 'react';

interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  onError?: () => void;
}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ src, alt = '', onError, ...props }, ref) => {
    const [error, setError] = useState(false);

    const handleError = () => {
      setError(true);
      onError?.();
    };

    if (error || !src) return null;

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = 'AvatarImage';