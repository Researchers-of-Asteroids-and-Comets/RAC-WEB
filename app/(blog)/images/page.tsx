import { sanityFetch } from "@/sanity/lib/fetch";
import { galleryImagesQuery } from "@/sanity/lib/queries";
import type { GalleryImagesQueryResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import ImageGallery from "./ImageGallery";

export default async function ImagesPage() {
  const images = (await sanityFetch({ query: galleryImagesQuery })) as GalleryImagesQueryResult;

  // Prepare images with resolved URLs for client component
  const preparedImages = (images || []).map((doc) => {
    const ar = doc.dimensions?.aspectRatio || 1;
    const originalWidth = doc.dimensions?.width || 800;
    const maxWidth = 1600;
    const targetWidth = Math.min(originalWidth, maxWidth);
    const targetHeight = Math.round(targetWidth / ar);
    const src = urlForImage(doc.image)?.width(targetWidth).height(targetHeight).url() || "";

    return {
      _id: doc._id,
      image: doc.image,
      alt: doc.alt,
      dimensions: doc.dimensions,
      src,
    };
  }).filter((img) => img.src);

  return (
    <section className="container mx-auto p-5">
      <div className="mb-12 border-b border-neutral-800 pb-8">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight mb-4 uppercase">
          IMAGES
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl">
          OUR OWN GALLERY
        </p>
      </div>

      <ImageGallery images={preparedImages} />
    </section>
  );
}