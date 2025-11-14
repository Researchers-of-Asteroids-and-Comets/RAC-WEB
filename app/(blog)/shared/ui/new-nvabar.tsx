"use client";

import Link from "next/link";
import Image from "next/image";
import PortableText from "./portable-text";
import { RACIcon } from "./icons/rac-icon";
import * as demo from "@/sanity/lib/demo";
import type { PortableTextBlock } from "next-sanity";

// Componente global: new-nvabar
export default function NewNvabar() {
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

  return (
    <div className=" container mx-auto px-5 grid grid-rows-2 gap-2">
      {/* Encabezado con fondo usando next/image */}
      <div className="relative w-full overflow-hidden rounded-md h-28 md:h-36 lg:h-44 xl:h-52">
        <Image
          src="/new.avif"
          alt="Fondo del encabezado"
          fill
          priority
          sizes="(min-width: 1280px) 100vw, (min-width: 1024px) 100vw, 100vw"
          className="object-cover object-center opacity-80"
        />
      </div>
      {/* Bloque de contenido debajo de la imagen */}
      <div className="flex items-start gap-4 p-4 md:p-6">
        <RACIcon size={84} />
        <span className="text-7xl leading-none">{abbreviation}</span>
        <div className="text-sm md:text-base lg:text-lg max-w-3xl">
          <PortableText className="prose-sm prose-invert" value={splitDescriptionIntoParagraphs(description)} />
        </div>
      </div>
      <header
        role="banner"
        className="bg-background flex justify-between mb-6 items-center"
      >
        <nav className="hidden md:flex w-full justify-between text-xl">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:underline">
              {label}
            </Link>
          ))}
        </nav>
      
      </header>
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
      },
    ],
  });

  if (Array.isArray(value)) {
    try {
      const text = value
        .map((b) =>
          Array.isArray(b?.children)
            ? b.children
                .map((c) => (typeof c?.text === "string" ? c.text : ""))
                .join("")
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

  const str = (value as string) || "";
  const sentences = str.match(/[^.!?\u2026]+[.!?\u2026]+/g) || [str];
  return sentences.map((s) => makeBlock(s.trim()));
};