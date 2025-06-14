import { InMemoryUsersRepository } from "@/repository/in-memory/in-memory-users-repository";
import { AuthenticateService } from "@/services/authenticate";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials";
import { hash } from "bcryptjs";
import { it, describe, expect, beforeEach } from "vitest";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: AuthenticateService;
describe("Authenticate Service", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(inMemoryUsersRepository);
  });
  it("O usuário deve se autenticar", async () => {
    await inMemoryUsersRepository.create({
      email: "johndoe@gmail.com",
      password: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("O usuário não deve se autenticar com e-mail errado", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(inMemoryUsersRepository);

    await expect(() =>
      sut.execute({
        email: "joseluiz@gmail.com",
        password: "123456",
      })
    ).rejects.instanceOf(InvalidCredentialsError);
  });

  it("O usuário não deve se autenticar com a senha errada", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateService(inMemoryUsersRepository);

    await inMemoryUsersRepository.create({
      email: "johndoe@gmail.com",
      password: await hash("654321", 6),
    });

    await expect(() =>
      sut.execute({
        email: "joseluiz@gmail.com",
        password: "123456",
      })
    ).rejects.instanceOf(InvalidCredentialsError);
  });
});
