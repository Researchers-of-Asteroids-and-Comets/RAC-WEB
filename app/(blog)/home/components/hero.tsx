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
      <div className="grid grid-cols-1 gap-8">
        <div>
          <div className="relative group aspect-video overflow-hidden rounded-lg bg-neutral-900">
            {postImageUrl ? (
              <Image
                src={postImageUrl}
                alt={heroPost.title || "Hero Image"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 100vw"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-950">
                <RACIcon size={120} className="opacity-20 grayscale" />
              </div>
            )}
            <Link
              href={`/posts/${heroPost.slug}`}
              className="absolute inset-0 z-20"
            >
              <span className="sr-only">{heroPost.title ?? ""}</span>
            </Link>
            <div className="absolute bottom-4 left-4 text-white z-10">
              <p className="text-lg">
                {[heroPost.categories?.[0]?.name, formatDate(heroPost.date)]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            </div>
          </div>
        </div>

        <aside aria-labelledby="featured-press-releases">
          <h2
            id="featured-press-releases"
            className="text-2xl font-medium mb-4 hover:underline"
          >
            <Link href={`/posts/${heroPost.slug}`}>{heroPost.title ?? ""}</Link>
          </h2>
          <ul className="space-y-4">
            {heroPost.excerpt ? (
              <li>
                <Link href={`/posts/${heroPost.slug}`}>{heroPost.excerpt}</Link>
              </li>
            ) : null}
          </ul>
        </aside>
      </div>
    </main>
  );
}
