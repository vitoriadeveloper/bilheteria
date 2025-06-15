import { InMemoryCartRepository } from "@/repository/in-memory/in-memory-cart-repository";
import { GetUserCartService } from "@/services/get-user-cart";
import { describe, it, expect, beforeEach } from "vitest";

let inMemoryCartRepository: InMemoryCartRepository;
let sut: GetUserCartService;

describe("Get user cart service", () => {
  beforeEach(() => {
    inMemoryCartRepository = new InMemoryCartRepository();
    sut = new GetUserCartService(inMemoryCartRepository);
  });
  it("deve retornar um array vazio se o usuário não tiver itens no carrinho", async () => {
    const resultado = await sut.execute({ userId: "user-vazio" });

    expect(resultado.cart).toEqual([]);
  });

  it("deve retornar todos os itens do carrinho de um usuário existente", async () => {
    await inMemoryCartRepository.create({
      id: "cart-1",
      userId: "user-1",
      productId: "produto-1",
      quantity: 2,
    });

    await inMemoryCartRepository.create({
      id: "cart-2",
      userId: "user-1",
      productId: "produto-2",
      quantity: 1,
    });

    const resultado = await sut.execute({ userId: "user-1" });

    expect(resultado.cart).toHaveLength(2);
    expect(resultado.cart).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: "user-1",
          productId: "produto-1",
          quantity: 2,
        }),
        expect.objectContaining({
          userId: "user-1",
          productId: "produto-2",
          quantity: 1,
        }),
      ])
    );
  });
});
