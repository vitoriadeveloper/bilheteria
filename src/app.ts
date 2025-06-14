import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Erro de validação de schema", issues: error.format() });
  }
  return res.status(500).send({ message: "Erro interno do servidor" });
});
