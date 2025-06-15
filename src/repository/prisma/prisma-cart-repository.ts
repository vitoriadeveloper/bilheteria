import { Prisma } from "@prisma/client";
import { CartRepository } from "../cart-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCartRepository implements CartRepository {
  async create(data: Prisma.CartUncheckedCreateInput) {
    const cart = await prisma.cart.create({ data });
    return cart;
  }
  async getByUserId(userId: string) {
    const cart = await prisma.cart.findMany({
      where: { userId },
    });
    return cart;
  }
  async update(id: string, data: Prisma.CartUpdateInput) {
    const cart = await prisma.cart.update({
      where: { id },
      data,
    });
    return cart;
  }
  async delete(id: string) {
    await prisma.cart.delete({
      where: { id },
    });
  }
}
