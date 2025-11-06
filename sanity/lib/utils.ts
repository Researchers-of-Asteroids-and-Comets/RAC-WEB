import createImageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/lib/api";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

type ImageSource = Parameters<typeof imageBuilder.image>[0];

function isImageWithRef(source: unknown): source is { asset: { _ref: string } } {
  if (!source || typeof source !== "object") return false;
  const s = source as { asset?: { _ref?: unknown } };
  return typeof s.asset?._ref === "string";
}

export const urlForImage = (source: ImageSource | null | undefined) => {
  // Ensure that source image contains a valid reference
  if (!isImageWithRef(source)) {
    return undefined;
  }

  return imageBuilder.image(source).auto("format").fit("max");
};

export function resolveOpenGraphImage(
  image: (ImageSource & { alt?: string | null }) | null | undefined,
  width = 1200,
  height = 627,
) {
  // Evaluate alt from the declared type before narrowing with the type guard
  const alt = typeof image?.alt === "string" ? image.alt : undefined;
  if (!isImageWithRef(image)) return;
  const url = urlForImage(image)?.width(width).height(height).fit("crop").url();
  if (!url) return;
  return { url, alt, width, height };
}

export function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case "post":
      return slug ? `/posts/${slug}` : undefined;
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}
