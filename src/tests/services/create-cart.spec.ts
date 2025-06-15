import { InMemoryCartRepository } from "@/repository/in-memory/in-memory-cart-repository";
import { InMemoryProductsRepository } from "@/repository/in-memory/in-memory-products-repository";
import { InMemoryUsersRepository } from "@/repository/in-memory/in-memory-users-repository";
import { CreateCartService } from "@/services/create-cart";
import { ProductNotFoundError } from "@/services/errors/product-not-found";
import { UserNotFoundError } from "@/services/errors/user-not-found";
import { describe, it, expect, beforeEach, vi } from "vitest";

let inMemoryCartRepository: InMemoryCartRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let sut: CreateCartService;

describe("Create cart service", () => {
  beforeEach(() => {
    inMemoryCartRepository = new InMemoryCartRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();
    sut = new CreateCartService(
      inMemoryCartRepository,
      inMemoryUsersRepository,
      inMemoryProductsRepository
    );
  });

  it("deve lançar UserNotFoundError se o usuário não existir", async () => {
    await expect(
      sut.execute({
        userId: "usuario-inexistente",
        productId: "prod-1",
        quantity: 1,
      })
    ).rejects.toBeInstanceOf(UserNotFoundError);
  });

  it("deve lançar ProductNotFoundError se o produto não existir", async () => {
    await inMemoryUsersRepository.create({
      email: "usuario@teste.com",
      password: "123456",
    });
    await expect(
      sut.execute({
        userId: "user-1",
        productId: "produto-inexistente",
        quantity: 1,
      })
    ).rejects.toBeInstanceOf(ProductNotFoundError);
  });

  it("deve criar um novo item no carrinho se o produto não estiver no carrinho do usuário", async () => {
    await inMemoryUsersRepository.create({
      id: "user-1",
      email: "usuario@teste.com",
      password: "123456",
    });
    vi.spyOn(inMemoryProductsRepository, "findById").mockResolvedValueOnce({
      id: "produto1",
      name: "Produto 1",
      price: 100,
      quantity: 0,
    });

    const resultado = await sut.execute({
      userId: "user-1",
      productId: "produto1",
      quantity: 2,
    });

    expect(resultado.cart).toMatchObject({
      userId: "user-1",
      productId: "produto1",
      quantity: 2,
    });

    const carrinhoDoUsuario = await inMemoryCartRepository.getByUserId(
      "user-1"
    );
    expect(carrinhoDoUsuario.length).toBe(1);
    expect(carrinhoDoUsuario[0].quantity).toBe(2);
  });

  it("deve atualizar a quantidade se o produto já existir no carrinho do usuário", async () => {
    await inMemoryUsersRepository.create({
      email: "usuario@teste.com",
      password: "123456",
    });

    vi.spyOn(inMemoryProductsRepository, "findById").mockResolvedValue({
      id: "produto1",
      name: "Produto 1",
      price: 100,
      quantity: 0,
    });

    await sut.execute({
      userId: "user-1",
      productId: "produto1",
      quantity: 2,
    });

    const resultado = await sut.execute({
      userId: "user-1",
      productId: "produto1",
      quantity: 3,
    });

    expect(resultado.cart.quantity).toBe(5);

    const carrinhoDoUsuario = await inMemoryCartRepository.getByUserId(
      "user-1"
    );
    expect(carrinhoDoUsuario.length).toBe(1);
    expect(carrinhoDoUsuario[0].quantity).toBe(5);
  });
});
