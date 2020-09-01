exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("name").notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("users");
};
