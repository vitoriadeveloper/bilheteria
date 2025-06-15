import { Cart } from "@prisma/client";
import { UserNotFoundError } from "./errors/user-not-found";
import { CartRepository } from "@/repository/cart-repository";
import { UsersRepository } from "@/repository/users-repository";
import { ProductsRepository } from "@/repository/products-repository";
import { ProductNotFoundError } from "./errors/product-not-found";

interface CreateCartRequest {
  userId: string;
  productId: string;
  quantity: number;
}

interface CreateCartResponse {
  cart: Cart;
}

export class CreateCartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly usersRepository: UsersRepository,
    private readonly productsRepository: ProductsRepository
  ) {}

  async execute({
    userId,
    productId,
    quantity,
  }: CreateCartRequest): Promise<CreateCartResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    const product = await this.productsRepository.findById(productId);
    if (!product) {
      throw new ProductNotFoundError();
    }
    const userCart = await this.cartRepository.getByUserId(userId);
    const existingCartItem = userCart.find(
      (item) => item.productId === productId
    );

    let cart: Cart;

    if (existingCartItem) {
      cart = await this.cartRepository.update(existingCartItem.id, {
        quantity: existingCartItem.quantity + quantity,
      });
    } else {
      cart = await this.cartRepository.create({
        userId,
        productId,
        quantity,
      });
    }

    return { cart };
  }
}
