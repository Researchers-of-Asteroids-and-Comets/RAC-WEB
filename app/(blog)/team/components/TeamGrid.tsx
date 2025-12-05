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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-neutral-800 border border-neutral-800">
      {authors.map((author) => {
        if (!author.name || !author.slug) return null;

        return (
          <article
            key={author.slug}
            className="group flex flex-col bg-black hover:bg-neutral-900 transition-colors duration-200 p-4"
          >
            <Link href={`/authors/${author.slug}`} className="block h-full">
              <div className="flex flex-col h-full gap-4">
                {/* Square Author Photo */}
                <div className="aspect-square w-full overflow-hidden bg-neutral-100 transition-all duration-300">
                  {author.picture?.asset ? (
                    <Image
                      src={urlForImage(author.picture)?.width(400).height(400).fit('crop').url() || ''}
                      alt={author.picture?.alt || author.name}
                      width={400}
                      height={400}
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

                <div className="flex flex-col justify-between flex-grow gap-1">
                  {/* Author Name */}
                  <h3 className="text-sm font-medium text-white uppercase tracking-wider">
                    {author.name}
                  </h3>

                  {/* Role in Organization */}
                  {author.roles?.length ? (
                    <p className="text-xs text-neutral-500 font-mono uppercase">
                      {author.roles.slice(0, 2).map(role => role.title).join(" • ")}
                    </p>
                  ) : null}
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}