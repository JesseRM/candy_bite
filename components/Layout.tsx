import { ReactNode } from "react";
import NavBar from "./NavBar";
import styles from "../styles/Layout.module.css";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Concert+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.container}>
        <NavBar />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
