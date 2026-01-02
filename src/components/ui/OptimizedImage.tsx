"use client";

import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes,
  objectFit = "cover",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-bg-retro border-2 border-border-retro ${className}`}
        style={{ width, height }}
      >
        <span className="material-symbols-outlined text-4xl text-text-muted">
          broken_image
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes || "100vw"}
          className={`transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          style={{ objectFit }}
          priority={priority}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          style={{ objectFit }}
          priority={priority}
          onLoad={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
      )}
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-bg-retro border-2 border-border-retro"
          style={{ width, height }}
        >
          <div className="h-8 w-8 animate-spin border-4 border-primary border-r-transparent" />
        </div>
      )}
    </div>
  );
}
