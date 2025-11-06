import Link from "next/link";
import * as demo from "@/sanity/lib/demo";
import PortableText from "../shared/ui/portable-text";
import { type PortableTextBlock } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";
import { aboutmeQuery } from "@/sanity/lib/queries";
import type { AboutmeQueryResult } from "@/sanity.types";

export default async function AboutUsPage() {
  const about = (await sanityFetch({ query: aboutmeQuery })) as AboutmeQueryResult;

  return (
    <div className="relative min-h-screen">
      <div className="relative container mx-auto px-5 z-10 flex flex-col min-h-screen text-dark">
        <h1 className="text-balance mb-12 text-6xl font-sans leading-tight tracking-tighter md:text-7xl md:leading-none lg:text-8xl">
          {about?.title || "About Us"}
        </h1>
        {about?.content?.length ? (
          <PortableText className="mx-auto max-w-2xl" value={about.content as PortableTextBlock[]} />
        ) : (
          <p className="text-neutral-600">Create the page in Studio and add content.</p>
        )}
      </div>
    </div>
  );
}