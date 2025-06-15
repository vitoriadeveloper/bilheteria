import { InvalidCredentialsError } from "@/services/errors/invalid-credentials";
import { UserNotFoundError } from "@/services/errors/user-not-found";
import { makeUserCartService } from "@/services/factories/make-get-user-cart";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getUserCart(req: FastifyRequest, res: FastifyReply) {
  try {
    const userId = (req as any).user?.sub;
    if (!userId) {
      throw new InvalidCredentialsError();
    }
    const getUserCartService = makeUserCartService();
    const { cart } = await getUserCartService.execute({ userId });
    return res.status(200).send({ cart });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(401).send({ message: error.message });
    }
    if (error instanceof UserNotFoundError) {
      return res.status(404).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
}
