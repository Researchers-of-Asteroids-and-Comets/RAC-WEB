import { Suspense } from "react";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { papersQuery } from "@/sanity/lib/queries";
import { DocumentTextIcon, ArrowTopRightIcon } from "@sanity/icons";

export const metadata = {
    title: "Papers - RAC Web",
    description: "Research papers and publications by the Research of Asteroids and Comets group.",
};

interface Paper {
    _id: string;
    title: string | null;
    slug: string | null;
    authors: string[] | null;
    publicationDate: string | null;
    journal: string | null;
    abstract: string | null;
    paperUrl: string | null;
    fileUrl: string | null;
}

export default async function PapersPage() {
    const papers = await sanityFetch({ query: papersQuery });

    return (
        <div className="container mx-auto px-5 mt-10 mb-20 font-mono">
            <div className="mb-12 border-b border-neutral-800 pb-8">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-4 uppercase">
                    / RESEARCH_PAPERS
                </h1>
                <p className="text-lg text-neutral-400 max-w-2xl">
                    &gt; COLLECTION_OF_PUBLICATIONS_AND_CONTRIBUTIONS
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-px bg-neutral-800 border border-neutral-800">
                {papers.length > 0 ? (
                    papers.map((paper: Paper) => (
                        <article
                            key={paper._id}
                            className="group flex flex-col p-6 bg-black hover:bg-neutral-900 transition-colors duration-200"
                        >
                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between items-start gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
                                    <div className="flex flex-wrap gap-2 items-center">
                                        {paper.publicationDate && (
                                            <time dateTime={paper.publicationDate}>
                                                {(() => {
                                                    const date = new Date(paper.publicationDate);
                                                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                                    return `${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
                                                })()}
                                            </time>
                                        )}
                                        {paper.journal && (
                                            <>
                                                <span>//</span>
                                                <span className="text-neutral-400">
                                                    {paper.journal}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <h2 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-blue-500 transition-colors uppercase">
                                    {paper.paperUrl ? (
                                        <a
                                            href={paper.paperUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {paper.title}
                                        </a>
                                    ) : (
                                        paper.title
                                    )}
                                </h2>

                                <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-400">
                                    <span>[AUTHORS]:</span>
                                    {paper.authors?.map((author: string, index: number) => (
                                        <span key={index} className="text-white bg-neutral-900 px-1">
                                            {author}
                                        </span>
                                    ))}
                                </div>

                                {paper.abstract && (
                                    <p className="text-neutral-400 leading-relaxed text-sm line-clamp-4 font-mono border-l-2 border-neutral-800 pl-4">
                                        {paper.abstract}
                                    </p>
                                )}
                            </div>

                            <div className="pt-6 mt-6 border-t border-neutral-900 flex flex-wrap gap-4 text-xs font-mono uppercase">
                                {paper.paperUrl && (
                                    <a
                                        href={paper.paperUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 hover:underline decoration-1 underline-offset-4"
                                    >
                                        [ VIEW_SOURCE ]
                                    </a>
                                )}
                                {paper.fileUrl && (
                                    <a
                                        href={paper.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 hover:underline decoration-1 underline-offset-4"
                                    >
                                        [ DOWNLOAD_PDF ]
                                    </a>
                                )}
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-neutral-500 font-mono bg-black">
                        <p className="">[ SYSTEM: NO_PAPERS_FOUND ]</p>
                    </div>
                )}
            </div>
        </div>
    );
}
