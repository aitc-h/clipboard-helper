import Head from "next/head";
import { StrictMode } from "react";
import "styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <Head>
        <title>Clipboard Helper</title>

        <link rel="icon" type="image/png" href="/icon-32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/icon-64.png" sizes="64x64" />
        <link
          rel="icon"
          type="image/png"
          href="/icon-128.png"
          sizes="128x128"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icon-256.png"
          sizes="256x256"
        />
        <link
          rel="icon"
          type="image/png"
          href="/icon-512.png"
          sizes="512x512"
        />

        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </StrictMode>
  );
}

export default MyApp;
