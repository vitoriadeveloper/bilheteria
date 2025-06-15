import { ProductsRepository } from "../products-repository";
import { Product } from "@prisma/client";

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = [];
  async get() {
    return this.products;
  }
}
