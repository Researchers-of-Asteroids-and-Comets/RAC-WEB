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
    title: string;
    slug: string;
    authors?: string[];
    publicationDate?: string;
    journal?: string;
    abstract?: string;
    paperUrl?: string;
    fileUrl?: string;
}

export default async function PapersPage() {
    const papers = await sanityFetch({ query: papersQuery });

    return (
        <div className="container mx-auto px-5 mt-10 mb-20">
            <div className="mb-12 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 mb-4">
                    Research Papers
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl">
                    Explore our latest publications and contributions to the field of cometary and asteroid research.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
                {papers.length > 0 ? (
                    papers.map((paper: Paper) => (
                        <article
                            key={paper._id}
                            className="group flex flex-col p-6 border border-gray-100 dark:border-gray-800 rounded-2xl hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900/50 hover:-translate-y-1"
                        >
                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex flex-wrap gap-2 items-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        {paper.publicationDate && (
                                            <time dateTime={paper.publicationDate}>
                                                {new Date(paper.publicationDate).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                })}
                                            </time>
                                        )}
                                        {paper.journal && (
                                            <>
                                                <span>•</span>
                                                <span className="text-blue-600 dark:text-blue-400">
                                                    {paper.journal}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowTopRightIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>

                                <h2 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-blue-600 transition-colors">
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

                                <div className="flex flex-wrap gap-1 text-xs">
                                    {paper.authors?.slice(0, 3).map((author: string, index: number) => (
                                        <span
                                            key={index}
                                            className="bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-white/10"
                                        >
                                            {author}
                                        </span>
                                    ))}
                                    {paper.authors && paper.authors.length > 3 && (
                                        <span className="bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-md text-gray-500 border border-gray-100 dark:border-white/10">
                                            +{paper.authors.length - 3} more
                                        </span>
                                    )}
                                </div>

                                {paper.abstract && (
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm line-clamp-4">
                                        {paper.abstract}
                                    </p>
                                )}
                            </div>

                            <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-3">
                                {paper.paperUrl && (
                                    <a
                                        href={paper.paperUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium"
                                    >
                                        View Source
                                    </a>
                                )}
                                {paper.fileUrl && (
                                    <a
                                        href={paper.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50 transition-colors text-sm font-medium"
                                    >
                                        Download PDF <DocumentTextIcon className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        <p className="text-xl">No papers found yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
