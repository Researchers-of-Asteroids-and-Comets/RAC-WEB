import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/utils";
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
    <div className="flex flex-wrap gap-4">
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
                
                {/* Role in Organization */}
                {author.roles?.length ? (
                  <div className="w-full">
                    <p className="text-sm text-muted-foreground font-light">
                      {author.roles.slice(0, 2).map(role => role.title).join(" • ")}
                    </p>
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