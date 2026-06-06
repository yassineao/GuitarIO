import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <body className="main-layout">
        <Main />
        <NextScript />
        <Script
        src="https://unpkg.com/@coderline/alphatab@latest/dist/alphaTab.js"
        strategy="afterInteractive"
      />
      </body>
    </Html>
  );
}
