import { FastifyInstance } from "fastify";
import { register } from "./controllers/users/register";
import { authenticate } from "./controllers/users/authenticate";
import { getAllMovies } from "./controllers/movies/getAll";

export async function appRoutes(app: FastifyInstance) {
  app.get("/filmes", getAllMovies);
  app.post("/usuarios", register);
  app.post("/login", authenticate);
}
