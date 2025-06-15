import { Cart, Prisma } from "@prisma/client";
import { CartRepository } from "../cart-repository";
import { randomUUID } from "crypto";
import { CartItemNotFoundError } from "@/services/errors/cart-item-not-found";

export class InMemoryCartRepository implements CartRepository {
  public carts: Cart[] = [];
  async create(data: Prisma.CartUncheckedCreateInput) {
    const newCart = {
      id: randomUUID(),
      userId: data.userId,
      productId: data.productId,
      quantity: data.quantity,
    };
    this.carts.push(newCart);

    return newCart;
  }
  async getByUserId(userId: string) {
    return this.carts.filter((item) => item.userId === userId);
  }
  async update(id: string, data: Prisma.CartUpdateInput) {
    const index = this.carts.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new CartItemNotFoundError();
    }
    const existing = this.carts[index];
    const updated = {
      ...existing,
      ...data,
    } as Cart;
    this.carts[index] = updated;
    return updated;
  }
  async delete(id: string) {
    const index = this.carts.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new CartItemNotFoundError();
    }
    this.carts.splice(index, 1);
  }
}
