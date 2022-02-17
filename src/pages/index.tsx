import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import styles from "../../styles/Home.module.css";
import { H1 } from "@blueprintjs/core";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>parts picker</title>
        <meta name="description" content="Early development version." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <H1>parts picker</H1>
      </main>
    </div>
  );
};

export default Home;
