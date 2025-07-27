import { h } from "preact";

import Header from "./shared/header";
import Footer from "./shared/footer";
import Gtag from "./shared/gtag";
import GlobalStyle from "./shared/global_style";

interface Props {
}

export default function Top({ }: Props) {

    const title = "404";

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

                    <p style="text-align: center;">ページが見つかりませんでした</p>

                    <p style="text-align: center;">
                        <a
                            href="/"
                            style="
                                color: #000;
                                text-decoration: none;
                                border-bottom-width: 1px;
                                border-bottom-style: solid;
                                padding-bottom: 2px;
                                "
                        >
                            トップページへ
                        </a>
                    </p>

                    <Footer></Footer>
                </div>
            </body>
        </html>
    );
}
