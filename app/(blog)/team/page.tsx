import { sanityFetch } from "@/sanity/lib/fetch";
import { allAuthorsQuery } from "@/sanity/lib/queries";
import TeamGrid from "./components/TeamGrid";

export default async function TeamPage() {
  const authors = await sanityFetch({ query: allAuthorsQuery });

  return (
    <section className="container mx-auto p-5">
      <div className="grid grid-cols-12 gap-y-4 gap-x-4 mb-8">
        <h1 className="col-span-12 md:col-span-8 text-start text-4xl md:text-6xl font-medium uppercase tracking-widest">
          Research Team
        </h1>
        <div className="col-span-12 md:col-span-6 md:col-start-7 text-start font-light">
          <p className="text-base text-white leading-relaxed">
            Get to know the diverse group of minds behind our research. From
            junior students to experienced principal investigators, our team is
            united by a passion for discovery and contribution to science.
          </p>
        </div>
      </div>

      <TeamGrid authors={authors} />
    </section>
  );
}
