import React, { useState } from 'react';
import { ImageOff, Cpu } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ProductImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: 'square' | 'video' | 'portrait';
  fallbackText?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className,
  aspectRatio = 'square',
  fallbackText = 'Product image unavailable',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-[16/9]',
    portrait: 'aspect-[3/4]',
  };

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackText}
        className={cn(
          'w-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 rounded-lg border border-slate-200/80',
          aspectClasses[aspectRatio],
          className,
        )}
      >
        <ImageOff className="h-8 w-8 mb-2 opacity-50" aria-hidden="true" />
        <span className="text-xs font-medium text-slate-500 text-center line-clamp-1">
          {alt || fallbackText}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden bg-slate-100 rounded-lg',
        aspectClasses[aspectRatio],
        className,
      )}
    >
      {isLoading && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400 animate-pulse"
        >
          <Cpu className="h-6 w-6 opacity-30" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={cn(
          'h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
        {...props}
      />
    </div>
  );
};
