import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      name
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($id: Int, $name: String) {
    addUser(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($id: Int, $name: String) {
    editUser(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: Int) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;