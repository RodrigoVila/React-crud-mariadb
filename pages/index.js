import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Add from "../components/add";
import DisplayInfo from "../components/displayInfo";

const Home = () => {
  const [editData, setEditData] = useState({});

  return (
    <>
      <Head>
        <title>pwa</title>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="Description" content="Navira PWA SEO Optimization"></meta>
        <meta name="keywords" content="Keywords" />
        <meta name="theme-color" content="#4286f4" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="static/refresh.png" />
      </Head>

      <div className={styles.container}>
        <h3>React CRUD App con GraphQL y MariaDB</h3>
        <div className={styles.infoContainer}>
          <Add editData={editData} />
          <DisplayInfo setEditData={setEditData} />
        </div>
      </div>
    </>
  );
};

export default Home;
