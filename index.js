//* Importando dotenv
require("dotenv").config();

const express = require("express");
const debug = require("debug")("movies-api:server");
const cors = require("cors");
const morgan = require("morgan");

const envconfig = require("./src/config/env.config");
const mainRouter = require("./src/routes/main.router");
const database = require("./src/config/db.config");
const { errorHandler } = require("./src/middlewares/error.middlewares");


const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors()); 

database.connect();
app.use("/api/v1", mainRouter); 

app.use(errorHandler);

//Definiendo puerto de escucha
const port = envconfig.PORT;

app.listen(port, () => {
  debug(`Server se corre en el puerto ${port}`);
});