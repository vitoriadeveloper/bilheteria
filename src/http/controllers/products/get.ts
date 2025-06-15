import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllProductsService } from "@/services/factories/make-get-all-products-service";

export async function getAllProducts(_: FastifyRequest, res: FastifyReply) {
  try {
    const getAllProductsService = makeGetAllProductsService();
    const { products } = await getAllProductsService.execute();

    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send();
  }
}
