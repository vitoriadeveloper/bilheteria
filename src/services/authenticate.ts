import { UsersRepository } from "@/repository/users-repository";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const doesPasswordMatches = await compare(password, user.password);
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
