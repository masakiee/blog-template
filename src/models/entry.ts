import fs from 'fs';
import path from 'path';
import { read } from 'to-vfile';
import { matter } from 'vfile-matter';
import markdownit from 'markdown-it'
import customBlock from 'markdown-it-custom-block';

const md = markdownit({
    html: true, // markdown 中に html を書くことを許容する
})
    .use(customBlock, {
        photo(arg) {
            let [src, alt] = arg.split(':');
            return `
                <figure style="width: 100%; margin: 0; padding: 0;">
                    <img style="aspect-ratio: 4 / 3; width: 100%;" src="${src}" alt="">
                    <figcaption style="text-align: center; color: #888; margin: 12px 0px 20px; font-size: 0.8rem;">${alt}</figcaption>
                </figure>
            `;
        },
        photo_v(arg) {
            let [src, alt] = arg.split(':');
            return `
                <figure style="width: 100%; margin: 0; padding: 0; display: flex; flex-direction: column; align-items: center;">
                    <img style="aspect-ratio: 3 / 4; width: 100%; max-width: 400px;" src="${src}" alt="">
                    <figcaption style="text-align: center; color: #888; margin: 12px 0px 20px; font-size: 0.8rem;">${alt}</figcaption>
                </figure>
            `;
        }
    })

export class Entry {
    private constructor(
        private readonly content: string,
        private readonly metadata: Metadata,
        public readonly slug: string,
    ) {}

    get title(): string {
        return this.metadata.title;
    }

    get description(): string | undefined {
        return this.metadata.description ?? undefined;
    }

    get tags(): string[] {
        return this.metadata.tags;
    }

    get draft(): boolean {
        return this.metadata.draft;
    }

    get contentHtml(): string {
        // frontmatter の部分は除去する
        const contentBody = this.content.replace(/---\n[\s\S]*\n---\n/, '');
        return md.render(contentBody);
    }

    get thumbnailPath(): string | undefined {
        return this.metadata.thumbnail_path ?? undefined;
    }

    get thumbnailAlt(): string | undefined {
        return this.metadata.thumbnail_alt ??  undefined;
    }

    get createdAt(): string {
        return this.metadata.created_at;
    }

    get updatedAt(): string | undefined {
        return this.metadata.updated_at ?? undefined;
    }

    static async getPublicLatestList(): Promise<Entry[]> {
        const entries = await Entry.loadAll();
        return entries.filter(entry => entry.draft === false);
    }

    static async getLatestList(): Promise<Entry[]> {
        return Entry.loadAll();
    }

    private static async loadAll(): Promise<Entry[]> {
        const entriesDir = path.join(__dirname, '../../entries');
        async function load(dirPath: string): Promise<Entry[]> {
            const files = fs.readdirSync(dirPath, {
                withFileTypes: true,
            });

            const entries: Entry[] = [];

            for (const file of files) {
                if (file.isDirectory()) {
                    const nextDirPath = path.join(dirPath, file.name);
                    const nextEntries = await load(nextDirPath);
                    entries.push(...nextEntries);
                } else if (file.isFile()) {
                    const filePath = path.join(dirPath, file.name);
                    const slug = path.relative(entriesDir, filePath).replace(/\.md$/, '');
                    const content = fs.readFileSync(filePath, 'utf-8');
                    const metadata = await Entry.getMetadata(filePath);
                    const entry = new Entry(content, metadata, slug);
                    entries.push(entry);
                }
            }

            return entries;
        }

        return load(entriesDir);
    }

    private static async getMetadata(filePath: string): Promise<Metadata> {
        const vfile = await read(filePath);
        matter(vfile);
        return vfile.data.matter as Metadata;
    }
}

type Metadata = {
    title: string;
    description: string | undefined;
    tags: string[];
    draft: boolean;
    thumbnail_path: string | undefined;
    thumbnail_alt: string | undefined;
    created_at: string;
    updated_at: string | null | undefined;
}
