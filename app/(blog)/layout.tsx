import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import {
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { GeistMono } from "geist/font/mono";
import { draftMode } from "next/headers";

import AlertBanner from "./shared/ui/alert-banner";
import PortableText from "./shared/ui/portable-text";
import VisualEditingWrapper from "./shared/wrappers/visual-editing-wrapper";
import MenuOverlay from "./shared/ui/Menu/MenuOverlay";
import { MenuProvider } from "./shared/ui/Menu/MenuContext";
import SiteTitle from "./shared/ui/Menu/site-title";
import MainWrapper from "./shared/wrappers/MainWrapper";
import CategoryLink from "./categories/components/CategoryLink";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

// GeistMono is already configured with the variable --font-geist-mono


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sanityFetch({ query: settingsQuery });
  const footer = data?.footer || [];
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${GeistMono.variable} bg-background text-foreground`}>
      <body>
        <MenuProvider>
          <section className="min-h-screen">
            {isDraftMode && <AlertBanner />}
            <MenuOverlay />
            <header
              className="fixed left-0 z-[60] w-full bg-transparent h-16 md:h-20 flex items-center"
              style={{ top: "var(--banner-height, 0px)" }}
            >
              <div className="container mx-auto px-5 h-full flex items-center">
                <nav aria-label="Navegación principal" className="w-full">
                  <SiteTitle />
                </nav>
              </div>
            </header>
            <MainWrapper>{children}</MainWrapper>
            <footer className="bg-accent-1 border-accent-2 border-t">
              <div className="container mx-auto px-5">
                {footer.length > 0 ? (
                  <PortableText
                    className="prose-sm text-pretty bottom-0 w-full max-w-none bg-background py-12 text-center md:py-20"
                    value={footer as PortableTextBlock[]}
                  />
                ) : (
                  <div className="flex flex-col items-center py-28 lg:flex-row">
                    <h3 className="mb-10 text-center text-4xl font-sans font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-5xl">
                      Research on Asteroids and Comets - University of Antioquia
                    </h3>
                    <div className="flex flex-col items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
                      <Link
                        href="/aboutus"
                        className="mx-3 mb-6 border border-foreground bg-foreground py-3 px-12 font-bold text-background transition-colors duration-200 hover:bg-background hover:text-foreground lg:mb-0 lg:px-8"
                      >
                        About Us
                      </Link>
                       <CategoryLink />
                      {/*
                      <a
                        href="https://github.com/rac"
                        className="mx-3 font-bold hover:underline"
                      >
                        View on GitHub
                      </a>*/}
                    </div>
                  </div>
                )}
              </div>
            </footer>
          </section>
          {isDraftMode && <VisualEditingWrapper />}
          <SpeedInsights />
          <Analytics />
        </MenuProvider>
      </body>
    </html>
  );
}
