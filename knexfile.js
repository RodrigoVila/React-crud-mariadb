import dbdata from "./dbdata";

const { host, user, password, database } = dbdata.mariadb;

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: host,
      user: user,
      password: password,
      database: database,
      migrations: {
        tableName: "knex_migrations",
      },
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: host,
      user: user,
      password: password,
      database: database,
      migrations: {
        tableName: "knex_migrations",
      },
    },
  },
};
