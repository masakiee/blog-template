/** @ts-ignore */
import { h, Fragment } from "preact";

export default () => {
    // 計測のノイズになるため、本番環境以外では Google Analytics のタグは出力しない
    const isProduction = process.env.APP_ENV === "production";
    if (!isProduction) {
        return null;
    }
    const gaId = process.env.GA_ID;

    return (
        <>
            <script
                async={true}
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            ></script>
            <script>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){
                    dataLayer.push(arguments)
                }
                gtag('js', new Date());

                gtag('config', '${gaId}');
        `}
            </script>
        </>
    );
};
