import { h } from "preact";
import { Entry } from "../models/entry";
import Header from "./shared/header";
import Footer from "./shared/footer";
import Gtag from "./shared/gtag";
import GlobalStyle from "./shared/global_style";

interface Props {
    entry: Entry;
}

export default function ({ entry }: Props) {
    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <title>{entry.title}</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                {entry.description && (
                    <meta name="description" content={entry.description} />
                )}

                <meta property="og:url" content={`/entry/${entry.slug}/`} />
                <meta property="og:title" content={entry.title} />
                <meta property="og:site_name" content="blog-template" />
                {entry.thumbnailPath && (
                    <meta property="og:image" content={`${entry.thumbnailPath}`} />
                )}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={entry.title} />
                {entry.description && (
                    <meta name="twitter:description" content={entry.description} />
                )}
                {entry.thumbnailPath && (
                    <meta property="twitter:image" content={`${entry.thumbnailPath}`} />
                )}

                <link rel="icon" href="/assets/favicon.ico" />
                <Gtag></Gtag>
                <style>
                    {`
                    .entry-contents h1 {
                        font-size: 2rem;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                    }
                    .entry-contents h2 {
                        font-size: 1.5rem;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                    }
                    .entry-contents h3 {
                        font-size: 1.17rem;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                    }
                    .entry-contents h4 {
                        font-size: 1em;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                    }
                    .entry-contents p {
                        margin: 1rem 0;
                        line-height: 2rem;
                    }
                    .entry-contents u {
                        text-decoration: underline;
                        text-decoration-color: rgba(102, 194, 255, 0.5);
                        text-decoration-thickness: 0.8rem;
                        text-underline-offset: -0.4rem;
                    }
                `}
                </style>
                <GlobalStyle></GlobalStyle>
            </head>
            <body style="background-color: #fff; font-size: 16px; margin: 0;">
                <div
                    class="container"
                    style="max-width: 600px; margin: 0 auto;"
                >
                    <Header></Header>

                    {entry.thumbnailPath && (
                        <img
                            src={entry.thumbnailPath}
                            alt={entry.thumbnailAlt ?? ""}
                            style="aspect-ratio: 4 / 3; width: 100%; background-color: #aaa"
                        ></img>
                    )}

                    <article style="padding: 0 10px;">
                        <div style="margin: 30px 0;">
                            <p style="font-size: 0.8rem; color: #555; margin-bottom: 0;">{entry.createdAt}</p>
                            <h1
                                class="title"
                                style="
                                    color: #000;
                                    font-size: 1.5rem;
                                    font-weight: bold;
                                    margin: 4px 0 10px;
                                "
                            >
                                {entry.title}
                            </h1>
                        </div>

                        <div
                            class="entry-contents"
                            dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
                        ></div>
                    </article>

                    <Footer></Footer>
                </div>
            </body>
        </html>
    );
}
