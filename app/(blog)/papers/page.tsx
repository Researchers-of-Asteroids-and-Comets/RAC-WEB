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
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8 mb-12 text-center md:text-left">
                Research Papers
            </h1>

            <div className="grid gap-8">
                {papers.length > 0 ? (
                    papers.map((paper: Paper) => (
                        <article
                            key={paper._id}
                            className="group relative flex flex-col md:flex-row gap-6 p-6 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900/50"
                        >
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500 font-medium">
                                    {paper.publicationDate && (
                                        <time dateTime={paper.publicationDate}>
                                            {new Date(paper.publicationDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
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

                                <h2 className="text-2xl font-bold leading-snug group-hover:text-blue-600 transition-colors">
                                    {paper.paperUrl ? (
                                        <a
                                            href={paper.paperUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                        >
                                            {paper.title}
                                        </a>
                                    ) : (
                                        paper.title
                                    )}
                                </h2>

                                <div className="flex flex-wrap gap-2 text-sm">
                                    {paper.authors?.map((author: string, index: number) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300"
                                        >
                                            {author}
                                        </span>
                                    ))}
                                </div>

                                {paper.abstract && (
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base line-clamp-3">
                                        {paper.abstract}
                                    </p>
                                )}

                                <div className="pt-4 flex flex-wrap gap-4">
                                    {paper.paperUrl && (
                                        <a
                                            href={paper.paperUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                                        >
                                            View at Source <ArrowTopRightIcon className="w-4 h-4" />
                                        </a>
                                    )}
                                    {paper.fileUrl && (
                                        <a
                                            href={paper.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 hover:underline"
                                        >
                                            Download PDF <DocumentTextIcon className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No papers found yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
