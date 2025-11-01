import { sanityFetch } from "@/sanity/lib/fetch";
import { allAuthorsQuery } from "@/sanity/lib/queries";
import TeamGrid from "./components/TeamGrid";

export default async function TeamPage() {
  const authors = await sanityFetch({ query: allAuthorsQuery });

  return (
    <section className="min-h-[40vh] p-6">
      <div className="grid grid-cols-12 grid-rows-4 gap-y-6 gap-x-4">
        <h1 className="col-span-12 row-start-1 md:col-span-8 text-start text-4xl md:text-5xl font-medium uppercase tracking-widest">
          Research Team
        </h1>
        <div className="col-span-12 row-start-2 md:col-span-6 md:col-start-7 text-start font-light">
          <p className="prose-lg text-white leading-relaxed">
            Meet the distinguished researchers, academics, and scholars who form the backbone of our research group. 
            Each member brings unique expertise, innovative perspectives, and valuable contributions to our collective 
            pursuit of scientific knowledge. Our diverse team spans multiple disciplines, fostering interdisciplinary 
            collaboration that drives groundbreaking discoveries and advances our understanding of complex research challenges. 
            Explore their individual profiles to learn about their specialized areas of expertise, ongoing projects, 
            and significant contributions to the scientific community.
          </p>
        </div>
      </div>
      
      <TeamGrid authors={authors} />
    </section>
  );
}