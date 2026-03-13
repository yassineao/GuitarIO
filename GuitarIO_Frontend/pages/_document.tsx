import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

declare global {
  interface Window {
    __SCALES_CHORDS_READY__?: boolean;
    ScalesChordsAPI?: {
      scan?: () => void;
    };
  }
}

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
     
  <Script
    src="https://www.scales-chords.com/api/scales-chords-api.js"
    strategy="afterInteractive"
    onLoad={() => {
      if (typeof window !== "undefined") {
        // mark ready globally
        window.__SCALES_CHORDS_READY__ = true;
        // notify listeners
        window.dispatchEvent(new Event("scaleschords:ready"));
        // optional first scan
        window.ScalesChordsAPI?.scan?.();
      }
    }}
  />
      </body>
      
    </Html>
  );
}