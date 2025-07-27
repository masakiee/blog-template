import { h } from "preact";

interface Props { }

export default ({ }: Props) => {
    return (
        <footer
            style="
                margin-top: 20px;
                padding: 1rem 10px;
                "
        >
            <ul
                class="title"
                style="
                    height: 80px;
                    background-color: #555;
                    list-style: none;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    padding-inline-start: 0;
                    border-radius: 10px;
                    "
            >
                <li>
                    <a
                        href="https://github.com/masakiee"
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                        style="
                        text-decoration: none;
                        color: #555;
                        "
                    >
                        <img
                            src="/assets/github-mark-white.svg"
                            width="49"
                            height="48"
                        ></img>
                    </a>
                </li>
            </ul>
        </footer>
    );
};
