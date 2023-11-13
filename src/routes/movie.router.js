const express = require("express");
const router = express.Router();

const {
  createMovie,
  getMovies,
  getOneMovie,
  updateMovie,
  toggleMovieFavorite,
  deleteMovie,
} = require("../controllers/movie-controller"); //Obteniendo los controladores

const {
  idInParams,
  createMovieValidator,
  updateMovieValidator,
} = require("../validators/movie.validator");

const { runValidation } = require("../middlewares/validator.middleware");

//Creando las rutas
router.post("/", createMovieValidator, runValidation, createMovie);
router.get("/", getMovies);
router.get("/:id", idInParams, runValidation, getOneMovie);
router.put("/:id", idInParams, updateMovieValidator, runValidation, updateMovie);
router.patch("/favorite/:id", idInParams, runValidation, toggleMovieFavorite);

//Ruta para eliminar una pelicula
router.delete("/:id", idInParams, runValidation, deleteMovie);


//Exportando el router
module.exports = router;
