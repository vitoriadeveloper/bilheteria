import { FastifyReply, FastifyRequest } from "fastify";

export async function jwtVerify(req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    return res.status(401).send({ message: "Token inválido ou ausente" });
  }
}
