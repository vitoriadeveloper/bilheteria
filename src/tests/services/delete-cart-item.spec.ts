import { InMemoryCartRepository } from "@/repository/in-memory/in-memory-cart-repository";
import { DeleteCartItemService } from "@/services/delete-cart-item";
import { CartItemNotFoundError } from "@/services/errors/cart-item-not-found";
import { describe, it, expect, beforeEach } from "vitest";

let inMemoryCartRepository: InMemoryCartRepository;
let sut: DeleteCartItemService;

describe("Delete cart item service", () => {
  beforeEach(() => {
    inMemoryCartRepository = new InMemoryCartRepository();
    sut = new DeleteCartItemService(inMemoryCartRepository);
  });

  it("deve remover um item do carrinho com sucesso", async () => {
    const cartItem = await inMemoryCartRepository.create({
      id: "cart-1",
      userId: "user-1",
      productId: "product-1",
      quantity: 2,
    });

    await sut.execute({ cartId: cartItem.id });

    const carrinho = await inMemoryCartRepository.getByUserId("user-1");
    expect(carrinho).toHaveLength(0);
  });

  it("Deve lançar erro se tentar remover um item que não existe", async () => {
    await expect(
      sut.execute({ cartId: "item-inexistente" })
    ).rejects.toBeInstanceOf(CartItemNotFoundError);

    const carrinho = await inMemoryCartRepository.getByUserId("qualquer-user");
    expect(carrinho).toHaveLength(0);
  });
});
