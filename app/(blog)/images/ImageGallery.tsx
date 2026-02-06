"use client";

import { Image } from "next-sanity/image";
import { useState } from "react";

interface ImageData {
    _id: string;
    image: any;
    alt: string | null;
    dimensions: {
        aspectRatio?: number;
        width?: number;
        height?: number;
    } | null;
    src: string;
}

interface ImageGalleryProps {
    images: ImageData[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-px bg-neutral-800 border border-neutral-800">
                {images.length > 0 ? (
                    images.map((img) => (
                        <figure
                            key={img._id}
                            className="group relative overflow-hidden bg-black transition-colors duration-200 cursor-pointer"
                            onClick={() => setSelectedImage(img)}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt || ""}
                                width={img.dimensions?.width || 800}
                                height={Math.round((img.dimensions?.width || 800) / (img.dimensions?.aspectRatio || 1))}
                                className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <svg
                                    className="w-12 h-12 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                    />
                                </svg>
                            </div>
                        </figure>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-neutral-500 font-mono bg-black">
                        <p>No images found</p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-4xl font-light hover:text-neutral-400 transition-colors"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close"
                    >
                        ×
                    </button>
                    <Image
                        src={selectedImage.src}
                        alt={selectedImage.alt || ""}
                        width={selectedImage.dimensions?.width || 1600}
                        height={Math.round((selectedImage.dimensions?.width || 1600) / (selectedImage.dimensions?.aspectRatio || 1))}
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}
