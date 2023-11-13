const express = require("express");
const router = express.Router();

const moviesRouter = require("./movie.router");

//Ahora cuando ingrese a /movies, se ejecutara el router de movies, que tiene todas las rutas de movies
router.use("/movies", moviesRouter);

module.exports = router;