import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

import MoreStories from "./home/components/more-stories";
import Onboarding from "./home/components/onboarding";
import Hero from "./home/components/hero";
import PortableText from "./shared/ui/portable-text";
// Removed unused imports related to HeroPost

// import type { HeroQueryResult } from "@/sanity.types"; // legacy type no longer needed
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { heroQuery, settingsQuery } from "@/sanity/lib/queries";
import type { HeroQueryResult } from "@/sanity.types";
import type { PortableTextBlock } from "next-sanity";
type Hero = NonNullable<HeroQueryResult>;
type HeroAuthor = NonNullable<Hero["authors"]>[number];

function Intro(props: { title: string | null | undefined; description: PortableTextBlock[] | null | undefined }) {
  const title = props.title || demo.title;
  const description = props.description?.length
    ? props.description
    : demo.description;
  return (
    <header className="relative mb-16 flex h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex-col overflow-hidden md:flex-row">
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
          <div className="w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/header2.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/40"></div> {/* Overlay for video */}
          </div>
        </div>
        <div className="flex w-full md:w-1/2 items-center justify-center bg-background p-5 text-center text-foreground h-1/2 md:h-full">
          <div>
            <h1 className="text-balance text-4xl md:text-6xl font-sans font-bold leading-tight tracking-tighter lg:text-8xl">
              {(title || demo.title).split("").map((ch, idx) => (
                <span
                  key={idx}
                  className={["text-[#F1C21E]", "text-[#045396]", "text-[#E83B13]", "text-[#09935F]"][idx % 4]}
                >
                  {ch}
                </span>
              ))}
            </h1>
            <h2 className="text-pretty mt-5 text-center text-base md:text-lg lg:pl-8">
              <PortableText
                className="prose-lg"
                value={description?.length ? description : demo.description}
              />
            </h2>
          </div>
        </div>
    </header>
  );
}

export default async function Page() {
  const [settings, heroPost] = await Promise.all([
    sanityFetch({
      query: settingsQuery,
    }),
    sanityFetch({ query: heroQuery }),
  ]);

  return (
    <>
      <Hero />
      <div className="container mx-auto px-5 mt-10 md:mt-14">
        {!heroPost && <Onboarding />}
        {heroPost?._id && (
          <aside>
            <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
              More Publications
            </h2>
            <Suspense>
              <MoreStories skip={heroPost._id} limit={100} />
            </Suspense>
          </aside>
        )}
      </div>
    </>
  );
}
