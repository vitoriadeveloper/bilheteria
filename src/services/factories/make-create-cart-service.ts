import { PrismaUsersRepository } from "@/repository/prisma/prisma-users-repository";
import { CreateCartService } from "../create-cart";
import { PrismaProductsRepository } from "@/repository/prisma/prisma-products-repository";
import { PrismaCartRepository } from "@/repository/prisma/prisma-cart-repository";

export function makeCreateCartService() {
  const usersRepository = new PrismaUsersRepository();
  const productsRepository = new PrismaProductsRepository();
  const cartRepository = new PrismaCartRepository();
  const createCartService = new CreateCartService(
    cartRepository,
    usersRepository,
    productsRepository
  );

  return createCartService;
}
