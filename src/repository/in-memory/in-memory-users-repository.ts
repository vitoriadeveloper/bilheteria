import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user-1",
      email: data.email,
      password: data.password,
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return null;
    }
    return user;
  }
}
