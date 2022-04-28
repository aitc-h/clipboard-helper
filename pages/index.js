import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Clipboard Helper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Welcome to Clipboard Helper</h1>
      </main>
    </div>
  );
}
