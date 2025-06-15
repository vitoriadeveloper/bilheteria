import { GetUserCartService } from "../get-user-cart";
import { PrismaCartRepository } from "@/repository/prisma/prisma-cart-repository";

export function makeUserCartService() {
  const cartRepository = new PrismaCartRepository();
  const getUserCartService = new GetUserCartService(cartRepository);

  return getUserCartService;
}
