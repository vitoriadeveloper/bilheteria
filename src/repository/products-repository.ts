import { Product } from "@prisma/client";

export interface ProductsRepository {
  get(): Promise<Product[]>;
}
