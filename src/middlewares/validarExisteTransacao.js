const knex = require("../database");

const validarExisteTransacao = async (req, res, next) => {
  const { id } = req.params;

  try {
    const transacao = await knex("transacoes").where({ id }).first();

    if (!transacao || transacao.usuario_id != req.usuario.id) {
      return res.status(404).json({ message: "Transação não encontrada." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
};

module.exports = validarExisteTransacao;
