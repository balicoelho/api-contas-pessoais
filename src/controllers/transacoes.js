const knex = require("../database");

const listarTransacoes = async (req, res) => {
  const { id } = req.usuario;
  const { filtro } = req.query;

  try {
    const transacoes = await knex("transacoes")
      .where({ usuario_id: id })
      .join("categorias", "transacoes.categoria_id", "categorias.id")
      .select("transacoes.*", "categorias.descricao as categoria_descrição")
      .where((query) => {
        if (filtro) {
          filtro.forEach((item) => {
            query.orWhere("categorias.descricao", "ilike", `%${item.trim()}%`);
          });
        }
      });

    return res.status(200).json(transacoes);
  } catch (error) {
    return res.status(500).json({ messagem: error.message });
  }
};

const obterTransacao = async (req, res) => {
  try {
    const transacoes = await knex("transacoes")
      .where({ "transacoes.id": req.params.id })
      .join("categorias", "transacoes.categoria_id", "categorias.id")
      .select("transacoes.*", "categorias.descricao as categoria_descrição");

    return res.status(200).json(transacoes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const cadastrarTransacao = async (req, res) => {
  const idUsuario = req.usuario.id;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    const categoria = await knex("categorias")
      .where({ id: categoria_id })
      .first();

    if (!categoria) {
      return res.status(404).json({ message: "Categoria não existe" });
    }

    const novaTransacao = await knex("transacoes")
      .insert({
        descricao,
        valor,
        data,
        categoria_id,
        tipo,
        usuario_id: idUsuario,
      })
      .returning("*");

    novaTransacao[0].categoria_nome = categoria.descricao;

    return res.status(201).json(novaTransacao);
  } catch (error) {
    return res.status(500).json({ messagem: error.message });
  }
};

const atualizarTransacao = async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    const categoria = await knex("categorias")
      .where({ id: categoria_id })
      .first();

    if (!categoria) {
      return res.status(404).json({ message: "Categoria não existe" });
    }

    await knex("transacoes")
      .where({ id })
      .update({ descricao, valor, data, categoria_id, tipo });

    return res.status(200).json({ message: "Transação editada com sucesso" });
  } catch (error) {
    return res.status(500).json({ messagem: error.message });
  }
};

const deletarTransacao = async (req, res) => {
  const { id } = req.params;

  try {
    await knex("transacoes").del().where({ id });
    return res.status(200).json({ message: "Transação excluída com sucesso" });
  } catch (error) {
    return res.status(500).json({ messagem: error.message });
  }
};

const extrato = async (req, res) => {
  const { id } = req.usuario;

  try {
    const entrada = await knex("transacoes")
      .sum("valor")
      .where({ tipo: "entrada", usuario_id: id })
      .first();

    const saida = await knex("transacoes")
      .sum("valor")
      .where({ tipo: "saida", usuario_id: id })
      .first();

    const saldo = {
      entrada: entrada.sum ?? 0,
      saida: saida.sum ?? 0,
    };

    return res.status(200).json(saldo);
  } catch (error) {
    return res.status(500).json({ messagem: error.message });
  }
};

module.exports = {
  listarTransacoes,
  obterTransacao,
  cadastrarTransacao,
  atualizarTransacao,
  deletarTransacao,
  extrato,
};
