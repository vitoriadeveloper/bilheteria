import { DeleteCartItemService } from "../delete-cart-item";
import { PrismaCartRepository } from "@/repository/prisma/prisma-cart-repository";

export function makeDeleteItemCartService() {
  const cartRepository = new PrismaCartRepository();
  const deleteCartItemService = new DeleteCartItemService(cartRepository);

  return deleteCartItemService;
}
