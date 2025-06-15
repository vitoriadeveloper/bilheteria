import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllProductsService } from "@/services/factories/make-get-all-products-service";
import { UserNotFoundError } from "@/services/errors/user-not-found";

export async function getAllProducts(req: FastifyRequest, res: FastifyReply) {
  try {
    const userId = (req as any).user?.sub;
    if (!userId) {
      return res.status(401).send({ message: "Usuário não autenticado" });
    }
    const getAllProductsService = makeGetAllProductsService();
    const { products } = await getAllProductsService.execute();

    return res.status(200).send(products);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).send({ message: error.message });
    }
    return res.status(500).send();
  }
}
