import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/utils";
import type { HeroQueryResult } from "@/sanity.types";
import { RACIcon } from "../../shared/ui/icons/rac-icon";

interface HeroProps {
  heroPost: HeroQueryResult | null;
}

export default function Hero({ heroPost }: HeroProps) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (!heroPost) {
    return null;
  }

  const postImageUrl =
    heroPost.coverImage &&
    urlForImage(heroPost.coverImage)?.width(2000).height(1000).url();

  return (
    <main role="main" className="px-5">
      <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* 
          Image container - Fixed dimensions for consistency
          Recommended cover image size: 600x400px (3:2 aspect ratio)
        */}
        <div className="relative group overflow-hidden rounded-lg bg-neutral-900 w-full h-[300px] md:h-[350px] lg:h-[400px]">
          {postImageUrl ? (
            <Image
              src={postImageUrl}
              alt={heroPost.title || "Hero Image"}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-950">
              <RACIcon size={80} className="opacity-20 grayscale" />
            </div>
          )}
          <Link
            href={`/posts/${heroPost.slug}`}
            className="absolute inset-0 z-20"
          >
            <span className="sr-only">{heroPost.title ?? ""}</span>
          </Link>
        </div>

        {/* Content - with limited height to match image */}
        <div className="flex flex-col justify-start py-2 lg:max-h-[400px] overflow-hidden">
          <p className="text-sm text-neutral-400 uppercase tracking-wider mb-3">
            {[heroPost.categories?.[0]?.name, formatDate(heroPost.date)]
              .filter(Boolean)
              .join(" • ")}
          </p>
          <h2 className="text-2xl md:text-3xl font-medium mb-4 leading-tight">
            <Link
              href={`/posts/${heroPost.slug}`}
              className="hover:underline"
            >
              {heroPost.title ?? ""}
            </Link>
          </h2>
          {heroPost.excerpt && (
            <p className="text-neutral-400 leading-relaxed line-clamp-8">
              <Link href={`/posts/${heroPost.slug}`}>
                {heroPost.excerpt}
              </Link>
            </p>
          )}
        </div>
      </article>
    </main>
  );
}
