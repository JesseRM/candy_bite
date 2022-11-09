import type { AppProps } from "next/app";
import { CandyBiteProvider } from "../context/state";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CandyBiteProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CandyBiteProvider>
  );
}

export default MyApp;
