import { Router } from "express";
import { createMovie, getAllMoviesAvaliacao10, getAllMovies } from "../controllers/movieController.js";

const routes = Router();

routes.get("/getAllAvaliacao10", getAllMoviesAvaliacao10)
routes.get("/getAll", getAllMovies)
routes.post("/create", createMovie)

export default routes;