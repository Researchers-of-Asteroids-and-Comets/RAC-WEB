import { Suspense } from "react";

import MoreStories from "./home/components/more-stories";
import Onboarding from "./home/components/onboarding";
import Hero from "./home/components/hero";

import { sanityFetch } from "@/sanity/lib/fetch";
import { heroQuery, settingsQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const [settings, heroPost] = await Promise.all([
    sanityFetch({
      query: settingsQuery,
    }),
    sanityFetch({ query: heroQuery }),
  ]);

  return (
    <>
      <Hero heroPost={heroPost} />
      <div className="container mx-auto px-5 mt-10 md:mt-14">
        {!heroPost && <Onboarding />}
        {heroPost?._id && (
          <aside>
            <Suspense>
              <MoreStories skip={heroPost._id} limit={100} />
            </Suspense>
          </aside>
        )}
      </div>
    </>
  );
}
