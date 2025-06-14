import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "hom", "prod"]).default("dev"),
  PORT: z.coerce.number().default(8000),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.log("Variáveis de ambiente inválidas", _env.error.format());
  throw new Error("Variáveis de ambiente inválidas");
}

export const env = _env.data;
