
import * as fs from 'fs';
import * as path from 'path';

async function fetchPapers() {
    const query = 'all:ferrin';
    const url = `http://export.arxiv.org/api/query?search_query=${query}&start=0&max_results=50`;

    console.log(`Fetching from ${url}...`);
    const response = await fetch(url);
    const text = await response.text();

    // Simple XML parsing using Regex (sufficient for this one-off task)
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    const titleRegex = /<title>([\s\S]*?)<\/title>/;
    const summaryRegex = /<summary>([\s\S]*?)<\/summary>/;
    const publishedRegex = /<published>([\s\S]*?)<\/published>/;
    const linkRegex = /<link href="([^"]*)" rel="alternate"/; // taking the alternate link
    const authorRegex = /<author>\s*<name>([\s\S]*?)<\/name>\s*<\/author>/g;

    let match;
    const papers = [];

    while ((match = entryRegex.exec(text)) !== null) {
        const entry = match[1];
        if (!entry) continue;

        const titleMatch = titleRegex.exec(entry);
        const summaryMatch = summaryRegex.exec(entry);
        const publishedMatch = publishedRegex.exec(entry);
        const linkMatch = linkRegex.exec(entry);

        const authors: string[] = [];
        let authorMatch;
        while ((authorMatch = authorRegex.exec(entry)) !== null) {
            if (authorMatch[1]) {
                authors.push(authorMatch[1].trim());
            }
        }

        if (titleMatch && publishedMatch && titleMatch[1] && publishedMatch[1]) {
            const title = titleMatch[1].replace(/\n/g, ' ').trim();
            // Generate a slug from title
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '')
                .slice(0, 96);

            papers.push({
                _type: 'paper',
                title: title,
                slug: { _type: 'slug', current: slug },
                authors: authors,
                publicationDate: publishedMatch[1].split('T')[0],
                abstract: summaryMatch && summaryMatch[1] ? summaryMatch[1].replace(/\n/g, ' ').trim() : '',
                paperUrl: linkMatch && linkMatch[1] ? linkMatch[1] : undefined,
                // journal: 'ArXiv', // Optional, can add if needed
            });
        }
    }

    console.log(`Found ${papers.length} papers.`);

    // Generate NDJSON
    const ndjson = papers.map(p => JSON.stringify(p)).join('\n');
    const outputPath = path.join(process.cwd(), 'papers.ndjson');

    fs.writeFileSync(outputPath, ndjson);
    console.log(`Exported to ${outputPath}`);
}

fetchPapers().catch(console.error);
