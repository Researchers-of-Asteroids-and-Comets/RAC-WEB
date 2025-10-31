"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import * as demo from "@/sanity/lib/demo";
import { sanityFetchClient } from "@/sanity/lib/fetch-client";
import { settingsQuery } from "@/sanity/lib/queries";
import { useMenu } from "./MenuContext";
import { RACIcon } from "../icons/rac-icon";

export default function SiteTitle({ className }: { className?: string }) {
  const [settings, setSettings] = useState<any>(null);
  const { isMenuOpen, toggleMenu } = useMenu();

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await sanityFetchClient({ query: settingsQuery, stega: false });
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const colorClass = isMenuOpen ? "text-[var(--cream)]" : "";

  return (
    <h2
      className={[
        "grid grid-cols-[1fr_auto] items-center justify-between gap-x-4 py-0 font-medium tracking-tight text-2xl md:text-3xl",
        colorClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Link href="/" className="flex items-center gap-2 hover:underline">
        <RACIcon size={32} className={colorClass} />
        {settings?.abbreviation || demo.abbreviation}
      </Link>
      <button
        type="button"
        onClick={toggleMenu}
        className="hover:underline"
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>
    </h2>
  );
}