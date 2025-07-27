import { h } from "preact";
import { config } from "../../config";

interface Props {
}

export default ({ }: Props) => {
    return (
        <header style="padding: 0.1rem 0; position: sticky; top: 0px; background-color: #eee;">
            <p
                class="title"
                style="
                    color: #555;
                    text-align: center;
                    font-family: Helvetica Neue, Helvetica, Hiragino Sans, Hiragino Kaku Gothic ProN, Arial, Yu Gothic, Meiryo, sans-serif;
                    font-size: 1.5rem;
                    font-weight: bold;
                    font-style: italic;
                    margin-block-start: 0.5rem;
                    margin-block-end: 0.5rem;
                    "
            >
                <a href="/" style="
                    text-decoration: none;
                    color: #555;
                    "
                >{config.title}</a>
            </p>
        </header>
    )
}
