import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { globalEditing } from "../context/globalEditing";
import { DELETE_USER, GET_USERS } from "../graphql/queries";
import styles from "../styles/ListItem.module.css";

const ListItem = ({ setEditData, id, name }) => {
  const [editing, setEditing] = useState(false);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleEdit = () => {
    setEditing(true);
    setEditData({ id, name });
    globalEditing(true);
  };

  const handleDelete = () => {
    !editing &&
      deleteUser({
        variables: { id },
        refetchQueries: [{ query: GET_USERS }],
      });
  };

  useEffect(() => {
    !globalEditing() && setEditing(false);
  }, [globalEditing()]);

  return (
    <div style={{ opacity: editing ? 0.5 : 1 }} className={styles.container}>
      <div className={styles.userName}>{name}</div>
      <div className={`${styles.button} ${styles.edit}`} onClick={handleEdit}>
        Editar
      </div>
      <div
        className={`${styles.button} ${styles.delete}`}
        onClick={handleDelete}
      >
        Borrar
      </div>
    </div>
  );
};

export default ListItem;
