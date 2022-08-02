import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { H1 } from "@blueprintjs/core";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>parts picker</title>
        <meta name="description" content="Early development version." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <H1>parts picker</H1>
      </main>
    </div>
  );
};

export default Home;
