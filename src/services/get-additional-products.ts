import { ProductsRepository } from "@/repository/products-repository";
import { Product } from "@prisma/client";

interface GetAdditionalProductsResponse {
  products: Product[];
}

export class GetAdditionalProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}
  async execute(): Promise<GetAdditionalProductsResponse> {
    const products = await this.productRepository.get();

    return {
      products,
    };
  }
}
