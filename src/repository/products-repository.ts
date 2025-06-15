import { Product } from "@prisma/client";

export interface ProductsRepository {
  get(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
}
