import { sanityFetch } from "@/sanity/lib/fetch";
import { allAuthorsQuery } from "@/sanity/lib/queries";
import TeamGrid from "./components/TeamGrid";

export default async function TeamPage() {
  const authors = await sanityFetch({ query: allAuthorsQuery });

  return (
    <section className="min-h-[40vh] p-6">
      <div className="grid grid-cols-12 gap-y-4 gap-x-4 mb-8">
        <h1 className="col-span-12 md:col-span-8 text-start text-4xl md:text-5xl font-medium uppercase tracking-widest">
          Research Team
        </h1>
        <div className="col-span-12 md:col-span-6 md:col-start-7 text-start font-light">
          <p className="text-base text-white leading-relaxed">
            Meet our distinguished researchers and academics who drive groundbreaking discoveries 
            across multiple disciplines. Explore their expertise and contributions to the scientific community.
          </p>
        </div>
      </div>
      
      <TeamGrid authors={authors} />
    </section>
  );
}