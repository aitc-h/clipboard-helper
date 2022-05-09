import Head from "next/head";
import { StrictMode } from "react";
import "styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <Head>
        <title>Clipboard Helper</title>
        <link rel="icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </StrictMode>
  );
}

export default MyApp;
