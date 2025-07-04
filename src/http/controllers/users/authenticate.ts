import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, password } = authenticateBodySchema.parse(req.body);
  try {
    const authenticateService = makeAuthenticateService();
    const { user } = await authenticateService.execute({ email, password });

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return res.status(200).send({token});
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send();
  }
}
