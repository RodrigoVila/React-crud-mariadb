const { ApolloServer, gql } = require("apollo-server-micro");
import Knex from "knex";
import mdb from "knex-mariadb";

import dbdata from "../../dbdata";

const { host, user, password, database } = dbdata.mariadb;

const typeDefs = gql`
  type Query {
    users: [User]
  }

  type User {
    id: Int
    name: String
  }

  type Mutation {
    addUser(id: Int, name: String): User
    editUser(id: Int, name: String): User
    deleteUser(id: Int): User
  }
`;

const mariadb = new Knex({
  client: mdb,
  connection: {
    host: host,
    database: database,
    user: user,
    password: password,
  },
  debug: true,
});

const resolvers = {
  Query: {
    users: (_, args, { mariadb }) => {
      return mariadb.select().from("users");
    },
  },
  Mutation: {
    addUser: (_, args, { mariadb }) => {
      return mariadb
        .insert(args)
        .into("users")
        .then((rows) => {
          return rows;
        });
    },
    deleteUser: (_, args, { mariadb }) => {
      return mariadb("users").where("id", args.id).del();
    },
    editUser: (_, args, { mariadb }) => {
      return mariadb("users").where("id", args.id).update({ name: args.name });
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { mariadb };
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export default handler;
