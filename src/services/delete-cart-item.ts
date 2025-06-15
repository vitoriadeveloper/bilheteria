import { CartRepository } from "@/repository/cart-repository";

interface DeleteCartItemRequest {
  cartId: string;
}

export class DeleteCartItemService {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute({ cartId }: DeleteCartItemRequest): Promise<void> {
    await this.cartRepository.delete(cartId);
  }
}
