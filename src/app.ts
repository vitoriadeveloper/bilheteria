import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

export const app = fastify();
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });
app.register(appRoutes);

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Erro de validação de schema", issues: error.format() });
  }
  return res.status(500).send({ message: "Erro interno do servidor" });
});
