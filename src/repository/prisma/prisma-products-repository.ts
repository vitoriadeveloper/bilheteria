import { prisma } from "@/lib/prisma";
import { ProductsRepository } from "../products-repository";

export class PrismaProductsRepository implements ProductsRepository {
  async get() {
    const products = await prisma.product.findMany();
    return products;
  }
}
