import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "role",
  title: "Role",
  icon: TagIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Role Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Detailed description of the role and its responsibilities",
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
    },
    prepare({ title, description }) {
      return {
        title: title || "Untitled",
        subtitle: description || "No description",
        media: TagIcon,
      };
    },
  },
});