import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeDeleteItemCartService } from "@/services/factories/make-delete-cart-item-service";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials";
import { CartItemNotFoundError } from "@/services/errors/cart-item-not-found";

export async function deleteCartItem(req: FastifyRequest, res: FastifyReply) {
  const deleteSchema = z.object({
    cartId: z.string(),
  });
  const userId = (req as any).user?.sub;
  if (!userId) {
    throw new InvalidCredentialsError();
  }

  const { cartId } = deleteSchema.parse(req.body);

  const deleteCartItemService = makeDeleteItemCartService();

  try {
    await deleteCartItemService.execute({ cartId });
    return res.status(200).send({
      message: "Item removido com sucesso do carrinho.",
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(401).send({ message: error.message });
    }
    if (error instanceof CartItemNotFoundError) {
      return res.status(404).send({ message: error.message });
    }
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
}
