"use client";

import Link from "next/link";
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
    <div className="grid grid-rows-2 gap-2 px-8 pt-8">
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