exports.up = function (knex) {
  return knex.schema.createTable("transacoes", function (table) {
    table.increments("id");
    table.string("descricao", 255);
    table.integer("valor");
    table.date("data");
    table.integer("categoria_id");
    table.integer("usuario_id");
    table.string("tipo", 10);
    table.foreign("categoria_id").references("categorias.id");
    table.foreign("usuario_id").references("usuarios.id");
  });
};

exports.down = function (knex) {};
