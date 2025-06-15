import { ProductsRepository } from "../products-repository";
import { Product } from "@prisma/client";

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = [];
  async get() {
    return this.products;
  }

  async findById(id: string) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      return null;
    }
    return product;
  }
}
