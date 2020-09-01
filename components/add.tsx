import React, { useState, useEffect } from "react";
import styles from "../styles/Add.module.css";
import { useMutation } from "@apollo/client";
import { globalEditing } from "../context/globalEditing";

import { ADD_USER, GET_USERS, EDIT_USER } from "../graphql/queries";

const Add = ({ editData }) => {
  const [value, setValue] = useState("");
  const [addUser] = useMutation(ADD_USER);
  const [editUser] = useMutation(EDIT_USER);

  const handleInput = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleAdd = () => {
    if (value !== "") {
      addUser({
        variables: { name: value },
        refetchQueries: [{ query: GET_USERS }],
      });
      setValue("");
    }
  };

  const handleConfirmEdit = () => {
    editUser({
      variables: { id: editData.id, name: value },
      refetchQueries: [{ query: GET_USERS }],
    });
    globalEditing(false);
    setValue("");
  };

  useEffect(() => {
    globalEditing() && setValue(editData.name);
  }, [globalEditing()]);

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        name="text"
        placeholder="Agrega algo a la lista"
        value={value}
        onChange={handleInput}
      />
      {globalEditing() ? (
        <div
          className={`${styles.button} ${styles.editButton}`}
          onClick={handleConfirmEdit}
        >
          Editar
        </div>
      ) : (
        <div
          className={`${styles.button} ${styles.addButton}`}
          onClick={handleAdd}
        >
          Agregar
        </div>
      )}
    </div>
  );
};

export default Add;
