import React, { useEffect } from "react";
import styles from "../styles/DisplayInfo.module.css";
import { useQuery } from "@apollo/client";
import ListItem from "./ListItem";
import { GET_USERS } from "../graphql/queries";

const DisplayInfo = ({ setEditData }) => {
  const { data, loading, error, refetch, networkStatus } = useQuery(GET_USERS, {
    notifyOnNetworkStatusChange: true,
  });

  if (loading || networkStatus === 4) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <div
        className={
          data.users.length === 0 ? styles.emptyContainer : styles.container
        }
      >
        {data.users.map(({ name, id }) => {
          return (
            <ListItem setEditData={setEditData} id={id} key={id} name={name} />
          );
        })}

        {data.users.length === 0 && (
          <div>Nada para mostrar, agrega algo a la lista</div>
        )}
      </div>
      <div className={styles.refetchButton} onClick={() => refetch()}>
        Refresh
      </div>
    </>
  );
};

export default DisplayInfo;
