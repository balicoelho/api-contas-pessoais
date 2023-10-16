const validacoesCampos = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);

    next();
  } catch (error) {
    return res.status(400).json({ messagem: error });
  }
};

module.exports = validacoesCampos;
