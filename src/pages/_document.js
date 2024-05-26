import { Html, Head, Main, NextScript } from "next/document";
import { APP_NAME, APP_DESCRIPTION } from "../config";
import i18n from "../../next-i18next.config";

export default function Document(props) {

  const { locale } = props;

  return (
    <Html lang={locale}>
      <Head >
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
        <meta name="robots" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={APP_NAME} />
        <meta property="og:description" content={APP_DESCRIPTION} />
        <meta name="description" content={APP_DESCRIPTION} />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
