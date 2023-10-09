const express = require("express");

//Controllers
const {
  criarUsuario,
  login,
  detalharUsuario,
  atualizarUsuario,
} = require("./controllers/usuarios");
const { listarCategorias } = require("./controllers/categorias");
const {
  atualizarTransacao,
  cadastrarTransacao,
  deletarTransacao,
  extrato,
  listarTransacoes,
  obterTransacao,
} = require("./controllers/transacoes");

//Middlewares
const verificarToken = require("./middlewares/autenticacao");
const validarExisteTransacao = require("./middlewares/validarExisteTransacao");
const validacoesCampos = require("./middlewares/validacoesCampos");
const usuarioSchema = require("./validacoes/usuarioSchema");
const camposTransacoesSchema = require("./validacoes/transacoesSchema");

const rotas = express();

rotas.post(
  "/usuario",
  validacoesCampos(usuarioSchema.cadastroUsuarioSchema),
  criarUsuario
);
rotas.post("/login", validacoesCampos(usuarioSchema.loginSchema), login);

rotas.use(verificarToken);

rotas.get("/usuario", detalharUsuario);
rotas.put(
  "/usuario",
  validacoesCampos(usuarioSchema.atualizarUsuarioSchema),
  atualizarUsuario
);
rotas.get("/categoria", listarCategorias);
rotas.get("/transacao", listarTransacoes);
rotas.get("/transacao/extrato", extrato);
rotas.get("/transacao/:id", validarExisteTransacao, obterTransacao);
rotas.post(
  "/transacao",
  validacoesCampos(camposTransacoesSchema),
  cadastrarTransacao
);
rotas.put(
  "/transacao/:id",
  validarExisteTransacao,
  validacoesCampos(camposTransacoesSchema),
  atualizarTransacao
);
rotas.delete("/transacao/:id", validarExisteTransacao, deletarTransacao);

module.exports = rotas;
