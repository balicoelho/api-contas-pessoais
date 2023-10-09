exports.up = function (knex) {
  return knex.schema.createTable("testes", function (table) {
    table.increments("id");
    table.string("nome", 255).notNullable();
    table.string("email", 255).notNullable().unique();
    table.string("senha", 255).notNullable();
  });
};

exports.down = function (knex) {};
