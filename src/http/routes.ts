import { FastifyInstance } from "fastify";
import { register } from "./controllers/users/register";
import { authenticate } from "./controllers/users/authenticate";
import { getAllMovies } from "./controllers/movies/getAll";
import { reserveSeatController } from "./controllers/movies/reservation";
import { jwtVerify } from "./middleware/jwt-verify";

export async function appRoutes(app: FastifyInstance) {
  app.get("/filmes", getAllMovies);
  app.post("/usuarios", register);
  app.post("/login", authenticate);
  app.post("/reservas", { preHandler: [jwtVerify] }, reserveSeatController);
}
