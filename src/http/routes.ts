import { FastifyInstance } from "fastify";
import { register } from "./controllers/users/register";
import { authenticate } from "./controllers/users/authenticate";
import { reserveSeatController } from "./controllers/movies/reservation";
import { jwtVerify } from "./middleware/jwt-verify";
import { deleteReservationSeatController } from "./controllers/movies/delete-reservation";
import { getAllMovies } from "./controllers/movies/getAll";
import { confirmReservationSeatController } from "./controllers/movies/confirm-reservation";
import { getSeatsAvailableBySession } from "./controllers/movies/get-seats-available-by-session";
import { getAllProducts } from "./controllers/products/get";
import { addToCart } from "./controllers/cart/create";
import { getUserCart } from "./controllers/cart/get-user-cart";

export async function appRoutes(app: FastifyInstance) {
  app.get("/sessoes", getAllMovies);
  app.get(
    "/sessoes/:sessionId/assentos-disponiveis",
    getSeatsAvailableBySession
  );

  app.get("/produtos", getAllProducts);

  app.post("/usuarios", register);
  app.post("/login", authenticate);

  app.post("/reservas", { preHandler: [jwtVerify] }, reserveSeatController);
  app.delete(
    "/reservas",
    { preHandler: [jwtVerify] },
    deleteReservationSeatController
  );
  app.post(
    "/reservas/confirmar",
    { preHandler: [jwtVerify] },
    confirmReservationSeatController
  );

  app.post("/carrinho", { preHandler: [jwtVerify] }, addToCart);
  app.get("/carrinho", { preHandler: [jwtVerify] }, getUserCart);
}
