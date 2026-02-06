import Link from "next/link";
import Image from "next/image";
import PortableText from "./portable-text";
import { RACIcon } from "./icons/rac-icon";
import * as demo from "@/sanity/lib/demo";
import type { PortableTextBlock } from "next-sanity";

// RAC brand colors used throughout the site
const RAC_COLORS = {
  red: "#CE1126",
  yellow: "#FCD116",
  blue: "#3B82F6",
} as const;

type TitleSegment = { text: string; color?: string };

// Styled title configuration - easy to modify
const TITLE_SEGMENTS: TitleSegment[] = [
  { text: "Research", color: RAC_COLORS.red },
  { text: " on " },
  { text: "Asteroids", color: RAC_COLORS.yellow },
  { text: " and " },
  { text: "Comets", color: RAC_COLORS.blue },
];

// Componente para el título estilizado con colores RAC
const StyledTitle = () => (
  <span className="font-bold">
    {TITLE_SEGMENTS.map((segment, i) => (
      <span key={i} style={segment.color ? { color: segment.color } : undefined}>
        {segment.text}
      </span>
    ))}
  </span>
);

// Componente global: new-nvabar
export default function NewNvabar() {
  const abbreviation = demo.abbreviation;
  const description = demo.description;
  const colombiaColors = ["#FCD116", "#3B82F6", "#CE1126"];

  const links = [
    { href: "/", label: "Home" },
    { href: "/aboutus", label: "About Us" },
    { href: "/new", label: "News" },
    { href: "/images", label: "Images" },
    { href: "/videos", label: "Videos" },
    { href: "/papers", label: "Papers" },
    { href: "/team", label: "Team" },
  ];

  return (
    <div className="w-full p-5 flex flex-col gap-6">
      {/* Encabezado con fondo usando next/image */}
      <div className="relative w-full overflow-hidden rounded-md h-28 md:h-36 lg:h-44 xl:h-52 shrink-0">
        <Image
          src="/new.avif"
          alt="Fondo del encabezado"
          fill
          priority
          sizes="(min-width: 1280px) 100vw, (min-width: 1024px) 100vw, 100vw"
          className="object-cover object-center opacity-80"
        />
      </div>

      {/* Bloque de contenido: Logo + RAC + Descripción */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12">
        {/* Grupo Indivisible: Icono Pill + Texto RAC */}
        <div className="flex items-center gap-5 shrink-0">
          <RACIcon size={84} className="rounded-full shadow-xl shrink-0" />

          <div className="text-7xl md:text-8xl font-bold leading-none tracking-normal select-none">
            {Array.from(abbreviation).map((ch, i) => (
              <span
                key={i}
                style={i < 3 ? { color: colombiaColors[i] } : undefined}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* Descripción que fluye naturalmente */}
        <div className="text-md md:text-base max-w-3xl text-pretty pt-2 leading-relaxed">
          <StyledTitle />
          <br />
          Advancing our understanding of minor bodies of the solar system
          <br />
          using the Secular Light Curves (SLC) Methodology,
          <br />
          and the Evolutionary Diagram
        </div>
      </div>

      {/* Navegación */}
      <header
        role="banner"
        className="bg-background flex justify-between mb-6 items-center"
      >
        <nav className="flex w-full justify-between items-center text-base flex-wrap md:flex-nowrap gap-y-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:underline flex-1 text-center min-w-20"
            >
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
  value: PortableTextBlock[] | string,
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
            : "",
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
