import { UsersRepository } from "@/repository/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { User } from "@prisma/client";

interface RegisterServiceRequest {
  email: string;
  password: string;
}

interface RegisterServiceResponse {
  user: User;
}

export class RegisterService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute({
    email,
    password,
  }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    const passwordHash = await hash(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }
    const user = await this.usersRepository.create({
      email,
      password: passwordHash,
    });

    return {
      user,
    };
  }
}
