"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "100vw",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Add a warning if alt text is missing or generic
  useEffect(() => {
    if (!alt || alt === "image" || alt === "picture") {
      console.warn(
        `Image with src "${src}" has missing or generic alt text. Please provide descriptive alt text for accessibility.`,
      )
    }
  }, [alt, src])

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {!isLoaded && <div className="absolute inset-0 bg-muted/20 animate-pulse rounded-md" style={{ width, height }} />}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        className={`${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500 rounded-md`}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        {...props}
      />
    </div>
  )
}
