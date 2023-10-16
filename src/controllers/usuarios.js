const knex = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExiste = await knex("usuarios").where({ email }).first();

    if (usuarioExiste) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning(["id", "nome", "email"]);

    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res.status(500).json({ mensagem: error });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await knex("usuarios").where({ email }).first();

    if (!usuario) {
      return res
        .status(401)
        .json({ mensagem: "Usuário e/ou senha inválido(s).1" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res
        .status(401)
        .json({ mensagem: "Usuário e/ou senha inválido(s).2" });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SENHA_JWT, {
      expiresIn: "8h",
    });

    const { senha: _, ...usuarioLogado } = usuario;

    return res.json({ usuario: usuarioLogado, token });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const detalharUsuario = async (req, res) => {
  const { senha, ...usuario } = req.usuario;

  res.status(200).json(usuario);
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    if (email) {
      const usuario = await knex("usuarios").where({ email }).first();

      if (usuario && usuario.id != req.usuario.id) {
        return res.status(409).json({
          messagem: "O e-mail informado já está cadastrado.",
        });
      }
    }
    let senhaCriptografada;
    if (senha) {
      senhaCriptografada = await bcrypt.hash(senha, 10);
    }

    const usuarioAtualizado = await knex("usuarios")
      .where({
        id: req.usuario.id,
      })
      .update({ nome, email, senha: senhaCriptografada })
      .returning(["id", "nome", "email"]);

    return res
      .status(200)
      .json({ usuarioAtualizado, messagem: "Usuário atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  criarUsuario,
  login,
  detalharUsuario,
  atualizarUsuario,
};
