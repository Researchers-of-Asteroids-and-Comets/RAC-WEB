import { Image } from "next-sanity/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { galleryImagesQuery } from "@/sanity/lib/queries";
import type { GalleryImagesQueryResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

export default async function ImagesPage() {
  const images = (await sanityFetch({ query: galleryImagesQuery })) as GalleryImagesQueryResult;

  return (
    <section className="min-h-[40vh] p-6">
      <div className="grid grid-cols-12 gap-y-4 gap-x-4 mb-8">
        <h1 className="col-span-12 md:col-span-8 text-start text-4xl md:text-5xl font-medium uppercase tracking-widest">Images</h1>
        <div className="col-span-12 md:col-span-6 md:col-start-7 text-start font-light">
          <p className="text-base text-white leading-relaxed">Our own galley</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
            <figure key={doc._id} className="group relative overflow-hidden rounded-lg bg-black/20">
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