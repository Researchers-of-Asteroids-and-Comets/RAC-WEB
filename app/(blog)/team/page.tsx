import { sanityFetch } from "@/sanity/lib/fetch";
import { allAuthorsQuery } from "@/sanity/lib/queries";
import TeamGrid from "./components/TeamGrid";

export default async function TeamPage() {
  const authors = await sanityFetch({ query: allAuthorsQuery });

  return (
    <section className="container mx-auto p-5">
      <div className="mb-12 border-b border-neutral-800 pb-8">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tighter leading-tight mb-4 uppercase">
          Research Team
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl">
          Get to know the diverse group of minds behind our research. From
          junior students to experienced principal investigators, our team is
          united by a passion for discovery and contribution to science.
        </p>
      </div>

      <TeamGrid authors={authors} />
    </section>
  );
}
