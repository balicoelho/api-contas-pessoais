const Joi = require("joi");

const cadastroUsuarioSchema = Joi.object({
  nome: Joi.string().min(2).max(250).required().messages({
    "any.required": "Nome é obrigatório",
    "string.empty": "Nome é obrigatório",
    "string.min": "Nome precisa ter no mínimo de 2 caracteres",
    "string.max": "Nome precisa ter no máximo de 255 caracteres",
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      "any.required": "Email é obrigatório",
      "string.empty": "Email é obrigatório",
      "string.email": "Email inválido",
    }),

  senha: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required()
    .messages({
      "any.required": "Senha é obrigatória",
      "string.empty": "Senha é obrigatória",
      "string.pattern.base":
        "A senha precisa ter de 6 a 30 caracteres, entre letra minúscula, letra maiúscula e numeros",
    }),
});

const atualizarUsuarioSchema = Joi.object({
  nome: Joi.string().min(2).max(250).messages({
    "string.min": "Nome precisa ter no mínimo de 2 caracteres",
    "string.max": "Nome precisa ter no máximo de 255 caracteres",
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })

    .messages({
      "string.email": "Email inválido",
    }),

  senha: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).messages({
    "string.pattern.base":
      "A senha precisa ter de 6 a 30 caracteres, entre letra minúscula, letra maiúscula e numeros",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      "any.required": "Email é obrigatório",
      "string.empty": "Email é obrigatório",
      "string.email": "Email inválido",
    }),

  senha: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .required()
    .messages({
      "any.required": "Senha é obrigatória",
      "string.empty": "Senha é obrigatória",
      "string.pattern.base":
        "A senha precisa ter de 6 a 30 caracteres, entre letra minúscula, letra maiúscula e numeros",
    }),
});

module.exports = { cadastroUsuarioSchema, loginSchema, atualizarUsuarioSchema };
