import { InMemoryMoviesRepository } from "@/repository/in-memory/in-memory-movies-repository";
import { GetAllMoviesService } from "@/services/get-all-movies";
import { describe, it, expect, beforeEach } from "vitest";

let inMemoryMoviesRepository: InMemoryMoviesRepository;
let sut: GetAllMoviesService;

describe("Get all movies service", () => {
  beforeEach(() => {
    inMemoryMoviesRepository = new InMemoryMoviesRepository();
    sut = new GetAllMoviesService(inMemoryMoviesRepository);
  });

  it("deve retornar uma lista vazia quando não há filmes", async () => {
    const { movies } = await sut.execute();

    expect(movies).toEqual([]);
  });

  it("deve retornar todos os filmes cadastrados", async () => {
    inMemoryMoviesRepository.movies.push(
      {
        id: "movie-1",
        title: "Matrix",
        description: "Um hacker descobre a verdade.",
        duration: 136,
        Session: [],
      },
      {
        id: "movie-2",
        title: "Inception",
        description: "Um sonho dentro de um sonho.",
        duration: 148,
        Session: [],
      }
    );

    const { movies } = await sut.execute();

    expect(movies.length).toBe(2);
    expect(movies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "Matrix" }),
        expect.objectContaining({ title: "Inception" }),
      ])
    );
  });
});
