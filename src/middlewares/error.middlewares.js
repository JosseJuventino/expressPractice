const debug = require("debug")("movies-api:error");

/* Se define la función errorHandler la cual será una 
función que cumpla con la firma de un middleware de error.*/

const errorHandler = (err, req, res, next) => {
  debug(err);   //* Imprimiendo el error en consola
  return res.status(err.status || 500).json({ message: err.message });
};

module.exports = { errorHandler };