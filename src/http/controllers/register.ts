import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { registerService } from "@/services/register";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, password } = registerBodySchema.parse(req.body);
  try {
    await registerService({ email, password });
  } catch (err: any) {
    return res.status(409).send({
        body: err.message
    });
  }
  return res.status(201).send();
}
