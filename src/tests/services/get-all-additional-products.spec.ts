import { InMemoryProductsRepository } from "@/repository/in-memory/in-memory-products-repository";
import { GetAdditionalProductsService } from "@/services/get-additional-products";
import { Product } from "@prisma/client";
import { randomUUID } from "crypto";
import { describe, it, expect, beforeEach } from "vitest";

let inMemoryProductsRepository: InMemoryProductsRepository;
let sut: GetAdditionalProductsService;

describe("Get additional products service", () => {
  beforeEach(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository();
    sut = new GetAdditionalProductsService(inMemoryProductsRepository);
  });

  it("Deve retornar uma lista vazia caso não haja produtos", async () => {
    inMemoryProductsRepository.products = [];
    const result = await sut.execute();

    expect(result.products).toEqual([]);
  });

  it("Deve retornar a lista de produtos existentes no bd", async () => {
    const mockProducts: Product[] = [
      { id: randomUUID(), name: "Pipoca", price: 25.0, quantity: 10 },
      { id: randomUUID(), name: "Refrigerante", price: 15.0, quantity: 10 },
      { id: randomUUID(), name: "Chocolate", price: 25.0, quantity: 10 },
    ];
    inMemoryProductsRepository.products = mockProducts;
    const result = await sut.execute();

    expect(result.products).toHaveLength(3);
    expect(result.products).toEqual(mockProducts);
  });
});
