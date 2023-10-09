const Joi = require("joi").extend(require("@joi/date"));

const camposTransacoesSchema = Joi.object({
  tipo: Joi.string().valid("entrada", "saida").required().messages({
    "any.required": "Tipo é obrigatório",
    "string.empty": "Tipo é obrigatório",
    "any.only": "Tipo incorreto. Informar: entrada ou saida",
  }),
  descricao: Joi.string().min(2).max(255).required().messages({
    "any.required": "Descrição é obrigatória",
    "string.empty": "Descrição é obrigatória",
    "string.min": "Descrição precisa ter no mínimo de 2 caracteres",
    "string.max": "Descrição precisa ter no máximo de 255 caracteres",
  }),
  valor: Joi.number().integer().positive().required().messages({
    "any.required": "Valor é obrigatório",
    "string.empty": "Valor é obrigatório",
    "number.integer": "Valor precisa ser um número inteiro",
    "number.positive": "Valor precisa ser positivo",
    "number.base": "Valor precisa ser um número",
  }),
  data: Joi.date().format("YYYY-MM-DD HH:mm:ss").required().messages({
    "any.required": "Data é obrigatória",
    "string.empty": "Data é obrigatória",
    "date.format":
      "Data inválida, data precisar estar no formato (YYYY-MM-DD HH:mm:ss)",
  }),
  categoria_id: Joi.number().integer().positive().required().messages({
    "any.required": "Id da categoria é obrigatória",
    "string.empty": "Id da categoria é obrigatória",
    "number.integer": "Valor precisa ser um número inteiro",
    "number.positive": "Valor precisa ser positivo",
    "number.base": "Valor precisa ser um número",
  }),
});

module.exports = camposTransacoesSchema;
