import Layout from "../components/Layout";
import "../styles/globals.scss";
import "../styles/layout.scss";
import "../styles/util.scss";
import "../styles/elements.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
