import { Cart, Prisma } from "@prisma/client";

export interface CartRepository {
  create(data: Prisma.CartUncheckedCreateInput): Promise<Cart>;
  getByUserId(userId: string): Promise<Cart[]>;
  update(id: string, data: Prisma.CartUpdateInput): Promise<Cart>;
  delete(id: string): Promise<void>;
}
