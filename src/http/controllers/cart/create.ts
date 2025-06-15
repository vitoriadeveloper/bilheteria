import { InvalidCredentialsError } from "@/services/errors/invalid-credentials";
import { ProductNotFoundError } from "@/services/errors/product-not-found";
import { UserNotFoundError } from "@/services/errors/user-not-found";
import { makeCreateCartService } from "@/services/factories/make-create-cart-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function addToCart(req: FastifyRequest, res: FastifyReply) {
  const schema = z.object({
    productId: z.string().uuid(),
    quantity: z.number().min(1),
  });
  const { productId, quantity } = schema.parse(req.body);
  const userId = (req as any).user?.sub;
  if (!userId) {
    throw new InvalidCredentialsError();
  }
  try {
    const createCartService = makeCreateCartService();
    const { cart } = await createCartService.execute({
      userId,
      productId,
      quantity,
    });

    return res.status(201).send({ cart });
  } catch (error) {
    if (
      error instanceof ProductNotFoundError ||
      error instanceof UserNotFoundError
    ) {
      return res.status(404).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno no servidor." });
  }
}
