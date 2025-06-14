import { PrismaUsersRepository } from "@/repository/prisma/prisma-users-repository";
import { AuthenticateService } from "../authenticate";

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateService(usersRepository);

  return authenticateService;
}
