import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import type { PreviewValue } from "sanity";
import type { ReactNode } from "react";

export default defineType({
    name: "video",
    title: "Video",
    type: "document",
    icon: PlayIcon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            description: "Optional title for the video",
        }),
        defineField({
            name: "youtubeUrl",
            title: "YouTube URL",
            type: "url",
            description: "Full YouTube video URL (e.g., https://www.youtube.com/watch?v=...)",
            validation: (rule) =>
                rule.required().uri({ scheme: ["http", "https"] }).custom((url) => {
                    if (!url) return true;
                    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
                    if (!youtubeRegex.test(url)) {
                        return "Please enter a valid YouTube URL";
                    }
                    return true;
                }),
        }),
    ],
    preview: {
        select: { title: "title", url: "youtubeUrl" },
        prepare(selection: { title?: string; url?: string }): PreviewValue {
            const { title, url } = selection;
            return {
                title: title || "Untitled Video",
                subtitle: url || "No URL",
            };
        },
    },
});
