import { Image } from "next-sanity/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { galleryImagesQuery } from "@/sanity/lib/queries";
import type { GalleryImagesQueryResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

export default async function ImagesPage() {
  const images = (await sanityFetch({ query: galleryImagesQuery })) as GalleryImagesQueryResult;

  return (
    <section className="container mx-auto p-5">
      <div className="mb-12 border-b border-neutral-800 pb-8">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight mb-4 uppercase">
          IMAGES
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl">
          OUR OWN GALLEY
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800">
        {(images || []).map((doc) => {
          const ar = doc.dimensions?.aspectRatio || 1;
          const originalWidth = doc.dimensions?.width || 800;
          const maxWidth = 1600;
          const targetWidth = Math.min(originalWidth, maxWidth);
          const targetHeight = Math.round(targetWidth / ar);
          const src = urlForImage(doc.image)?.width(targetWidth).height(targetHeight).url();
          const content = src ? (
            <Image
              src={src}
              alt={doc.alt || ""}
              width={targetWidth}
              height={targetHeight}
              className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="bg-slate-50" style={{ paddingTop: "56.25%" }} />
          );

          return (
            <figure key={doc._id} className="group relative overflow-hidden bg-black transition-colors duration-200">
              {doc.href ? (
                <a href={doc.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                content
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
}