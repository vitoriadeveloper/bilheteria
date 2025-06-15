import { Cart } from "@prisma/client";
import { CartRepository } from "@/repository/cart-repository";

interface GetUserCartRequest {
  userId: string;
}

interface GetUserCartResponse {
  cart: Cart[];
}

export class GetUserCartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute({ userId }: GetUserCartRequest): Promise<GetUserCartResponse> {
    const cart = await this.cartRepository.getByUserId(userId);

    return {
      cart,
    };
  }
}
