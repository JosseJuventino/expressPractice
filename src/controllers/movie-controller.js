const httpError = require("http-errors");
//Importando el modelo uwu
const Movie = require("../models/movie-model");

//CRUD

//Create
const createMovie = async (req, res, next) => {
  try {
    const { body } = req; //cuerpo de la peticion
    const newMovie = new Movie(body); //creando una nueva instancia de Movie
    const savedMovie = await newMovie.save();

    if (!savedMovie) throw httpError(500, "Movie not created");
    res.status(201).json({ message: "Movie created", data: savedMovie });
  } catch (error) {
    next(error);
  }
};

//Get
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();

    if (!movies) throw httpError(404, "Movies not found");
    res.status(200).json({ data: movies });
  } catch (error) {
    next(error);
  }
};

//Get one movie
const getOneMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    if (!movie) throw httpError(404, "Movie not found");
    res.status(200).json({ data: movie });
  } catch (error) {
    next(error);
  }
};

//Update movie
const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const toUpdateMovie = await Movie.findById(id);

    if (!toUpdateMovie) throw httpError(404, "Movie not found");

    const updatedMovie = await Movie.findByIdAndUpdate(id, body, {
      new: true, //devuelve la version actualizada de la pelicula
    });

    if (!updatedMovie) throw httpError(500, "Movie not updated");
    res.status(200).json({ message: "Movie updated", data: updatedMovie });
  } catch (error) {
    next(error);
  }
};

//AddDelete favoritos
const toggleMovieFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);
    if (!movie) throw httpError(404, "Movie not found");
    movie.favorite = !movie.favorite;
    const updatedMovie = await movie.save();
    if (!updatedMovie) throw httpError(500, "Movie not updated");
    res
      .status(200)
      .json({ message: "Update favorite status", data: updatedMovie });
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try{
    const {id} = req.params;
    const movie = await Movie.findByIdAndDelete(id);
    if(!movie) throw httpError(404, "Movie not found");
    res.status(200).json({message: "Movie deleted", data: movie});
  }catch(error){
    next(error);
  }
};



module.exports = {
  createMovie,
  getMovies,
  getOneMovie,
  updateMovie,
  toggleMovieFavorite,
  deleteMovie, 
};
