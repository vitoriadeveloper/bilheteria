import { PrismaProductsRepository } from "@/repository/prisma/prisma-products-repository";
import { GetAdditionalProductsService } from "../get-additional-products";

export function makeGetAllProductsService() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const getAllProductsService = new GetAdditionalProductsService(
    prismaProductsRepository
  );

  return getAllProductsService;
}
