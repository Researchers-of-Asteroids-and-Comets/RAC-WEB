import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export default defineType({
    name: "paper",
    title: "Paper",
    type: "document",
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
                isUnique: (value, context) => context.defaultIsUnique(value, context),
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "authors",
            title: "Authors",
            type: "array",
            of: [{ type: "string" }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "publicationDate",
            title: "Publication Date",
            type: "date",
            options: {
                dateFormat: "YYYY-MM-DD",
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "journal",
            title: "Journal / Conference",
            type: "string",
        }),
        defineField({
            name: "abstract",
            title: "Abstract",
            type: "text",
        }),
        defineField({
            name: "paperUrl",
            title: "Paper URL (e.g., arXiv link)",
            type: "url",
        }),
        defineField({
            name: "file",
            title: "PDF File (Optional)",
            type: "file",
            options: {
                accept: ".pdf",
            },
        }),
    ],
    preview: {
        select: {
            title: "title",
            date: "publicationDate",
            journal: "journal",
        },
        prepare({ title, date, journal }) {
            const subtitle = [date, journal].filter(Boolean).join(" - ");
            return {
                title,
                subtitle,
            };
        },
    },
});
