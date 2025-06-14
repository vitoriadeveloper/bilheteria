import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterServiceRequest {
  email: string;
  password: string;
}

export class RegisterService {
    constructor(private readonly usersRepository: any){}
  async execute({ email, password }: RegisterServiceRequest) {
    const passwordHash = await hash(password, 6);
    const userWithSameEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (userWithSameEmail) {
      throw new Error("Email já existe");
    }


    await this.usersRepository.create({
      email,
      password: passwordHash,
    });
  }
}
