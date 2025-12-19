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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800">
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
                                className="h-auto w-full object-contain"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
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
