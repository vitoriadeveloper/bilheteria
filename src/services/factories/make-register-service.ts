import { PrismaUsersRepository } from "@/repository/prisma/prisma-users-repository";
import { RegisterService } from "../register";

export function makeRegisterService(){
    const usersRepository = new PrismaUsersRepository();
    const registerUsersService = new RegisterService(usersRepository);

    return registerUsersService
}