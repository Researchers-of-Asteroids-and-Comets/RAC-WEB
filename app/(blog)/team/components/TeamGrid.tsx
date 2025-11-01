import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
import PortableText from "../../shared/ui/portable-text";
import type { AllAuthorsQueryResult } from "@/sanity.types";

interface TeamGridProps {
  authors: AllAuthorsQueryResult;
}

export default function TeamGrid({ authors }: TeamGridProps) {
  if (!authors?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-white text-lg">No team members available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {authors.map((author) => {
        if (!author.name || !author.slug) return null;
        
        return (
          <article 
            key={author.slug} 
            className="group transition-all duration-200 w-48"
          >
            <Link href={`/authors/${author.slug}`} className="block">
              <div className="flex flex-col gap-2">
                {/* Square Author Photo */}
                <div className="aspect-square w-full overflow-hidden bg-neutral-100">
                  {author.picture?.asset ? (
                      <Image
                        src={urlForImage(author.picture)?.width(192).height(192).fit('crop').url() || ''}
                        alt={author.picture?.alt || author.name}
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-200">
                      <span className="text-neutral-400 text-2xl font-light">
                        {author.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Author Name */}
                <h3 className="text-sm font-medium group-hover:underline transition-all">
                  {author.name}
                </h3>
                
                {/* Expertise Areas */}
                {author.expertise?.length ? (
                  <div className="w-full">
                    <div className="flex flex-wrap gap-1">
                      {author.expertise.slice(0, 2).map((area, index) => (
                        <span 
                          key={index}
                          className="text-xs px-1 py-0.5 bg-neutral-100 text-neutral-700 rounded-sm font-light uppercase tracking-wide"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                
                {/* Bio Preview */}
                {author.bio?.length ? (
                  <div className="w-full">
                    <div className="text-xs text-neutral-600 font-light line-clamp-2">
                      <PortableText 
                        className="prose-xs prose-neutral" 
                        value={author.bio as any} 
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}