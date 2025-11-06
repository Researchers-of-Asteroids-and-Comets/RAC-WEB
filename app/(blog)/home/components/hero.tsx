"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PortableText from "../../shared/ui/portable-text";
import * as demo from "@/sanity/lib/demo";
import { sanityFetchClient } from "@/sanity/lib/fetch-client";
import { heroQuery } from "@/sanity/lib/queries";
import { RACIcon } from "../../shared/ui/icons/rac-icon";
import type { PortableTextBlock } from "next-sanity";

export default function Hero() {
  const title = demo.title;
  const abbreviation = demo.abbreviation;
  const description = demo.description;

  const links = [
    { href: "/", label: "Home" },
    { href: "/aboutus", label: "About Us" },
    { href: "/new", label: "News" },
    { href: "/photos", label: "Photos" },
    { href: "/videos", label: "Videos" },
    { href: "/papers", label: "Papers" },
    { href: "/team", label: "Team" },
  ];

  const [heroPost, setHeroPost] = useState<any>(null);

  useEffect(() => {
    const fetchHero = async () => {
      const data = await sanityFetchClient({ query: heroQuery, stega: false });
      setHeroPost(data);
    };
    fetchHero();
  }, []);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-background text-foreground">
      <div className="grid grid-rows-2 gap-2 px-8">
      <div className="flex items-center gap-4">
        <RACIcon size={64} />
        <span className="text-7xl leading-none">{abbreviation}</span>
        <div className="text-sm text-muted-foreground max-w-3xl">
          <PortableText className="prose-sm prose-invert" value={splitDescriptionIntoParagraphs(description)} />
        </div>
      </div>
      <header
        role="banner"
        className="bg-background flex justify-between items-center"
        >
        
        <nav className="hidden md:flex space-x-4">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:underline">
              {label}
            </Link>
          ))}
        </nav>
        <div className="relative ">
          <input
            type="search"
            placeholder="Search"
            className="bg-muted text-muted-foreground px-4 py-2"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
          </button>
        </div>
      </header>
        </div>

      <main role="main" className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Título visible solo en móviles, ubicado arriba del contenedor del video */}
            <div className="md:hidden mb-4">
              <h2 className="text-4xl font-medium uppercase tracking-widest">
                {heroPost?.title ?? ""}
              </h2>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover z-0"
              aria-label="Animated visualization of a black hole"
            >
              <source src="/video/meteor_shower_2_.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-4 left-4 text-white z-10">
              <h2 className="hidden md:block text-4xl font-medium uppercase tracking-widest">
                {heroPost?.title ?? ""}
              </h2>
              <p className="text-lg">
                {[
                  heroPost?.categories?.[0]?.name,
                  formatDate(heroPost?.date),
                ]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            </div>
            </div>
          </div>

          <aside className="hover:underline" aria-labelledby="featured-press-releases">
            <h2
              id="featured-press-releases"
              className="text-2xl font-medium mb-4"
            >
              {heroPost?.subtitle ?? ""}
            </h2>
            <ul className="space-y-4">
              {heroPost?.excerpt ? (
                <li>
                  <Link href={`/posts/${heroPost.slug}`}>
                    {heroPost.excerpt}
                  </Link>
                </li>
              ) : null}
            </ul>
          </aside>
        </div>

        <div className="mt-8">
          <h1 className="text-4xl md:text-5xl font-medium uppercase tracking-widest">
            {title}
          </h1>
          <div className="mt-4 font-light">
            <PortableText className="prose-lg" value={description} />
          </div>
        </div>
      </main>
    </div>
  );
}
  // Divide una descripción en múltiples párrafos sin modificar el contenido original.
  const splitDescriptionIntoParagraphs = (
    value: PortableTextBlock[] | string
  ): PortableTextBlock[] => {
    const makeBlock = (text: string): PortableTextBlock => ({
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          text,
          marks: [],
        } as any,
      ],
    });

    // Si ya es PortableText con múltiples bloques, devolver tal cual
    if (Array.isArray(value)) {
      try {
        // Extraer texto plano de todos los bloques y dividir en oraciones
        const text = value
          .map((b: any) =>
            Array.isArray(b?.children)
              ? b.children.map((c: any) => c?.text || "").join("")
              : ""
          )
          .join(" ");
        if (!text.trim()) return value as PortableTextBlock[];
        const sentences = text.match(/[^.!?\u2026]+[.!?\u2026]+/g) || [text];
        return sentences.map((s) => makeBlock(s.trim()));
      } catch {
        return value as PortableTextBlock[];
      }
    }

    // Si es un string simple, dividirlo en oraciones y crear bloques
    const str = (value as string) || "";
    const sentences = str.match(/[^.!?\u2026]+[.!?\u2026]+/g) || [str];
    return sentences.map((s) => makeBlock(s.trim()));
  };
