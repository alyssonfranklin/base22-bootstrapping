import React, { useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fallback?: React.ReactNode;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
  useDefaultFallback?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  quality = 75,
  objectFit = 'cover',
  objectPosition = 'center',
  placeholder = 'empty',
  blurDataURL,
  fallback,
  sizes = '100vw',
  loading,
  style,
  useDefaultFallback = true,
  ...props
}: OptimizedImageProps) {
  const [error, setError] = useState(false);

  // Handle fallback content
  if (error) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (useDefaultFallback) {
      return (
        <div 
          className={clsx(
            'default-image-fallback',
            className
          )} 
          style={{
            width: width || '100%',
            height: height || '100%',
            position: fill ? 'relative' : 'static',
            ...style
          }}
          aria-label={alt}
          role="img"
        >
          <div className="fallback-icon">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <span className="sr-only">{alt}</span>
        </div>
      );
    }
  }

  // Default sizes responsive settings if not provided
  const responsiveSizes = sizes || `
    (max-width: 576px) 100vw,
    (max-width: 768px) 50vw,
    (max-width: 992px) 33vw,
    25vw
  `;

  // Determine if placeholder should be provided
  const placeholderProp = placeholder === 'blur' ? { 
    placeholder,
    blurDataURL: blurDataURL || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
  } : { placeholder: 'empty' };

  return (
    <div
      className={clsx(
        'optimized-image-wrapper',
        className
      )}
      style={{
        position: fill ? 'relative' : 'static',
        height: fill ? '100%' : 'auto',
        width: fill ? '100%' : 'auto',
        ...style
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        quality={quality}
        priority={priority}
        sizes={responsiveSizes}
        onError={() => setError(true)}
        loading={loading || (priority ? 'eager' : 'lazy')}
        style={{
          objectFit,
          objectPosition,
        }}
        {...placeholderProp}
        {...props}
      />
    </div>
  );
}