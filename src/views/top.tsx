import { h } from "preact";
import { Entry } from "../models/entry";

import Header from "./shared/header";
import Footer from "./shared/footer";
import Gtag from "./shared/gtag";
import GlobalStyle from "./shared/global_style";

interface Props {
    entries: Entry[];
}

export default function Top({ entries }: Props) {
    const entriesGroups: { [year: string]: Entry[] } = {};
    for (const entry of entries) {
        const year = entry.createdAt.slice(0, 4);
        entriesGroups[year] = entriesGroups[year] ?? [];
        entriesGroups[year].push(entry);
    }
    // 記事の順番は投稿日の新→古の順に並び替え
    for (const entries of Object.values(entriesGroups)) {
        entries.sort((a, b) => {
            return a.createdAt < b.createdAt ? 1 : -1;
        });
    }
    const sortedYears = Object.keys(entriesGroups).sort((a, b) => b.localeCompare(a));
    const title = "blog-template";

    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <title>{title}</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta
                    name="description"
                    content="Blog by an software engineer from Japan"
                />
                <link rel="icon" href="/assets/favicon.ico" />
                <Gtag></Gtag>
                <GlobalStyle></GlobalStyle>
            </head>
            <body style="background-color: #fff; font-size: 16px; margin: 0;">
                <div
                    class="container"
                    style="max-width: 600px; margin: 0 auto;"
                >
                    <Header></Header>

                    {sortedYears.map((year) => {
                        const entries = entriesGroups[year];
                        return (
                            <div style="padding: 0 10px">
                                <h2 id={`year-${year}`} style="margin-bottom: 0;">{year}年</h2>

                                <ul
                                    class="entries-year-list"
                                    style="
                                        margin-top: 12px;
                                        padding-inline-start: 10px;
                                        list-style-type: square;
                                        list-style-position: inside;
                                    "
                                >
                                    {entries.map((entry) => (
                                        <li style="margin-bottom: 0.2rem;">
                                            <span style="color: #777; font-size: 0.9rem;">{entry.createdAt} - </span>
                                            <a
                                                href={`/entry/${entry.slug}/`}
                                                style="
                                                    text-decoration: none;
                                                    border-bottom-width: 1px;
                                                    border-bottom-style: solid;
                                                    padding-bottom: 2px;
                                                "
                                            >
                                                {entry.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })}

                    <Footer></Footer>
                </div>
            </body>
        </html>
    );
}
