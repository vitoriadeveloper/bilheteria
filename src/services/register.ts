import { UsersRepository } from "@/repository/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

interface RegisterServiceRequest {
  email: string;
  password: string;
}

export class RegisterService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute({ email, password }: RegisterServiceRequest) {
    const passwordHash = await hash(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }
    await this.usersRepository.create({
      email,
      password: passwordHash,
    });
  }
}
