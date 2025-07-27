import path from "node:path";
import fsp from "node:fs/promises";
import { render } from "preact-render-to-string/jsx";
import Express from 'express';

import { Entry } from "./models/entry";

import TopPage from "./views/top";
import EntryPage from "./views/entry";
import NotFound404Page from "./views/_404";

const isProduction = process.env.APP_ENV === "production";

async function main() {
    const entries =
        isProduction
            ? await Entry.getPublicLatestList()
            : await Entry.getLatestList();

    // Clean up
    await fsp.rm(path.join(__dirname, "../build"), { recursive: true }).catch(console.error);
    // Copy assets
    await fsp.cp(
        path.join(__dirname, "../assets"),
        path.join(__dirname, "../build/assets"),
        { recursive: true }
    );

    // Top Page
    {
        const html = render(TopPage({ entries }), { pretty: true });
        await saveHtml("/", html);
    }

    // Entry Pages
    for (const entry of entries) {
        const html = render(EntryPage({ entry }), { pretty: true });
        await saveHtml(`/entry/${entry.slug}`, html);
    }

    // Not Found Page
    {
        const html = render(NotFound404Page({}), { pretty: true });
        await saveHtml("/_404.html", html);
    }
}

async function saveHtml(urlPath: string, html: string): Promise<void> {
    const pathSuffix = urlPath.endsWith(".html")
        ? urlPath
        : path.join(urlPath, "index.html");
    const filePath = path.join(__dirname, "../build", pathSuffix);
    await fsp.mkdir(path.dirname(filePath), { recursive: true });
    await fsp.writeFile(filePath, html);
    console.log(`Saved: ${filePath}`);
}

main().catch(console.error);

if (!isProduction) {
    const app = Express();
    const PORT = 3000;

    app.use(Express.static('./build'));
    app.use((_req, res) => {
        res.redirect(302, '/_404.html');
    });

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}
