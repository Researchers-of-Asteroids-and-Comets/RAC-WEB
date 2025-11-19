"use client";

import type { ImageLoaderProps } from "next/image";

/**
 * Custom image loader for Next.js Image component to leverage Sanity's CDN
 * for server-side image optimization, resizing, and format conversion.
 *
 * This loader ensures that we request the exact size needed from Sanity,
 * reducing bandwidth usage and improving LCP.
 */
export default function sanityLoader({ src, width, quality }: ImageLoaderProps) {
  // Skip optimization for local images or non-Sanity external images
  if (!src.includes("cdn.sanity.io")) {
    return src;
  }

  try {
    const url = new URL(src);

    // Set the width parameter to resize the image on the server side
    url.searchParams.set("w", width.toString());

    // Set quality if provided (Next.js defaults to 75)
    if (quality) {
      url.searchParams.set("q", quality.toString());
    }

    // Enable automatic format selection (WebP/AVIF) based on the 'Accept' header
    url.searchParams.set("auto", "format");

    // 'fit=max' resizes the image to fit within the specified dimensions
    // without upscaling if the original is smaller
    if (!url.searchParams.has("fit")) {
       url.searchParams.set("fit", "max");
    }

    return url.href;
  } catch (error) {
    // Fail gracefully if URL parsing fails
    if (process.env.NODE_ENV === "development") {
      console.error("Sanity Image Loader Error:", error);
    }
    return src;
  }
}
