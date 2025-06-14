import { InMemoryUsersRepository } from "@/repository/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";
import { RegisterService } from "@/services/register";
import { compare } from "bcryptjs";
import { it, describe, expect, beforeEach } from "vitest";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe("Register Service", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterService(inMemoryUsersRepository);
  });
  it("O usuário deve ser cadastrado", async () => {
    const { user } = await sut.execute({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("Deve ser gerado um hash da senha do usuário cadastrado", async () => {
    const { user } = await sut.execute({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare("123456", user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Não deve ser criado um usuário com o mesmo e-mail", async () => {
    await sut.execute({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(async () => {
      await sut.execute({
        email: "johndoe@gmail.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
