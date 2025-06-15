import { FastifyInstance } from "fastify";
import { register } from "./controllers/users/register";
import { authenticate } from "./controllers/users/authenticate";
import { reserveSeatController } from "./controllers/movies/reservation";
import { jwtVerify } from "./middleware/jwt-verify";
import { deleteReservationSeatController } from "./controllers/movies/delete-reservation";
import { getAllMovies } from "./controllers/movies/getAll";
import { confirmReservationSeatController } from "./controllers/movies/confirm-reservation";

export async function appRoutes(app: FastifyInstance) {
  app.get("/filmes", getAllMovies);
  app.post("/usuarios", register);
  app.post("/login", authenticate);
  app.post("/reservas", { preHandler: [jwtVerify] }, reserveSeatController);
  app.delete("/reservas", { preHandler: [jwtVerify] }, deleteReservationSeatController);
  app.post("/reservas/confirmar", { preHandler: [jwtVerify] }, confirmReservationSeatController);
}
