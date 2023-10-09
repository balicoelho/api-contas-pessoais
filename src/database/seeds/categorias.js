exports.seed = async function (knex) {
  await knex("categorias").insert([
    { descricao: "Alimentação" },
    { descricao: "Assinaturas e Serviços" },
    { descricao: "Casa" },
    { descricao: "Mercado" },
    { descricao: "Cuidados Pessoais" },
    { descricao: "Educação" },
    { descricao: "Família" },
    { descricao: "Lazer" },
    { descricao: "Pets" },
    { descricao: "Presentes" },
    { descricao: "Roupas" },
    { descricao: "Saúde" },
    { descricao: "Transporte" },
    { descricao: "Salário" },
    { descricao: "Vendas" },
    { descricao: "Outras receitas" },
    { descricao: "Outras despesas" },
  ]);
};
