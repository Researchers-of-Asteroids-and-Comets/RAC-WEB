import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import type { PreviewValue } from "sanity";
import type { ReactNode } from "react";

export default defineType({
  name: "galleryImage",
  title: "Image",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),

  ],
  preview: {
    select: { title: "image.alt", media: "image" },
    prepare(selection: { title?: string; media?: ReactNode }): PreviewValue {
      const { title, media } = selection;
      return { title: title || "Image", media };
    },
  },
});