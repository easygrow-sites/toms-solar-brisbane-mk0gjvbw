'use client';

import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  fallbackSeed: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function ImageWithFallback({
  src,
  fallbackSeed,
  alt,
  className = '',
  width = 800,
  height = 600,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const fallbackUrl = `https://picsum.photos/seed/${fallbackSeed.replace(/\s+/g, '-').toLowerCase()}/${width}/${height}`;

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackUrl);
        }
      }}
    />
  );
}
