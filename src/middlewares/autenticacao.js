const jwt = require("jsonwebtoken");
const knex = require("../database");

const verificarToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Usuário não autenticado" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.SENHA_JWT);

    const usuario = await knex("usuarios").where({ id }).first();

    if (!usuario) {
      return res.status(401).json({ mensagem: "Usuário não autenticado" });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }
};

module.exports = verificarToken;
