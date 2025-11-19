import { Image } from "next-sanity/image";

import { urlForImage } from "@/sanity/lib/utils";
import type {
  PostQueryResult,
  MoreStoriesQueryResult,
  SearchPostsQueryResult,
  PostsByCategoryQueryResult,
} from "@/sanity.types";

type CoverImageSource =
  | NonNullable<PostQueryResult>["coverImage"]
  | MoreStoriesQueryResult[number]["coverImage"]
  | SearchPostsQueryResult[number]["coverImage"]
  | PostsByCategoryQueryResult[number]["coverImage"];

interface CoverImageProps {
  image: CoverImageSource;
  priority?: boolean;
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority } = props;
  const image = source?.asset?._ref ? (
    <Image
      className="h-auto w-full"
      width={2000}
      height={1000}
      alt={source?.alt || ""}
      src={urlForImage(source)?.height(1000).width(2000).url() as string}
      sizes="(max-width: 768px) 100vw, 50vw"
      priority={priority}
    />
  ) : (
    <div className="bg-slate-50" style={{ paddingTop: "50%" }} />
  );

  return (
    <div className="shadow-md transition-shadow duration-200 group-hover:shadow-lg sm:mx-0">
      {image}
    </div>
  );
}
